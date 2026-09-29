import {describe,it,expect} from 'vitest';
import 'fake-indexeddb/auto';
import guide,{recomEntries,inCampaign,recomProgress,recomHref} from '../src/games/recom';
import {emptyProfile,parseProfile,mutateProfile,loadProfile,loadRecovery,journalStartRoute} from '../src/games/profile';
import kh2 from '../src/games/kh2fm';
import doors from '../ai_docs/games/recom/door-requirements.json';
import packs from '../ai_docs/games/recom/moogle-packs.json';
import attacks from '../ai_docs/games/recom/attack-cards.json';

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
 it('has complete value costs and reconciled remake enemy CP',()=>{
  const expected={Soldier:15,Powerwild:30,Wyvern:20,Defender:30,'Tornado Step':30,Crescendo:30,Neoshadow:30};
  for(const [name,cp] of Object.entries(expected)){
   const enemy=recomEntries.find(e=>e.name===name&&e.campaign==='sora')!;
   expect(enemy.stats?.find(s=>s[0]==='CP')?.[1],name).toBe(String(cp));
  }
  const cards=recomEntries.filter(e=>e.cpByValue);
  expect(cards).toHaveLength(44);
  for(const card of cards){
   expect(Object.keys(card.cpByValue!)).toHaveLength(10);
   expect(card.cpByValue![0]).toBeGreaterThan(card.cpByValue![9]);
   expect(Object.values(card.cpByValue!).every(cp=>Number.isInteger(cp)&&cp>0)).toBe(true);
   if(card.family==='item')expect(card.premiumCp).toBeUndefined();
   else expect(card.premiumCp).toBe(card.cpByValue![1]);
  }
  const key=recomEntries.find(e=>e.name==='Kingdom Key')!;
  expect(key.cpByValue).toEqual({1:10,2:11,3:12,4:13,5:14,6:15,7:16,8:17,9:18,0:19});
  expect(recomEntries.find(e=>e.name==='Megalixir')!.cpByValue![0]).toBe(95);
 });
 it('includes all native card types without inflating counts by card values',()=>{
  for(const [campaign,total] of [['sora',152],['riku',59]] as const){
   const cards=recomEntries.filter(e=>e.category==='cards'&&e.campaign===campaign);
   expect(cards).toHaveLength(total);
   expect(cards.filter(e=>e.family==='world')).toHaveLength(12);
   expect(cards.filter(e=>e.family==='gimmick')).toHaveLength(1);
  }
  expect(recomEntries.filter(e=>e.family==='world'&&e.campaign==='sora').some(e=>e.name==='Castle Oblivion')).toBe(false);
  expect(recomEntries.filter(e=>e.family==='world'&&e.campaign==='riku').some(e=>e.name==='100 Acre Wood')).toBe(false);
 });
 it('keeps literal event-door zeroes and independent colored totals',()=>{
  expect(doors.records).toHaveLength(25);
  expect(doors.records.find(d=>d.campaign==='sora'&&d.floor===4)!.rewards).toEqual([{color:'green',comparison:'exact',value:9},{color:'red',comparison:'exact',value:9}]);
  expect(doors.records.find(d=>d.campaign==='sora'&&d.floor===13)!.rewards).toEqual([{color:'blue',comparison:'sum-at-least',value:30},{color:'red',comparison:'sum-at-least',value:40},{color:'green',comparison:'sum-at-least',value:20}]);
  expect(doors.records.find(d=>d.campaign==='riku'&&d.floor===2)!.beginnings).toEqual([{color:'blue',comparison:'exact',value:0}]);
 });
 it('uses remake pack prices and complete magic/item selection pools',()=>{
  expect(packs.records.find(p=>p.tier==='Black'&&p.kind==='magic')!.priceMooglePoints).toBe(350);
  expect(packs.records.find(p=>p.tier==='Mog'&&p.kind==='magic')!.priceMooglePoints).toBe(400);
  const withRates=packs.records.filter(p=>'cardRates' in p);
  expect(withRates).toHaveLength(8);
  for(const p of withRates)expect(Object.values(p.cardRates!).reduce((sum,rate)=>sum+(rate??0),0)).toBeCloseTo(100);
  const dust=attacks.records.find(c=>c.name==='Diamond Dust')!;
  const angel=attacks.records.find(c=>c.name==='One-Winged Angel')!;
  expect(Object.entries(dust.randomSources['Field drop']).filter(([,rate])=>rate>0)).toEqual([['Castle Oblivion',10]]);
  expect(Object.entries(angel.randomSources['Field drop']).filter(([,rate])=>rate>0)).toEqual([['Twilight Town',15]]);
 });
 it('keeps research tasks and source reconciliation out of player guidance',()=>{
  for(const e of recomEntries){
   const copy=JSON.stringify([e.summary,e.instructions,e.prerequisites,e.notes,e.stats]);
   expect(copy,e.id).not.toMatch(/unresolved|needs (?:checking|modern|verification)|not yet available|remains to reconcile|source order/i);
  }
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
