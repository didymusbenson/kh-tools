/** Display-only normalization. Canonical names, IDs, ordering and saved checks stay intact. */
type PresentableEntry = { id: string; category: string; name: string; reward?: string; area?: string };
export function isTreasure(entry: PresentableEntry): boolean {
  return ['treasure', 'treasures'].includes(entry.category) || /[.:]chest[.:]/.test(entry.id);
}
export function chestReference(entry: PresentableEntry): string | undefined {
  if (!isTreasure(entry)) return;
  const match = entry.name.match(/^(?:Chest\s+|#)(\d+)\s*[·—–-]/i)
    || entry.name.match(/[—–]\s*#(\d+)$/);
  return match ? `Chest ${Number(match[1])}` : undefined;
}
export function entryTitle(entry: PresentableEntry): string {
  if (!isTreasure(entry)) return entry.name;
  let title = entry.name.replace(/^(?:Chest\s+|#)\d+\s*[·—–-]\s*/i, '').replace(/\s*[—–]\s*#\d+$/, '');
  if (entry.area) for (const separator of [' — ', ' · ']) {
    const suffix = separator + entry.area;
    if (title.endsWith(suffix)) title = title.slice(0, -suffix.length);
  }
  return title || entry.name;
}
