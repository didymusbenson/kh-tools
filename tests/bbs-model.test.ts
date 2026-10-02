import { describe, expect, it } from 'vitest';
import guide from '../src/games/bbsfm';
import { bbsData,noCrystalAbilityChance,bbsId,abilityGroups,calculateMeld,commandChests,consumingGroups,effectiveOutcomes,finishCondition,inBbsScope,producingGroups,requiredCrystals } from '../src/games/bbsModel';
import { emptyProfile,parseProfile,journalStartRoute } from '../src/games/profile';
import sources from '../src/games/bbsfm/crystal-sources.json';
describe('BBS structured UI data and persistence boundaries',()=>{
 it('keeps every existing meld and finisher identity, with complete outcome probabilities',()=>{
  const recipes=new Set(guide.recipes?.filter(r=>r.group==='Command melding').map(r=>r.id));
  expect(new Set(bbsData.groups.map(g=>g.id))).toEqual(recipes);
  for(const g of bbsData.groups){expect(g.outcomes.reduce((n,o)=>n+o.rate,0)).toBe(100);expect(g.inputs).toHaveLength(2)}
  for(const f of bbsData.finish){expect(guide.entries.some(e=>e.id===f.id)).toBe(true);for(const p of f.parents)expect(bbsData.finish.some(n=>n.name===p&&n.character===f.character)).toBe(true)}
 });
 it('preserves legacy checks and stock without migrating or conflating episodes',()=>{
  const p=emptyProfile('bbsfm');p.checks['bbsfm:aqua:finish:magic-pulse-1']=true;p.checks['bbsfm:aqua:secret-episode:treasure:1']=true;p.owned['bbsfm:terra:material:fire']=4;p.targets['bbsfm:terra:material:fire']=5;
  expect(parseProfile(p,guide)).toEqual(p);expect(p.checks['bbsfm:ventus:finish:air-flair-1']).toBeUndefined();
  const brightcrest=guide.entries.find(e=>e.name==='Brightcrest')!;
  expect(inBbsScope(brightcrest,'Aqua · Final Episode')).toBe(true);expect(inBbsScope(brightcrest,'Aqua')).toBe(false);
  expect(journalStartRoute('bbsfm')).toBe('bbsfm/home');
 });
 it('uses canonical chest records and never aliases same-named rewards between characters',()=>{
  const a=commandChests(guide,'Fira','Aqua'),t=commandChests(guide,'Fira','Terra');
  for(const e of a)expect(guide.entries).toContain(e);
  expect(a.every(e=>e.character==='Aqua')).toBe(true);expect(t.every(e=>!a.some(x=>x.id===e.id))).toBe(true);
 });
 it('provides exact forward, reverse, and ability crystal joins',()=>{
  expect(producingGroups('Aero','Aqua')).toHaveLength(0);expect(consumingGroups('Aero','Aqua').length).toBeGreaterThan(0);
  const rows=abilityGroups('Second Chance','Aqua');expect(rows.length).toBeGreaterThan(0);
  for(const g of rows)expect(g.outcomes.some(o=>requiredCrystals(o,'Second Chance').length>0)).toBe(true);
  for(const g of bbsData.groups)for(const o of g.outcomes)if(!o.attachable)expect(requiredCrystals(o,'Second Chance')).toEqual([]);
 });
 it('validates unordered input levels and previously obtained rare Shotlocks',()=>{
  const g=bbsData.groups.find(g=>g.inputs[0].name!==g.inputs[1].name&&g.inputs.every(i=>i.level>=2))!;
  const [a,b]=g.inputs;
  expect(calculateMeld(g.character,a.name,0,b.name,0)).toHaveLength(0);
  expect(calculateMeld(g.character,b.name,b.level,a.name,a.level).some(r=>r.group.id===g.id)).toBe(true);
  const rare=bbsData.groups.find(g=>g.outcomes.some(o=>!o.attachable&&o.notes.some(n=>n.includes('becomes 0%'))))!;
  const shotlock=rare.outcomes.find(o=>!o.attachable)!;
  const adjusted=effectiveOutcomes(rare,new Set([shotlock.name]));expect(adjusted).toHaveLength(1);expect(adjusted[0].rate).toBe(100);expect(adjusted[0].attachable).toBe(true);
 });
 it('restores corrected meld outcomes without mixing characters or crystal mappings',()=>{
  for(const character of ['Terra','Ventus','Aqua'] as const){
   const group=(suffix:string)=>bbsData.groups.find(g=>g.id===`bbsfm:${character.toLowerCase()}:meld:${suffix}`)!;
   const mine=group('aerora-3-ignite-3');
   expect(mine.outcomes.map(o=>[o.name,o.rate])).toEqual([['Mine Square',100]]);
   expect(mine.outcomes[0].abilities['Pulsing Crystal']).toBe('Leaf Bracer');
   expect(mine.outcomes[0].notes.join(' ')).toContain('Lv1–2');
   expect(group('aerora-3-aerora-3').outcomes.map(o=>[o.name,o.rate])).toEqual(character==='Ventus'?[['Aeroga',90],['Tornado',10]]:[['Aeroga',100]]);
   const magnet=group('magnera-3-stun-edge-3');
   expect(magnet.outcomes.map(o=>[o.name,o.rate])).toEqual([['Collision Magnet',80],['Magnet Spiral',20]]);
   expect(magnet.outcomes[1].abilities['Abounding Crystal']).toBe('Lucky Strike');
   expect(calculateMeld(character,'Stun Edge',2,'Magnera',3)).toHaveLength(0);
   expect(calculateMeld(character,'Stun Edge',3,'Magnera',3).some(r=>r.group.id===magnet.id)).toBe(true);
  }
 });
 it('keeps the BBS command name and conditional Spiderchest drop consistent across views',()=>{
  for(const recipe of guide.recipes??[])expect(`${recipe.name} ${recipe.instructions}`).not.toContain('Confusing Strike');
  expect(producingGroups('Confusion Strike','Aqua').some(g=>g.inputs.some(i=>i.name==='Quick Blitz'))).toBe(true);
  const drop=sources.find(s=>s.enemy==='Spiderchest'&&s.crystal==='Fleeting Crystal')!;
  expect(drop.rate).toBe('3.6% (Shop Lv 1–2 only)');
  expect(drop.conditions).toContain('Absent from the Shop Lv 3–8');
  for(const e of guide.entries.filter(e=>e.category==='materials'&&e.name==='Fleeting Crystal')){
   expect(e.drops?.some(d=>d.enemy==='Spiderchest'&&d.rate===drop.rate)).toBe(true);
   expect(e.sources).toContain(drop.source);
  }
  expect(guide.entries.find(e=>e.id==='bbsfm:bestiary:spiderchest')!.summary).toContain('Fleeting Crystal: 3.6% at 1–2 only');
 });
 it('retains OR prerequisites and typed finish conditions; every crystal has a grounded source',()=>{
  const f=bbsData.finish.find(f=>f.character==='Aqua'&&f.name==='Surprise! 2')!;
  expect(f.parents).toEqual(['Twisted Hours','Surprise! 1']);expect(finishCondition(f)).toBe('Collect 5,200 munny.');expect(f.id).toBe(bbsId('Aqua','finish','Surprise! 2'));
  for(const c of bbsData.crystals)expect(sources.some(s=>s.crystal===c.name&&s.locations.length&&s.source.startsWith('https://'))).toBe(true);
 });
});

describe('BBS October research expansion',()=>{
 it('uses the edition-filtered roster and independently sourced character eligibility',()=>{
  expect(bbsData.commands).toHaveLength(187);
  expect(bbsData.commands.find(c=>c.name==='Focus Block')?.characters).toEqual(['Terra','Ventus']);
  expect(bbsData.commands.find(c=>c.name==='Focus Barrier')?.characters).toEqual(['Aqua']);
  expect(bbsData.commands.find(c=>c.name==='Balloon Letter')?.type).toBe('Item');
  for(const name of ['Taunt','Group Esuna','Dark Link','Stomp'])expect(bbsData.commands.some(c=>c.name===name)).toBe(false);
  expect(bbsData.commands.filter(c=>c.type==='Shotlock')).toHaveLength(17);
 });
 it('exposes known acquisition corrections and all level-up predicates without altering collectible totals',()=>{
  expect(bbsData.research.arena_level_missions).toHaveLength(29);
  const ringer=bbsData.research.tickets.find(t=>t.name==='Ringer Ticket')!;
  expect([ringer.cost,ringer.shop_level,ringer.arena_level]).toEqual([250,1,5]);
  expect(bbsData.commands.find(c=>c.name==='Mine Square')?.enemy_drops.join(' ')).toContain('1.2%, Shop LV 6-8');
  expect(guide.entries.find(e=>e.id==='bbsfm:aqua:secret-episode:treasure:5')?.instructions).toContain('Lower Zone');
  expect(guide.entries.filter(e=>e.collectible===true)).toHaveLength(442);
  expect(guide.entries.filter(e=>e.category==='materials'&&e.instructions?.includes('exact acquisition route is not yet documented'))).toHaveLength(0);
 });
 it('preserves no-crystal probability boundaries independently of ability identity probabilities',()=>{
  expect([noCrystalAbilityChance(1,1),noCrystalAbilityChance(2,2),noCrystalAbilityChance(2,3),noCrystalAbilityChance(3,3),noCrystalAbilityChance(3,4),noCrystalAbilityChance(4,4),noCrystalAbilityChance(6,6)]).toEqual([10,10,20,30,40,50,50]);
 });
});

it('rejects invalid levels instead of indexing a fractional chance row',()=>{
 for (const bad of [NaN,Infinity,-1,0,1.5,7]) expect(noCrystalAbilityChance(bad,3)).toBeUndefined();
});

it('uses named-world shop milestones and preserves unresolved Fire Dash prices',()=>{
 const shop=(name:string)=>bbsData.shops.find(s=>s.name===name)!;
 expect(shop('Blitz').instructions).toContain('Complete Never Land');
 expect(shop('Cure').instructions).toContain('Complete any one');
 expect(shop('Sliding Dash').instructions).toContain('game start');
 expect(shop('Collision Magnet').unlock.any_of).toEqual([{kind:'previously-obtained'}]);
 expect(shop('Fire Dash').instructions).toContain('Price and story gate conflict');
 for(const character of ['terra','ventus','aqua']){
  const command=guide.entries.find(e=>e.id===`bbsfm:${character}:command:blitz`)!;
  expect(command.instructions).toContain('Complete Never Land');
  expect(command.instructions).not.toContain('eight worlds');
  const material=guide.entries.find(e=>e.id===`bbsfm:${character}:material:fire-dash`);
  if(material)expect(material.instructions).toContain('Price and story gate conflict');
 }
});
