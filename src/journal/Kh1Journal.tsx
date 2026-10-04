import { JournalUtilityBar } from '../components/JournalUtilityBar';
import {TreasureBoard} from './TreasureBoard';
import {hasTreasureBoard,normalizeTreasureRoute} from '../games/treasureModel';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { GameData, GuideEntry } from '../domain/types';
import type { PlayerController } from '../state/usePlayerState';
import { cataloguePages } from '../domain/entryNavigation';
import { collectibleProgress } from '../domain/progress';
import { entryTitle } from '../domain/entryPresentation';
import { EntryDetails } from '../components/EntryDetails';
import { DataJiminy } from '../components/DataJiminy';
import './kh1-journal.css';
import { useIndexCapacity } from './useIndexCapacity';
import { JournalNotePages } from './JournalNotePages';
import { Kh1Synthesis } from './Kh1Synthesis';

const asset = `${import.meta.env.BASE_URL}assets/kh1-journal/`;
const home = [
  ['ansem-reports', "Ansem’s Report", 'Read the reports and find the missing pages.'],
  ['bestiary', 'Heartless', 'Learn about the Heartless and their material drops.'],
  ['dalmatians', '101 Dalmatians', 'Which puppies are still waiting to come home?'],
  ['trinities', 'Trinity Marks', 'Find each mark and discover its rewards.'],
  ['minigames', 'Mini-Games', 'Look up activities, records and rewards.'],
  ['synthesis', 'Synthesis', 'Recipes, materials and your farming plan.'],
];
const guideChapters = [
  ['worlds','Worlds','Explore the collection notes for each world.'],
  ['treasures','Treasures & Postcards','Find chests, rewards and Traverse Town postcards.'],
  ['torn-pages','Torn Pages','Find the missing pages of the book.'],
  ['magic-upgrades','Magic','Find every spell upgrade.'],
  ['equipment','Equipment, Items & Abilities','Weapons, accessories, consumables, rare items, abilities and summons.'],
  ['challenges','Challenges & Gummi','Coliseum cups, optional bosses and Gummi missions.'],
  ['achievements','Steam Achievements','Keep track of your completion goals.'],
  ['reference','All Reference Entries','Browse the complete reference collection.'],
];
const contents = [...home, ...guideChapters];
const titles: Record<string,string> = Object.fromEntries([...contents,['contents','Contents'],['search','Search'],['progress','Save & Settings']].map(([id,title])=>[id,title]));
function href(section:string, params?: URLSearchParams) {return `#/kh1fm/${section}${params?.size?'?'+params.toString():''}`;}


export function Kh1Journal({data, route: requestedRoute, player, renderTool, updateNotice}: {
  data:GameData; route:string; player:PlayerController;
  renderTool:(section:string, tab?:string)=>ReactNode; updateNotice:ReactNode;
}) {
  // Keep saved links to the retired submenu useful.
  const route=normalizeTreasureRoute('kh1fm',requestedRoute.replace(/^kh1fm\/notes(?:\?.*)?$/, 'kh1fm/contents'));
  useEffect(()=>{if(requestedRoute.startsWith('kh1fm/notes'))location.replace('#/'+route);},[route,requestedRoute]);
  const parts=route.split('?')[0].split('/');
  const section=parts[1]||'contents';
  const params=new URLSearchParams(route.split('?')[1]||'');
  const focusId=section==='entry'?decode(parts.slice(2).join('/')):params.get('entry');
  const entry=focusId?data.entries.find(e=>e.id===focusId):undefined;
  const world=section==='worlds'&&parts[2]?decode(parts[2]):params.get('world')||'';
  const query=params.get('q')||'';
  const [search,setSearch]=useState(query);
  const [help,setHelp]=useState('Which part of the journal would you like to read?');
  const [notice,setNotice]=useState('');
  const main=useRef<HTMLElement>(null);
  const lastEntry=useRef<string|null>(null);
  const index=section==='contents'?contents:null;
  const worldIndex=section==='worlds'&&!world;
  const {ref:indexRef,capacity:pageSize}=useIndexCapacity(
    `${section}:${world}:${query}:${params.get('status')||''}`, index||worldIndex?44:58);
  const [leaf,setLeaf]=useState('left');
  const synthesis=section==='synthesis';
  const treasureMode=hasTreasureBoard('kh1fm',route);
  const tool=section==='progress'&&!entry;
  const known=!!titles[section]||section==='entry';
  const worlds=[...new Set(data.entries.filter(e=>e.world).map(e=>e.world!))];
  const categories=cataloguePages.find(p=>p.id===section)?.categories;
  let entries=data.entries.filter(e=>section==='search'
    ? !!query.trim()&&[e.name,e.world,e.area,e.summary,e.instructions,...(e.aliases||[])].join(' ').toLowerCase().includes(query.trim().toLowerCase())
    : section==='worlds'?e.world===world
    : section==='minigames'?e.category==='minigame'
    : section==='equipment'?['weapon','accessory','item','ability','summon'].includes(e.category)
    : categories?categories.includes(e.category):section==='reference');
  if(params.get('list')==='postcards')entries=entries.filter(e=>e.category==='postcard');
  const sectionWorlds=[...new Set(entries.filter(e=>e.world).map(e=>e.world!))];
  if(world&&section!=='worlds')entries=entries.filter(e=>e.world===world);
  const scopeEntries=entries;
  if(params.get('status')==='remaining')entries=entries.filter(e=>e.checkable&&!player.state.checks[e.id]);
  if(section==='dalmatians')entries.sort((a,b)=>Number(a.facts?.puppyStart||0)-Number(b.facts?.puppyStart||0));
  const items=index|| (worldIndex?worlds.map(w=>['worlds/'+encodeURIComponent(w),w,'Read this world’s collection notes.']):null);
  const total=items?.length??entries.length;
  const pages=Math.max(1,Math.ceil(total/pageSize));
  const page=Math.min(pages-1,Math.max(0,Math.floor(Number(params.get('page')))||0));
  const shown=entries.slice(page*pageSize,(page+1)*pageSize);
  const title=entry?entryTitle(entry):world||titles[section]||'Entry not found';
  const listParams=new URLSearchParams(params);listParams.delete('entry');
  const parent=entry?(section==='entry'?'#/kh1fm/contents':href(parts.slice(1).join('/'),listParams)):
    world&&section==='worlds'?'#/kh1fm/worlds':'#/kh1fm/contents';
  const setParam=(key:string,value:string)=>{const next=new URLSearchParams(params); next.delete('entry');next.delete('page');value?next.set(key,value):next.delete(key);location.hash=href(parts.slice(1).join('/'),next);};
  const pageLink=(n:number)=>{const next=new URLSearchParams(params);next.set('page',String(n));return href(parts.slice(1).join('/'),next);};
  function entryLink(e:GuideEntry){const next=new URLSearchParams(params);next.set('entry',e.id);return href(parts.slice(1).join('/'),next);}
  async function toggle(e:GuideEntry){try{await player.toggleCheck(e.id);setNotice(`${entryTitle(e)} updated.`);}catch{setNotice('The change could not be saved. Use Retry save below.');}}
  useEffect(()=>{setSearch(query);},[query]);
  useEffect(()=>{
    setLeaf(entry||params.has('item')?'right':section==='synthesis'?'left':'right');
    setHelp(entry?'Read the entry and record your discoveries.':section==='contents'?'Which part of the journal would you like to read?':'Choose an entry to read.');
    if(player.ready) void player.rememberRoute('#/'+route);
    document.title=`${title} · KH1FM Journal`;
    const frame=requestAnimationFrame(()=>{
      if(treasureMode)return;
      if(!entry&&lastEntry.current){const link=main.current?.querySelector<HTMLAnchorElement>(`[data-record-id="${CSS.escape(lastEntry.current)}"]`);if(link){link.focus();return;}}
      window.scrollTo({top:0,behavior:"instant"});
      main.current?.focus({preventScroll:true});
    });
    if(entry)lastEntry.current=entry.id;
    return ()=>cancelAnimationFrame(frame);
  },[route,player.ready]);
  const collectionScope=['worlds','dalmatians','trinities','treasures','torn-pages','ansem-reports','magic-upgrades'].includes(section);
  const progress=collectibleProgress(scopeEntries,player.state.checks);
  const count=collectionScope?progress.total:scopeEntries.filter(e=>e.checkable).length;
  const done=collectionScope?progress.completed:scopeEntries.filter(e=>e.checkable&&player.state.checks[e.id]).length;
  return <div className={`kh1-native ${synthesis?'kh1-with-synthesis':''} ${synthesis&&parts[2]==='plan'?'kh1-farming':''} kh1-show-${leaf}`}>
    <a className="skip-link" href="#kh1-reading" onClick={e=>{e.preventDefault();main.current?.focus();}}>Skip to journal</a>
    <JournalUtilityBar className="kh1-outer" game="KINGDOM HEARTS · FINAL MIX"/>
    <section className="kh1-volume" aria-label="Kingdom Hearts Final Mix journal">
      <header className={`kh1-heading ${world?'kh1-world-context':''}`}>
        <div className="kh1-heading-menu"><span>MENU</span><a href="#/kh1fm/contents">Journal</a></div>
        <div className="kh1-heading-context"><div className="kh1-help"><img src={asset+'jiminy-portrait-kh1.png'} alt=""/><span>{help}</span></div><h1>{entry?titles[section]||'Journal entry':title}</h1></div>
        <nav className="kh1-utilities" aria-label="Journal tools"><a href="#/kh1fm/search">Search</a><a href="#/kh1fm/progress">Save & Settings</a><DataJiminy data={data} state={player.state} compactLauncher/></nav>
      </header>
      {updateNotice}
      {player.error&&<div className="kh1-save-error" role="alert">{player.error} <button onClick={()=>void player.retry()}>Retry save</button></div>}
      <nav hidden={treasureMode} style={{visibility:synthesis||entry?'visible':'hidden'}} className="kh1-leaf-picker" aria-label="Book pages"><button aria-pressed={leaf==='left'} onClick={()=>setLeaf('left')}>{synthesis?(parts[2]==='plan'?'Materials':'Index'):'Overview'}</button><button aria-pressed={leaf==='right'} onClick={()=>setLeaf('right')}>{synthesis?(parts[2]==='plan'?'World route':'Details'):'Notes'}</button></nav>
      <main id="kh1-reading" tabIndex={-1} ref={main} className={`kh1-spread ${tool?'kh1-tool-spread':''} ${entry?'kh1-entry-spread':''} ${synthesis?'kh1-synthesis-spread':''} ${treasureMode?'treasure-host':''}`}>
        <div className="kh1-spiral" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i}/>)}</div>
        {treasureMode?<TreasureBoard game="kh1fm" route={route} entries={data.entries} checks={player.state.checks} ready={player.ready} save={async(id,value,expected)=>{try{await player.setCheckConfirmed(id,value,expected);return true;}catch{return false;}}} renderDetails={e=><EntryDetails data={data} state={player.state} entry={data.entries.find(row=>row.id===e.id)!}/>}/>:synthesis?<Kh1Synthesis data={data} player={player} route={route}/>:<>
        {!tool&&<aside className={`kh1-leaf-left ${entry?'kh1-paper':'kh1-index-art'}`} aria-label={entry?'Entry overview':'Journal guide'}>
          {entry?<JournalNotePages key={entry.id}>
            <p className="kh1-entry-category">{entry.world||entry.category.replaceAll('-',' ')}</p><h2>{entryTitle(entry)}</h2>
            {entry.area&&<p className="kh1-area">{entry.area}</p>}
            {entry.summary&&<p className="kh1-summary">{entry.summary}</p>}
            {entry.checkable&&<label className="kh1-acquired"><input type="checkbox" checked={!!player.state.checks[entry.id]} disabled={!player.ready} onChange={()=>void toggle(entry)}/>{entry.category==='recipe'?'Crafted':'Acquired'}</label>}
            {entry.category==='dalmatian'&&<p className="kh1-small">One chest · three puppies</p>}
            <a className="kh1-return" href={parent}>‹ Return to index</a>
          </JournalNotePages>:<>
            <div className="kh1-speech">{section==='contents'?'What would you like to read?':section==='dalmatians'?'Let’s bring all the puppies home!':worldIndex?'Which world shall we visit?':`Let’s look through ${titles[section]?.toLowerCase()||'the journal'}.`}</div>
            <img className="kh1-jiminy-art" src={asset+'jiminy-official.png'} alt="Jiminy Cricket"/>
            {section==='dalmatians'&&<p className="kh1-index-caption">{done} / {count} puppy groups found</p>}
          </>}
        </aside>}
        <div className={`kh1-leaf-right kh1-paper ${tool?'kh1-tool-page':''}`}>
          {!player.ready?<p>Opening your saved journal…</p>:focusId&&!entry?<><h2>Entry not found</h2><p>This link does not match a journal entry.</p><a href="#/kh1fm/contents">Return to contents</a></>:!known?<><h2>Page not found</h2><a href="#/kh1fm/contents">Return to contents</a></>:tool?<JournalNotePages>{renderTool(section,parts[2])}</JournalNotePages>:entry?<><h2 className="kh1-detail-heading">Notes</h2><JournalNotePages key={entry.id}><EntryDetails data={data} state={player.state} entry={entry}/></JournalNotePages></>:<>
            {section==='search'&&<form className="kh1-search" onSubmit={e=>{e.preventDefault();setParam('q',search);}}><label htmlFor="kh1-query">Search the journal</label><div><input id="kh1-query" type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name, place or material"/><button type="submit">Search</button></div></form>}
            {!items&&section!=='search'&&<div className="kh1-filters">
              {section!=='worlds'&&sectionWorlds.length>0&&<label>World<select aria-label="Filter by world" value={world} onChange={e=>setParam('world',e.target.value)}><option value="">All worlds</option>{sectionWorlds.map(w=><option key={w}>{w}</option>)}</select></label>}
              <label>Show<select aria-label="Filter by collection status" value={params.get('status')||''} onChange={e=>setParam('status',e.target.value)}><option value="">All entries</option><option value="remaining">Uncollected</option></select></label>
            </div>}
            <nav ref={indexRef} className="kh1-index" aria-label={title+' index'}>
              {items?items.slice(page*pageSize,(page+1)*pageSize).map(([id,name,description])=><a key={id} href={href(id)} onFocus={()=>setHelp(description)} onMouseEnter={()=>setHelp(description)}><span>{name}</span><span aria-hidden="true">›</span></a>):shown.map(e=><div className="kh1-index-row" key={e.id}>
                <a href={entryLink(e)} data-record-id={e.id} onFocus={()=>setHelp(e.area||e.summary||'Read this entry.')} onMouseEnter={()=>setHelp(e.area||e.summary||'Read this entry.')}><span>{entryTitle(e)}{e.world&&section!=='worlds'&&<small>{e.world}</small>}</span></a>
                {e.checkable&&<input type="checkbox" aria-label={`Acquired: ${entryTitle(e)}`} checked={!!player.state.checks[e.id]} onChange={()=>void toggle(e)}/>}
              </div>)}
            </nav>
            {!total&&<p className="kh1-empty">{section==='search'&&!query?'Search by name, world, location or material.':'No entries match this selection.'}</p>}
            <div className="kh1-page-controls"><span>{page>0?<a href={pageLink(page-1)} aria-label="Previous index page">◀</a>:null}</span><span>{page+1} / {pages}</span><span>{page+1<pages?<a href={pageLink(page+1)} aria-label="Next index page">▶</a>:null}</span></div>
          </>}
        </div>
        </>}
      </main>
      <footer className="kh1-bottom"><a href={parent}>{section==='contents'?'Contents':'‹ Back'}</a><span>{entry?entryTitle(entry):items?'Select an entry.':count?`${done} / ${count} ${collectionScope ? "collection actions" : "recorded"}`:section==='search'?'Search your discoveries.':'Read your journal.'}</span><a href="#/kh1fm/contents">Contents</a></footer>
    </section>
    <div className="kh1-save-line"><span role="status">{(player.status==='error'||player.status==='memory'?null:notice)||({saved:'Progress saved on this device',saving:'Saving…',loading:'Loading saved progress…',memory:'Progress is in memory only',error:'Progress could not be saved'}[player.status])}</span>{player.canUndo&&<button onClick={async()=>{try{await player.undo();setNotice('Last change undone.');}catch{setNotice('Unable to undo. Check save status.');}}}>Undo</button>}</div>
  </div>;
}
function decode(value:string){try{return decodeURIComponent(value);}catch{return value;}}
