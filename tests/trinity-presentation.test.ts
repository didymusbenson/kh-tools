import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { GameData, GuideEntry } from '../src/domain/types';
import { TRINITY_COLORS, compareTrinities, trinityColor, trinityTitle } from '../src/domain/trinityPresentation';

const data = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) as GameData;
const marks = data.entries.filter(entry => entry.category === 'trinity');
const modes = ['color', 'world', 'location'] as const;

describe('KH1 Trinity presentation', () => {
  it('preserves all 46 canonical, checkable marks and their unlock-color order', () => {
    expect(TRINITY_COLORS).toEqual(['Blue', 'Red', 'Green', 'Yellow', 'White']);
    expect(marks).toHaveLength(46);
    expect(new Set(marks.map(entry => entry.id)).size).toBe(46);
    const counts = { Blue: 17, Red: 6, Green: 9, Yellow: 4, White: 10 };
    for (const color of TRINITY_COLORS) {
      const group = marks.filter(entry => trinityColor(entry) === color);
      expect(group).toHaveLength(counts[color]);
      expect(group.map(entry => entry.id).sort()).toEqual(Array.from({ length: counts[color] }, (_, i) =>
        `kh1fm-trinity-${color.toLowerCase()}-${String(i + 1).padStart(2, '0')}`).sort());
    }
    for (const entry of marks) {
      expect(entry.checkable).toBe(true);
      expect(trinityColor(entry)).toBe(entry.facts?.color);
      expect(trinityTitle(entry)).toBe(`${entry.world} — ${entry.area}`);
    }
  });

  it('uses structured color and location rather than parsing the legacy title', () => {
    const entry: GuideEntry = { ...marks[0], name: 'White Trinity — Incorrect place',
      world: 'Wonderland', area: 'Rabbit Hole', facts: { ...marks[0].facts, color: 'Green' } };
    expect(trinityColor(entry)).toBe('Green');
    expect(trinityTitle(entry)).toBe('Wonderland — Rabbit Hole');
  });

  it('handles missing or unfamiliar colors without confusing them with canonical colors', () => {
    const missing: GuideEntry = { ...marks[0], id: 'missing-color', facts: {} };
    const unfamiliar: GuideEntry = { ...marks[0], id: 'unfamiliar-color', facts: { color: 'Purple' } };
    expect(trinityColor(missing)).toBe('Unknown');
    expect(trinityColor(unfamiliar)).toBe('Purple');
    for (const entry of [missing, unfamiliar]) {
      for (const canonical of marks) expect(compareTrinities(canonical, entry)).toBeLessThan(0);
    }
    expect(trinityTitle({ ...missing, world: undefined, area: undefined })).toBe(missing.name);
  });

  for (const mode of modes) {
    it(`sorts by ${mode} first with deterministic ties without mutating records`, () => {
      const before = JSON.stringify(marks);
      const sorted = [...marks].sort((a, b) => compareTrinities(a, b, mode));
      expect([...marks].reverse().sort((a, b) => compareTrinities(a, b, mode)).map(e => e.id))
        .toEqual(sorted.map(e => e.id));
      expect(new Set(sorted.map(e => e.id)).size).toBe(46);
      const primary = (a: GuideEntry, b: GuideEntry) => mode === 'color'
        ? TRINITY_COLORS.indexOf(trinityColor(a) as typeof TRINITY_COLORS[number]) - TRINITY_COLORS.indexOf(trinityColor(b) as typeof TRINITY_COLORS[number])
        : (mode === 'world' ? a.world! : a.area!).localeCompare(mode === 'world' ? b.world! : b.area!);
      for (let index = 1; index < sorted.length; index++) {
        expect(primary(sorted[index - 1], sorted[index])).toBeLessThanOrEqual(0);
      }
      for (const a of marks) {
        expect(compareTrinities(a, a, mode)).toBe(0);
        for (const b of marks) {
          expect(Math.sign(compareTrinities(a, b, mode)) + Math.sign(compareTrinities(b, a, mode))).toBe(0);
          if (a.id !== b.id) expect(compareTrinities(a, b, mode)).not.toBe(0);
        }
      }
      expect(JSON.stringify(marks)).toBe(before);
    });
  }

  it('uses the documented color, world, location and stable-ID tie order', () => {
    const mark = (id: string, color: string, world: string, area: string): GuideEntry =>
      ({ ...marks[0], id, world, area, facts: { color } });
    const fixture = [mark('red-a', 'Red', 'Agrabah', 'Bazaar'),
      mark('blue-z', 'Blue', 'Wonderland', 'Rabbit Hole'),
      mark('blue-b', 'Blue', 'Agrabah', 'Silent Chamber'),
      mark('blue-a2', 'Blue', 'Agrabah', 'Bazaar'),
      mark('blue-a1', 'Blue', 'Agrabah', 'Bazaar')];
    expect([...fixture].sort(compareTrinities).map(e => e.id))
      .toEqual(['blue-a1', 'blue-a2', 'blue-b', 'blue-z', 'red-a']);
    expect([...fixture].sort((a, b) => compareTrinities(a, b, 'world')).map(e => e.id))
      .toEqual(['blue-a1', 'blue-a2', 'blue-b', 'red-a', 'blue-z']);
    expect([...fixture].sort((a, b) => compareTrinities(a, b, 'location')).map(e => e.id))
      .toEqual(['blue-a1', 'blue-a2', 'red-a', 'blue-z', 'blue-b']);
  });

  it('defaults to color sorting and keeps separate marks in the same room distinct', () => {
    expect([...marks].sort(compareTrinities).map(e => e.id))
      .toEqual([...marks].sort((a, b) => compareTrinities(a, b, 'color')).map(e => e.id));
    const firstDistrict = marks.filter(e => e.world === 'Traverse Town' && e.area === 'First District' && trinityColor(e) === 'Blue');
    expect(firstDistrict).toHaveLength(2);
    expect(firstDistrict.map(trinityTitle)).toEqual(['Traverse Town — First District', 'Traverse Town — First District']);
    expect(compareTrinities(firstDistrict[0], firstDistrict[1])).not.toBe(0);
  });
});
