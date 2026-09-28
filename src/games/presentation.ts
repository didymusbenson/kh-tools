import type { CollectionEntry } from "./types";
const ranks = [
  "Shard",
  "Stone",
  "Gem",
  "Crystal",
  "Figment",
  "Fancy",
  "Fantasy",
];
export function materialFamily(entry: CollectionEntry): string {
  const tokens = entry.name.split(" ");
  if (ranks.includes(tokens.at(-1) || "")) return tokens.slice(0, -1).join(" ");
  if (entry.id.includes("command")) return "Commands";
  return "Other materials";
}
export function sortMaterials(a: CollectionEntry, b: CollectionEntry): number {
  return (
    materialFamily(a).localeCompare(materialFamily(b)) ||
    ranks.indexOf(a.name.split(" ").at(-1) || "") -
      ranks.indexOf(b.name.split(" ").at(-1) || "") ||
    a.name.localeCompare(b.name) ||
    (a.character || "").localeCompare(b.character || "")
  );
}
export function inWorld(entry: CollectionEntry, world: string): boolean {
  return (
    world === "all" ||
    entry.world === world ||
    !!entry.drops?.some((drop) =>
      drop.location.toLowerCase().includes(world.toLowerCase()),
    )
  );
}
