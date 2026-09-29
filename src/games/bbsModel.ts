import data from './bbsfm/ui-data.json';
import type { CollectionEntry, GameGuide } from './types';
export const bbsCharacters = ['Terra','Ventus','Aqua'] as const;
export type BbsCharacter = typeof bbsCharacters[number];
export type BbsScope = BbsCharacter | 'Aqua · Final Episode' | 'Aqua · Secret Episode';
export type MeldOutcome = {name:string;rate:number;type:string;abilities:Record<string,string>;attachable:boolean;notes:string[]};
export type MeldGroup = {id:string;character:string;inputs:{name:string;level:number}[];outcomes:MeldOutcome[]};
export type FinishRecord = {id:string;name:string;character:string;level:number;parents:string[];metric:string;target:number;style:string|null};
export const bbsData = data as Omit<typeof data,'groups'|'finish'> & {groups:MeldGroup[];finish:FinishRecord[]};
export const slug = (s:string) => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const bbsId=(character:string,kind:string,name:string)=>`bbsfm:${slug(character)}:${kind}:${slug(name)}`;
export const normalizeScope=(s?:string)=>s?.replace(': ',' · ');
export const isMainCharacter=(s:string):s is BbsCharacter=>bbsCharacters.includes(s as BbsCharacter);
export const validScope=(s:string):s is BbsScope=>isMainCharacter(s)||s==='Aqua · Final Episode'||s==='Aqua · Secret Episode';
export const mainCharacter=(s:string):BbsCharacter=>s.startsWith('Aqua')?'Aqua':s==='Ventus'?'Ventus':'Terra';
export const inBbsScope=(e:{character?:string},scope:string)=>!e.character||normalizeScope(e.character)===scope;
export function bbsHref(section:string,params:Record<string,string|undefined>={}) {const q=new URLSearchParams();Object.entries(params).forEach(([k,v])=>{if(v)q.set(k,v)});return `#/bbsfm/${section}${q.size?'?'+q:''}`;}
export function scopedText(text:string|undefined,character:string) {
  if(!text)return '';
  if(!/^(Terra|Ventus|Aqua)(\/|:)/.test(text))return text;
  return text.split('; ').filter(part=>part.split(':')[0].split('/').includes(mainCharacter(character))).map(part=>part.slice(part.indexOf(':')+1).trim()).join('; ')||text;
}
export function finishCondition(r:FinishRecord) {
  const n=r.target.toLocaleString();
  switch(r.metric){case 'initial':return 'Available from the start.';case 'cp':return `Earn ${n} Command Points.`;case 'steps':return `Take ${n} steps.`;case 'munny-collected':return `Collect ${n} munny.`;case 'command-style-activations':return `Activate ${r.style} ${n} times.`;case 'enemies-defeated':return `Defeat ${n} enemies.`;case 'lethal-hits-survived':return `Survive lethal damage ${n} times.`;default:return `${n} ${r.metric.replaceAll('-',' ')}.`}
}
export const typeOrder=['Attack','Magic','Item','Friendship','Movement','Defense','Reprisal','Shotlock','Other'];
export function eligibleGroups(character:string){return bbsData.groups.filter(g=>g.character===mainCharacter(character));}
export function producingGroups(name:string,character:string){return eligibleGroups(character).filter(g=>g.outcomes.some(o=>o.name===name));}
export function consumingGroups(name:string,character:string){return eligibleGroups(character).filter(g=>g.inputs.some(i=>i.name===name));}
export function abilityGroups(ability:string,character:string){return eligibleGroups(character).filter(g=>g.outcomes.some(o=>o.attachable&&Object.values(o.abilities).includes(ability)));}
export function requiredCrystals(outcome:MeldOutcome,ability:string){return outcome.attachable?Object.entries(outcome.abilities).filter(([,a])=>a===ability).map(([c])=>c):[];}
export function commandChests(guide:GameGuide,name:string,scope:string){return guide.entries.filter(e=>e.category==='treasures'&&e.name===name&&normalizeScope(e.character)===scope);}
export function effectiveOutcomes(g:MeldGroup,obtained:ReadonlySet<string>):MeldOutcome[]{
  const excluded=g.outcomes.filter(o=>!o.attachable&&obtained.has(o.name)&&o.notes.some(n=>n.includes('becomes 0%')));
  if(!excluded.length)return g.outcomes;
  const rareNames=new Set(excluded.map(o=>o.name));
  const rest=g.outcomes.filter(o=>!rareNames.has(o.name));
  const normal=rest.find(o=>o.notes.some(n=>n.includes('becomes 100%')&&[...rareNames].some(name=>n.includes(name))));
  return normal?[{...normal,rate:100}]:g.outcomes;
}
export function calculateMeld(character:string,first:string,firstLevel:number,second:string,secondLevel:number,obtained:ReadonlySet<string>=new Set()) {
  const matched=eligibleGroups(character).filter(g=>g.inputs.length===2&&((g.inputs[0].name===first&&g.inputs[1].name===second&&firstLevel>=g.inputs[0].level&&secondLevel>=g.inputs[1].level)||(g.inputs[1].name===first&&g.inputs[0].name===second&&firstLevel>=g.inputs[1].level&&secondLevel>=g.inputs[0].level)));
  return matched.map(group=>({group,outcomes:effectiveOutcomes(group,obtained)}));
}
export function checkableEntries(entries:CollectionEntry[]){return entries.filter(e=>e.checkable!==false&&e.category!=='materials');}
