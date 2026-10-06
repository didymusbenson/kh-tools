import {useEffect,useLayoutEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {entryTitle} from '../domain/entryPresentation';
import {scopeLabel,slotLabel,treasureMap,treasureMatches,treasurePartitions,adjacentTreasureMatch,type TreasureCell,type TreasureEntry,type TreasurePartition} from '../games/treasureModel';
import {JournalNotePages} from './JournalNotePages';
import './treasure-board.css';

const safeDecode=(s:string)=>{try{return decodeURIComponent(s);}catch{return s;}};
export type SaveTreasure = (id:string,value:boolean,expected?:boolean)=>Promise<boolean>;
export interface TreasureBoardProps {
 game:string; route:string; entries:TreasureEntry[]; checks:Record<string,boolean>; ready:boolean;
 save:SaveTreasure; renderDetails?:(entry:TreasureEntry)=>ReactNode;
}
/** The same positional/identity contract, composed inside each game's own journal shell. */
export function TreasureBoard({game,route,entries,checks,ready,save,renderDetails}:TreasureBoardProps) {
 const [path,query='']=route.split('?'),params=new URLSearchParams(query);
 const partitions=treasurePartitions(game,entries);
 const selectedId=params.get('entry')||params.get('item')||(path.split('/')[1]==='entry'?safeDecode(path.split('/').slice(2).join('/')):'');
 const selectedPartition=partitions.find(p=>p.cells.some(c=>c.entry.id===selectedId));
 const character=selectedPartition?.character||params.get('character')||'';
 const scope=selectedPartition?.scope||params.get('scope')||((game==='kh3'||game==='kh2fm')?(character==='Roxas'?'prologue':'main'):'');
 const scoped=partitions.filter(p=>(!character||character==='all'||p.character===character||p.character.replace(': ',' · ')===character)&&(!scope||p.scope===scope));
 const partition=selectedPartition||scoped.find(p=>p.id===params.get('board'))||scoped.find(p=>p.world===params.get('world'));
 const cells=partition?.cells||[];
 const selected=cells.find(c=>c.entry.id===selectedId)||cells[0];
 const view=params.get('view')==='notes'||(selectedId&&!params.has('view'))?'notes':'grid';
 const [draft,setDraft]=useState(params.get('q')||''),[filtersOpen,setFiltersOpen]=useState(false);
 const [pending,setPending]=useState(false),[message,setMessage]=useState(''),[failure,setFailure]=useState(false);
 const [undo,setUndo]=useState<{id:string;before:boolean;after:boolean}|null>(null);
 const pendingRef=useRef(false),gridRef=useRef<HTMLOListElement>(null),summaryRef=useRef<HTMLDivElement>(null);
 const [geometry,setGeometry]=useState({columns:5,rows:3}),[summaryCapacity,setSummaryCapacity]=useState(5);
 const canonicalColumns=game==='kh3'&&partition?.scope==='main'?8:undefined;
 // KH1 world boards are already scoped by the world directory. Ignore legacy
 // filter parameters as well as removing their controls, so no invisible filter remains.
 const worldFilters=game!=='kh1fm';
 const q=worldFilters?params.get('q')||'':'',area=worldFilters?params.get('area')||'':'',status=worldFilters?params.get('status')||'':'',group=worldFilters?params.get('group')||'':'';
 const matches=cells.filter(c=>treasureMatches(c,checks,{q,area,status,group}));
 const capacity=geometry.columns*geometry.rows;
 const index=Math.max(0,cells.findIndex(c=>c.entry.id===selected?.entry.id));
 const page=Math.floor(index/capacity),pages=Math.max(1,Math.ceil(cells.length/capacity));
 const shown=cells.slice(page*capacity,(page+1)*capacity);
 const summaryPage=Math.min(Math.max(0,Number(params.get('page'))||0),Math.max(0,Math.ceil(scoped.length/summaryCapacity)-1));
 const total=scoped.reduce((n,p)=>n+p.cells.length,0),done=scoped.reduce((n,p)=>n+p.cells.filter(c=>checks[c.entry.id]).length,0);
 const unit=game==='recom'?'reward claims':game==='kh1fm'?'acquisitions':'chests';
 const single=['dddhd','recom','kh3'].includes(game);
 const title=game==='recom'?'World Rewards':game==='kh1fm'?'Treasures & Rewards':'Treasures';
 function link(changes:Record<string,string|undefined>) {
   const next=new URLSearchParams(params);
   if(selectedId)next.set('entry',selectedId);
   next.delete('item');
   for(const [k,v] of Object.entries(changes))v?next.set(k,v):next.delete(k);
   const section=game==='recom'?'rewards':'treasures';
   return `#/${game}/${section}${next.size?'?'+next:''}`;
 }
 function go(changes:Record<string,string|undefined>) {location.hash=link(changes);}
 function select(cell:TreasureCell,nextView=view) {go({entry:cell.entry.id,board:undefined,world:cell.metadata.world,character:cell.metadata.character,scope:cell.metadata.scope,view:nextView,page:undefined});}
 function focusSelected(original:Element|null) {const active=document.activeElement;if(active!==original&&active!==document.body&&active?.tagName!=='MAIN')return;gridRef.current?.querySelector<HTMLButtonElement>(`[data-treasure-id="${CSS.escape(selected?.entry.id||'')}"]`)?.focus({preventScroll:true});}
 useEffect(()=>{setDraft(q);},[q]);
 useEffect(()=>{
   if(view!=='grid'||!selectedId)return;
   // Run after both native-shell effects and the hash navigation's default focus.
   const original=document.activeElement;
   let frame=0;
   const first=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>focusSelected(original));});
   return()=>{cancelAnimationFrame(first);cancelAnimationFrame(frame);};
 },[route,view,selectedId,geometry.columns,geometry.rows]);
 useEffect(()=>{
   if(!partition||!selected)return;
   try{localStorage.setItem(`ars-treasure-view:${game}:${partition.character}`,JSON.stringify({entry:selected.entry.id,world:partition.world,scope:partition.scope}));}catch{}
 },[game,partition?.id,selected?.entry.id]);
 useLayoutEffect(()=>{
   const node=gridRef.current;
   if(!node)return;
   const measure=()=>{
     const width=node.clientWidth,height=node.clientHeight;
     if(!width||!height)return;
     const columns=Math.max(1,Math.min(canonicalColumns||6,Math.floor((width+2)/60)));
     const rows=Math.max(1,Math.floor((height+2)/60));
     setGeometry(old=>old.columns===columns&&old.rows===rows?old:{columns,rows});
   };
   const observer=new ResizeObserver(measure);observer.observe(node);measure();void document.fonts.ready.then(measure);
   return()=>observer.disconnect();
 },[partition?.id,view,canonicalColumns]);
 useLayoutEffect(()=>{
   const node=summaryRef.current;if(!node)return;
   const measure=()=>setSummaryCapacity(Math.max(1,Math.floor(node.clientHeight/64)));
   const observer=new ResizeObserver(measure);observer.observe(node);measure();return()=>observer.disconnect();
 },[!!partition,scoped.length]);
 async function mark(cell:TreasureCell,value:boolean,isUndo=false) {
   if(pendingRef.current||!ready)return;
   pendingRef.current=true;setPending(true);setMessage('Saving…');setFailure(false);
   const before=!!checks[cell.entry.id];
   if(isUndo&&before!==undo?.after){setMessage('This treasure changed since your last action. Undo was not applied.');setFailure(true);setPending(false);pendingRef.current=false;return;}
   try {
     const ok=await save(cell.entry.id,value,isUndo?undo?.after:undefined);
     if(ok){setMessage(isUndo?'Last collection change undone.':value?'Marked collected.':'Marked not collected.');setUndo(isUndo?null:{id:cell.entry.id,before,after:value});}
     else{setMessage('Could not save. Your last saved progress is retained. Try again.');setFailure(true);}
   }catch{setMessage('Could not save. Try again.');setFailure(true);}
   finally{pendingRef.current=false;setPending(false);}
 }
 function changeCharacter(next:string){
   let saved:{entry?:string;world?:string;scope?:string}={};
   try{saved=JSON.parse(localStorage.getItem(`ars-treasure-view:${game}:${next}`)||'{}');}catch{}
   go({character:next,entry:saved.entry,world:saved.world,scope:saved.scope,board:undefined,view:'grid',page:undefined});
 }
 const orderText=cells.length&&cells.every(c=>c.metadata.journalSlot!==undefined&&c.metadata.orderEvidence==='source-supported')?'Source-supported journal order':'Companion guide order';
 const checkControl=selected&&<label className="treasure-check"><input type="checkbox" aria-label={`Collected ${entryTitle(selected.entry)}`} checked={!!checks[selected.entry.id]} disabled={!ready||pending} onChange={e=>void mark(selected,e.target.checked)}/><span>Collected</span></label>;
 const statusRegion=(live=true)=><div className={`treasure-save ${failure?'treasure-save-error':''}`} role={live?(failure?'alert':'status'):undefined}><span>{message||(!ready?'Opening saved progress…':'Select a square to read. Mark collected separately.')}</span>{undo&&<button disabled={pending||!ready} onClick={()=>{const c=partitions.flatMap(p=>p.cells).find(c=>c.entry.id===undo.id);if(c)void mark(c,undo.before,true);}}>Undo</button>}</div>;
 const characters=[...new Set(partitions.map(p=>p.character).filter(Boolean))];
 const scopeChoices=[...new Set(partitions.filter(p=>!character||character==='all'||p.character===character).map(p=>p.scope))];
 function moveMatch(direction:1|-1){const target=adjacentTreasureMatch(cells,selected?.entry.id||'',checks,{q,area,status,group},direction);if(target)select(target,'grid');}
 const controls=<div className="treasure-selectors">
   {characters.length>1&&game!=='dddhd'&&<label>Character<select aria-label="Treasure character" value={character} onChange={e=>changeCharacter(e.target.value)}><option value="">All characters</option>{characters.map(c=><option key={c}>{c}</option>)}</select></label>}
   {scopeChoices.length>1&&<label>Story<select aria-label="Treasure story" value={scope} onChange={e=>go({scope:e.target.value,world:undefined,entry:undefined,board:undefined,page:undefined})}>{!['kh2fm','kh3'].includes(game)&&<option value="">All stories</option>}{scopeChoices.map(s=><option value={s} key={s}>{scopeLabel(s)}</option>)}</select></label>}
 </div>;
 if(!partition&&game==='kh3'&&params.get('overview')!=='list')return <TreasureGroupedOverview partitions={scoped} checks={checks} header={<><div className="treasure-heading"><h2>Treasures</h2><strong>{done} / {total} {unit}</strong><a href={link({overview:'list'})}>World list</a></div>{controls}</>} open={cell=>select(cell,'grid')}/>;
 if(!partition)return <div className={`treasure-layout treasure-${game} treasure-summary ${single?'treasure-single':''}`} data-testid="treasure-summary">
   <section className="treasure-leaf treasure-overview">{game==='kh3'&&<a href={link({overview:undefined})}>Grouped overview ›</a>}<div className="treasure-heading"><h2>{title}</h2>{total>0&&<span>{done} / {total} {unit}</span>}</div>{controls}
   {game==='kh1fm'&&<a className="treasure-collection-shortcut" href="#/kh1fm/treasures?list=postcards">Postcard collection ›</a>}
   <div className="treasure-worlds" ref={summaryRef}>{scoped.slice(summaryPage*summaryCapacity,(summaryPage+1)*summaryCapacity).map(p=><a key={p.id} href={link({board:p.id,world:p.world,character:p.character,scope:p.scope,entry:p.cells[0].entry.id,view:'grid',page:undefined})}><span>{p.world}<small>{[p.character,scopeLabel(p.scope),p.group].filter(Boolean).join(' · ')}</small></span><strong>{p.cells.filter(c=>checks[c.entry.id]).length} / {p.cells.length}</strong></a>)}</div>
   {!scoped.length&&<p>No treasure collection applies to this selection.</p>}
   <nav className="treasure-pagination" aria-label="Treasure world pages"><a aria-disabled={summaryPage===0} href={summaryPage?link({page:String(summaryPage-1)}):undefined}>‹</a><span>Worlds {summaryPage+1} / {Math.max(1,Math.ceil(scoped.length/summaryCapacity))}</span><a aria-disabled={(summaryPage+1)*summaryCapacity>=scoped.length} href={(summaryPage+1)*summaryCapacity<scoped.length?link({page:String(summaryPage+1)}):undefined}>›</a></nav>
   </section><section className="treasure-leaf treasure-intro"><span className="treasure-emblem" aria-hidden="true">♛</span><h2>Every discovery has a place.</h2><p>Choose a world to compare your collected squares and read the directions for a missing treasure.</p><p>{game==='kh1fm'?'Chests and containers are separate from other one-time rewards. Linked acquisition records share saved progress.':game==='recom'?'A companion index of finite Sora reward claims. Claiming a reward and discovering a card remain separate checks.':game==='kh02'?'A companion chest index. Zodiac relics keep their original chest checks.':'Characters and stories keep their own boards and counts.'}</p><p className="treasure-small">? Not marked collected · ✓ Collected<br/>Selection never changes progress.</p></section>
 </div>;
 return <div className={`treasure-layout treasure-${game} treasure-view-${view} ${single?'treasure-single':''}`} data-testid="treasure-board" data-partition={partition.id}>
 <section className="treasure-leaf treasure-grid-leaf" aria-label="Treasure grid">
   <div className="treasure-heading"><h2>{partition.world}</h2>{worldFilters&&<button className="treasure-compact-filter" aria-label="Find & filter" aria-expanded={filtersOpen} aria-controls="treasure-filters" onClick={()=>setFiltersOpen(!filtersOpen)}>Filter</button>}<a href={link({world:undefined,board:undefined,entry:undefined,view:undefined,page:undefined,q:undefined,area:undefined,group:undefined})} aria-label={game==='kh1fm'?'Back to Worlds':'All treasure worlds'}>{game==='kh1fm'?'‹ Worlds':'Worlds'}</a></div>
   <div className="treasure-caption"><span>{[partition.character,scopeLabel(partition.scope),partition.group].filter(Boolean).join(' · ')}</span><strong data-testid="treasure-count">{cells.filter(c=>checks[c.entry.id]).length} / {cells.length} {unit}</strong></div>
   {worldFilters&&<div className="treasure-toolbar"><button aria-expanded={filtersOpen} aria-controls="treasure-filters" onClick={()=>setFiltersOpen(!filtersOpen)}>Find & filter</button><span>{matches.length} matches</span><button disabled={!matches.length} aria-label="Previous matching treasure" onClick={()=>moveMatch(-1)}>‹ Match</button><button disabled={!matches.length} aria-label="Next matching treasure" onClick={()=>moveMatch(1)}>Match ›</button></div>}
   {worldFilters&&filtersOpen&&<form id="treasure-filters" className="treasure-filters" onSubmit={e=>{e.preventDefault();go({q:draft});setFiltersOpen(false);}}>
     <label>Find a treasure<input type="search" value={draft} onChange={e=>setDraft(e.target.value)}/></label><button>Find</button>
     <label>Show<select aria-label="Treasure status" value={status} onChange={e=>go({status:e.target.value})}><option value="">All</option><option value="remaining">Remaining</option><option value="done">Collected</option></select></label>
     <label>Area<select aria-label="Treasure area" value={area} onChange={e=>go({area:e.target.value})}><option value="">All areas</option>{[...new Set(cells.map(c=>c.entry.area).filter(Boolean))].map(a=><option key={a}>{a}</option>)}</select></label>
     {cells.some(c=>c.metadata.group)&&<label>Group<select value={group} onChange={e=>go({group:e.target.value})}><option value="">All groups</option>{[...new Set(cells.map(c=>c.metadata.group).filter(Boolean))].map(g=><option key={g}>{g}</option>)}</select></label>}
     <div className="treasure-filter-matches"><span>{matches.length} matches</span><button type="button" disabled={!matches.length} onClick={()=>{moveMatch(-1);setFiltersOpen(false);}}>‹ Match</button><button type="button" disabled={!matches.length} onClick={()=>{moveMatch(1);setFiltersOpen(false);}}>Match ›</button></div>
     <button type="button" onClick={()=>{go({q:undefined,area:undefined,status:undefined,group:undefined});setFiltersOpen(false);}}>Clear</button><button type="button" onClick={()=>setFiltersOpen(false)}>Close filters</button>
   </form>}
   <div className="treasure-order">{orderText}{canonicalColumns?geometry.columns===canonicalColumns?' · 8-column layout':' · Compact numbered layout':' · Adaptive numbered layout'}</div>
   <ol ref={gridRef} className="treasure-grid" aria-label={`${partition.world} treasure slots`} style={{'--treasure-columns':geometry.columns} as CSSProperties} start={page*capacity+1}>
     {shown.map(cell=><li key={cell.entry.id} className={treasureMatches(cell,checks,{q,area,status,group})?'treasure-match':'treasure-muted'}><button data-treasure-id={cell.entry.id} aria-pressed={selected?.entry.id===cell.entry.id} aria-label={`${partition.character?partition.character+', ':''}${partition.world}, ${slotLabel(cell)}, ${entryTitle(cell.entry)}, ${checks[cell.entry.id]?'collected':'not collected'}`} title={`${slotLabel(cell)} · ${entryTitle(cell.entry)}`} onClick={()=>select(cell,view)} onDoubleClick={()=>select(cell,'notes')}><span className={`treasure-glyph ${checks[cell.entry.id]?'treasure-collected':''}`} aria-hidden="true">{checks[cell.entry.id]?<svg viewBox="0 0 40 32" className="treasure-chest-icon"><path d="M5 14V9c0-7 30-7 30 0v5M4 14h32v15H4z" fill="currentColor" stroke="currentColor" strokeWidth="2"/><path d="M4 15h32M12 4v24M28 4v24" stroke="var(--treasure-paper,#eee)" strokeWidth="2"/><path d="m16 19 3 3 7-8" fill="none" stroke="#fff" strokeWidth="3"/></svg>:'?'}</span><span className="treasure-number" aria-hidden="true">{cell.metadata.journalSlot??cell.metadata.companionOrder}</span></button></li>)}
   </ol>
   <nav className="treasure-pagination" aria-label="Treasure grid pages"><button disabled={page===0} aria-label="Previous treasure grid page" onClick={()=>select(cells[(page-1)*capacity],'grid')}>◀</button><span>Grid {page+1} / {pages} · {page*capacity+1}–{Math.min(cells.length,(page+1)*capacity)}</span><button disabled={page+1>=pages} aria-label="Next treasure grid page" onClick={()=>select(cells[(page+1)*capacity],'grid')}>▶</button></nav>
   {selected&&<div className="treasure-preview"><span><small>{slotLabel(selected)}{selected.metadata.group?` · ${selected.metadata.group}`:''}</small><strong>{entryTitle(selected.entry)}</strong></span>{checkControl}<a href={link({entry:selected.entry.id,view:'notes'})}>Notes ›</a></div>}
   <p className="treasure-selection-hint">{selected&&!treasureMatches(selected,checks,{q,area,status,group})?'Selected treasure no longer matches. Its position is unchanged.':'Quiet squares stay in their original positions.'}</p>
   {statusRegion(view==='grid')}
 </section>
 <article className="treasure-leaf treasure-notes" aria-label="Treasure acquisition details">
  <div className="treasure-heading"><h2>{selected?entryTitle(selected.entry):'Acquisition notes'}</h2><a className="treasure-return" href={link({view:'grid'})}>‹ Grid</a></div>
  {selected&&<><div className="treasure-caption"><span>{slotLabel(selected)} · {selected.entry.area||partition.world}</span>{checkControl}</div>
   <div className="treasure-adjacent"><button disabled={index===0} onClick={()=>select(cells[index-1],'notes')}>‹ Previous</button><span>{index+1} / {cells.length}</span><button disabled={index+1===cells.length} onClick={()=>select(cells[index+1],'notes')}>Next ›</button></div>
   <JournalNotePages key={selected.entry.id}>{renderDetails?renderDetails(selected.entry):<TreasureDirections entry={selected.entry}/>}</JournalNotePages>
   {statusRegion(view==='notes')}
  </>}
 </article></div>;
}
export function TreasureDirections({entry:e}:{entry:TreasureEntry}) {return <>{e.summary&&<p>{e.summary}</p>}{e.instructions&&e.instructions!==e.summary&&<p>{e.instructions}</p>}<dl>{[['Location',[e.world,e.area].filter(Boolean).join(' · ')],['Requires',e.prerequisites],['Reward',e.reward],['Missability',e.missability],['Practical notes',e.uncertainty]].filter(([,v])=>v).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></>;}

function TreasureGroupedOverview({partitions,checks,header,open}:{partitions:TreasurePartition[];checks:Record<string,boolean>;header:ReactNode;open:(cell:TreasureCell)=>void}) {
 const ref=useRef<HTMLDivElement>(null),[layout,setLayout]=useState({columns:8,rows:6}),[page,setPage]=useState(0);
 useLayoutEffect(()=>{const node=ref.current;if(!node)return;const measure=()=>setLayout({columns:Math.max(1,Math.min(8,Math.floor((node.clientWidth+8)/60))),rows:Math.max(1,Math.floor(node.clientHeight/104))});const observer=new ResizeObserver(measure);observer.observe(node);measure();return()=>observer.disconnect();},[]);
 const rows=partitions.flatMap(p=>Array.from({length:Math.ceil(p.cells.length/layout.columns)},(_,row)=>({partition:p,cells:p.cells.slice(row*layout.columns,(row+1)*layout.columns),row})));
 const pages=Math.max(1,Math.ceil(rows.length/layout.rows)),current=Math.min(page,pages-1);
 useEffect(()=>setPage(0),[partitions.map(p=>p.id).join('|')]);
 return <div className="treasure-layout treasure-kh3 treasure-single treasure-grouped" data-testid="treasure-grouped-overview">{header}<div className="treasure-order">{layout.columns===8?'Eight-column grouped overview':'Compact numbered overview'} · Select a square to open its world.</div><div ref={ref} className="treasure-world-groups">{rows.slice(current*layout.rows,(current+1)*layout.rows).map(({partition:p,cells,row})=><section key={p.id+row}><div><span>{p.world}{row>0?' · continued':''}</span><strong>{p.cells.filter(c=>checks[c.entry.id]).length} / {p.cells.length}</strong></div><ol className="treasure-group-row" style={{gridTemplateColumns:`repeat(${layout.columns},52px)`}}>{cells.map(c=><li key={c.entry.id}><button aria-label={`${p.world}, ${slotLabel(c)}, ${checks[c.entry.id]?'collected':'not collected'}`} onClick={()=>open(c)}><span aria-hidden="true">{checks[c.entry.id]?'✓':'?'}</span><small>{c.metadata.journalSlot??c.metadata.companionOrder}</small></button></li>)}</ol></section>)}</div><nav className="treasure-pagination" aria-label="Grouped treasure pages"><button disabled={current===0} onClick={()=>setPage(current-1)}>◀</button><span>Overview {current+1} / {pages}</span><button disabled={current+1===pages} onClick={()=>setPage(current+1)}>▶</button></nav></div>;
}
