import { describe, expect, it } from 'vitest';
import kh02 from '../src/games/kh02';
const entry = (id: string) => kh02.entries.find(e => e.id === `kh02:${id}`)!;
describe('KH0.2 practical completion guidance', () => {
  it('keeps conservative lightning completion separate from the unresolved exact threshold', () => {
    const objective = entry('objective:13'), reward = entry('wardrobe:mystic-pauldron');
    expect(objective.instructions).toContain('Budget for 50');
    expect(objective.instructions).toContain('stop earlier');
    expect(objective.uncertainty).toContain('unverified');
    expect(reward.instructions).toContain(objective.instructions);
    expect(reward.uncertainty).toBe(objective.uncertainty);
    expect(objective.sources).toContain('https://steamcommunity.com/sharedfiles/filedetails/?id=3355205993');
  });
  it('qualifies the extra Forest search route without manufacturing an identity resolution', () => {
    expect(entry('ft-north-potion').summary).toContain('black thorns');
    expect(entry('ft-north-potion').summary).toContain('remains uncertain');
    expect(entry('ft-north-potion').uncertainty).toBeTruthy();
    expect(kh02.entries.filter(e => e.collectible !== false)).toHaveLength(55);
    expect(kh02.entries.filter(e => e.category === 'treasures')).toHaveLength(41);
  });
  it('avoids depending on unverified partial progress carry-over', () => {
    expect(entry('achievement:a-magical-finale').instructions).toContain('same save');
    expect(entry('reference:replay').instructions).toContain('Keep that clear save separate');
    for (const n of [18, 26, 31, 36, 41, 47, 50]) {
      const objective = entry(`objective:${n}`);
      const reward = kh02.entries.find(e => e.category === 'wardrobe' && e.order === n)!;
      expect(objective.instructions).toContain('after the objective is visible');
      expect(reward.instructions).toContain('after the objective is visible');
    }
  });
});
