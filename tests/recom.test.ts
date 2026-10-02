import {describe,it,expect} from 'vitest';
import 'fake-indexeddb/auto';
import guide,{recomEntries,inCampaign,recomProgress,recomHref} from '../src/games/recom';
import {emptyProfile,parseProfile,mutateProfile,loadProfile,loadRecovery,journalStartRoute} from '../src/games/profile';
import kh2 from '../src/games/kh2fm';
import doors from '../ai_docs/games/recom/door-requirements.json';
import packs from '../ai_docs/games/recom/moogle-packs.json';
import attacks from '../ai_docs/games/recom/attack-cards.json';
import sleights from '../ai_docs/games/recom/sleights.json';
import otherCards from '../ai_docs/games/recom/other-cards.json';
import progression from '../ai_docs/games/recom/progression.json';
import combat from '../ai_docs/games/recom/combat-reference.json';
import minigames from '../ai_docs/games/recom/minigames.json';
import rikuDecks from '../ai_docs/games/recom/riku-decks.json';

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
  for(const e of recomEntries.filter(e=>e.family==='enemy'&&!['White Mushroom','Black Fungus'].includes(e.name)))expect(e.instructions).not.toContain('mushroom-specific');
 });
 it('retains Riku form and duel conditions and keeps Ansem edition-correct',()=>{
  const riku=recomEntries.filter(e=>e.campaign==='riku'&&e.category==='sleights');
  expect(riku).toHaveLength(13);
  for(const e of riku)expect(e.prerequisites).toContain('after leaving Hollow Bastion');
  for(const [normal,dark] of [['Holy Burst','Inverse Burst'],['Impulse','Dark Impulse'],['Maelstrom','Dark Maelstrom'],['Barrage','Dark Barrage']]){
   expect(riku.find(e=>e.name===normal)!.stats).toContainEqual(['Mode','Normal Mode only.']);
   expect(riku.find(e=>e.name===dark)!.stats).toContainEqual(['Mode','Dark Mode only.']);
  }
  for(const e of riku.filter(e=>e.family==='duel'))expect(e.prerequisites).toContain('at least 8 reloadable cards');
  const ansem=recomEntries.find(e=>e.id==='recom-sora-enemy-ansem')!;
  expect(ansem.summary).toBe('In Re:CoM, grants resistance to fire, ice and lightning only.');
  expect(ansem.sources).toContain('https://www.khwiki.com/Sleightblind');
 });
 it('preserves stock recipe alternatives, two-card moves and duel activation boundaries',()=>{
  const byName=(name:string)=>sleights.records.find(r=>r.name===name)!;
  expect(sleights.records.filter(r=>r.recipeAlternatives.length)).toHaveLength(92);
  expect(byName('Zantetsuken').recipeAlternatives[0]).toMatchObject({valueTotal:{comparison:'one-of',values:[0,27]}});
  expect(byName('Sliding Dash').recipeAlternatives[0]).toMatchObject({attackIdentityConstraint:'all-same'});
  expect(byName('Blitz').recipeAlternatives[0]).toMatchObject({attackIdentityConstraint:'all-different'});
  expect(byName('Stardust Blitz').recipeAlternatives[0].slots).toEqual([{card:'Donald Duck'},{card:'Fire'}]);
  expect(byName('Trinity Limit').recipeAlternatives).toHaveLength(5);
  expect(recomEntries.find(e=>e.name==='Trinity Limit')!.recipeAlternatives).toEqual(byName('Trinity Limit').recipeAlternatives);
  expect(byName('Impulse')).toMatchObject({activation:{kind:'duel-victory',breakCount:3},recipeAlternatives:[]});
  for(const r of sleights.records){expect(r.effect,r.id).toBeTruthy();if(r.recipeAlternatives.length)expect(r.thirdCardPrecedence).toBeNull();}
 });
 it('keeps complete progression caps, deferred-choice opportunities and EXP boundaries',()=>{
  expect(progression.records).toHaveLength(99);
  expect(progression.records[1]).toMatchObject({level:2,experienceFromPrevious:25,cumulativeExperience:25});
  expect(progression.records[98]).toMatchObject({level:99,experienceFromPrevious:39204,cumulativeExperience:1313405});
  expect(progression.records.filter(r=>r.rikuApChoiceUnlock).map(r=>r.level)).toEqual(Array.from({length:20},(_,i)=>2+3*i));
  expect(progression.stats.sora.cp.cap).toBe(1625);
  expect(progression.stats.riku).toMatchObject({hp:{cap:560},ap:{cap:30},dp:{cap:99}});
  const level=recomEntries.find(e=>e.id==='recom-steam-level-master-riku')!;
  expect(level.notes?.[0].text).toContain('39,204');
  expect(level.sources).toContain('https://www.khwiki.com/Level');
 });
 it('propagates exact friend windows and item recovery distinctions',()=>{
  const basic=otherCards.records.filter(r=>r.family!=='special');
  expect(basic).toHaveLength(29);for(const r of basic)expect(r.effect,r.id).toBeTruthy();
  expect(basic.find(r=>r.name==='Potion')!.reloadBehavior).toMatchObject({scope:'attack',restoresUnreloadable:false,itemReloadable:false});
  expect(basic.find(r=>r.name==='Hi-Potion')!.reloadBehavior).toMatchObject({scope:'attack',restoresUnreloadable:true});
  expect(basic.find(r=>r.name==='Megalixir')!.reloadBehavior).toMatchObject({scope:'attack-magic-and-summon',restoresUnreloadable:true,resetsReloadCounter:true});
  const pluto=recomEntries.find(e=>e.name==='Pluto')!;
  expect(pluto.instructions).toContain('20%');expect(pluto.instructions).toContain('9');
  expect(recomEntries.find(e=>e.name==='Peter Pan')!.instructions).toContain('Room of Truth');
  expect(recomEntries.find(e=>e.name==='Goofy')!.instructions).toContain('Larxene');
 });
 it('preserves farm exceptions and mushroom card-drop conditions in player guidance',()=>{
  for(const [name,condition] of [['Shadow','Bottomless Darkness'],['Soldier','Crescendo']]){
   const e=recomEntries.find(e=>e.name===name&&e.campaign==='sora')!;
   expect(e.instructions).toContain(condition);expect(e.drops?.[0].location).toContain(condition);
  }
  const white=recomEntries.find(e=>e.name==='White Mushroom'&&e.campaign==='sora')!;
  expect(white.instructions).toContain('three requested');expect(white.instructions).toContain('Warp');
  expect(white.sources).toContain('https://www.khwiki.com/Warp');
 });
 it('keeps combat phase/floor uncertainty explicit and sources combat notes',()=>{
  expect(combat.records).toHaveLength(59);
  expect(combat.bossDecks).toHaveLength(24);
  expect(combat.bossDecks.filter(d=>d.enemy==='Riku Replica')).toHaveLength(6);
  for(const d of combat.bossDecks)for(const c of d.cards)if(c.copiesByValue)expect(Object.values(c.copiesByValue).reduce((a,b)=>a+b,0)).toBe(c.total);
  expect(combat.bossDecks.filter(d=>d.enemy==='Marluxia').map(d=>d.encounterPath[0])).toEqual(['Marluxia (First Form)','Marluxia (Second Form)','Marluxia (Third Form)']);
  expect(combat.records.reduce((n,r)=>n+r.floorStats.length,0)).toBe(379);
  const replica=combat.records.find(r=>r.name==='Riku Replica')!;
  expect(replica.duel).toBeNull();expect(replica.duelAlternatives).toEqual([{cards:5,seconds:6},{cards:7,seconds:8}]);
  const ursula=combat.records.filter(r=>r.name==='Ursula').flatMap(r=>r.floorStats);
  expect(ursula.some(r=>r.rikuFloor==='B11F')).toBe(false);
  const hook=recomEntries.find(e=>e.name==='Hook'&&e.campaign==='riku')!;
  expect(hook.sources).toContain('https://www.khwiki.com/Game:Captain_Hook');
  expect(hook.notes?.some(n=>n.title.startsWith('Enemy stats'))).toBe(true);
  expect(rikuDecks.retainedBossCards).toHaveLength(12);
 });
 it('uses all six canonical minigame routes and keeps later replay rewards unknown',()=>{
  expect(minigames.records).toHaveLength(6);
  for(const r of minigames.records){expect(r.laterReplayReward).toBeNull();expect(recomEntries.find(e=>e.id===r.id)!.instructions).toBe(r.instructions);}
  expect(guide.worlds.find(w=>w.name==='100 Acre Wood')!.summary).toContain('Riku: Not visited');
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
