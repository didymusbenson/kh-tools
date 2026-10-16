import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import type { GameData } from "../src/domain/types";
import { materialDropLines, materialDetailEntry, materialSources } from "../src/domain/materialPresentation";
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

describe("standalone source-first material details", () => {
  const sources = (name: string) => materialSources(material(name), data.entries);
  it("retains rates, source-specific farming spots, and separately labeled worlds", () => {
    expect(sources("Blaze Shard")[0]).toMatchObject({rule:"Red Nocturne: 6%.", location:"Wonderland · Bizarre Room"});
    expect(sources("Blaze Shard")[0].worlds).toBe("Agrabah, End of the World, Hollow Bastion, Monstro, Traverse Town, Wonderland");
    expect(sources("Blaze Gem").map(s=>s.rule)).toEqual(["Bandit: 4%", "Fat Bandit: 8%."]);
  });
  it("keeps complete conditional rewards beside their source", () => {
    for (const entry of data.entries.filter(e=>e.category==='material' && e.facts?.['reward rule'])) {
      expect(materialSources(entry,data.entries)[0].rule).toContain(String(entry.facts!['reward rule']));
    }
    expect(sources("Stormy Stone")[0].rule).toContain("seventh qualifying Neoshadow, not each enemy");
  });
  it("does not assign Agrabah to Barrel Spider or repeatable Linked Worlds to the Arch Behemoth reward", () => {
    const rows=sources("Mythril Shard");
    expect(rows[1].location).toBe("Monstro / Neverland");
    expect(rows[2].location).toBe("End of the World · Final Dimension");
    expect(rows[2].condition).toContain("unaffected by Lucky Strike");
    expect(rows[2].condition).toContain("do not treat Linked Worlds as a permanent farm");
  });
  it("separates Battleship component rewards and keeps non-enemy sources intact", () => {
    expect(sources("Power Gem").map(s=>s.rule)).toEqual(["Pirate: 4%.","Air Pirate: 4%.","Battleship: body 4%; destroyed parts 8%."]);
    expect(sources("Orichalcum")[0].rule).toContain("5,000 munny after rescuing Kairi");
    expect(sources("Mystery Goo")[0].rule).toContain("not an ordinary unconditional kill drop");
  });
});
