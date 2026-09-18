import { describe, expect, it } from "vitest";
import { calculatePlan, recipeRequirements } from "../src/domain/planner";
import { collectibleProgress } from "../src/domain/progress";
import {
  emptyPlayerState,
  makeBackup,
  parseBackup,
  validatePlayerState,
} from "../src/domain/player";
import type { GameData, GuideEntry, Recipe } from "../src/domain/types";

const recipe = (
  id: string,
  productId: string,
  ingredients: [string, number][],
  outputQuantity = 1,
): Recipe => ({
  id,
  productId,
  entryId: id,
  name: id,
  set: 1,
  unlock: "Reference only",
  verification: "source-backed",
  outputQuantity,
  ingredients: ingredients.map(([itemId, quantity]) => ({
    itemId,
    name: itemId,
    quantity,
  })),
});
const entry = (id: string, extra: Partial<GuideEntry> = {}): GuideEntry => ({
  id,
  game: "kh1fm",
  category: "dalmatian",
  name: id,
  world: "Wonderland",
  summary: "",
  instructions: "",
  tags: [],
  relatedIds: [],
  sources: [],
  verification: "source-backed",
  checkable: true,
  collectible: true,
  ...extra,
});
describe("shared synthesis planning", () => {
  it("allocates five owned shards once across two five-shard recipes", () => {
    const result = calculatePlan(
      [
        recipe("a", "a-product", [["shard", 5]]),
        recipe("b", "b-product", [["shard", 5]]),
      ],
      { b: 1, a: 1 },
      { shard: 5 },
      { inventoryEnabled: true },
    );
    expect(result.materials).toEqual([
      {
        itemId: "shard",
        name: "shard",
        required: 10,
        owned: 5,
        used: 5,
        missing: 5,
        crafted: 0,
      },
    ]);
    expect(result.valid).toBe(true);
  });
  it("distinguishes unknown, zero, surplus and disabled inventory", () => {
    const target = recipe("a", "a-product", [["shard", 5]]);
    expect(recipeRequirements(target, 1, {}, true)[0]).toMatchObject({
      owned: null,
      missing: null,
    });
    expect(recipeRequirements(target, 1, { shard: 0 }, true)[0]).toMatchObject({
      owned: 0,
      missing: 5,
    });
    expect(recipeRequirements(target, 1, { shard: 8 }, true)[0]).toMatchObject({
      owned: 8,
      missing: 0,
    });
    expect(recipeRequirements(target, 1, { shard: 8 }, false)[0]).toMatchObject(
      { owned: null, used: 0, missing: 5 },
    );
  });
  it("expands only the craftable shortfall and reuses output surplus", () => {
    const recipes = [
      recipe("a", "a-product", [["gem", 4]]),
      recipe("b", "b-product", [["gem", 1]]),
      recipe("gem-route", "gem", [["ore", 3]], 2),
    ];
    const result = calculatePlan(
      recipes,
      { a: 1, b: 1 },
      { gem: 2, ore: 1 },
      { inventoryEnabled: true },
    );
    expect(result.materials.find((m) => m.itemId === "gem")).toMatchObject({
      required: 5,
      owned: 2,
      used: 2,
      crafted: 3,
      missing: 0,
    });
    expect(result.materials.find((m) => m.itemId === "ore")).toMatchObject({
      required: 6,
      used: 1,
      missing: 5,
    });
    expect(
      result.crafts.find((c) => c.recipeId === "gem-route")?.quantity,
    ).toBe(2);
  });
  it("does not craft an additional catalog copy when a prerequisite already satisfies that goal", () => {
    const recipes = [
      recipe("a", "a-product", [["gem", 1]]),
      recipe("z-gem", "gem", [["ore", 3]]),
    ];
    const result = calculatePlan(
      recipes,
      { a: 1, "z-gem": 1 },
      {},
      { inventoryEnabled: false, mode: "first-craft" },
    );
    expect(result.crafts.find((c) => c.recipeId === "z-gem")).toMatchObject({
      quantity: 1,
      planned: 1,
      prerequisite: 0,
    });
    expect(result.materials.find((m) => m.itemId === "ore")?.required).toBe(3);
  });
  it("retains selected output goals separately from products consumed as prerequisites", () => {
    const recipes = [
      recipe("a", "a-product", [["gem", 1]]),
      recipe("z-gem", "gem", [["ore", 3]]),
    ];
    const result = calculatePlan(
      recipes,
      { a: 1, "z-gem": 1 },
      {},
      { inventoryEnabled: false },
    );
    expect(result.crafts.find((c) => c.recipeId === "z-gem")).toMatchObject({
      quantity: 2,
      planned: 1,
      prerequisite: 1,
    });
    expect(result.materials.find((m) => m.itemId === "ore")?.required).toBe(6);
    // Reversing catalog order must not let a goal output get consumed by another goal.
    const reversed = [
      recipe("z", "z-product", [["gem", 1]]),
      recipe("a-gem", "gem", [["ore", 3]]),
    ];
    const reverseResult = calculatePlan(
      reversed,
      { z: 1, "a-gem": 1 },
      {},
      { inventoryEnabled: false },
    );
    expect(
      reverseResult.crafts.find((c) => c.recipeId === "a-gem")?.quantity,
    ).toBe(2);
    expect(
      reverseResult.materials.find((m) => m.itemId === "ore")?.required,
    ).toBe(6);
  });
  it("requires a choice for alternatives and expands just the selected route", () => {
    const recipes = [
      recipe("a", "a-product", [["gem", 1]]),
      recipe("gem-one", "gem", [["ore", 3]]),
      recipe("gem-two", "gem", [["dust", 2]]),
    ];
    const ambiguous = calculatePlan(
      recipes,
      { a: 1 },
      {},
      { inventoryEnabled: false },
    );
    expect(ambiguous.valid).toBe(false);
    expect(ambiguous.issues[0].code).toBe("choose-route");
    const selected = calculatePlan(
      recipes,
      { a: 1 },
      {},
      { inventoryEnabled: false, routeChoices: { gem: "gem-two" } },
    );
    expect(selected.materials.find((m) => m.itemId === "dust")?.required).toBe(
      2,
    );
    expect(selected.materials.some((m) => m.itemId === "ore")).toBe(false);
    const gathered = calculatePlan(
      recipes,
      { a: 1 },
      {},
      { inventoryEnabled: false, routeChoices: { gem: "gather" } },
    );
    expect(gathered.materials).toHaveLength(1);
    expect(gathered.materials[0].missing).toBe(1);
  });
  it("detects cycles, unresolved evidence and invalid goals without an infinite expansion", () => {
    const cyclic = calculatePlan(
      [
        recipe("a", "a-product", [["b-product", 1]]),
        recipe("b", "b-product", [["a-product", 1]]),
      ],
      { a: 1 },
      {},
      { inventoryEnabled: false },
    );
    expect(cyclic.valid).toBe(false);
    expect(cyclic.issues.some((i) => i.code === "cycle")).toBe(true);
    const uncertain = calculatePlan(
      [
        {
          ...recipe("a", "a-product", [["ore", 1]]),
          verification: "unresolved",
        },
      ],
      { a: 1 },
      {},
      { inventoryEnabled: false },
    );
    expect(uncertain.valid).toBe(false);
    const invalid = calculatePlan(
      [recipe("a", "a-product", [["ore", 1]])],
      { a: -1 },
      {},
      { inventoryEnabled: false },
    );
    expect(invalid.issues[0].code).toBe("invalid-goal");
    expect(() =>
      recipeRequirements(
        recipe("a", "a-product", [["ore", 1]]),
        1.5,
        {},
        false,
      ),
    ).toThrow();
  });
  it("keeps provisional unknown-stock expansion explicit and does not mutate stock", () => {
    const stock = { ore: 2 };
    const result = calculatePlan(
      [
        recipe("a", "a-product", [["gem", 1]]),
        recipe("gem-route", "gem", [["ore", 3]]),
      ],
      { a: 1 },
      stock,
      { inventoryEnabled: true },
    );
    expect(result.provisional).toBe(true);
    expect(
      result.materials.find((m) => m.itemId === "gem")?.missing,
    ).toBeNull();
    expect(stock).toEqual({ ore: 2 });
  });
});
describe("collection progress", () => {
  it("counts grouped puppies as one action and deduplicates the same acquisition event", () => {
    const group = entry("puppies", { count: 3 });
    const a = entry("reward", {
      count: 3,
      facts: { acquisitionId: "puppies" },
    });
    const narrative = entry("story", { collectible: false });
    expect(
      collectibleProgress([group, group, a, narrative], { puppies: true }),
    ).toMatchObject({
      completed: 1,
      total: 1,
      recoveredUnits: 3,
      totalUnits: 3,
      percentage: 100,
    });
  });
  it("never certifies an incomplete collection inventory", () => {
    expect(
      collectibleProgress(
        [entry("one")],
        { one: true },
        { completeCoverage: false },
      ),
    ).toMatchObject({
      completed: 1,
      total: 1,
      percentage: null,
      verifiedComplete: false,
    });
  });
});
describe("backup boundaries", () => {
  const data: GameData = {
    schemaVersion: 1,
    game: "kh1fm",
    version: "test",
    entries: [
      entry("one"),
      entry("ore", { checkable: false, collectible: false }),
    ],
    recipes: [recipe("craft", "product", [["ore", 1]])],
    coverage: [],
  };
  it("round trips explicit unchecked and zero stock independently of crafted history", () => {
    const state = {
      ...emptyPlayerState(),
      checks: { one: false },
      inventory: { ore: 0 },
      inventoryEnabled: true,
      plan: { craft: 2 },
    };
    expect(parseBackup(makeBackup(state), data)).toEqual(state);
  });
  it("rejects unknown IDs, negative/fractional counters, malformed and unsupported schemas", () => {
    for (const quantity of [-1, 1.5, Infinity, 1_000_000])
      expect(() =>
        validatePlayerState(
          { ...emptyPlayerState(), inventory: { ore: quantity } },
          data,
        ),
      ).toThrow();
    expect(() =>
      parseBackup(
        makeBackup({ ...emptyPlayerState(), checks: { nonexistent: true } }),
        data,
      ),
    ).toThrow("Unknown");
    expect(() => parseBackup("{", data)).toThrow("JSON");
    expect(() =>
      validatePlayerState({ ...emptyPlayerState(), schemaVersion: 2 }),
    ).toThrow("supported");
  });
  it("retains orphaned local IDs during content updates for later recovery", () => {
    const state = {
      ...emptyPlayerState(),
      checks: { retired: false },
      inventory: { old: 8 },
    };
    expect(validatePlayerState(state)).toEqual(state);
  });
});
