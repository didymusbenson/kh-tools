import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createPlayerStore } from "../src/state/playerStore";
import type { PlayerStore } from "../src/state/playerStore";
import { emptyPlayerState, makeBackup, validatePlayerState } from "../src/domain/player";
import type { GameData, GuideEntry, PlayerState } from "../src/domain/types";

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
async function seedLegacyProfile(state: PlayerState, key = "kh1fm-current") {
  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("ars-arcanum-player", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("profiles");
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("profiles", "readwrite");
      transaction.objectStore("profiles").put({ revision: 1, state }, key);
      transaction.oncomplete = () => { db.close(); resolve(); };
      transaction.onabort = () => { db.close(); reject(transaction.error); };
    };
  });
}
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
  it("migrates legacy recipe plans only when guide data is available, without subtracting stock or expanding components", async () => {
    const content: GameData = { ...data, recipes: [
      data.recipes[0],
      { ...data.recipes[0], id: "other", ingredients: [{ itemId: "ore", name: "Ore", quantity: 2 }, { itemId: "product", name: "Product", quantity: 1 }] },
    ] };
    const legacy: PlayerState = {
      ...emptyPlayerState(), farmPlan: undefined,
      plan: { craft: 2, other: 3 }, inventory: { ore: 99, product: 9 },
    };
    expect(validatePlayerState(legacy).farmPlan).toBeUndefined();
    await seedLegacyProfile(legacy);
    const store = await open(content);
    expect(store.getSnapshot().state.farmPlan).toEqual({ ore: 12, product: 3 });
    expect(store.getSnapshot().state.inventory).toEqual(legacy.inventory);
    expect(store.getSnapshot().state.plan).toEqual(legacy.plan);
    await store.setFarmTarget("ore", 0);
    await store.setFarmTarget("product", 0);
    expect((await open(content)).getSnapshot().state.farmPlan).toEqual({});
    expect((await open(content)).getSnapshot().state.plan).toEqual(legacy.plan);
  });
  it("imports old recipe goals once and preserves explicit farming targets through export, recovery and undo", async () => {
    const store = await open();
    await store.importBackup(makeBackup({ ...emptyPlayerState(), farmPlan: undefined, plan: { craft: 2 }, inventory: { ore: 50 } }));
    expect(store.getSnapshot().state.farmPlan).toEqual({ ore: 6 });
    const exported = store.exportBackup();
    expect(store.previewImport(exported)).toMatchObject({ farmingTargets: 1, plannedRecipes: 1 });
    expect(JSON.parse(exported).player.farmPlan).toEqual({ ore: 6 });
    await store.importBackup(makeBackup({ ...emptyPlayerState(), farmPlan: {}, plan: { craft: 4 } }));
    expect(store.getSnapshot().state.farmPlan).toEqual({});
    await store.restoreRecovery();
    expect(store.getSnapshot().state.farmPlan).toEqual({ ore: 6 });
    await store.undo();
    expect(store.getSnapshot().state.farmPlan).toEqual({});
    await store.importBackup(exported);
    expect((await open()).getSnapshot().state.farmPlan).toEqual({ ore: 6 });
  });
  it("adds direct recipe materials atomically and safely combines rapid and simultaneous-tab additions", async () => {
    const content: GameData = { ...data, recipes: [
      data.recipes[0],
      { ...data.recipes[0], id: "other", ingredients: [{ itemId: "ore", name: "Ore", quantity: 2 }, { itemId: "product", name: "Product", quantity: 1 }] },
    ] };
    const [a, b] = await Promise.all([open(content), open(content)]);
    await a.setInventory("ore", 20);
    await Promise.all([a.addRecipeToFarmPlan("craft"), a.addRecipeToFarmPlan("craft"), b.addRecipeToFarmPlan("other")]);
    const reopened = await open(content);
    expect(reopened.getSnapshot().state.farmPlan).toEqual({ ore: 8, product: 1 });
    expect(reopened.getSnapshot().state.inventory).toEqual({ ore: 20 });
    expect(reopened.getSnapshot().state.plan).toEqual({});
    expect(reopened.getSnapshot().state.checks).toEqual({});
    await reopened.addRecipeToFarmPlan("other");
    expect(reopened.getSnapshot().state.farmPlan).toEqual({ ore: 10, product: 2 });
    await reopened.undo();
    expect(reopened.getSnapshot().state.farmPlan).toEqual({ ore: 8, product: 1 });
  });
  it("adds absent materials once, preserves existing targets, and supports removing and undoing a target", async () => {
    const [a, b] = await Promise.all([open(), open()]);
    await Promise.all([a.addMaterialToFarmPlan("ore"), a.addMaterialToFarmPlan("ore"), b.addMaterialToFarmPlan("ore")]);
    expect((await open()).getSnapshot().state.farmPlan).toEqual({ ore: 1 });
    await a.setFarmTarget("ore", 12);
    await b.addMaterialToFarmPlan("ore");
    expect((await open()).getSnapshot().state.farmPlan).toEqual({ ore: 12 });
    await b.setFarmTarget("ore", 0);
    expect(b.getSnapshot().state.farmPlan).toEqual({});
    await b.undo();
    expect(b.getSnapshot().state.farmPlan).toEqual({ ore: 12 });
  });
  it("does not let farming undo overwrite a later target edit from another tab", async () => {
    const [a, b] = await Promise.all([open(), open()]);
    await a.addRecipeToFarmPlan("craft");
    await b.setFarmTarget("ore", 9);
    await a.undo();
    expect(a.getSnapshot().status).toBe("error");
    expect((await open()).getSnapshot().state.farmPlan).toEqual({ ore: 9 });
  });
  it("rejects invalid and overflowing farming changes without partially applying ingredients", async () => {
    const content: GameData = { ...data, recipes: [{ ...data.recipes[0], ingredients: [
      { itemId: "product", name: "Product", quantity: 1 },
      { itemId: "ore", name: "Ore", quantity: 3 },
    ] }] };
    const store = await open(content);
    await store.setFarmTarget("ore", 999998);
    await store.addRecipeToFarmPlan("craft");
    expect(store.getSnapshot().status).toBe("error");
    expect(store.getSnapshot().state.farmPlan).toEqual({ ore: 999998 });
    expect((await open(content)).getSnapshot().state.farmPlan).toEqual({ ore: 999998 });
    expect(() => store.importBackup(makeBackup({ ...emptyPlayerState(), farmPlan: { unknown: 2 } }))).toThrow("Unknown farmPlan");
    expect(() => store.importBackup(makeBackup({ ...emptyPlayerState(), farmPlan: { ore: -1 } }))).toThrow("Quantity");
    expect(() => store.importBackup(makeBackup({ ...emptyPlayerState(), farmPlan: undefined, plan: { craft: 999999 } }))).toThrow("exceeds");
    expect(store.getSnapshot().state.farmPlan).toEqual({ ore: 999998 });
  });
  it("restores checks, stock, goals and route after reopening; legacy toggles cannot disable tracking", async () => {
    const store = await open();
    expect(store.getSnapshot().state.inventoryEnabled).toBe(true);
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
      inventoryEnabled: true,
      plan: { craft: 2 },
      lastRoute: "#/kh1fm/synthesis?view=remaining",
    });
    expect(reopened.getSnapshot().status).toBe("saved");
  });
  it("normalizes saved disabled inventory profiles while preserving stock, checks and craft plans", async () => {
    const legacy = {
      ...emptyPlayerState(), inventoryEnabled: false,
      checks: { first: true }, inventory: { ore: 8, product: 0 },
      plan: { craft: 2 }, planMode: "first-craft" as const,
      lastRoute: "#/kh1fm/synthesis/materials",
    };
    await seedLegacyProfile(legacy);
    const store = await open();
    expect(store.getSnapshot().state).toEqual({ ...legacy, inventoryEnabled: true });
    expect(JSON.parse(store.exportBackup()).player.inventoryEnabled).toBe(true);
    await store.setCheck("second", true);
    expect((await open()).getSnapshot().state).toMatchObject({
      inventoryEnabled: true, inventory: legacy.inventory, plan: legacy.plan,
      planMode: "first-craft", checks: { first: true, second: true },
    });
  });
  it("normalizes disabled imports and recovery snapshots without erasing quantities or treating unknown stock as zero", async () => {
    const store = await open();
    const legacy = { ...emptyPlayerState(), inventoryEnabled: false, inventory: { ore: 0 }, plan: { craft: 3 } };
    await store.importBackup(makeBackup(legacy));
    expect(store.getSnapshot().state).toMatchObject({ inventoryEnabled: true, inventory: { ore: 0 }, plan: { craft: 3 } });
    expect(store.getSnapshot().state.inventory.product).toBeUndefined();
    await seedLegacyProfile({ ...legacy, inventory: { ore: 9 }, plan: { craft: 2 } }, "kh1fm-recovery");
    await store.restoreRecovery();
    expect(store.getSnapshot().state).toMatchObject({ inventoryEnabled: true, inventory: { ore: 9 }, plan: { craft: 2 } });
    await store.undo();
    expect(store.getSnapshot().state).toMatchObject({ inventoryEnabled: true, inventory: { ore: 0 }, plan: { craft: 3 } });
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
