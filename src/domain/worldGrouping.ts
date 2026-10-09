import type { GuideEntry } from './types';

export interface WorldGroup { world: string; entries: GuideEntry[] }

/** Presentation only: retain canonical records, acquisition IDs and detail titles. */
export function groupEntriesByWorld(entries: GuideEntry[]): WorldGroup[] {
  const groups = new Map<string, GuideEntry[]>();
  for (const entry of entries) {
    const world = entry.world || 'Other locations';
    if (!groups.has(world)) groups.set(world, []);
    groups.get(world)!.push(entry);
  }
  return [...groups].sort(([a], [b]) => a.localeCompare(b)).map(([world, rows]) => ({
    world, entries: [...rows].sort((a, b) =>
      Number(a.facts?.reportNumber ?? a.facts?.puppyStart ?? 0) - Number(b.facts?.reportNumber ?? b.facts?.puppyStart ?? 0)
      || a.id.localeCompare(b.id)),
  }));
}

/** Each heading costs a row slot. Never strand a heading; repeat it when a
 * world spans leaves. Tiny leaves keep one heading + entry reachable by scroll. */
export function paginateWorldGroups(groups: WorldGroup[], capacity: number): WorldGroup[][] {
  const limit = Math.max(2, Number.isFinite(capacity) ? Math.floor(capacity) : 2);
  const pages: WorldGroup[][] = [];
  let used = limit;
  for (const group of groups) {
    let offset = 0;
    while (offset < group.entries.length) {
      if (limit - used < 2) { pages.push([]); used = 0; }
      const rows = group.entries.slice(offset, offset + limit - used - 1);
      pages.at(-1)!.push({ world: group.world, entries: rows });
      used += rows.length + 1;
      offset += rows.length;
    }
  }
  return pages;
}

export function groupedEntryTitle(entry: GuideEntry): string {
  return entry.category === 'report' && entry.facts?.reportNumber
    ? `Report ${entry.facts.reportNumber}` : entry.name;
}
