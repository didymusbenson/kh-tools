import type { GameData, GuideEntry } from "./types";

export const cataloguePages: { id: string; title: string; categories: string[] }[] = [
  { id: "bestiary", title: "Bestiary", categories: ["enemy"] },
  { id: "treasures", title: "Treasures", categories: ["treasure", "postcard"] },
  { id: "trinities", title: "Trinities", categories: ["trinity"] },
  { id: "dalmatians", title: "Dalmatians", categories: ["dalmatian"] },
  { id: "magic-upgrades", title: "Magic Upgrades", categories: ["magic"] },
  { id: "torn-pages", title: "Torn Pages", categories: ["torn-page"] },
  { id: "ansem-reports", title: "Ansem Reports", categories: ["report"] },
  { id: "challenges", title: "Challenges and Minigames", categories: ["cup", "boss", "minigame", "gummi"] },
  { id: "achievements", title: "Steam Achievements", categories: ["achievement"] },
];

/** Open the entry inside its canonical journal section. */
export function entryHref(entry: GuideEntry): string {
  const base = `#/${entry.game}`;
  if (entry.category === "guide" && entry.world && entry.id.startsWith("kh1fm-guide-") && entry.id.endsWith("-collectibles")) return `${base}/worlds/${encodeURIComponent(entry.world)}`;
  const query = `?entry=${encodeURIComponent(entry.id)}`;
  if (entry.category === "recipe") return `${base}/synthesis/recipes${query}`;
  if (entry.category === "material") return `${base}/synthesis/materials${query}`;
  const catalogue = cataloguePages.find((page) => page.categories.includes(entry.category));
  if (catalogue) return `${base}/${catalogue.id}${query}`;
  return `${base}/reference${query}`;
}

export function resolveEntryHref(data: GameData, id: string): string {
  const entry = data.entries.find((candidate) => candidate.id === id);
  return entry ? entryHref(entry) : `#/${data.game}/reference?entry=${encodeURIComponent(id)}`;
}
