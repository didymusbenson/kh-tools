import { JournalUtilityBar } from '../components/JournalUtilityBar';
import {TreasureBoard} from './TreasureBoard';
import {hasTreasureBoard,treasureCharacterHref} from '../games/treasureModel';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { CollectionEntry, CollectionRecipe, GameGuide } from '../games/types';
import { addTargets, type GuideProfile } from '../games/profile';
import { chestReference, entryTitle } from '../domain/entryPresentation';
import { inWorld, sortMaterials } from '../games/presentation';
import { useIndexCapacity } from './useIndexCapacity';
import { JournalNotePages } from './JournalNotePages';
import { FarmingMaterialRow, FarmingItinerary } from './FarmingPlan';
import { buildGuideFarmingPlan } from '../games/farmingPlan';
import { Icon, type IconName } from '../components/Icon';
import './ddd-journal.css';

type Update = (change: (p: GuideProfile) => GuideProfile, recovery?: boolean) => Promise<boolean>;
type IndexItem = { id: string; name: string; href: string; meta?: string; checkId?: string; character?: string };
const rootSections = [
  ['worlds', 'Worlds & Treasures', 'Find treasures and records in each sleeping world.'],
  ['spirits', 'Dream Eaters', 'View Spirit details, Ability Links and dispositions.'],
  ['records', 'Game Records', 'View Links, Dive Mode, challenges and Link Portals.'],
  ['workshop/recipes', 'Spirit Creation', 'Look up recipes, Dream Pieces and your farming plan.'],
  ['collection', 'Collection', 'Browse every collection in the report.'],
  ['reference', 'Mechanics', 'Read practical notes for the journey.'],
  ['awards', 'Trophy Shelf', 'View the requirements for in-game trophies.'],
  ['completion', 'Completion', 'Review your recorded collection progress.'],
];
const decode = (value: string) => { try { return decodeURIComponent(value); } catch { return value; } };

/** Presentation only: keep the factual catalog unchanged and its provenance out of reading pages. */
export function dddReadingText(text = '') {
  return text.replace(/\s*Source:\s*https?:\/\/\S+/gi, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/Additional source-reported connectors:/g, 'Additional reported connections:')
    .replace(/source grid/gi, 'board grid')
    .replace(/source conflict:/gi, 'Board note:')
    .replace(/not a newly verified minimum/g, 'the earliest requirement is not confirmed')
    .replace(/remains unverified/g, 'is not confirmed')
    .replace(/This route is supported by PS4 player farming reports; /g, '')
    .replace(/The mechanics source describes this selected recipe route as guaranteeing the intended breed; /g, 'Selecting the named recipe guarantees its intended breed; ')
    .replace(/The source describes the named recipe route as guaranteeing its intended breed:/g, 'For a guaranteed named-recipe result:')
    .replace(/Exact command bonuses are recorded in the factual catalog\. ?/g, '')
    .replace(/Pickup landmark is sourced; earliest/g, 'Earliest')
    .replace(/are not comprehensively established/g, 'are not confirmed')
    .replace(/Source built-in portal number; exact/g, 'Exact')
    .replace(/Area is sourced; exact/g, 'Exact')
    .replace(/Area and HD guide landmark are sourced; exhaustive/g, 'Exhaustive')
    .replace(/Source board topology and gates are extracted; disposition/g, 'Disposition')
    .replace(/Pair facts are sourced; duration/g, 'Duration')
    .replace(/Finite chests, extracted shop stock, distinct normal\/rare\/portal drops and reported expiration sources are included\. ?/g, '')
    .replace(/Source base-stat values are incomplete\./g, 'Some base stats are unknown.')
    .replace(/Source omits some disposition body-part instructions\./g, 'Some disposition-change body parts are unknown.')
    .replace(/All match lineups are extracted\. ?/g, '')
    .replace(/Per-round medal cells are blank for some cups/g, 'Per-round medal values are unknown for some cups')
    .replace(/the adapter omission is not proof of an in-game locked branch/g, 'the missing reciprocal graphic does not prove an in-game locked branch')
    .replace(/[ \t]{2,}/g, ' ').trim();
}

function Ornament({corner}: {corner: string}) {
  return <svg className={`ddd-ornament ddd-ornament-${corner}`} viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"><path d="M14 106C43 91 8 70 26 48C40 30 22 13 16 28C10 43 40 48 49 30C60 8 82 13 79 25C76 39 58 32 64 21C76 5 92 43 108 18"/><path d="M16 8C18 32 40 10 44 24M9 69C34 72 34 50 47 49M35 91C55 76 38 70 54 64M70 11C93 3 87 31 101 29"/></g><path fill="currentColor" d="m30 44 15 1 11-17 5 20 21 3-18 11 1 15-12-9-14 12 3-17-15-5 13-4z"/><circle cx="49" cy="51" r="3" fill="var(--ddd-paper)"/></svg>;
}
function Crown() {
  return <svg className="ddd-crown" viewBox="0 0 200 160" aria-hidden="true"><path d="m20 45 43 29L100 5l37 69 43-29-28 105H48z"/><circle cx="65" cy="91" r="13"/><circle cx="135" cy="91" r="13"/></svg>;
}
function SpiritMark() {
  return <span className="ddd-spirit-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M20 34C15 29 5 24 8 16c2-5 8-4 9 1C6 9 17 1 20 12c3-11 14-3 3 5 1-5 7-6 9-1 3 8-7 13-12 18Zm0-22v15m-9-6 9 10 9-10"/></svg></span>;
}
function Quantity({label, value, ready, save}: {label:string; value?:number; ready:boolean; save:(n:number|undefined)=>Promise<boolean>}) {
  const [draft,setDraft]=useState(value===undefined?'':String(value));
  const [error,setError]=useState('');
  useEffect(()=>setDraft(value===undefined?'':String(value)),[value]);
  async function commit() {
    const n=draft===''?undefined:Number(draft);
    if(n!==undefined&&(!/^\d+$/.test(draft)||!Number.isInteger(n)||n<0||n>999999)){setError('Use a whole number from 0 to 999999.');return;}
    if(n===value){setError('');return;}
    setError(await save(n)?'':'Could not save. Try again.');
  }
  return <label className="ddd-quantity"><span>{label}</span><input type="number" inputMode="numeric" min="0" max="999999" step="1" placeholder="?" value={draft} disabled={!ready} aria-invalid={!!error} onChange={e=>setDraft(e.target.value)} onBlur={()=>void commit()} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}}/>{error&&<small role="alert">{error}</small>}</label>;
}

export function DddJournal({guide,route,profile,ready,error,notice,updateNotice,update,progressPage,retry}: {
  guide:GameGuide; route:string; profile:GuideProfile; ready:boolean; error:string; notice:string;
  updateNotice:ReactNode; update:Update; progressPage:ReactNode; retry:()=>void;
}) {
  const [path,query='']=route.split('?'), parts=path.split('/');
  const section=parts[1]||'contents', params=new URLSearchParams(query);
  const workshop=section==='workshop';
  const tab=workshop&&['materials','plan'].includes(parts[2])?parts[2]:'recipes';
  const planMode=workshop&&tab==='plan', planLeaf=params.get('view')==='route'?'route':'materials';
  const rawWorld=section==='worlds'&&parts[2]?decode(parts.slice(2).join('/')):params.get('world')||'';
  const world=rawWorld==='all'?'':rawWorld;
  const character=['Sora','Riku'].includes(params.get('character')||'')?params.get('character')!:'all';
  const q=params.get('q')||'',status=params.get('status')||'';
  const selectedId=params.get('entry')||params.get('item')||'';
  const root=section==='contents', worldList=section==='worlds'&&!world, worldData=guide.worlds.find(w=>w.name===world);
  const worldHub=section==='worlds'&&!!worldData;
  const directory=['collection','records','completion'].includes(section)||worldHub;
  const category=guide.categories.find(c=>c.id===section);
  const heading=root?'Reports':worldHub?world:worldList?'Worlds & Treasures':workshop?'Spirit Creation':section==='spirits'?'Dream Eaters':section==='records'?'Game Records':section==='collection'?'Collection':section==='awards'?'Trophy Shelf':section==='completion'?'Completion':section==='progress'?'Save & Settings':section==='search'?'Search':category?.label||'Page not found';
  const known=root||worldList||directory||workshop||section==='progress'||section==='search'||!!category;
  const [search,setSearch]=useState(q),[help,setHelp]=useState(rootSections[0][2]);
  const [message,setMessage]=useState(''),[busy,setBusy]=useState(false),[activeId,setActiveId]=useState(''),[filtersOpen,setFiltersOpen]=useState(false);
  const [pendingCheck,setPendingCheck]=useState<{id:string;checked:boolean}|null>(null);
  const main=useRef<HTMLElement>(null),lastEntry=useRef('');
  const scope=(e:{character?:string})=>character==='all'||!e.character||e.character==='Both'||e.character===character;
  const entries=guide.entries, scoped=entries.filter(scope), byId=new Map(entries.map(e=>[e.id,e]));
  const materials=entries.filter(e=>['material','materials'].includes(e.category)).sort(sortMaterials);
  const count=(list:CollectionEntry[])=>{const c=list.filter(e=>e.checkable!==false);return c.length?`${c.filter(e=>profile.checks[e.id]).length} / ${c.length}`:`${list.length} notes`;};
  const categoryEntries=(id:string)=>scoped.filter(e=>(e.category===id||e.categories?.includes(id))&&(!world||inWorld(e,world)));
  const href=(destination:string,values:Record<string,string>={})=>{
    const p=new URLSearchParams(character!=='all'?{character}:{});
    for(const [k,v] of Object.entries(values))if(v&&v!=='all')p.set(k,v);
    return `#/dddhd/${destination}${p.size?'?'+p:''}`;
  };
  function changed(changes:Record<string,string>,destination=parts.slice(1).join('/')||'contents') {
    const next=Object.fromEntries(params);
    for(const [key,value] of Object.entries(changes))value?next[key]=value:delete next[key];
    if('page' in changes||'q' in changes||'status' in changes||'world' in changes)delete next.focus;
    // href carries the current character unless explicitly overwritten below.
    if(changes.character==='all')return `#/dddhd/${destination}${Object.keys(next).filter(k=>k!=='character').length?'?'+new URLSearchParams(Object.fromEntries(Object.entries(next).filter(([k])=>k!=='character'))):''}`;
    return href(destination,next);
  }
  const matches=(e:CollectionEntry)=>scope(e)&&(planMode?(!q||e.name.toLowerCase().includes(q.toLowerCase())):(!world||inWorld(e,world))&&(!q||[e.name,e.world,e.area,e.summary,e.instructions].join(' ').toLowerCase().includes(q.toLowerCase()))&&(!status||status==='all'||e.id===selectedId||(e.checkable!==false&&(status==='done'?!!profile.checks[e.id]:!profile.checks[e.id]))));
  const plannedMaterials=materials.filter(e=>scope(e)&&(profile.targets[e.id]||0)>0);
  const farmingPlan=buildGuideFarmingPlan(guide,plannedMaterials,profile.owned,profile.targets,{character});
  const sourceEntries=workshop?materials:section==='search'?entries:entries.filter(e=>e.category===section||e.categories?.includes(section));
  const matchingEntries=sourceEntries.filter(e=>matches(e)&&(!workshop||tab!=='plan'||(profile.targets[e.id]||0)>0));
  const matchingRecipes=(guide.recipes||[]).filter(r=>scope(r)&&(!q||[r.name,r.group].join(' ').toLowerCase().includes(q.toLowerCase()))&&(!status||status==='all'||r.id===selectedId||(status==='done'?!!profile.checks[r.id]:!profile.checks[r.id])));
  const selectedEntry=selectedId?sourceEntries.find(e=>e.id===selectedId&&scope(e)&&(!world||inWorld(e,world))):undefined;
  const selectedRecipe=selectedId&&workshop&&tab==='recipes'?(guide.recipes||[]).find(r=>r.id===selectedId&&scope(r)):undefined;
  let items:IndexItem[]=[];
  if(root)items=rootSections.map(([id,name,meta])=>({id,name,meta,href:href(id)}));
  else if(worldList)items=guide.worlds.map(w=>({id:w.name,name:w.name,meta:count(scoped.filter(e=>e.category==='treasures'&&e.world===w.name)),href:href(`worlds/${encodeURIComponent(w.name)}`)}));
  else if(directory){
    const categories=guide.categories.filter(c=>section==='completion'?categoryEntries(c.id).some(e=>e.checkable!==false):section==='records'?['links','dives','challenges','portals'].includes(c.id):!worldHub||categoryEntries(c.id).length);
    items=categories.map(c=>({id:c.id,name:c.label,meta:count(categoryEntries(c.id)),href:href(c.id,world?{world}:{})}));
    if(section==='records')items.splice(1,0,{id:'reality-shift',name:'Reality Shifts',href:href('reference',{entry:'dddhd:reference:reality-shift'})});
    if(section==='collection')items.unshift({id:'worlds',name:'Browse by World',href:href('worlds')},{id:'workshop',name:'Spirit Creation',href:href('workshop/recipes')});
  }else if(workshop&&tab==='recipes')items=matchingRecipes.map(r=>({id:r.id,name:r.name,meta:r.group,href:changed({entry:r.id}),checkId:r.id}));
  else items=matchingEntries.map(e=>({id:e.id,name:entryTitle(e),meta:section==='spirits'?'':[e.character&&e.character!=='Both'?e.character:'',e.world!==world?e.world:'',e.area,chestReference(e)].filter(Boolean).join(' · '),href:changed({entry:e.id}),checkId:!workshop&&e.checkable!==false?e.id:undefined,character:e.character}));
  const {ref:indexRef,capacity,anchorId,clearAnchor}=useIndexCapacity(`${section}:${tab}:${world}:${character}:${q}:${status}:${!!selectedId}`,planMode?116:root?44:section==='completion'?88:50,false,route);
  const pages=Math.max(1,Math.ceil(items.length/capacity));
  const returnPosition=items.findIndex(e=>e.id===((planMode&&anchorId)||params.get('focus')||(planMode?selectedId:'')));
  const page=Math.max(0,Math.min(pages-1,returnPosition>=0?Math.floor(returnPosition/capacity):Math.floor(Number(params.get('page')))||0));
  const shown=items.slice(page*capacity,(page+1)*capacity);
  const visibleSelection=shown.find(item=>item.id===activeId)||shown[0];
  const listBack=changed({entry:'',item:'',focus:selectedId});
  const parent=!planMode&&selectedId?listBack:worldHub?href('worlds'):world?href(`worlds/${encodeURIComponent(world)}`):root?'#/':href('contents');
  const title=planMode?'Farming Plan':selectedRecipe?.name||selectedEntry&&entryTitle(selectedEntry)||heading;
  const parentLabel=!planMode&&selectedId?heading:worldHub?'Worlds':world?world:'Reports';
  const focusedRoute = useRef<string | null>(null);
  useEffect(()=>{
    // Reflowing a farming leaf is not navigation. Keep the quantity editor's
    // restored focus when the larger viewport changes its measured capacity.
    if (planMode && focusedRoute.current === route) return;
    setSearch(q);setMessage('');setActiveId('');setFiltersOpen(false);
    setHelp(planMode?'Edit material totals, then follow the world route.':root?rootSections[0][2]:selectedId?'Read the entry, record discoveries and turn the notes.':workshop?'Choose a recipe or look up Dream Pieces.':'Choose an entry to view its details.');
    document.title=`${heading} · Dream Drop Distance HD`;
    const frame=requestAnimationFrame(()=>{
      focusedRoute.current = route;
      if(hasTreasureBoard(guide.id,route))return;
      const returnId=params.get('focus')||lastEntry.current;
      const link=!selectedId&&returnId?main.current?.querySelector<HTMLAnchorElement>(`[data-entry-id="${CSS.escape(returnId)}"]`):null;
      if(link)link.focus({preventScroll:true});else main.current?.focus({preventScroll:true});
    });
    if(selectedId)lastEntry.current=selectedId;
    return ()=>cancelAnimationFrame(frame);
  },[route,capacity]);
  async function act(change:(p:GuideProfile)=>GuideProfile,text:string) {
    setBusy(true);
    try {setMessage(await update(change)?text:'The change could not be saved.');}
    finally {setBusy(false);}
  }
  async function saveCheck(id:string,checked:boolean) {
    setPendingCheck({id,checked});
    try {await act(p=>({...p,checks:{...p.checks,[id]:checked}}),'Record saved.');}
    finally {setPendingCheck(null);}
  }
  function check(id:string,name:string,character?:string,label='Recorded') {
    return <label className="ddd-check"><input type="checkbox" aria-label={`Complete ${name}${character?` (${character})`:''}`} checked={pendingCheck?.id===id?pendingCheck.checked:!!profile.checks[id]} disabled={!ready||busy} onChange={e=>void saveCheck(id,e.target.checked)}/><span>{label}</span></label>;
  }
  function saveQuantity(field:'owned'|'targets',id:string,n:number|undefined) {
    return update(p=>{const values={...p[field]};if(n===undefined)delete values[id];else values[id]=n;return {...p,[field]:values};});
  }
  const pagination=<nav className="ddd-pagination" aria-label="Index pages" onClick={e=>{if((e.target as Element).closest('a[href]'))clearAnchor();}}><a aria-label="Previous index page" aria-disabled={page===0} tabIndex={page===0?-1:0} href={page===0?undefined:changed({page:String(page-1),entry:'',item:''})}>◀</a><span>{page+1} / {pages}</span><a aria-label="Next index page" aria-disabled={page+1>=pages} tabIndex={page+1>=pages?-1:0} href={page+1>=pages?undefined:changed({page:String(page+1),entry:'',item:''})}>▶</a></nav>;
  const filters=<form id="ddd-filters" className={`ddd-filters ${filtersOpen?'ddd-filters-open':''}`} onSubmit={e=>{e.preventDefault();location.hash=changed({q:search,page:'',entry:'',item:''});}}><label className="ddd-search"><span>Find an entry</span><input type="search" aria-label="Find an entry" placeholder="Name, world or notes…" value={search} onChange={e=>setSearch(e.target.value)}/></label><button type="submit">Find</button>{(!workshop||tab!=='recipes')&&<label>World<select aria-label="Filter by world" value={world} onChange={e=>{location.hash=changed({world:e.target.value,page:'',entry:''});}}><option value="">All worlds</option>{guide.worlds.map(w=><option key={w.name}>{w.name}</option>)}</select></label>}{(!workshop||tab==='recipes')&&<label>Show<select aria-label="Completion" value={status} onChange={e=>{location.hash=changed({status:e.target.value,page:'',entry:''});}}><option value="">All entries</option><option value="remaining">Remaining</option><option value="done">Completed</option></select></label>}{(q||status)&&<a className="ddd-clear" href={changed({q:'',status:'',page:'',entry:''})}>Clear</a>}</form>;
  const workshopTabs=<nav className="ddd-workshop-tabs" aria-label="Spirit Creation sections">{[['recipes','Recipes'],['materials','Dream Pieces'],['plan','Farming Plan']].map(([id,label])=><a key={id} href={href(`workshop/${id}`)} aria-current={tab===id?'page':undefined}>{label}</a>)}</nav>;
  function readingParagraphs(text?:string) {
    return dddReadingText(text).split(/\n\n+|(?=Ability Link nodes:|Connections:|Base values:|Disposition changes:|Repeatable HD farming route:)/).filter(Boolean).map((paragraph,i)=><p key={i}>{paragraph}</p>);
  }
  function adjacent() {
    const position=items.findIndex(e=>e.id===selectedId);
    return <nav className="ddd-adjacent" aria-label="Adjacent entries"><a aria-label="Previous entry" aria-disabled={position<=0} href={position>0?changed({entry:items[position-1].id}):undefined}>◀</a><a aria-label="Next entry" aria-disabled={position<0||position+1>=items.length} href={position>=0&&position+1<items.length?changed({entry:items[position+1].id}):undefined}>▶</a></nav>;
  }
  function record(e:CollectionEntry) {
    const isMaterial=['material','materials'].includes(e.category);
    const recipes=(guide.recipes||[]).filter(r=>r.group===e.name);
    return <article className="ddd-detail"><div className="ddd-detail-heading"><h2>{entryTitle(e)}</h2>{adjacent()}</div><div className="ddd-record-actions"><span>{[e.character,e.world,e.area,chestReference(e)].filter(Boolean).join(' · ')|| (e.category==='spirits'?'Shared Spirit record':category?.label||'Journal notes')}</span>{e.checkable!==false&&check(e.id,e.name,e.character)}</div>

      <JournalNotePages key={e.id}><div className="ddd-material-tools">{isMaterial&&<><div className="ddd-stock"><Quantity key={`owned:${e.id}`} label={`Owned ${e.name}`} value={profile.owned[e.id]} ready={ready} save={n=>saveQuantity('owned',e.id,n)}/>{tab==='plan'&&<><Quantity key={`target:${e.id}`} label={`Target ${e.name}`} value={profile.targets[e.id]} ready={ready} save={n=>saveQuantity('targets',e.id,n)}/><span>Remaining <strong>{profile.owned[e.id]===undefined?'?':Math.max(0,(profile.targets[e.id]||0)-profile.owned[e.id])}</strong></span></>}</div><div className="ddd-material-actions"><button disabled={!ready||busy} onClick={()=>void act(p=>{const targets={...p.targets};tab==='plan'?delete targets[e.id]:targets[e.id]=targets[e.id]||1;return {...p,targets};},tab==='plan'?'Removed from farming plan.':'Added to farming plan.')}>{tab==='plan'?'Remove from farming plan':profile.targets[e.id]?'In farming plan':'Add to farming plan'}</button><small>Blank stock means unknown.</small></div></>}</div>{isMaterial&&<p className="ddd-small">Blank stock means unknown. Farming targets are the total stock to have.</p>}<div className="ddd-reading-prose">{e.summary&&e.summary!==e.area&&readingParagraphs(e.summary)}{readingParagraphs(e.instructions)}<dl>{[['Requires',e.prerequisites],['Reward',e.reward],['Missability',e.missability]].filter(([,v])=>v).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{dddReadingText(value)}</dd></div>)}</dl>{e.drops?.map((d,i)=><section className="ddd-drop" key={i}><h3>{d.enemy} · {d.rate}</h3>{d.location&&<p>{d.location}</p>}{readingParagraphs(d.details)}</section>)}{e.uncertainty&&<section><h3>Practical notes</h3>{readingParagraphs(e.uncertainty)}</section>}{e.category==='spirits'&&!!recipes.length&&<section><h3>Spirit Creation</h3>{recipes.map(r=><a className="ddd-related" key={r.id} href={href('workshop/recipes',{entry:r.id})}>{r.name} ›</a>)}</section>}</div></JournalNotePages>
    </article>;
  }
  function recipe(r:CollectionRecipe) {
    return <article className="ddd-detail"><div className="ddd-detail-heading"><h2>{r.name}</h2>{adjacent()}</div><div className="ddd-record-actions"><span>{r.group}</span>{check(r.id,r.name,undefined,'Created')}</div><JournalNotePages key={r.id}><div className="ddd-material-actions"><button disabled={!ready||busy} onClick={()=>void act(p=>addTargets(p,r.ingredients),'Ingredients added to your farming plan.')}>Add ingredients to farming plan</button><small>Creation checks do not spend stock.</small></div><p className="ddd-small">Creation checks do not spend stock.</p><h3>Dream Pieces</h3><ul className="ddd-ingredients">{r.ingredients.map(i=><li key={i.id}><a href={href('workshop/materials',{entry:i.id})}>{byId.get(i.id)?.name||i.id}</a><span>{profile.owned[i.id]??'?'} / {i.quantity}</span></li>)}</ul><p className="ddd-small">Owned / required for one attempt</p>{readingParagraphs(r.instructions)}<a className="ddd-related" href={href('reference',{entry:'dddhd:reference:spirit-creation'})}>Creation ranks & custom recipes ›</a></JournalNotePages></article>;
  }
  function index() {
    return <><nav ref={indexRef} className={`ddd-index ${root?'ddd-root-index':''} ${section==='completion'?'ddd-completion-index':''}`} aria-label={root?'Report sections':`${heading} entries`}>{shown.map(item=><div className="ddd-index-row" key={item.id}><a data-entry-id={item.id} data-active={(activeId||shown[0]?.id)===item.id} href={item.href} onFocus={()=>{setActiveId(item.id);setHelp(root?item.meta||'':`View ${item.name}.`);}} onMouseEnter={()=>{setActiveId(item.id);setHelp(root?item.meta||'':`View ${item.name}.`);}}>{section==='completion'&&<span className="ddd-completion-icon"><Icon name={(guide.categories.find(c=>c.id===item.id)?.icon||'book') as IconName} size={35}/></span>}{section==='spirits'&&<SpiritMark/>}<span>{item.name}{!root&&!directory&&!worldList&&item.meta&&<small>{item.meta}</small>}</span>{(directory||worldList)&&item.meta&&<small className="ddd-count">{item.meta}</small>}</a>{item.checkId&&check(item.checkId,byId.get(item.id)?.name||item.name,item.character)}</div>)}</nav>{!items.length&&<div className="ddd-empty"><h2>{workshop&&tab==='plan'?'Your farming plan is empty':'No matching entries'}</h2><p>{workshop&&tab==='plan'?'Add recipe ingredients or Dream Pieces.':'Try another name, character or world.'}</p></div>}{(!root||pages>1)&&pagination}</>;
  }
  const treasureMode=hasTreasureBoard(guide.id,route);
  return <div className={`ddd-native ${planMode?`ddd-plan ddd-plan-show-${planLeaf}`:''}`}>
    <a className="skip-link" href="#ddd-reading" onClick={e=>{e.preventDefault();main.current?.focus();}}>Skip to reports</a>
    
    <section className="ddd-volume" aria-label="Dream Drop Distance Reports">
      <header className={`ddd-header ${worldHub?'ddd-world-context':''}`}><nav className={`ddd-ribbons ${parentLabel==='Reports'?'ddd-top-level':''}`} aria-label="Report location">{!root&&parentLabel!=='Reports'&&<a href={parent}>{parentLabel}</a>}{!root&&<h1 title={title}>{planMode?'Farming Plan':selectedId?title:heading}</h1>}{root&&<h1 className="ddd-sr">Reports</h1>}</nav><a className="ddd-wordmark" href={href('contents')} aria-label="Reports contents">REPORTS</a></header>
      <div className="journal-notices">{updateNotice}{error&&<div className="ddd-error" role="alert">{error}<button onClick={retry}>Retry saved progress</button></div>}</div>
      <nav className="ddd-leaf-picker" aria-label="Report pages">{planMode?<><a href={changed({view:'materials',entry:'',item:''})} aria-current={planLeaf==='materials'?'page':undefined}>Materials</a><a href={changed({view:'route',entry:'',item:''})} aria-current={planLeaf==='route'?'page':undefined}>World route</a></>:treasureMode?<><a href={changed({view:'grid'})} aria-current={params.get('view')==='grid'||(params.get('view')!=='notes'&&!selectedId)?'page':undefined}>Grid</a><a href={selectedId||world?changed({view:'notes'}):undefined} aria-disabled={!selectedId&&!world} aria-current={params.get('view')==='notes'||(params.get('view')!=='grid'&&!!selectedId)?'page':undefined}>Notes</a></>:<><a href={root?href('contents'):selectedId?listBack:changed({entry:'',item:''})} aria-current={!selectedId?'page':undefined}>{root?'Reports':'Index'}</a><a aria-current={selectedId?'page':undefined} aria-disabled={!selectedId&&!visibleSelection} href={selectedId?changed({}):visibleSelection?.href}>{root?'Open section':'Details'}</a></>}</nav>
      <main ref={main} id="ddd-reading" tabIndex={-1} className={`ddd-book ${root?'ddd-cover':''}`}>
        <div className="ddd-rings" aria-hidden="true">{Array.from({length:13},(_,i)=><i key={i}/>)}</div>
        {['tl','tr','bl','br'].map(c=><Ornament key={c} corner={c}/>)}{!root&&<Crown/>}
        {treasureMode?<div className="ddd-page treasure-host"><TreasureBoard game={guide.id} route={route} entries={guide.entries} checks={profile.checks} ready={ready} save={(id,value,expected)=>update(p=>{if(expected!==undefined&&!!p.checks[id]!==expected)throw new Error('This treasure changed in another tab. Undo was not applied.');return {...p,checks:{...p.checks,[id]:value}};})}/></div>:root?<div className="ddd-root-spread"><div className="ddd-cover-art"><img src={`${import.meta.env.BASE_URL}assets/ddd.png`} alt="Sora, Riku and Mickey in the sleeping worlds"/></div><div className="ddd-cover-menu">{index()}</div></div>
        :planMode?<div className="ddd-page ddd-plan-page">{workshopTabs}<div className="ddd-plan-spread"><section className="ddd-plan-materials" aria-label="Planned materials"><h2>Materials</h2><p className="ddd-plan-help">Targets are total stock. Blank owned stock is unknown.</p><form className="ddd-filters ddd-plan-filters" onSubmit={e=>{e.preventDefault();location.hash=changed({q:search,page:'',entry:'',item:'',world:'',status:''});}}><label className="ddd-search"><span>Find a planned material</span><input type="search" aria-label="Find a planned material" placeholder="Material name…" value={search} onChange={e=>setSearch(e.target.value)}/></label><button type="submit">Find</button>{q&&<a href={changed({q:'',page:''})}>Clear</a>}</form><p className="ddd-plan-help">Search filters materials only; the route covers the full plan{character!=='all'?` for ${character}`:''}.</p><nav ref={indexRef} className="ddd-plan-material-list" aria-label="Planned material counts">{shown.map(item=><FarmingMaterialRow key={item.id} id={item.id} name={item.name} owned={profile.owned[item.id]} target={profile.targets[item.id]} ready={ready} saveOwned={n=>saveQuantity('owned',item.id,n)} saveTarget={n=>saveQuantity('targets',item.id,n)} remove={()=>saveQuantity('targets',item.id,undefined)}/>)}</nav>{!shown.length&&<p className="ddd-plan-empty">{plannedMaterials.length?'No planned materials match this name.':'Your farming plan is empty. Add recipe ingredients or Dream Pieces.'}</p>}{pagination}</section><section className="ddd-plan-route" aria-label="Farming world route"><FarmingItinerary plan={farmingPlan} scopeLabel={character==='all'?'Sora and Riku':character}/></section></div></div>
        :<div className={`ddd-page ${selectedId?'ddd-reading':''}`}>
          {!known?<div className="ddd-empty"><h2>Page not found</h2><a href={href('contents')}>Return to Reports</a></div>
          :section==='progress'?<div className="ddd-settings"><h2>Save & Settings</h2><JournalNotePages>{progressPage}</JournalNotePages></div>
          :selectedId?(selectedRecipe?recipe(selectedRecipe):selectedEntry?record(selectedEntry):<div className="ddd-empty"><h2>Entry not found in this selection</h2><a href={parent}>Return to the index</a></div>)
          :<>{workshop?workshopTabs:section==='spirits'?<div className="ddd-species-heading"><span><SpiritMark/>Spirits</span><strong>{count(categoryEntries('spirits'))}</strong><small>Recorded</small></div>:<div className="ddd-page-caption"><h2 className="ddd-page-title">{heading}</h2>{category&&<span data-testid="ddd-category-progress">{count(categoryEntries(section))}</span>}</div>}{worldHub&&<p className="ddd-world-summary">{worldData?.summary}</p>}{section==='completion'&&<p className="ddd-small">Your recorded checks. These totals are separate from the game’s Completion Rate.</p>}{!worldList&&!directory&&<><button className="ddd-filter-toggle" aria-expanded={filtersOpen} aria-controls="ddd-filters" onClick={()=>setFiltersOpen(!filtersOpen)}>{filtersOpen?'Close filters':'Find & filter'}</button>{filters}</>}{index()}</>}
        </div>}
      </main>
      <footer className="ddd-footer"><div><a href={parent}>‹ Back</a><span>{help}</span>{!root&&<a href={href('contents')}>Reports</a>}</div><JournalUtilityBar className="ddd-outer" game="DREAM DROP DISTANCE HD" tools={<nav aria-label="Journal tools"><a className="ddd-compact-reports" href={href('contents')} aria-label="Reports contents">Reports</a><a href={href('search')}>Search</a><a href={href('progress')}>Save & Settings</a></nav>}><label className="ddd-character">Character<select aria-label="Filter by character" value={character} onChange={e=>{location.hash=treasureMode?treasureCharacterHref(guide.id,e.target.value):changed({character:e.target.value,entry:'',item:'',page:'',focus:''});}}><option value="all">Both</option><option>Sora</option><option>Riku</option></select></label></JournalUtilityBar></footer><div className="ddd-save" role="status">{error?'Progress needs attention':busy?'Saving record…':message||notice||(!ready?'Opening saved progress…':'Progress saved on this device')}</div>
    </section>
    
  </div>;
}
