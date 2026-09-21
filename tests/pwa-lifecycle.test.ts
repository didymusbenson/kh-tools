import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ register: vi.fn(), apply: vi.fn(), saved: vi.fn() }));
vi.mock("virtual:pwa-register", () => ({ registerSW: mocks.register }));
vi.mock("../src/pwa-cache", () => ({ hasSavedJournal: mocks.saved }));

describe("journal update lifecycle", () => {
  let app: typeof import("../src/pwa");
  let callbacks: any;
  let windowTarget: EventTarget;
  let documentTarget: EventTarget & { visibilityState: string; baseURI: string };
  let registration: { update: ReturnType<typeof vi.fn>; waiting: object | null; installing: object | null; active: object | null };
  const settle = async () => { await Promise.resolve(); await Promise.resolve(); };

  beforeEach(async () => {
    vi.resetModules();
    vi.resetAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-20T12:00:00Z"));
    windowTarget = Object.assign(new EventTarget(), { caches: {} });
    documentTarget = Object.assign(new EventTarget(), { visibilityState: "visible", baseURI: "https://example.com/kh-tools/" });
    vi.stubGlobal("window", windowTarget);
    vi.stubGlobal("document", documentTarget);
    vi.stubGlobal("navigator", { onLine: true });
    vi.stubGlobal("caches", { match: vi.fn() });
    mocks.apply.mockResolvedValue(undefined);
    mocks.saved.mockResolvedValue(false);
    mocks.register.mockImplementation((options) => { callbacks = options; return mocks.apply; });
    registration = { update: vi.fn().mockResolvedValue(undefined), waiting: null, installing: null, active: null };
    app = await import("../src/pwa");
    app.initializeInstallation();
  });
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  it("checks on startup and recognizes a worker already waiting", async () => {
    registration.waiting = {};
    callbacks.onRegisteredSW("/kh-tools/sw.js", registration);
    await settle();
    expect(registration.update).toHaveBeenCalledOnce();
    expect(app.getInstallationState()).toMatchObject({ update: true, checking: false, message: "A journal update is ready." });
    app.initializeInstallation();
    expect(mocks.register).toHaveBeenCalledOnce();
  });

  it("retains update readiness before UI subscription and stops notifying after unsubscribe", () => {
    callbacks.onNeedRefresh();
    expect(app.getInstallationState().update).toBe(true);
    const notify = vi.fn();
    const unsubscribe = app.subscribeInstallation(notify);
    callbacks.onOfflineReady();
    expect(notify).toHaveBeenCalledOnce();
    unsubscribe();
    callbacks.onNeedRefresh();
    expect(notify).toHaveBeenCalledOnce();
  });

  it("throttles automatic focus checks and skips hidden documents", async () => {
    callbacks.onRegisteredSW("/kh-tools/sw.js", registration);
    await settle();
    windowTarget.dispatchEvent(new Event("focus"));
    expect(registration.update).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(60_001);
    documentTarget.visibilityState = "hidden";
    windowTarget.dispatchEvent(new Event("focus"));
    expect(registration.update).toHaveBeenCalledTimes(1);
    documentTarget.visibilityState = "visible";
    documentTarget.dispatchEvent(new Event("visibilitychange"));
    await settle();
    expect(registration.update).toHaveBeenCalledTimes(2);
  });

  it("reports offline and failed manual checks without leaving the UI busy", async () => {
    callbacks.onRegisteredSW("/kh-tools/sw.js", registration);
    await settle();
    vi.stubGlobal("navigator", { onLine: false });
    await app.checkForAppUpdate();
    expect(registration.update).toHaveBeenCalledTimes(1);
    expect(app.getInstallationState().message).toContain("Connect to the internet");
    vi.stubGlobal("navigator", { onLine: true });
    registration.update.mockRejectedValue(new Error("network"));
    await app.checkForAppUpdate();
    expect(app.getInstallationState()).toMatchObject({ checking: false, update: false });
    expect(app.getInstallationState().message).toContain("Could not check");
  });

  it("requests reload on apply and exposes a failed activation", async () => {
    await app.applyAppUpdate();
    expect(mocks.apply).toHaveBeenCalledWith(true);
    mocks.apply.mockRejectedValue(new Error("activation"));
    await app.applyAppUpdate();
    expect(app.getInstallationState().message).toContain("could not be loaded");
  });

  it("does not overwrite fresh offline readiness with an older cache probe", async () => {
    let finish!: (value: boolean) => void;
    mocks.saved.mockReturnValue(new Promise<boolean>((resolve) => { finish = resolve; }));
    registration.active = {};
    callbacks.onRegisteredSW("/kh-tools/sw.js", registration);
    callbacks.onOfflineReady();
    finish(false);
    await settle();
    expect(app.getInstallationState().offline).toBe(true);
  });

  it("deduplicates pending checks and retains an update detected during the check", async () => {
    let finish!: () => void;
    registration.update.mockReturnValue(new Promise<void>((resolve) => { finish = resolve; }));
    callbacks.onRegisteredSW("/kh-tools/sw.js", registration);
    await app.checkForAppUpdate();
    expect(registration.update).toHaveBeenCalledOnce();
    callbacks.onNeedRefresh();
    // A worker state transition can precede clearing registration.installing.
    registration.installing = {};
    finish();
    await settle();
    expect(app.getInstallationState()).toMatchObject({ update: true, checking: false, message: "A journal update is ready." });
  });

  it("replaces downloading status after installation completes", async () => {
    registration.installing = {};
    callbacks.onRegisteredSW("/kh-tools/sw.js", registration);
    await settle();
    expect(app.getInstallationState().message).toContain("downloading");
    callbacks.onOfflineReady();
    expect(app.getInstallationState().message).toContain("saved for offline use");
  });
});
