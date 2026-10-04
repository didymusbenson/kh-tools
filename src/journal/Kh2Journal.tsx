import {TreasureBoard} from './TreasureBoard';
import {hasTreasureBoard} from '../games/treasureModel';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { CollectionEntry, CollectionRecipe, GameGuide } from '../games/types';
import { addTargets, type GuideProfile } from '../games/profile';
import { entryTitle } from '../domain/entryPresentation';
import { inWorld, sortMaterials } from '../games/presentation';
import { JournalNotePages } from './JournalNotePages';
import { useIndexCapacity } from './useIndexCapacity';
import './kh2-journal.css';

const asset = `${import.meta.env.BASE_URL}assets/kh2-journal/`;
type Update = (change: (profile: GuideProfile) => GuideProfile, recovery?: boolean) => Promise<boolean>;
type IndexItem = {id: string; name: string; meta?: string; href: string; checkId?: string};
const decode = (value: string) => { try { return decodeURIComponent(value); } catch { return value; } };
const href = (section: string, params?: URLSearchParams) => `#/kh2fm/${section}${params?.size ? `?${params}` : ''}`;

function Quantity({label, value, ready, save}: {label:string; value?:number; ready:boolean; save:(value:number|undefined)=>Promise<boolean>}) {
  const [draft,setDraft]=useState(value?.toString()??'');
  const [error,setError]=useState('');
  useEffect(()=>setDraft(value?.toString()??''),[value]);
  async function commit() {
    const n=draft===''?undefined:Number(draft);
    if(n!==undefined&&(!Number.isInteger(n)||n<0||n>999999)){setError('Use a whole number from 0 to 999999.');return;}
    if(n===value){setError('');return;}
    setError(await save(n)?'':'Could not save. Try again.');
  }
  return <label className="kh2-quantity"><span>{label}</span><input type="number" min="0" max="999999" step="1" placeholder="?" value={draft} disabled={!ready} aria-invalid={!!error} onChange={e=>setDraft(e.target.value)} onBlur={()=>void commit()} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}}/>{error&&<small role="alert">{error}</small>}</label>;
}

export function Kh2Journal({guide,route,profile,ready,error,notice,updateNotice,update,toggle,renderDetails,progressPage,retry}: {
  guide:GameGuide; route:string; profile:GuideProfile; ready:boolean; error:string; notice:string;
  updateNotice:ReactNode; update:Update; toggle:(id:string)=>void;
  renderDetails:(entry:CollectionEntry)=>ReactNode; progressPage:ReactNode; retry:()=>void;
}) {
  const [path,queryString='']=route.split('?');
  const parts=path.split('/');
  const section=parts[1]||'contents';
  const params=new URLSearchParams(queryString);
  const workshop=section==='workshop';
  const tab=workshop&&['materials','plan'].includes(parts[2])?parts[2]:'recipes';
  const requestedWorld=section==='worlds'&&parts[2]?decode(parts.slice(2).join('/')):params.get('world')||'';
  const world=requestedWorld==='all'?'':requestedWorld;
  const worldData=guide.worlds.find(w=>w.name===world);
  const cover=section==='worlds'&&!!worldData;
  const worlds=section==='worlds'&&!world;
  const collection=section==='contents'||section==='collection';
  const progress=section==='progress';
  const category=guide.categories.find(c=>c.id===section);
  const title=cover?world:worlds?'Browse by World':collection?'Collection':workshop?'Synthesis':progress?'Save & Settings':section==='search'?'Search':category?.label||'Page not found';
  const q=params.get('q')||'';
  const status=params.get('status')||'';
  const [search,setSearch]=useState(q);
  const [help,setHelp]=useState('Choose a world to open its journal.');
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);
  const [leaf,setLeaf]=useState('left');
  const main=useRef<HTMLElement>(null);
  const selectedId=params.get('entry')||params.get('item');
  const {ref:indexRef,capacity}=useIndexCapacity(`${section}:${tab}:${world}:${q}:${status}`,44);
  const entries=guide.entries;
  const treasureMode=hasTreasureBoard(guide.id,route);
  const byId=new Map(entries.map(e=>[e.id,e]));
  const materials=entries.filter(e=>['material','materials'].includes(e.category)).sort(sortMaterials);
  const known=worlds||cover||collection||progress||workshop||section==='search'||!!category;
  const count=(list:CollectionEntry[])=>{
    const checkable=list.filter(e=>e.checkable!==false);
    return `${checkable.filter(e=>profile.checks[e.id]).length} / ${checkable.length}`;
  };
  function withParams(changes:Record<string,string>, destination=parts.slice(1).join('/')) {
    const next=new URLSearchParams(params);
    for(const [key,value] of Object.entries(changes))value?next.set(key,value):next.delete(key);
    return href(destination,next);
  }
  function filtered(e:CollectionEntry) {
    return inWorld(e,world||'all') && (!q||`${e.name} ${e.world||''} ${e.area||''} ${e.summary}`.toLowerCase().includes(q.toLowerCase())) && (!status||(status==='done'?!!profile.checks[e.id]:!profile.checks[e.id]));
  }
  const chapterItems=guide.categories.filter(c=>!cover||entries.some(e=>(e.category===c.id||e.categories?.includes(c.id))&&inWorld(e,world)));
  let indexItems:IndexItem[]=[];
  let matchingEntries:CollectionEntry[]=[];
  let matchingRecipes:CollectionRecipe[]=[];
  if(worlds) indexItems=guide.worlds.map(w=>({id:w.name,name:w.name,meta:count(entries.filter(e=>['treasures','puzzles'].includes(e.category)&&inWorld(e,w.name))),href:href(`worlds/${encodeURIComponent(w.name)}`)}));
  else if(collection||cover||progress) {
    indexItems=chapterItems.map(c=>({id:c.id,name:c.label,href:href(c.id,cover?new URLSearchParams({world}):undefined),meta:cover?count(entries.filter(e=>(e.category===c.id||e.categories?.includes(c.id))&&inWorld(e,world))):undefined}));
    if(!cover)indexItems.unshift({id:'worlds',name:'Browse by World',href:href('worlds')},{id:'workshop',name:'Synthesis',href:href('workshop/recipes')});
  } else if(workshop&&tab==='recipes') {
    matchingRecipes=(guide.recipes||[]).filter(r=>(!q||r.name.toLowerCase().includes(q.toLowerCase()))&&(!status||(status==='done'?!!profile.checks[r.id]:!profile.checks[r.id])));
    indexItems=matchingRecipes.map(r=>({id:r.id,name:r.name,meta:r.group,href:withParams({entry:r.id}),checkId:r.id}));
  } else {
    matchingEntries=(workshop?materials:entries).filter(e=>(workshop?(tab!=='plan'||(profile.targets[e.id]||0)>0):section==='search'?!!q:e.category===section||e.categories?.includes(section))&&filtered(e));
    indexItems=matchingEntries.map(e=>({id:e.id,name:entryTitle(e),meta:workshop?'':world?e.area:[e.world,e.area].filter(Boolean).join(' · '),href:withParams({entry:e.id}),checkId:!workshop&&e.checkable!==false?e.id:undefined}));
  }
  const pages=Math.max(1,Math.ceil(indexItems.length/capacity));
  const selectedIndex=indexItems.findIndex(e=>e.id===selectedId);
  const page=Math.min(pages-1,Math.max(0,selectedIndex>=0?Math.floor(selectedIndex/capacity):Math.floor(Number(params.get('page')))||0));
  const shown=indexItems.slice(page*capacity,(page+1)*capacity);
  const selected=shown.find(e=>e.id===selectedId)||shown[0];
  const record=selected?byId.get(selected.id):undefined;
  const recipe=workshop&&tab==='recipes'?matchingRecipes.find(r=>r.id===selected?.id):undefined;
  const worldPreview=worldData||(worlds?guide.worlds.find(w=>w.name===selected?.id):undefined);
  const back=collection?'#/':cover?href('worlds'):world?href(`worlds/${encodeURIComponent(world)}`):href('contents');
  const parentLabel=cover?'Browse by World':world?world:'Collection';
  useEffect(()=>setSearch(q),[q]);
  useEffect(()=>{
    setLeaf(selectedId?'right':'left');
    setMessage('');
    setHelp(cover?'Choose a section of this world’s journal.':worlds?'Choose a world to open its journal.':collection?'Browse by world or choose a collection.':'Choose a record on the left to read its notes.');
    document.title=`${title} · KH2FM Journal`;
    main.current?.focus({preventScroll:true});
  },[route]);
  async function act(change:(p:GuideProfile)=>GuideProfile,text:string) {
    setBusy(true);
    try {setMessage(await update(change)?text:'The change could not be saved.');}
    finally {setBusy(false);}
  }
  function saveQuantity(field:'owned'|'targets',id:string,value:number|undefined) {
    return update(p=>{const values={...p[field]};if(value===undefined)delete values[id];else values[id]=value;return {...p,[field]:values};});
  }
  const currentBookmark=workshop?`Synthesis · ${{recipes:'Recipes',materials:'Materials',plan:'Farming Plan'}[tab]}`:title;
  const pageControls=<nav className="kh2-pagination" aria-label="Index pages"><a aria-label="Previous index page" aria-disabled={page===0} tabIndex={page===0?-1:undefined} href={page===0?undefined:withParams({page:String(page-1),entry:'',item:''})}>◀</a><span>{page+1} / {pages}</span><a aria-label="Next index page" aria-disabled={page+1>=pages} tabIndex={page+1>=pages?-1:undefined} href={page+1>=pages?undefined:withParams({page:String(page+1),entry:'',item:''})}>▶</a></nav>;
  function worldArt() {
    return <div className={`kh2-world-picture ${worldPreview?.name==='Port Royal'?'':'kh2-world-emblem'}`}><img src={asset+(worldPreview?.name==='Port Royal'?'port-royal-world.png':'gold-crown.png')} alt={worldPreview?.name==='Port Royal'?'Port Royal':''}/>{worldPreview?.name!=='Port Royal'&&<span>{worldPreview?.name||'Jiminy’s Journal'}</span>}</div>;
  }
  return <div className={`kh2-native kh2-show-${leaf}`}>
    <a className="skip-link" href="#kh2-reading" onClick={e=>{e.preventDefault();main.current?.focus();}}>Skip to journal</a>
    <div className="kh2-outer"><a href="#/">‹ Games</a><span>KINGDOM HEARTS II · FINAL MIX</span><nav aria-label="Journal tools"><a href={href('search')}>Search</a><a href={href('progress')}>Save & Settings</a></nav></div>
    <section className="kh2-volume" aria-label="Kingdom Hearts II Final Mix journal">
      <header className="kh2-header"><nav className="kh2-header-controls" aria-label="Journal navigation"><a href={href('worlds')}>Select World</a><h1>{world||'Jiminy’s Journal'}</h1><a href={href('contents')}>Collection</a></nav><span className="kh2-watermark" aria-hidden="true">JIMINY’S JOURNAL</span><nav className="kh2-ribbons" aria-label="Journal location">{!collection&&<a href={back} aria-label={`Back to ${parentLabel}`}>{parentLabel}</a>}<span aria-current="page">{currentBookmark}</span></nav></header>
      {updateNotice}
      {error&&<div className="kh2-error" role="alert">{error}<button onClick={retry}>Retry loading saved progress</button></div>}
      <nav hidden={treasureMode} className="kh2-leaf-picker" aria-label="Book pages"><button aria-pressed={leaf==='left'} onClick={()=>setLeaf('left')}>{worlds?'Worlds':cover?'Sections':'Index'}</button><button aria-pressed={leaf==='right'} onClick={()=>setLeaf('right')}>{worlds||cover?'Overview':progress?'Backups':'Notes'}</button></nav>
      <main ref={main} id="kh2-reading" tabIndex={-1} className={`kh2-book ${cover?'kh2-cover':''} ${treasureMode?'treasure-host':''}`}>
        <div className="kh2-rings" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i}/>)}</div>
        {treasureMode?<TreasureBoard game={guide.id} route={route} entries={entries} checks={profile.checks} ready={ready} save={(id,value,expected)=>update(p=>{if(expected!==undefined&&!!p.checks[id]!==expected)throw new Error('This treasure changed in another tab. Undo was not applied.');return {...p,checks:{...p.checks,[id]:value}};})} renderDetails={e=>renderDetails(byId.get(e.id)!)}/>:<>
        <section className="kh2-leaf kh2-left" aria-label={`${title} index`}>
          {cover?<div className="kh2-world-title">{world==='Port Royal'?<img src={asset+'port-royal-logo.png'} alt="Port Royal"/>:<h2>{world}</h2>}</div>:<h2>{title}</h2>}
          {workshop&&<nav className="kh2-workshop-tabs" aria-label="Synthesis sections">{[['recipes','Recipes'],['materials','Materials'],['plan','Farming Plan']].map(([id,label])=><a key={id} href={href(`workshop/${id}`)} aria-current={tab===id?'page':undefined}>{label}</a>)}</nav>}
          {!worlds&&!collection&&!cover&&!progress&&known&&<form className={`kh2-filters ${workshop?'kh2-workshop-filters':''}`} onSubmit={e=>{e.preventDefault();location.hash=withParams({q:search,page:'',entry:'',item:''});}}>
            <label className="kh2-search-label"><span>Find {workshop&&tab==='recipes'?'a recipe':'an entry'}</span><input type="search" value={search} onChange={e=>setSearch(e.target.value)}/></label><button type="submit">Find</button>
            {(!workshop||tab!=='recipes')&&<label>World<select value={world} onChange={e=>{location.hash=withParams({world:e.target.value,page:'',entry:''});}}><option value="">All worlds</option>{guide.worlds.map(w=><option key={w.name}>{w.name}</option>)}</select></label>}
            {(!workshop||tab==='recipes')&&<label>Show<select value={status} onChange={e=>{location.hash=withParams({status:e.target.value,page:'',entry:''});}}><option value="">All entries</option><option value="remaining">Remaining</option><option value="done">Completed</option></select></label>}
          </form>}
          <nav ref={indexRef} className="kh2-index" aria-label={`${title} records`}>{shown.map(item=><div className="kh2-index-row" key={item.id}>
            <a href={item.href} aria-current={(!cover&&!collection&&!worlds&&!progress&&selected?.id===item.id)?'true':undefined} onMouseEnter={()=>setHelp(item.meta||`Read ${item.name}.`)} onFocus={()=>setHelp(item.meta||`Read ${item.name}.`)}><span>{item.name}{item.meta&&<small>{item.meta}</small>}</span>{!item.checkId&&<span aria-hidden="true">›</span>}</a>
            {item.checkId&&<input type="checkbox" aria-label={`${recipe?'Crafted':'Complete'} ${item.name}`} checked={!!profile.checks[item.checkId]} disabled={!ready} onChange={()=>toggle(item.checkId!)}/>}
          </div>)}</nav>
          {!indexItems.length&&<p className="kh2-empty">{workshop&&tab==='plan'?'Add recipe ingredients or materials to begin your farming plan.':section==='search'&&!q?'Search by name, world or location.':'No entries match this selection.'}</p>}
          {pageControls}
        </section>
        <section className="kh2-leaf kh2-right" aria-label="Journal details">
          {worlds||cover?<>
            {worldArt()}
            <div className="kh2-world-summary"><h2>{cover?'Summary':'World notes'}</h2><JournalNotePages key={worldPreview?.name}><p>{worldPreview?.summary}</p></JournalNotePages></div>
            <div className="kh2-world-objective"><span>Collection</span><p>{count(entries.filter(e=>['treasures','puzzles'].includes(e.category)&&inWorld(e,worldPreview?.name||'')))} treasures & pieces recorded</p></div>
          </>:collection?<><div className="kh2-collection-heading"><img src={asset+'gold-crown.png'} alt=""/><h2>The Journal</h2></div><JournalNotePages><p>Every discovery has a place in these pages.</p><p>Choose a collection from the index, or select a world to explore its records.</p><h3>Your discoveries</h3><p>{count(entries.filter(e=>['treasures','puzzles'].includes(e.category)))} treasures & pieces recorded</p><p>{(guide.recipes||[]).filter(r=>profile.checks[r.id]).length} / {guide.recipes?.length||0} synthesis recipes crafted</p><a href={href('progress')}>Guide coverage & backups</a></JournalNotePages></>:progress?<><h2>Progress & backups</h2><JournalNotePages>{progressPage}</JournalNotePages></>:!known?<><h2>Page not found</h2><a href={href('contents')}>Return to Collection</a></>:!ready?<p>Opening your saved journal…</p>:recipe?<>
            <p className="kh2-kicker">Synthesis · {recipe.group}</p><h2>{recipe.name}</h2>
            <label className="kh2-check"><input type="checkbox" checked={!!profile.checks[recipe.id]} onChange={()=>toggle(recipe.id)} disabled={!ready}/>Crafted</label>
            <p className="kh2-small">Crafting checks do not deduct stock. Counts are owned / required.</p>
            <button className="kh2-action" disabled={!ready||busy} onClick={()=>void act(p=>addTargets(p,recipe.ingredients),'Ingredients added to your farming plan.')}>Add ingredients to farming plan</button>
            <div className="kh2-action-status" role="status">{message}</div>
            <JournalNotePages key={recipe.id}><h3>Ingredients</h3><ul className="kh2-ingredients">{recipe.ingredients.map(i=><li key={i.id}><a href={href('workshop/materials',new URLSearchParams({entry:i.id}))}>{byId.get(i.id)?.name||i.id}</a><span>{profile.owned[i.id]??'?'} / {i.quantity}</span></li>)}</ul><p>{recipe.instructions}</p></JournalNotePages>
          </>:record?<>
            <p className="kh2-kicker">{record.world|| (workshop?'Synthesis materials':title)}</p><h2>{entryTitle(record)}</h2>
            {workshop?<><div className="kh2-stock-fields"><Quantity key={record.id+'owned'} label={`Owned ${record.name}`} value={profile.owned[record.id]} ready={ready} save={n=>saveQuantity('owned',record.id,n)}/>{tab==='plan'&&<><Quantity key={record.id+'target'} label={`Target ${record.name}`} value={profile.targets[record.id]} ready={ready} save={n=>saveQuantity('targets',record.id,n)}/><p>Remaining <strong>{profile.owned[record.id]===undefined?'?':Math.max(0,(profile.targets[record.id]||0)-profile.owned[record.id])}</strong></p></>}</div><p className="kh2-small">Blank stock means unknown.{tab==='plan'?' Target is the total stock to have.':''}</p><button className="kh2-action" disabled={!ready||busy||(tab!=='plan'&&!!profile.targets[record.id])} onClick={()=>void act(p=>{const targets={...p.targets};if(tab==='plan')delete targets[record.id];else targets[record.id]=targets[record.id]||1;return {...p,targets};},tab==='plan'?'Material removed from your plan.':'Material added to your plan.')}>{tab==='plan'?'Remove from farming plan':profile.targets[record.id]?'In farming plan':'Add to farming plan'}</button><div className="kh2-action-status" role="status">{message}</div></>:record.checkable!==false&&<label className="kh2-check"><input type="checkbox" checked={!!profile.checks[record.id]} disabled={!ready} onChange={()=>toggle(record.id)}/>Recorded</label>}
            <JournalNotePages key={record.id}>{!!record.drops?.length&&<><h3>Material sources</h3><ul className="kh2-drops">{record.drops.map((d,i)=><li key={i}><strong>{d.enemy}</strong> · {d.rate}{d.location&&<p>{d.location}</p>}</li>)}</ul></>}{renderDetails(record)}</JournalNotePages>
          </>:<><h2>{workshop&&tab==='plan'?'Your farming plan':'Journal notes'}</h2><p>{selectedId?'This entry is not in the current selection. Clear the filters to find it.':'Choose an entry from the index.'}</p></>}
        </section>
        </>}
      </main>
      <footer className="kh2-footer"><a href={back}>‹ Back</a><img src={asset+'jiminy-portrait-kh2.png'} alt=""/><span>{help}</span><a href={href('contents')}>Collection</a></footer>
    </section>
    <div className="kh2-save" role="status">{error?'Progress needs attention':notice||(!ready?'Opening your journal…':'Progress saved on this device')}</div>
  </div>;
}
