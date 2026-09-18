import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createPlayerStore } from "../src/state/playerStore";
import type { PlayerStore } from "../src/state/playerStore";
import { emptyPlayerState, makeBackup } from "../src/domain/player";
import type { GameData, GuideEntry } from "../src/domain/types";

const entry = (id: string): GuideEntry => ({
  id,
  game: "kh1fm",
  category: "recipe",
  name: id,
  summary: "",
  instructions: "",
  tags: [],
  relatedIds: [],
  sources: [],
  verification: "source-backed",
  checkable: true,
  collectible: false,
});
const data: GameData = {
  schemaVersion: 1,
  game: "kh1fm",
  version: "test",
  entries: [entry("first"), entry("second"), entry("ore")],
  recipes: [
    {
      id: "craft",
      entryId: "first",
      productId: "product",
      name: "Craft",
      set: 1,
      unlock: "",
      verification: "source-backed",
      outputQuantity: 1,
      ingredients: [{ itemId: "ore", name: "Ore", quantity: 3 }],
    },
  ],
  coverage: [],
};
const stores: PlayerStore[] = [];
async function open(content: GameData = data) {
  const store = createPlayerStore(content);
  stores.push(store);
  await vi.waitFor(() => expect(store.getSnapshot().ready).toBe(true));
  return store;
}
beforeEach(async () => {
  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase("ars-arcanum-player");
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
});
afterEach(() => {
  for (const store of stores.splice(0)) store.dispose();
  vi.restoreAllMocks();
});
describe("transactional browser progress", () => {
  it("restores checks, stock, goals and route after reopening; inventory toggle preserves stock", async () => {
    const store = await open();
    await store.setInventory("ore", 8);
    await store.setInventoryEnabled(true);
    await store.setCheck("first", true);
    await store.setPlan("craft", 2);
    await store.rememberRoute("#/kh1fm/synthesis?view=remaining");
    await store.setInventoryEnabled(false);
    const reopened = await open();
    expect(reopened.getSnapshot().state).toMatchObject({
      checks: { first: true },
      inventory: { ore: 8 },
      inventoryEnabled: false,
      plan: { craft: 2 },
      lastRoute: "#/kh1fm/synthesis?view=remaining",
    });
    expect(reopened.getSnapshot().status).toBe("saved");
  });
  it("keeps historical crafted checks independent and supports undo without consuming stock", async () => {
    const store = await open();
    await store.setInventory("ore", 8);
    await store.setCheck("first", true);
    expect(store.getSnapshot().state.inventory.ore).toBe(8);
    await store.undo();
    expect(store.getSnapshot().state.checks.first).toBeUndefined();
    expect(store.getSnapshot().state.inventory.ore).toBe(8);
    await store.setInventory("ore", null);
    expect(store.getSnapshot().state.inventory.ore).toBeUndefined();
    await store.undo();
    expect(store.getSnapshot().state.inventory.ore).toBe(8);
  });
  it("preserves unrelated changes from simultaneous tabs", async () => {
    const [a, b] = await Promise.all([open(), open()]);
    await Promise.all([
      a.setCheck("first", true),
      b.setCheck("second", true),
      a.setInventory("ore", 4),
      b.setPlan("craft", 3),
    ]);
    const reopened = await open();
    expect(reopened.getSnapshot().state).toMatchObject({
      checks: { first: true, second: true },
      inventory: { ore: 4 },
      plan: { craft: 3 },
    });
  });
  it("saves a first-craft batch atomically with its mode and undoes the whole change", async () => {
    const store = await open();
    await store.setPlan("craft", 4);
    await store.setPlanGoals({ craft: 1 }, "first-craft");
    expect((await open()).getSnapshot().state).toMatchObject({
      plan: { craft: 1 },
      planMode: "first-craft",
    });
    await store.undo();
    expect(store.getSnapshot().state).toMatchObject({
      plan: { craft: 4 },
      planMode: "selected",
    });
    await store.setPlanGoals({ craft: 1 }, "first-craft");
    await store.setPlan("craft", 2);
    expect(store.getSnapshot().state.planMode).toBe("selected");
  });
  it("does not let undo overwrite a newer edit from a different tab", async () => {
    const [a, b] = await Promise.all([open(), open()]);
    await a.setInventory("ore", 4);
    await b.setInventory("ore", 9);
    await a.undo();
    expect(a.getSnapshot().status).toBe("error");
    expect((await open()).getSnapshot().state.inventory.ore).toBe(9);
  });
  it("imports atomically and retains a recovery snapshot; invalid import preserves the saved state", async () => {
    const store = await open();
    await store.setCheck("first", true);
    await store.setInventory("ore", 7);
    const original = store.exportBackup();
    expect(() => store.importBackup("{")).toThrow();
    expect(store.exportBackup().includes('"ore": 7')).toBe(true);
    const replacement = makeBackup({
      ...emptyPlayerState(),
      checks: { second: true },
      inventory: { ore: 0 },
    });
    expect(store.previewImport(replacement)).toMatchObject({
      checked: 1,
      inventoryItems: 1,
    });
    await store.importBackup(replacement);
    expect(store.getSnapshot().state.checks).toEqual({ second: true });
    await store.restoreRecovery();
    expect(store.getSnapshot().state).toMatchObject({
      ...JSON.parse(original).player,
      updatedAt: expect.any(String),
    });
  });
  it("rolls back a failed write, reports failure truthfully and retries", async () => {
    const store = await open();
    await store.setInventory("ore", 3);
    const spy = vi
      .spyOn(IDBObjectStore.prototype, "put")
      .mockImplementationOnce(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
    await store.setInventory("ore", 8);
    expect(store.getSnapshot()).toMatchObject({
      status: "error",
      state: { inventory: { ore: 3 } },
    });
    expect(store.getSnapshot().error).toContain("Quota");
    spy.mockRestore();
    await store.retry();
    expect(store.getSnapshot()).toMatchObject({
      status: "saved",
      state: { inventory: { ore: 8 } },
    });
    expect((await open()).getSnapshot().state.inventory.ore).toBe(8);
  });
  it("checks and unchecks all rewards from one acquisition atomically, with one undo", async () => {
    const grouped = {
      ...data,
      entries: [
        { ...entry("first"), facts: { acquisitionId: "shared-reward" } },
        { ...entry("second"), facts: { acquisitionId: "shared-reward" } },
        entry("ore"),
      ],
    };
    const store = await open(grouped);
    await store.setCheck("first", true);
    expect(store.getSnapshot().state.checks).toEqual({
      first: true,
      second: true,
    });
    expect((await open(grouped)).getSnapshot().state.checks).toEqual({
      first: true,
      second: true,
    });
    await store.toggleCheck("second");
    expect(store.getSnapshot().state.checks).toEqual({
      first: false,
      second: false,
    });
    await store.undo();
    expect(store.getSnapshot().state.checks).toEqual({
      first: true,
      second: true,
    });
    await store.setCheck("ore", true);
    await store.setCheck("first", false);
    expect(store.getSnapshot().state.checks).toEqual({
      first: false,
      second: false,
      ore: true,
    });
  });
  it("normalizes partial imported acquisition history and rejects conflicting event records without changing state", async () => {
    const grouped = {
      ...data,
      entries: [
        { ...entry("first"), facts: { acquisitionId: "shared-reward" } },
        { ...entry("second"), facts: { acquisitionId: "shared-reward" } },
        entry("ore"),
      ],
    };
    const store = await open(grouped);
    await store.importBackup(
      makeBackup({ ...emptyPlayerState(), checks: { second: true } }),
    );
    expect(store.getSnapshot().state.checks).toEqual({
      first: true,
      second: true,
    });
    expect(() =>
      store.importBackup(
        makeBackup({
          ...emptyPlayerState(),
          checks: { first: true, second: false },
        }),
      ),
    ).toThrow("conflicting");
    expect((await open(grouped)).getSnapshot().state.checks).toEqual({
      first: true,
      second: true,
    });
    await store.importBackup(
      makeBackup({ ...emptyPlayerState(), checks: { first: false } }),
    );
    expect(store.getSnapshot().state.checks).toEqual({
      first: false,
      second: false,
    });
  });
});
