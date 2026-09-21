import { afterEach, describe, it, expect, vi } from "vitest";
import { JiminyEngine } from "../src/jiminy";
import { EMBEDDING_MODEL, EMBEDDING_REVISION } from "../src/jiminy/types";
import type { GameData } from "../src/domain/types";
const data = { game: "kh1fm", version: "fixture" } as GameData;
const pack = {
  schemaVersion: 1,
  game: "kh1fm",
  contentVersion: "fixture",
  embedding: {
    model: EMBEDDING_MODEL,
    revision: EMBEDDING_REVISION,
    dimensions: 384,
    dtype: "fp32",
    pooling: "mean",
    normalize: true,
  },
  thoughts: [],
};
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
describe("cached Jiminy restore", () => {
  it.each(["setup", "restore"] as const)("reopens after leaving during %s without stale progress or duplicate work", async (action) => {
    const sent: any[] = [];
    let worker: any;
    class Worker {
      onmessage: any;
      constructor() { worker = this; }
      postMessage(message: any) { sent.push(message); }
    }
    vi.stubGlobal("Worker", Worker);
    vi.stubGlobal("document", { baseURI: "https://example.com/kh-tools/" });
    vi.stubGlobal("navigator", { storage: { persist: async () => true } });
    vi.stubEnv("BASE_URL", "./");
    vi.stubGlobal("caches", {
      match: async () => new Response(JSON.stringify(pack)),
      open: async () => ({ put: async () => undefined }),
    });
    vi.stubGlobal("fetch", async (url: string) => new Response(JSON.stringify(url.endsWith("/kh1fm.json") ? data : pack)));
    const engine = new JiminyEngine();
    engine.activateGame("kh1fm");
    const previous = action === "setup" ? engine.setup() : engine.restore(data);
    await vi.waitFor(() => expect(sent).toHaveLength(1));
    engine.activateGame(null);
    engine.activateGame("kh1fm");
    const progress: string[] = [];
    const unsubscribe = engine.subscribe((p) => progress.push(p.phase));
    const reopened = engine.restore(data);
    worker.onmessage({ data: { id: sent[0].id, progress: { phase: "downloading", message: "Old panel" } } });
    expect(progress).toEqual(["idle"]);
    worker.onmessage({ data: { id: sent[0].id, result: true } });
    await previous;
    await vi.waitFor(() => expect(sent).toHaveLength(2));
    expect(sent[1].action).toBe("restore");
    expect(engine.status().phase).toBe("loading");
    worker.onmessage({ data: { id: sent[1].id, result: true } });
    await reopened;
    expect(engine.status().phase).toBe("ready");
    expect(progress.at(-1)).toBe("ready");
    expect(sent).toHaveLength(2);
    unsubscribe();
  });
  it("clearing conversation while restoring does not invalidate model readiness", async () => {
    let worker: any;
    let request: any;
    class Worker {
      onmessage: any;
      constructor() { worker = this; }
      postMessage(message: any) { request = message; }
    }
    vi.stubGlobal("Worker", Worker);
    vi.stubGlobal("document", { baseURI: "https://example.com/" });
    vi.stubGlobal("caches", { match: async () => new Response(JSON.stringify(pack)) });
    const engine = new JiminyEngine();
    engine.activateGame("kh1fm");
    const restoration = engine.restore(data);
    await vi.waitFor(() => expect(request).toBeDefined());
    engine.clearSession();
    worker.onmessage({ data: { id: request.id, result: true } });
    await restoration;
    expect(engine.status().phase).toBe("ready");
  });
  it("allows retry when setup fails after leaving and reopening without a cached pack", async () => {
    const sent: any[] = [];
    let worker: any;
    class Worker {
      onmessage: any;
      constructor() { worker = this; }
      postMessage(message: any) { sent.push(message); }
    }
    vi.stubGlobal("Worker", Worker);
    vi.stubGlobal("document", { baseURI: "https://example.com/" });
    vi.stubGlobal("navigator", { storage: { persist: async () => true } });
    vi.stubGlobal("caches", {
      match: async () => undefined,
      open: async () => ({ put: async () => undefined }),
    });
    vi.stubGlobal("fetch", async (url: string) => new Response(JSON.stringify(url.endsWith("/kh1fm.json") ? data : pack)));
    const engine = new JiminyEngine();
    engine.activateGame("kh1fm");
    const previous = engine.setup().catch(() => undefined);
    await vi.waitFor(() => expect(sent).toHaveLength(1));
    engine.activateGame(null);
    engine.activateGame("kh1fm");
    const reopened = engine.restore(data);
    worker.onmessage({ data: { id: sent[0].id, error: "Interrupted download" } });
    await Promise.all([previous, reopened]);
    expect(engine.status().phase).toBe("idle");
    const retry = engine.setup();
    await vi.waitFor(() => expect(sent).toHaveLength(2));
    worker.onmessage({ data: { id: sent[1].id, result: true } });
    await retry;
    expect(engine.status().phase).toBe("ready");
  });
  it("restores without fetching and passes a deployment-aware WASM path", async () => {
    const sent: any[] = [];
    class Worker {
      onmessage: any;
      postMessage(data: any) {
        sent.push(data);
        queueMicrotask(() =>
          this.onmessage({ data: { id: data.id, result: true } }),
        );
      }
    }
    vi.stubGlobal("Worker", Worker);
    vi.stubGlobal("document", { baseURI: "https://example.com/kh-tools/" });
    vi.stubEnv("BASE_URL", "./");
    vi.stubGlobal("caches", {
      match: async () => new Response(JSON.stringify(pack)),
    });
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const engine = new JiminyEngine();
    engine.activateGame("kh1fm");
    await engine.restore(data);
    expect(engine.status().phase).toBe("ready");
    expect(fetch).not.toHaveBeenCalled();
    expect(sent[0].action).toBe("restore");
    expect(sent[0].payload.wasmPath).toBe("https://example.com/kh-tools/ort/");
  });
  it("does not open models for a mismatched pack", async () => {
    const worker = vi.fn();
    vi.stubGlobal("Worker", worker);
    vi.stubGlobal("caches", {
      match: async () =>
        new Response(JSON.stringify({ ...pack, contentVersion: "old" })),
    });
    const engine = new JiminyEngine();
    engine.activateGame("kh1fm");
    await engine.restore(data);
    expect(engine.status().phase).toBe("idle");
    expect(worker).not.toHaveBeenCalled();
  });
});
