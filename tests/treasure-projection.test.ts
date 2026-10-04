import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import kh2 from '../src/games/kh2fm';
import bbs from '../src/games/bbsfm';
import ddd from '../src/games/dddhd';
import kh3 from '../src/games/kh3';
import recom from '../src/games/recom';
import kh02 from '../src/games/kh02';
import {treasurePartitions,treasureMatches,slotLabel,hasTreasureBoard,normalizeTreasureRoute,adjacentTreasureMatch} from '../src/games/treasureModel';
import type {GameData} from '../src/domain/types';
const kh1=JSON.parse(readFileSync('public/data/kh1fm.json','utf8')) as GameData;
describe('treasure presentation projections',()=>{
 it('projects exact scopes without interleaving character boards or duplicating saved IDs',()=>{
  for(const [game,guide,total] of [['kh2fm',kh2,317],['bbsfm',bbs,382],['dddhd',ddd,438],['kh3',kh3,254],['recom',recom,41],['kh02',kh02,41]] as const){
   const boards=treasurePartitions(game,guide.entries),cells=boards.flatMap(p=>p.cells);
   expect(cells).toHaveLength(total);expect(new Set(cells.map(c=>c.entry.id)).size).toBe(total);
   for(const p of boards)expect(p.cells.every(c=>c.metadata.character===p.character&&c.metadata.world===p.world&&c.metadata.scope===p.scope)).toBe(true);
  }
 });
 it('groups KH1 physical acquisitions and other rewards while preserving all acquired identities',()=>{
  const boards=treasurePartitions('kh1fm',kh1.entries),cells=boards.flatMap(p=>p.cells);
  expect(cells).toHaveLength(306);
  expect(boards.every(p=>['Chests & containers','Other acquisitions'].includes(p.group))).toBe(true);
  expect(cells.every(c=>slotLabel(c).startsWith('Guide #'))).toBe(true);
  expect(hasTreasureBoard('kh1fm','kh1fm/treasures?list=postcards')).toBe(false);
 });
 it('keeps repeated reward chests separate and uses only supported Journal labels',()=>{
  const kh2board=treasurePartitions('kh2fm',kh2.entries).find(p=>p.world==='Twilight Town'&&p.character==='Sora')!;
  expect(kh2board.cells).toHaveLength(39);expect(slotLabel(kh2board.cells[0])).toBe('Journal #1');
  for(const game of ['bbsfm','dddhd']){
   const guide=game==='bbsfm'?bbs:ddd;
   expect(treasurePartitions(game,guide.entries).flatMap(p=>p.cells).every(c=>slotLabel(c).startsWith('Guide #'))).toBe(true);
  }
 });
 it('matches without changing partition order, count or selected identity',()=>{
  const p=treasurePartitions('kh2fm',kh2.entries)[0],cell=p.cells[0],ids=p.cells.map(c=>c.entry.id);
  expect(treasureMatches(cell,{}, {status:'remaining'})).toBe(true);
  expect(treasureMatches(cell,{}, {q:cell.metadata.world})).toBe(true);
  expect(treasureMatches(cell,{[cell.entry.id]:true},{status:'remaining'})).toBe(false);
  expect(treasureMatches(cell,{}, {q:'no-such-treasure-name'})).toBe(false);
  expect(p.cells.map(c=>c.entry.id)).toEqual(ids);
 });
 it('moves to the nearest canonical match even when a selected Remaining cell was just collected',()=>{
  const cells=treasurePartitions('kh2fm',kh2.entries)[0].cells;
  const checks=Object.fromEntries(cells.map((c,i)=>[c.entry.id,i!==3&&i!==7]));
  expect(adjacentTreasureMatch(cells,cells[5].entry.id,checks,{status:'remaining'},1)?.entry.id).toBe(cells[7].entry.id);
  expect(adjacentTreasureMatch(cells,cells[5].entry.id,checks,{status:'remaining'},-1)?.entry.id).toBe(cells[3].entry.id);
  expect(adjacentTreasureMatch(cells,cells.at(-1)!.entry.id,checks,{status:'remaining'},1)?.entry.id).toBe(cells[3].entry.id);
  expect(adjacentTreasureMatch(cells,cells[0].entry.id,checks,{q:'no-such-item'},1)).toBeUndefined();
 });
 it('opens finite ReCoM world claims from native Worlds navigation without fabricating Riku rewards',()=>{
  expect(hasTreasureBoard('recom','recom/worlds?campaign=sora&world=Traverse%20Town')).toBe(true);
  expect(hasTreasureBoard('recom','recom/worlds?campaign=riku&world=Traverse%20Town')).toBe(false);
  expect(hasTreasureBoard('recom','recom/worlds?campaign=sora&world=100%20Acre%20Wood')).toBe(false);
  const claim=treasurePartitions('recom',recom.entries)[0].cells[0];
  expect(new URLSearchParams(normalizeTreasureRoute('recom',`recom/rewards?campaign=riku&entry=${claim.entry.id}`).split('?')[1]).get('campaign')).toBe('sora');
 });
 it('normalizes selected deep links into the owner, world and canonical treasure section',()=>{
  const cell=treasurePartitions('bbsfm',bbs.entries).find(p=>p.character==='Aqua')!.cells[0];
  const route=normalizeTreasureRoute('bbsfm',`bbsfm/entry/${encodeURIComponent(cell.entry.id)}`);
  const [path,query]=route.split('?'),params=new URLSearchParams(query);
  expect(path).toBe('bbsfm/treasures');expect(params.get('character')).toBe('Aqua');
  expect(params.get('world')).toBe(cell.metadata.world);expect(params.get('entry')).toBe(cell.entry.id);
 });
 it('resolves legacy paths safely and leaves excluded tutorial records accessible to their original renderer',()=>{
  expect(()=>hasTreasureBoard('kh1fm','kh1fm/entry/%')).not.toThrow();
  expect(hasTreasureBoard('kh2fm',`kh2fm/entry/${encodeURIComponent(treasurePartitions('kh2fm',kh2.entries)[0].cells[0].entry.id)}`)).toBe(true);
  const tutorial=bbs.entries.find(e=>e.category==='treasures'&&e.collectible===false)!;
  expect(hasTreasureBoard('bbsfm',`bbsfm/treasures?entry=${encodeURIComponent(tutorial.id)}`)).toBe(false);
 });
});
