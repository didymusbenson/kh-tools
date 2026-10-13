import type { GuideEntry } from './types';

export type EnemyFact = [string, string | number];
export interface EnemyStatGroup { context: string; rows: { key: string; label: string; value: string | number }[] }
const statSuffix = /^(.*) (HP|Strength|Defense|MP recovery value|EXP)$/;
const multiplier = /^(Physical|Fire|Blizzard|Thunder|Gravity|Stop|Stun|Other) multiplier$/;

/** Presentation only: keep values and context labels verbatim, including exceptions. */
export function kh1EnemyStats(entry: GuideEntry, facts: EnemyFact[]) {
  const groups: EnemyStatGroup[] = [];
  const multipliers: EnemyFact[] = [];
  const remaining: EnemyFact[] = [];
  for (const [key, value] of facts) {
    const match = entry.game === 'kh1fm' && entry.category === 'enemy' ? key.match(statSuffix) : null;
    if (match) {
      let group = groups.find(group => group.context === match[1]);
      if (!group) { group = { context: match[1], rows: [] }; groups.push(group); }
      group.rows.push({ key, label: match[2], value });
    } else if (entry.game === 'kh1fm' && entry.category === 'enemy' && multiplier.test(key)) {
      multipliers.push([key, value]);
    } else remaining.push([key, value]);
  }
  return { groups, multipliers, remaining };
}
