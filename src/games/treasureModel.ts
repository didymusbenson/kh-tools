import type { CollectionEntry } from './types';

/** Presentation metadata only. Saved checks always remain keyed by the catalogue ID. */
export interface TreasureMetadata {
  id: string; world: string; character?: string; scope: string; kind: string;
  companionOrder: number; journalSlot?: number; sourceNumber?: number;
  orderEvidence: 'source-supported' | 'app-defined' | 'unconfirmed';
  included: boolean; exclusionReason?: string; evidenceId?: string;
  acquisitionGroupId?: string; group?: string;
}
export interface TreasureMap {game:string; records:TreasureMetadata[]; geometry?:{columns:number; confidence:string; note:string}}
const maps = Object.values(import.meta.glob<TreasureMap>('./treasure-data/*.json', {eager:true, import:'default'}));
export const treasureMap = (game:string) => maps.find(m=>m.game===game);
export type TreasureEntry = Pick<CollectionEntry,'id'|'category'|'name'|'world'|'area'|'summary'|'instructions'|'prerequisites'|'reward'|'missability'|'uncertainty'>;
export interface TreasureCell {entry:TreasureEntry; metadata:TreasureMetadata}
export interface TreasurePartition {id:string; world:string; character:string; scope:string; group:string; cells:TreasureCell[]}
export function treasurePartitions(game:string, entries:TreasureEntry[]):TreasurePartition[] {
  const byId=new Map(entries.map(e=>[e.id,e]));
  const partitions=new Map<string,TreasurePartition>();
  for(const m of treasureMap(game)?.records||[]) {
    const entry=byId.get(m.id);
    if(!entry||!m.included)continue;
    const group=game==='kh1fm'?(['chest','container'].includes(m.kind)?'Chests & containers':'Other acquisitions'):'';
    const id=[m.character||'',m.scope,m.world,group].join('|');
    const p=partitions.get(id)||{id,world:m.world,character:m.character||'',scope:m.scope,group,cells:[]};
    // Verified aliases share an acquisition, but separate equal-name chests do not.
    if(!m.acquisitionGroupId||!p.cells.some(c=>c.metadata.acquisitionGroupId===m.acquisitionGroupId))p.cells.push({entry,metadata:m});
    partitions.set(id,p);
  }
  for(const p of partitions.values())p.cells.sort((a,b)=>(a.metadata.journalSlot??a.metadata.companionOrder)-(b.metadata.journalSlot??b.metadata.companionOrder));
  return [...partitions.values()];
}
export function slotLabel(cell:TreasureCell) {
  const m=cell.metadata;
  return m.journalSlot!==undefined&&m.orderEvidence==='source-supported'?`Journal #${m.journalSlot}`:`Guide #${m.companionOrder}`;
}
export function treasureMatches(cell:TreasureCell, checks:Record<string,boolean>, filters:{q?:string;area?:string;status?:string;group?:string}) {
  const e=cell.entry;
  return (!filters.q||[e.name,e.area,e.summary,e.instructions,e.reward].join(' ').toLowerCase().includes(filters.q.toLowerCase()))&&
    (!filters.area||e.area===filters.area)&&(!filters.group||cell.metadata.group===filters.group)&&
    (!filters.status||filters.status==='all'||(filters.status==='done'?!!checks[e.id]:!checks[e.id]));
}
const safeDecode=(s:string)=>{try{return decodeURIComponent(s);}catch{return s;}};
export function hasTreasureBoard(game:string, route:string) {
  const [path,query='']=route.split('?'),section=path.split('/')[1],params=new URLSearchParams(query);
  if(game==='kh1fm'&&params.get('list')==='postcards')return false;
  const selected=params.get('entry')||params.get('item')||(section==='entry'?safeDecode(path.split('/').slice(2).join('/')):'');
  if(selected)return !!treasureMap(game)?.records.some(m=>m.id===selected&&m.included);
  if(game==='recom')return section==='rewards'&&params.get('campaign')!=='riku';
  return section==='treasures';
}
export function scopeLabel(scope:string) {return ({main:'Main story',prologue:'Prologue guide',secret:'Secret Episode',remind:'Re Mind'} as Record<string,string>)[scope]||scope;}
