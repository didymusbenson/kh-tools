import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import type { GuideEntry, Recipe } from "../src/domain/types";
const entries: GuideEntry[] = ["collectibles", "reference"].flatMap((name) =>
  JSON.parse(readFileSync(`data/kh1fm/${name}.json`, "utf8")),
);
const recipes: Recipe[] = JSON.parse(
  readFileSync("data/kh1fm/recipes.json", "utf8"),
);

describe("KH1 Final Mix source reconciliation", () => {
  it("contains the edition-specific finite collection sets", () => {
    for (const [category, count] of Object.entries({
      dalmatian: 33,
      trinity: 46,
      postcard: 10,
      "torn-page": 5,
      report: 13,
      magic: 21,
      summon: 6,
      weapon: 48,
    })) {
      expect(
        entries.filter((e) => e.category === category),
        category,
      ).toHaveLength(count);
    }
    expect(
      entries
        .filter((e) => e.category === "dalmatian")
        .reduce((sum, e) => sum + (e.count ?? 1), 0),
    ).toBe(99);
    expect(recipes).toHaveLength(33);
    expect(new Set(entries.map((e) => e.id)).size).toBe(entries.length);
  });
  it("uses independently reconciled recipe quantities, not legacy summary totals", () => {
    const quantities = (name: string) =>
      Object.fromEntries(
        recipes
          .find((r) => r.name === name)!
          .ingredients.map((i) => [i.name, i.quantity]),
      );
    expect(quantities("Energy Bangle")).toEqual({
      "Spirit Shard": 2,
      "Bright Shard": 1,
    });
    expect(quantities("Three Stars")).toEqual({
      "Power Gem": 5,
      "Mystery Goo": 3,
      "Shiny Crystal": 1,
    });
    expect(quantities("Ultima Weapon")).toEqual({
      "Thunder Gem": 5,
      "Mystery Goo": 5,
      "Serenity Power": 3,
      "Stormy Stone": 3,
      "Dark Matter": 3,
    });
  });
  it("keeps authored instructions and honest evidence on every shipped fact", () => {
    for (const entry of entries) {
      expect(entry.instructions.trim(), entry.id).not.toBe("");
      expect(entry.sources.length, entry.id).toBeGreaterThan(0);
      if (entry.verification === "unresolved")
        expect(entry.uncertainty?.trim(), entry.id).toBeTruthy();
      for (const id of entry.relatedIds)
        expect(
          entries.some((e) => e.id === id),
          `${entry.id} → ${id}`,
        ).toBe(true);
    }
  });
});
