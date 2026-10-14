import { kh1GummiPage } from './kh1Gummi';
import { kh1ActivitySection } from './kh1Activities';
import type { GameData, GuideEntry } from "./types";

export const cataloguePages: { id: string; title: string; categories: string[] }[] = [
  { id: "bestiary", title: "Bestiary", categories: ["enemy"] },
  { id: "treasures", title: "Treasures", categories: ["treasure", "postcard"] },
  { id: "trinities", title: "Trinities", categories: ["trinity"] },
  { id: "dalmatians", title: "Dalmatians", categories: ["dalmatian"] },
  { id: "magic-upgrades", title: "Magic Upgrades", categories: ["magic"] },
  { id: "torn-pages", title: "Torn Pages", categories: ["torn-page"] },
  { id: "ansem-reports", title: "Ansem Reports", categories: ["report"] },
  { id: "coliseum", title: "Coliseum", categories: ["cup"] },
  { id: "gummi", title: "Gummi Ship", categories: ["gummi"] },
  { id: "challenges", title: "Challenges", categories: ["boss", "minigame"] },
  { id: "achievements", title: "Steam Achievements", categories: ["achievement"] },
];

/** Open the entry inside its canonical journal section. */
export function entryHref(entry: GuideEntry): string {
  const base = `#/${entry.game}`;
  if (entry.category === "guide" && entry.world && entry.id.startsWith("kh1fm-guide-") && entry.id.endsWith("-collectibles")) return `${base}/worlds/${encodeURIComponent(entry.world)}`;
  const query = `?entry=${encodeURIComponent(entry.id)}`;
  if (entry.category === "recipe") return `${base}/synthesis/recipes${query}`;
  if (entry.category === "material") return `${base}/synthesis/materials${query}`;
  if (entry.game !== 'kh1fm' && ['cup', 'boss', 'minigame', 'gummi'].includes(entry.category)) return `${base}/challenges${query}`;
  const gummiPage = kh1GummiPage(entry);
  if (gummiPage) return `${base}/gummi/${gummiPage}${query}`;
  const catalogue = cataloguePages.find((page) => cataloguePageIncludesEntry(page, entry));
  if (catalogue) return `${base}/${catalogue.id}${query}`;
  return `${base}/reference${query}`;
}

export function resolveEntryHref(data: GameData, id: string): string {
  const entry = data.entries.find((candidate) => candidate.id === id);
  return entry ? entryHref(entry) : `#/${data.game}/reference?entry=${encodeURIComponent(id)}`;
}

/** Keep pre-split cup/Gummi bookmarks useful, including their world and status filters. */
export function normalizeKh1ActivityRoute(route: string, entries: GuideEntry[]): string {
  const [path, query = ''] = route.split('?');
  if (!['kh1fm/challenges', 'kh1fm/gummi'].includes(path)) return route;
  const params = new URLSearchParams(query);
  const entry = entries.find(e => e.id === params.get('entry'));
  const section = entry && kh1ActivitySection(entry);
  if (!section || section === 'challenges') return route;
  if (params.get('worldCategory') === 'challenges') params.set('worldCategory', section);
  // The old combined-list page number has no meaning in the smaller category.
  params.delete('page');
  const gummiPage = entry && kh1GummiPage(entry);
  return `kh1fm/${section}${gummiPage ? '/' + gummiPage : ''}?${params}`;
}

export function cataloguePageIncludesEntry(page: {id:string; categories:string[]}, entry: GuideEntry): boolean {
  const activity = kh1ActivitySection(entry);
  return activity ? page.id === activity : page.categories.includes(entry.category);
}
