import type { GuideEntry } from "./types";

const rank: Record<string, number> = { Shard: 0, Gem: 1, Crystal: 2, Stone: 3 };
const genericAbilityIds = new Set([
  "kh1fm-ability-lucky-strike",
  "kh1fm-ability-encounter-plus",
]);
// Exact shared authoring boilerplate: never strip arbitrary sentences mentioning
// an ability, because item-specific exceptions (e.g. Arch Behemoth) matter.
const genericInstructions = [
  "For ordinary enemies, leave two rooms and return to reset; Encounter Plus reduces that to one room.",
  "Equip Lucky Strike on active party members: three copies give 2.5 times an ordinary base drop rate.",
  "Special encounters are not guaranteed on each reset.",
  "To retry a rare encounter, move two areas away and return with Encounter Plus; without it, leaving and revisiting the world is the reliable reset.",
  "A reset does not guarantee a spawn.",
  "Clear and reset the rare encounter using two area changes with Encounter Plus.",
];

/** Presentation grouping; canonical material names and IDs stay unchanged. */
export function materialFamily(entry: GuideEntry): string {
  const stem = entry.name.replace(/\s+(Shard|Gem|Crystal|Stone)$/, "");
  return stem === "Blazing" ? "Blaze" : stem;
}

export function compareMaterials(a: GuideEntry, b: GuideEntry): number {
  const family = materialFamily(a).localeCompare(materialFamily(b));
  if (family) return family;
  const aRank = rank[a.name.split(" ").at(-1) || ""] ?? 4;
  const bRank = rank[b.name.split(" ").at(-1) || ""] ?? 4;
  return aRank - bRank || a.name.localeCompare(b.name) || a.id.localeCompare(b.id);
}

function hasConditionalLabel(entry: GuideEntry): boolean {
  const rule = String(entry.facts?.["reward rule"] || entry.facts?.["drop rules"] || entry.summary);
  return !rule.includes("%") && (typeof entry.facts?.["reward rule"] === "string" || /conditional/i.test(rule));
}

/** Compact source rules without treating conditional rewards as ordinary drops. */
export function materialDropLines(entry: GuideEntry): string[] {
  if (entry.id === "kh1fm-material-orichalcum")
    return ["Buy: 5,000 munny after rescuing Kairi."];
  if (entry.id === "kh1fm-material-dark-matter")
    return ["Synthesize: set V."];
  if (entry.id === "kh1fm-material-mythril")
    return ["Synthesize: set III; Bambi alternative in details."];
  if (entry.id === "kh1fm-material-mythril-shard")
    return [
      "Pot Spider: 1%.",
      "Barrel Spider: 1%.",
    ];
  const source = entry.facts?.["source enemy"];
  const reward = entry.facts?.["reward rule"];
  if (typeof source === "string" && typeof reward === "string")
    return [`${source}: ${hasConditionalLabel(entry) ? "Conditional" : reward}`];
  const rules = typeof entry.facts?.["drop rules"] === "string"
    ? entry.facts["drop rules"] as string
    : entry.summary;
  if (!rules) return [];
  if (hasConditionalLabel(entry)) return ["Conditional"];
  // Split only an entire verified simple enemy/rate list. A conditional clause,
  // component-specific exception, or other prose keeps the whole rule intact.
  if (/^[^:;\n]+: \d+(?:\.\d+)?%(?:; [^:;\n]+: \d+(?:\.\d+)?%)*\.?$/.test(rules))
    return rules.replace(/\.$/, "").split("; ").map(line => `${line}.`);
  return [rules];
}

/** A nonmutating view model for expanded rows whose compact sources stay shown. */
export function materialDetailEntry(entry: GuideEntry): GuideEntry {
  if (entry.category !== "material") return entry;
  let instructions = entry.instructions;
  for (const sentence of genericInstructions) instructions = instructions.replaceAll(sentence, "");
  const facts = { ...entry.facts };
  delete facts["drop rules"];
  delete facts["source enemy"];
  if (!hasConditionalLabel(entry)) delete facts["reward rule"];
  return {
    ...entry,
    summary: hasConditionalLabel(entry) && !entry.facts?.["reward rule"] ? entry.summary : materialDropLines(entry).length ? "" : entry.summary,
    instructions: instructions.replace(/\s{2,}/g, " ").trim(),
    facts,
    relatedIds: entry.relatedIds.filter(id => !genericAbilityIds.has(id)),
  };
}

/** Source-specific exceptions to the entry's suggested farming location. */
export function materialDropLocation(entry: GuideEntry, line: string): string {
  if (entry.id === "kh1fm-material-mythril-shard" && line.startsWith("Barrel Spider:")) return "Monstro / Neverland";
  return [entry.world, entry.area].filter(Boolean).join(" · ");
}
