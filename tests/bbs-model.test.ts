import { describe, expect, it } from 'vitest';
import guide from '../src/games/bbsfm';
import { bbsData,bbsId,abilityGroups,calculateMeld,commandChests,consumingGroups,effectiveOutcomes,finishCondition,inBbsScope,producingGroups,requiredCrystals } from '../src/games/bbsModel';
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
 it('retains OR prerequisites and typed finish conditions; every crystal has a grounded source',()=>{
  const f=bbsData.finish.find(f=>f.character==='Aqua'&&f.name==='Surprise! 2')!;
  expect(f.parents).toEqual(['Twisted Hours','Surprise! 1']);expect(finishCondition(f)).toBe('Collect 5,200 munny.');expect(f.id).toBe(bbsId('Aqua','finish','Surprise! 2'));
  for(const c of bbsData.crystals)expect(sources.some(s=>s.crystal===c.name&&s.locations.length&&s.source.startsWith('https://'))).toBe(true);
 });
});
