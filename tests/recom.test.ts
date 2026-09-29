import {describe,it,expect} from 'vitest';
import 'fake-indexeddb/auto';
import guide,{recomEntries,inCampaign,recomProgress,recomHref} from '../src/games/recom';
import {emptyProfile,parseProfile,mutateProfile,loadProfile,loadRecovery,journalStartRoute} from '../src/games/profile';
import kh2 from '../src/games/kh2fm';

describe('Re:Chain of Memories data and campaign progress',()=>{
 it('has unique, sourced IDs and excludes original-edition bonus cards',()=>{
  expect(new Set(recomEntries.map(e=>e.id)).size).toBe(recomEntries.length);
  for(const e of recomEntries){expect(e.sources?.length,e.id).toBeGreaterThan(0);expect(e.name).toBeTruthy();}
  const attack=recomEntries.filter(e=>e.family==='attack'&&e.category==='cards');
  expect(attack).toHaveLength(23);
  for(const name of ['Midnight Roar','Total Eclipse','Maverick Flare','Two Become One'])expect(attack.some(e=>e.name===name)).toBe(true);
  for(const name of ['Hidden Dragon','Monochrome','Follow the Wind','Photon Debugger'])expect(attack.some(e=>e.name===name)).toBe(false);
 });
 it('does not give Riku Sora shops, minigames or editable-deck categories',()=>{
  const riku=recomEntries.filter(e=>inCampaign(e,'riku'));
  expect(riku.filter(e=>['shop','minigames'].includes(e.category))).toHaveLength(0);
  expect(riku.filter(e=>e.category==='decks')).toHaveLength(12);
  expect(riku.filter(e=>e.category==='cards'&&e.family==='enemy')).toHaveLength(22);
  expect(riku.filter(e=>e.family==='attack'&&e.category==='cards')).toHaveLength(0);
 });
 it('keeps card discoveries independent from world rewards and shared campaign identities',()=>{
  const sora=recomEntries.find(e=>e.name==='Shadow'&&e.campaign==='sora'&&e.category==='cards')!;
  const riku=recomEntries.find(e=>e.name==='Shadow'&&e.campaign==='riku'&&e.category==='cards')!;
  const rewards=recomEntries.filter(e=>e.category==='rewards');
  expect(rewards).toHaveLength(41);
  const checks={[sora.id]:true};
  expect(recomProgress([riku],checks)).toEqual({done:0,total:1});
  expect(recomProgress(rewards,checks)).toEqual({done:0,total:41});
  const all=recomEntries.filter(e=>e.category==='cards'&&e.campaign==='sora');
  expect(recomProgress(all,checks).total).toBe(all.length);
 });
 it('keeps disputed costs unknown and card values distinct from CP',()=>{
  const soldier=recomEntries.find(e=>e.name==='Soldier'&&e.campaign==='sora')!;
  expect(soldier.stats?.find(s=>s[0]==='CP')?.[1]).toBe('Unresolved');
  const key=recomEntries.find(e=>e.name==='Kingdom Key')!;
  expect(key.stats?.some(s=>s[0]==='CP')).toBe(false);
  expect(key.uncertainty).toContain('per-value');
 });
 it('loads the report root and preserves campaign in links',()=>{
  expect(journalStartRoute('recom')).toBe('recom/contents');
  expect(recomHref('cards','riku',{entry:'test'})).toBe('#/recom/cards?campaign=riku&entry=test');
 });
 it('persists both campaigns, validates backups, and recovers imports without affecting KH2',async()=>{
  const sora=recomEntries.find(e=>e.name==='Shadow'&&e.campaign==='sora')!;
  const riku=recomEntries.find(e=>e.name==='Shadow'&&e.campaign==='riku')!;
  await mutateProfile(guide,()=>emptyProfile('recom'));
  await Promise.all([sora,riku].map(e=>mutateProfile(guide,p=>({...p,checks:{...p.checks,[e.id]:true}}))));
  const saved=await loadProfile(guide);
  expect(saved.checks).toEqual({[sora.id]:true,[riku.id]:true});
  expect(parseProfile(JSON.parse(JSON.stringify(saved)),guide)).toEqual(saved);
  expect(()=>parseProfile(saved,kh2)).toThrow('this game');
  expect(()=>parseProfile({...saved,checks:{fake:true}},guide)).toThrow('Unknown entry');
  await mutateProfile(guide,()=>emptyProfile('recom'),true);
  expect((await loadRecovery(guide)).checks).toEqual(saved.checks);
  expect((await loadProfile(kh2)).checks[sora.id]).toBeUndefined();
 });
});
