import type { GuideEntry } from './types';
import { collectibleProgress } from './progress';

export interface WorldCategory {
  id: string; title: string; section: string; categories: string[]; description: string;
}
export const KH1_WORLD_CATEGORIES: WorldCategory[] = [
  {id:'treasures',title:'Treasures',section:'treasures',categories:['treasure'],description:'Chests, containers and one-time rewards.'},
  {id:'trinities',title:'Trinities',section:'trinities',categories:['trinity'],description:'Trinity marks and their rewards.'},
  {id:'upgrades',title:'Upgrades',section:'reference',categories:['magic','ability','summon'],description:'Magic, abilities and summons.'},
  {id:'enemies',title:'Heartless / Enemies',section:'bestiary',categories:['enemy'],description:'Enemy encounters, stats and drops. Reference only.'},
  {id:'challenges',title:'Challenges',section:'challenges',categories:['boss','cup','minigame','gummi'],description:'Bosses, cups, mini-games and Gummi missions.'},
  {id:'reports',title:'Ansem’s Reports',section:'ansem-reports',categories:['report'],description:'Report acquisitions.'},
  {id:'dalmatians',title:'Dalmatians',section:'dalmatians',categories:['dalmatian'],description:'Puppy groups; each chest is one collection action.'},
  {id:'torn-pages',title:'Torn Pages',section:'torn-pages',categories:['torn-page'],description:'Pages for Merlin’s book.'},
  {id:'postcards',title:'Postcards',section:'reference',categories:['postcard'],description:'Collecting cards and mailing rewards.'},
  {id:'equipment',title:'Equipment & Items',section:'equipment',categories:['weapon','accessory','item'],description:'Weapons, accessories and item records.'},
  {id:'recipes',title:'Synthesis',section:'synthesis/recipes',categories:['recipe'],description:'Workshop recipes and first crafts.'},
  {id:'materials',title:'Materials',section:'synthesis/materials',categories:['material'],description:'Material sources and farming notes. Reference only.'},
  {id:'notes',title:'World Notes',section:'reference',categories:[],description:'World routes, strategies and other reference notes.'},
];
const KH1_WORLDS = new Set(['Destiny Islands','Traverse Town','Wonderland','Olympus Coliseum','Deep Jungle','Agrabah','Monstro','Atlantica','Halloween Town','Neverland','100 Acre Wood','Hollow Bastion','End of the World','Dive to the Heart']);
export function kh1EntryWorlds(entry: GuideEntry): string[] {
  const worlds = new Set(entry.world ? [entry.world] : []);
  // Enemy.world is a farming location, not an exhaustive encounter list.
  if (entry.category === 'enemy') {
    if (typeof entry.facts?.Worlds === 'string') entry.facts.Worlds.split(',').map(s=>s.trim()).filter(w=>KH1_WORLDS.has(w)).forEach(w=>worlds.add(w));
    for (const key of Object.keys(entry.facts || {})) if (key.endsWith(' HP')) key.slice(0,-3).split(/[;,]/).map(w=>w.trim()).filter(w=>KH1_WORLDS.has(w)).forEach(w=>worlds.add(w));
  }
  return [...worlds];
}
export function kh1InWorld(entry: GuideEntry, world: string) { return kh1EntryWorlds(entry).includes(world); }
export function kh1CategoryFor(entry: GuideEntry) {
  if (entry.id.startsWith('kh1fm-postcard-mail-')) return KH1_WORLD_CATEGORIES.find(c=>c.id==='postcards')!;
  return KH1_WORLD_CATEGORIES.find(c=>c.categories.includes(entry.category)) || KH1_WORLD_CATEGORIES.at(-1)!;
}
export function kh1WorldCategoryEntries(entries: GuideEntry[], world: string, category: WorldCategory) {
  return entries.filter(e=>kh1InWorld(e,world)&&kh1CategoryFor(e).id===category.id);
}
export function kh1WorldCategoryHref(category: WorldCategory, world: string) {
  const params = new URLSearchParams({world, fromWorld:world, worldCategory:category.id});
  if(category.id==='treasures') params.set('overview','world');
  return '#/kh1fm/'+category.section+'?'+params;
}
export function kh1WorldCategories(entries: GuideEntry[], world: string, checks: Record<string,boolean>) {
  return KH1_WORLD_CATEGORIES.map(category=>{
    const members=kh1WorldCategoryEntries(entries,world,category);
    const tracked=members.filter(e=>e.checkable);
    const progress=collectibleProgress(tracked.map(e=>({...e,collectible:true})),checks);
    const references=members.filter(e=>!e.checkable).length;
    return {...category, members, completed:progress.completed,total:progress.total,references,complete:progress.total>0&&progress.completed===progress.total};
  }).filter(category=>category.members.length);
}
