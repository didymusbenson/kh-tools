import type { GameData, GuideEntry } from "./types";

const challengeCategories = new Set(["cup", "boss", "minigame", "gummi", "achievement"]);

/** Open the entry inside its canonical journal section. */
export function entryHref(entry: GuideEntry): string {
  const base = `#/${entry.game}`;
  const query = `?entry=${encodeURIComponent(entry.id)}`;
  if (entry.collectible && entry.world)
    return `${base}/worlds/${encodeURIComponent(entry.world)}${query}`;
  if (entry.category === "recipe") return `${base}/synthesis/recipes${query}`;
  if (entry.category === "material") return `${base}/synthesis/materials${query}`;
  if (challengeCategories.has(entry.category)) return `${base}/challenges${query}`;
  return `${base}/reference${query}`;
}

export function resolveEntryHref(data: GameData, id: string): string {
  const entry = data.entries.find((candidate) => candidate.id === id);
  return entry ? entryHref(entry) : `#/${data.game}/reference?entry=${encodeURIComponent(id)}`;
}
