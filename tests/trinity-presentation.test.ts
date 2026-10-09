import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import type { GameData, GuideEntry } from '../src/domain/types';
import { TRINITY_COLORS, compareTrinities, trinityColor, trinityTitle } from '../src/domain/trinityPresentation';

const data = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) as GameData;
const marks = data.entries.filter(entry => entry.category === 'trinity');
const modes = ['color', 'world', 'location'] as const;

describe('KH1 Trinity presentation', () => {
  it('ships all five unmodified, transparent Re:Collection Minimal PNG assets', () => {
    const hashes = {
      Blue: 'e0d4030db91f0153ab3d32ad2d3aa8fb49c0d5416f827520608b2d2100ebbed8',
      Red: '908bb15d078df3e7cc3bf0100a3b98fccc4f4263037f44a26bf13a4c620d3b06',
      Green: 'b3906daecc9921dee4b7bb91f20fbc389c1b5827968f55616affc721d5234cd6',
      Yellow: 'ccde07aab72f55d0ea668216effe363e6c8d6fea4a12f016a8b6a41f583c1c97',
      White: 'e0bc2cfc48d799a0721f7885e0707dd8d3eee26e6f98631c81a5b1ebebadb453',
    };
    for (const color of TRINITY_COLORS) {
      const png = readFileSync(`public/assets/kh1-journal/trinity-${color.toLowerCase()}.png`);
      expect(png.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
      expect(png.subarray(12, 16).toString()).toBe('IHDR');
      expect(png.readUInt32BE(16)).toBe(500);
      expect(png.readUInt32BE(20)).toBe(500);
      expect(png[25], `${color} preserves RGBA transparency`).toBe(6);
      expect(createHash('sha256').update(png).digest('hex')).toBe(hashes[color]);
    }
  });

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
