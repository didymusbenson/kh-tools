import type { GuideEntry } from './types';
import type { WorldGroup } from './worldGrouping';

export const GUMMI_PAGES = [
  { id: 'parts', title: 'Parts', description: 'Ship blocks by class, plus editor tools. Reference only.' },
  { id: 'missions', title: 'Missions', description: 'Mission 1–3 for each destination, plus build and strategy guidance.' },
  { id: 'blueprints', title: 'Blueprints', description: 'Find and record each ship blueprint.' },
] as const;
export type GummiPage = typeof GUMMI_PAGES[number]['id'];
const guidance = new Set([
  'kh1fm-guide-gummi-no-damage-builds',
  'kh1fm-guide-gummi-small-build-missions',
  'kh1fm-guide-gummi-collection-missions',
  'kh1fm-guide-gummi-weapon-restricted-missions',
]);
export function kh1GummiPage(entry: GuideEntry): GummiPage | undefined {
  if (entry.game !== 'kh1fm') return undefined;
  if (guidance.has(entry.id)) return 'missions';
  if (entry.category !== 'gummi') return undefined;
  switch (entry.facts?.subtype) {
    case 'gummi-part': case 'gummi-tool': return 'parts';
    case 'gummi-mission': return 'missions';
    case 'blueprint': return 'blueprints';
  }
}
export function gummiEntryTitle(entry: GuideEntry) {
  return entry.facts?.subtype === 'gummi-mission' ? `Mission ${entry.facts.mission}` : entry.name;
}
/** Group only the presentation: original entries and saved check IDs remain intact. */
export function groupGummiEntries(entries: GuideEntry[], page: GummiPage): WorldGroup[] {
  const groups = new Map<string, GuideEntry[]>();
  for (const entry of entries) {
    const label = page === 'parts' ? entry.facts?.subtype === 'gummi-tool' ? 'Tools' : String(entry.facts?.partClass || 'Other parts')
      : entry.category === 'guide' ? 'Build & strategy guidance' : String(entry.facts?.destination || entry.world || 'Other destinations');
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(entry);
  }
  const order = ['Cockpit', 'Engine', 'Armor', 'Wing', 'Special', 'Weapon', 'Design', 'Tools'];
  return [...groups].sort(([a], [b]) => page === 'parts' ? order.indexOf(a) - order.indexOf(b)
    : Number(a === 'Build & strategy guidance') - Number(b === 'Build & strategy guidance'))
    .map(([world, rows]) => ({world, entries: [...rows].sort((a, b) => page === 'missions'
      ? Number(a.facts?.mission || 0) - Number(b.facts?.mission || 0) : Number(a.facts?.sourceTableRow || 0) - Number(b.facts?.sourceTableRow || 0))}));
}
