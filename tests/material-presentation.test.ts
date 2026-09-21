import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import type { GameData } from "../src/domain/types";
import { materialDropLines, materialDetailEntry } from "../src/domain/materialPresentation";
const data = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8")) as GameData;
const material = (name: string) => data.entries.find(e => e.category === "material" && e.name === name)!;
describe("conditional material presentation", () => {
  it("shortens a conditional source without losing its exact reward rule", () => {
    const entry = material("Fury Stone");
    expect(materialDropLines(entry)).toEqual(["Gigas Shadow: Conditional"]);
    expect(materialDetailEntry(entry).facts?.["reward rule"]).toBe(entry.facts?.["reward rule"]);
  });
  it("keeps mushroom conditions in the expanded description", () => {
    const entry = material("Mystery Goo");
    expect(materialDropLines(entry)).toEqual(["Conditional"]);
    expect(materialDetailEntry(entry).summary).toBe(entry.summary);
  });
  it("preserves percentage-based drop conditions and ordinary rates", () => {
    expect(materialDropLines(material("Stormy Stone"))[0]).toContain("35% on the seventh");
    expect(materialDropLines(material("Blaze Shard"))).toEqual(["Red Nocturne: 6%."]);
  });
});
