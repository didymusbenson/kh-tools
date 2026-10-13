import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { KH1_WORLD_CATEGORIES, kh1CategoryFor, kh1InWorld, kh1WorldCategories, kh1WorldCategoryEntries, kh1WorldCategoryHref } from '../src/domain/kh1WorldCategories';
import { treasurePartitions } from '../src/games/treasureModel';
import type { GameData } from '../src/domain/types';
const data=JSON.parse(readFileSync('public/data/kh1fm.json','utf8')) as GameData;
const worlds=[...new Set(data.entries.flatMap(e=>e.world?[e.world]:[]))];
describe('KH1 world category directory',()=>{
 it('gives every world record exactly one category and round-trips destinations',()=>{
  for(const world of worlds){
   const rows=kh1WorldCategories(data.entries,world,{});
   const members=rows.flatMap(c=>c.members);
   const expected=data.entries.filter(e=>kh1InWorld(e,world));
   expect(members.map(e=>e.id).sort()).toEqual(expected.map(e=>e.id).sort());
   expect(new Set(members.map(e=>e.id)).size).toBe(members.length);
   for(const row of rows){const href=kh1WorldCategoryHref(row,world),p=new URLSearchParams(href.split('?')[1]);expect(p.get('world')).toBe(world);expect(p.get('fromWorld')).toBe(world);expect(p.get('worldCategory')).toBe(row.id);expect(kh1WorldCategoryEntries(data.entries,world,row).map(e=>e.id)).toEqual(row.members.map(e=>e.id));}
  }
 });
 it('counts exactly the canonical treasure cells for all worlds',()=>{
  for(const world of worlds){const row=kh1WorldCategories(data.entries,world,{}).find(c=>c.id==='treasures')!;expect(row?.total||0).toBe(treasurePartitions('kh1fm',data.entries).filter(p=>p.world===world).reduce((n,p)=>n+p.cells.length,0));}
 });
 it('has honest complete, partial, reference and empty states',()=>{
  const empty=kh1WorldCategories(data.entries,'Destiny Islands',{});
  expect(empty.find(c=>c.id==='treasures')).toMatchObject({total:4,completed:0,complete:false});
  expect(empty.find(c=>c.id==='challenges')).toMatchObject({total:6,completed:0,complete:false});
  expect(empty.find(c=>c.id==='enemies')).toMatchObject({total:0,references:1,complete:false});
  expect(empty.find(c=>c.id==='trinities')).toBeUndefined();
  const treasure=empty.find(c=>c.id==='treasures')!;
  const checks=Object.fromEntries(treasure.members.map(e=>[e.id,true]));
  expect(kh1WorldCategories(data.entries,'Destiny Islands',checks).find(c=>c.id==='treasures')).toMatchObject({completed:4,complete:true});
  delete checks[treasure.members[0].id];
  expect(kh1WorldCategories(data.entries,'Destiny Islands',checks).find(c=>c.id==='treasures')).toMatchObject({completed:3,complete:false});
  expect(kh1WorldCategories(data.entries,'Unknown world',{})).toHaveLength(0);
 });
 it('uses explicit enemy encounter evidence, including Shadow and mushroom worlds',()=>{
  const shadow=data.entries.find(e=>e.id==='kh1fm-enemy-shadow')!;
  expect(kh1InWorld(shadow,'Destiny Islands')).toBe(true);
  expect(kh1InWorld(shadow,'100 Acre Wood')).toBe(false);
  expect(kh1InWorld(shadow,'World of Chaos')).toBe(false);
  expect(kh1InWorld(data.entries.find(e=>e.id==='kh1fm-enemy-pink-agaricus')!,'Deep Jungle; Atlantica')).toBe(false);
  const fungus=data.entries.find(e=>e.id==='kh1fm-enemy-black-fungus')!;
  expect(kh1InWorld(fungus,'Agrabah')).toBe(true);
 });
 it('keeps mail actions with postcards and deduplicates verified report events',()=>{
  expect(kh1CategoryFor(data.entries.find(e=>e.id==='kh1fm-postcard-mail-01')!).id).toBe('postcards');
  for(const world of worlds){const reports=kh1WorldCategoryEntries(data.entries,world,KH1_WORLD_CATEGORIES.find(c=>c.id==='reports')!);const ids=new Set(reports.map(e=>e.facts?.acquisitionId||e.id));expect(kh1WorldCategories(data.entries,world,{}).find(c=>c.id==='reports')?.total||0).toBe(ids.size);}
 });
});
