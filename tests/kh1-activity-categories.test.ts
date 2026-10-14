import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { cataloguePages, cataloguePageIncludesEntry, entryHref, normalizeKh1ActivityRoute } from '../src/domain/entryNavigation';
import { kh1CategoryFor, kh1WorldCategories } from '../src/domain/kh1WorldCategories';
import type { GameData } from '../src/domain/types';
const data = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) as GameData;
const sections = ['coliseum', 'gummi', 'challenges'];
describe('KH1 separate activity categories', () => {
  it('partitions all 293 original records without changing IDs or orphaning entries', () => {
    const old = data.entries.filter(e => ['cup', 'gummi', 'boss', 'minigame'].includes(e.category));
    const partitions = sections.map(id => data.entries.filter(e => cataloguePageIncludesEntry(cataloguePages.find(p => p.id === id)!,e)));
    expect(partitions.map(p => p.length)).toEqual([100, 165, 28]);
    expect(partitions.flat().map(e => e.id).sort()).toEqual(old.map(e => e.id).sort());
    expect(new Set(partitions.flat().map(e => e.id)).size).toBe(293);
    partitions.forEach((entries, i) => entries.forEach(e => {
      expect(kh1CategoryFor(e).id).toBe(sections[i]);
      expect(entryHref(e)).toBe(`#/kh1fm/${sections[i]}?entry=${encodeURIComponent(e.id)}`);
    }));
  });
  it('keeps existing check IDs and counts independently in world categories', () => {
    const checks = Object.fromEntries(data.entries.filter(e => kh1CategoryFor(e).id === 'coliseum').map(e => [e.id, true]));
    const rows = kh1WorldCategories(data.entries, 'Olympus Coliseum', checks);
    const cups = rows.find(c => c.id === 'coliseum')!;
    expect(cups.total).toBeGreaterThan(0);
    expect(cups.completed).toBe(cups.total);
    expect(cups.complete).toBe(true);
    expect(rows.find(c => c.id === 'challenges')?.completed || 0).toBe(0);
  });
  it('migrates old focused cup and Gummi links while preserving useful filters', () => {
    for (const [category, section] of [['cup', 'coliseum'], ['gummi', 'gummi']]) {
      const entry = data.entries.find(e => e.category === category && e.world)!;
      const query = new URLSearchParams({entry:entry.id, world:entry.world!, fromWorld:entry.world!, worldCategory:'challenges', status:'remaining', page:'14'});
      const route = normalizeKh1ActivityRoute(`kh1fm/challenges?${query}`, data.entries);
      expect(route.startsWith(`kh1fm/${section}?`)).toBe(true);
      const params = new URLSearchParams(route.split('?')[1]);
      expect(params.get('entry')).toBe(entry.id);
      expect(params.get('world')).toBe(entry.world);
      expect(params.get('fromWorld')).toBe(entry.world);
      expect(params.get('status')).toBe('remaining');
      expect(params.get('worldCategory')).toBe(section);
      expect(params.has('page')).toBe(false);
      expect(normalizeKh1ActivityRoute(route, data.entries)).toBe(route);
    }
    for (const route of ['kh1fm/challenges', 'kh1fm/challenges?entry=missing', 'kh1fm/minigames', 'kh2fm/challenges']) expect(normalizeKh1ActivityRoute(route,data.entries)).toBe(route);
  });
});

it('keeps Olympus special matches and training together without rerouting other games', () => {
  const olympus = data.entries.filter(e => e.world === 'Olympus Coliseum' && ['boss','minigame'].includes(e.category));
  expect(olympus).toHaveLength(4);
  for (const entry of olympus) {
    expect(kh1CategoryFor(entry).id).toBe('coliseum');
    expect(entryHref(entry)).toContain('/coliseum?');
    expect(normalizeKh1ActivityRoute(`kh1fm/challenges?entry=${entry.id}`,data.entries)).toContain('kh1fm/coliseum?');
  }
  for(const category of ['cup','gummi','boss','minigame']) {
    expect(entryHref({...data.entries[0],game:'kh2fm',category})).toBe(`#/kh2fm/challenges?entry=${data.entries[0].id}`);
  }
});
