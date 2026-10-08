import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { GameData } from '../src/domain/types';
import { groupEntriesByWorld, groupedEntryTitle, paginateWorldGroups } from '../src/domain/worldGrouping';
const data = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) as GameData;

describe('KH1 compact world groups', () => {
  for (const [category, count] of [['report', 13], ['dalmatian', 33]] as const) {
    const entries = data.entries.filter(e => e.category === category);
    it(`keeps all ${count} canonical ${category} records, numbers and world metadata intact`, () => {
      const before = JSON.stringify(entries);
      const groups = groupEntriesByWorld(entries);
      expect(entries).toHaveLength(count);
      expect(groups.map(g => g.world)).toEqual([...groups.map(g => g.world)].sort((a,b)=>a.localeCompare(b)));
      expect(groups.flatMap(g=>g.entries).map(e=>e.id).sort()).toEqual(entries.map(e=>e.id).sort());
      for (const group of groups) {
        expect(group.entries.every(e=>e.world===group.world)).toBe(true);
        const numbers=group.entries.map(e=>Number(e.facts?.reportNumber??e.facts?.puppyStart));
        expect(numbers).toEqual([...numbers].sort((a,b)=>a-b));
        for (const entry of group.entries) {
          expect(entries).toContain(entry);
          expect(groupedEntryTitle(entry)).toBe(category==='report'?`Report ${entry.facts?.reportNumber}`:entry.name);
        }
      }
      expect(JSON.stringify(entries)).toBe(before);
    });
    it(`paginates ${category} without lost/duplicate rows or orphan headings at every capacity`, () => {
      for(const capacity of [0,1,2,3,4,5,6,7,8,9,10,20,100,NaN]) {
        for(const selected of [entries, entries.filter((_,i)=>i%2), entries.filter(e=>e.world==='Hollow Bastion'), []]) {
          const groups=groupEntriesByWorld(selected);
          const pages=paginateWorldGroups(groups,capacity);
          expect(pages.flatMap(p=>p.flatMap(g=>g.entries)).map(e=>e.id)).toEqual(groups.flatMap(g=>g.entries).map(e=>e.id));
          for(const page of pages) {
            expect(page.length).toBeGreaterThan(0);
            expect(page.reduce((n,g)=>n+1+g.entries.length,0)).toBeLessThanOrEqual(Math.max(2,capacity||2));
            expect(new Set(page.map(g=>g.world)).size).toBe(page.length);
            for(const group of page) expect(group.entries.length).toBeGreaterThan(0);
          }
        }
      }
    });
  }
  it('keeps canonical report numbers under Agrabah and supports unknown metadata safely',()=>{
    expect(groupEntriesByWorld(data.entries.filter(e=>e.category==='report')).find(g=>g.world==='Agrabah')?.entries.map(groupedEntryTitle)).toEqual(['Report 1','Report 11']);
    const entry={...data.entries.find(e=>e.category==='report')!,world:undefined,facts:{}};
    expect(groupEntriesByWorld([entry])[0].world).toBe('Other locations');
    expect(groupedEntryTitle(entry)).toBe(entry.name);
  });
});
