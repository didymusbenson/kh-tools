import type { GuideEntry } from './types';

// Journal ability order, also recorded in tools/content/import-collectibles.py
// (COLOR_UNLOCK and guide-trinity-unlocks). Yellow is an optional cup unlock.
export const TRINITY_COLORS = ['Blue', 'Red', 'Green', 'Yellow', 'White'] as const;
export type TrinitySort = 'color' | 'world' | 'location';
export function trinityColor(entry: GuideEntry): string {
  return String(entry.facts?.color || 'Unknown');
}
export function trinityTitle(entry: GuideEntry): string {
  return [entry.world, entry.area].filter(Boolean).join(' — ') || entry.name;
}
const textOrder = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
function colorRank(entry: GuideEntry): number {
  const index = TRINITY_COLORS.findIndex(color => color === trinityColor(entry));
  return index < 0 ? TRINITY_COLORS.length : index;
}
/** Display-only ordering; canonical IDs, content and saved progress never change. */
export function compareTrinities(a: GuideEntry, b: GuideEntry, sort: TrinitySort = 'color'): number {
  const keys = {
    color: colorRank(a) - colorRank(b) || textOrder.compare(trinityColor(a), trinityColor(b)),
    world: textOrder.compare(a.world || '', b.world || ''),
    location: textOrder.compare(a.area || '', b.area || ''),
  };
  return keys[sort] || keys.color || keys.world || keys.location || textOrder.compare(a.id, b.id);
}
