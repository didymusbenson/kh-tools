import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { GUMMI_PAGES, kh1GummiPage, groupGummiEntries, gummiEntryTitle } from '../src/domain/kh1Gummi';
import { entryHref, normalizeKh1ActivityRoute } from '../src/domain/entryNavigation';
import { paginateWorldGroups } from '../src/domain/worldGrouping';
import type { GameData } from '../src/domain/types';
const data=JSON.parse(readFileSync('public/data/kh1fm.json','utf8')) as GameData;
describe('Gummi Ship pages',()=>{
  it('partitions 165 unchanged source records plus four reference guides',()=>{
    const groups=GUMMI_PAGES.map(p=>data.entries.filter(e=>kh1GummiPage(e)===p.id));
    expect(groups.map(g=>g.length)).toEqual([87,34,48]);
    expect(groups.map(g=>g.filter(e=>e.checkable).length)).toEqual([0,30,48]);
    expect(groups.flat().filter(e=>e.category==='gummi').map(e=>e.id).sort()).toEqual(data.entries.filter(e=>e.category==='gummi').map(e=>e.id).sort());
    expect(groups[1].filter(e=>e.category==='guide')).toHaveLength(4);
    groups.flat().forEach(e=>expect(entryHref(e)).toBe(`#/kh1fm/gummi/${kh1GummiPage(e)}?entry=${e.id}`));
  });
  it('groups parts by class, distinguishes tools, and orders missions within destinations',()=>{
    const parts=groupGummiEntries(data.entries.filter(e=>kh1GummiPage(e)==='parts'),'parts');
    expect(parts.map(p=>[p.world,p.entries.length])).toEqual([['Cockpit',4],['Engine',5],['Armor',24],['Wing',11],['Special',14],['Weapon',6],['Design',16],['Tools',7]]);
    const missions=groupGummiEntries(data.entries.filter(e=>kh1GummiPage(e)==='missions'),'missions');
    expect(missions).toHaveLength(11);
    for(const group of missions.slice(0,-1))expect(group.entries.map(gummiEntryTitle)).toEqual(['Mission 1','Mission 2','Mission 3']);
    expect(missions.at(-1)?.world).toBe('Build & strategy guidance');
    for(const groups of [parts,missions])for(const size of [1,2,3,5,12]){
      const pages=paginateWorldGroups(groups,size);
      expect(pages.flat(2).flatMap(g=>g.entries.map(e=>e.id))).toEqual(groups.flatMap(g=>g.entries.map(e=>e.id)));
      expect(pages.every(p=>p.every(g=>g.entries.length>0))).toBe(true);
    }
  });
  it('keeps old Gummi and combined activity bookmarks useful with their world and status context',()=>{
    for(const entry of data.entries.filter(e=>kh1GummiPage(e)))for(const old of ['gummi','challenges']){
      const params=new URLSearchParams({entry:entry.id,world:'Traverse Town',fromWorld:'Traverse Town',worldCategory:old,status:'remaining',page:'9'});
      const route=normalizeKh1ActivityRoute(`kh1fm/${old}?${params}`,data.entries);
      expect(route.startsWith(`kh1fm/gummi/${kh1GummiPage(entry)}?`)).toBe(true);
      const next=new URLSearchParams(route.split('?')[1]);
      expect(Object.fromEntries(next)).toEqual({entry:entry.id,world:'Traverse Town',fromWorld:'Traverse Town',worldCategory:'gummi',status:'remaining'});
      expect(normalizeKh1ActivityRoute(route,data.entries)).toBe(route);
    }
  });
  it('does not classify another game or unrelated guide as a Gummi page',()=>{
    expect(kh1GummiPage({...data.entries.find(e=>e.category==='gummi')!,game:'kh2fm'})).toBeUndefined();
    expect(kh1GummiPage(data.entries.find(e=>e.category==='guide'&&!e.id.includes('gummi'))!)).toBeUndefined();
  });
});
