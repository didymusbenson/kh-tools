import { describe, it, expect } from "vitest";
import "fake-indexeddb/auto";
import kh3 from "../src/games/kh3";
import kh02 from "../src/games/kh02";
import kh2 from "../src/games/kh2fm";
import bbs from "../src/games/bbsfm";
import ddd from "../src/games/dddhd";
import {
  addTargets,
  emptyProfile,
  parseProfile,
  mutateProfile,
  loadProfile,
  loadRecovery,
} from "../src/games/profile";
import { inWorld, sortMaterials } from "../src/games/presentation";

describe("multi-game catalogs and progress", () => {
  for (const guide of [kh2, bbs, ddd, kh02, kh3])
    it(`${guide.id} has unique linked content and valid recipe inputs`, () => {
      expect(guide.entries.length).toBeGreaterThan(100);
      const ids = new Set(guide.entries.map((e) => e.id));
      expect(ids.size).toBe(guide.entries.length);
      const recipeIds = new Set((guide.recipes || []).map((r) => r.id));
      expect(recipeIds.size).toBe(guide.recipes?.length || 0);
      for (const r of guide.recipes || [])
        for (const ingredient of r.ingredients) {
          expect(ids.has(ingredient.id), `${r.id}: ${ingredient.id}`).toBe(
            true,
          );
          expect(ingredient.quantity).toBeGreaterThan(0);
        }
    });
  it("keeps unknown stock distinct and accumulates direct recipe targets", () => {
    const r = kh2.recipes![0],
      p = addTargets(
        addTargets(emptyProfile(kh2.id), r.ingredients),
        r.ingredients,
      );
    const sums: Record<string, number> = {};
    for (const i of r.ingredients) sums[i.id] = (sums[i.id] || 0) + i.quantity;
    for (const [id, n] of Object.entries(sums)) {
      expect(p.targets[id]).toBe(n * 2);
      expect(p.owned[id]).toBeUndefined();
    }
    expect(() => parseProfile(p, bbs)).toThrow("this game");
    expect(() =>
      parseProfile({ ...p, owned: { [r.ingredients[0].id]: -1 } }, kh2),
    ).toThrow();
  });
  it("atomically merges concurrent additions and preserves recovery across imports", async () => {
    const ingredient = kh2.recipes![0].ingredients[0];
    await Promise.all(
      Array.from({ length: 4 }, () =>
        mutateProfile(kh2, (p) => addTargets(p, [ingredient])),
      ),
    );
    expect((await loadProfile(kh2)).targets[ingredient.id]).toBe(
      4 * ingredient.quantity,
    );
    await mutateProfile(kh2, () => emptyProfile(kh2.id), true);
    expect((await loadRecovery(kh2)).targets[ingredient.id]).toBe(
      4 * ingredient.quantity,
    );
    expect((await loadProfile(bbs)).targets).toEqual({});
  });
  it("filters sources by world and orders families by rank", () => {
    const e = {
      id: "a",
      category: "materials",
      name: "Blaze Gem",
      summary: "",
      drops: [{ enemy: "Test", rate: "6%", location: "Wonderland · Room" }],
    };
    expect(inWorld(e, "Wonderland")).toBe(true);
    expect(sortMaterials({ ...e, name: "Blaze Shard" }, e)).toBeLessThan(0);
  });
});
