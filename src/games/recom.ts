import data from './recom/ui-data.json';
import type { CollectionEntry, GameGuide } from './types';
export type RecomCampaign = 'sora' | 'riku';
export interface RecomEntry extends CollectionEntry {
  campaign: RecomCampaign | 'shared';
  family?: string;
  stats?: string[][];
  cpByValue?: Record<string, number>;
  premiumCp?: number;
  steamApiName?: string | null;
  notes?: {title: string; text: string}[];
  cards?: { name: string; value: number | null }[];
  unit?: string;
  target?: number | null;
  recipeAlternatives?: {slots: {card?: string; family?: string}[]; ordered: boolean; valueTotal?: {comparison: string; values?: number[]; value?: number}; attackIdentityConstraint?: string}[];
  activation?: {kind: string; breakCount: number};
  thirdCardPrecedence?: null;
}
export const recomEntries = data.entries as RecomEntry[];
export const recomWorlds = data.worlds;
export const recomCombat = data.combat;
export const recomBossDecks = data.bossDecks;
export const recomProgression = data.progression;
export const cardFamilies: Record<string, string> = {attack:'Attack Cards',magic:'Magic Cards',summon:'Summon Cards',item:'Item Cards',friend:'Friend Cards',battle:'Battle Cards',enemy:'Enemy Cards',gimmick:'Gimmick Cards',special:'Special Cards',map:'Map Cards',world:'World Cards'};
export const inCampaign = (entry: RecomEntry, campaign: RecomCampaign) => entry.campaign === campaign || entry.campaign === 'shared';
export function recomProgress(entries: RecomEntry[], checks: Record<string, boolean>) {
  const records = entries.filter(e => e.checkable !== false);
  return {done: records.filter(e => checks[e.id]).length, total: records.length};
}
export function recomHref(section = 'contents', campaign: RecomCampaign = 'sora', params: Record<string, string> = {}) {
  const search = new URLSearchParams({campaign,...params});
  return `#/recom/${section}?${search}`;
}
const guide: GameGuide = {
  id:'recom', name:'Re:Chain of Memories', edition:'HD 1.5 ReMIX', accent:'#57894c',
  categories:[{id:'cards',label:'Card Index',icon:'book'},{id:'rewards',label:'World Rewards',icon:'chest'},{id:'sleights',label:'Sleights',icon:'wand'},{id:'minigames',label:'Mini-games',icon:'cup'},{id:'decks',label:'Riku’s Decks',icon:'book'},{id:'shop',label:'Moogle Shop',icon:'shop'},{id:'achievements',label:'Steam Achievements',icon:'medal'}],
  worlds: recomWorlds.map(w=>({name:w.name,summary:`Sora: ${w.soraFloors} · Riku: ${w.rikuFloors ?? 'Not visited'}. Floor ranges are selectable groups, not a fixed visit order.`})),
  entries:recomEntries, coverage:data.coverage,
};
export default guide;
