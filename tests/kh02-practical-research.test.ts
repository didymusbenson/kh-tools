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
  it('supplies the HD thicket locator while preserving the item-label disagreement', () => {
    expect(entry('ft-north-potion').summary).toContain('black-thorn');
    expect(entry('ft-north-potion').summary).toContain('separate from the lower crevasse');
    expect(entry('ft-north-potion').sources).toContain('https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497');
    expect(entry('ft-north-potion').uncertainty).toBeTruthy();
    expect(kh02.entries.filter(e => e.collectible !== false)).toHaveLength(55);
    expect(kh02.entries.filter(e => e.category === 'treasures')).toHaveLength(41);
  });
  it('provides the published post-clear objective31 route and conservative carry-over advice', () => {
    expect(entry('objective:31').instructions).toContain('Zodiac boss-rush');
    expect(entry('objective:41').instructions).toContain('does not substitute');
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
