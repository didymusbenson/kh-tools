import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { GameGuide } from '../games/types';
import type { GuideProfile } from '../games/profile';
import { cardFamilies, inCampaign, recomEntries, recomHref, recomProgress, recomWorlds, type RecomCampaign, type RecomEntry } from '../games/recom';
import './recom-journal.css';

const asset = `${import.meta.env.BASE_URL}assets/kh1-journal/`;
const titles: Record<string,string> = {contents:'Journal',collection:'Card Collection',cards:'Card Index',worlds:'Worlds & Rewards',rewards:'World Rewards',sleights:'Sleights',minigames:'Mini-games',decks:'Review Decks',shop:'Moogle Shop',achievements:'Steam Achievements',search:'Search',progress:'Save & Settings'};
type Props = {guide:GameGuide;route:string;profile:GuideProfile;ready:boolean;error:string;notice:string;updateNotice:ReactNode;update:(change:(p:GuideProfile)=>GuideProfile,recovery?:boolean)=>Promise<boolean>;toggle:(id:string)=>void;progressPage:ReactNode;retry:()=>void};

export function CardFace({entry,small=false}:{entry:RecomEntry;small?:boolean}) {
  const family=entry.family||'battle';
  return <span className={`com-card-face com-card-${family} ${small?'com-card-small':''}`} aria-hidden="true">
    <span className="com-card-symbol">{['attack','battle'].includes(family)?<svg viewBox="0 0 80 80"><circle cx="24" cy="54" r="12"/><path d="M33 45 65 13M55 22l9 9m-3-15 9 9"/></svg>:family==='enemy'?'◆':family==='map'?'⌂':family==='item'?'+':family==='special'?'♛':'✦'}</span>
    <span className="com-card-initials">{entry.name.split(/\s+/).slice(0,3).map(w=>w[0]).join('')}</span>
  </span>;
}

export function RecomJournal({guide,route,profile,ready,error,notice,updateNotice,update,progressPage,retry}:Props) {
  const [path,query='']=route.split('?');
  const section=path.split('/')[1]||'contents';
  const params=new URLSearchParams(query);
  const campaign:RecomCampaign=params.get('campaign')==='riku'?'riku':'sora';
  const family=params.get('family')||'',world=params.get('world')||'',q=params.get('q')||'',status=params.get('status')||'';
  const selectedId=params.get('entry')||'';
  const root=section==='contents',grid=section==='collection',system=['sleights','decks','shop'].includes(section);
  const [draft,setDraft]=useState(q),[help,setHelp]=useState('Choose a section of your journal.');
  const [saving,setSaving]=useState(false),[savedMessage,setSavedMessage]=useState('');
  const [pendingCheck,setPendingCheck]=useState<{id:string;checked:boolean}|null>(null);
  async function saveCheck(entry:RecomEntry,checked:boolean) {
    setSaving(true);setSavedMessage('');setPendingCheck({id:entry.id,checked});
    try {const ok=await update(p=>({...p,checks:{...p.checks,[entry.id]:checked}}));setSavedMessage(ok?'Record saved.':'The record could not be saved.');}
    finally {setSaving(false);setPendingCheck(null);}
  }
  const main=useRef<HTMLElement>(null);
  const heading=section==='contents'?(campaign==='riku'?'D-Report':'Journal'):titles[section]||'Page not found';
  const scoped=recomEntries.filter(e=>inCampaign(e,campaign));
  const allCards=scoped.filter(e=>e.category==='cards');
  const cardCount=recomProgress(allCards,profile.checks);
  const category=grid?'cards':section==='worlds'?'rewards':section;
  const categoryEntries=section==='search'?scoped:scoped.filter(e=>e.category===category);
  const candidates=categoryEntries.filter(e=>(!family||e.family===family)&&(!world||e.world===world));
  const matching=candidates.filter(e=>(!q||`${e.name} ${e.summary} ${e.world||''} ${e.instructions||''}`.toLowerCase().includes(q.toLowerCase()))&&(!status||(e.checkable!==false&&(status==='done'?!!profile.checks[e.id]:!profile.checks[e.id]))));
  const familyList=section==='cards'&&!family&&!q&&!selectedId;
  const worldList=section==='worlds'&&!world&&!selectedId;
  const size=grid?24:8,pages=Math.max(1,Math.ceil(matching.length/size));
  const page=Math.max(0,Math.min(pages-1,Math.floor(Number(params.get('page')))||0));
  const shown=matching.slice(page*size,(page+1)*size);
  const record=selectedId?candidates.find(e=>e.id===selectedId):undefined;
  const title=record?.name||family&&cardFamilies[family]||world||heading;
  const families=Object.keys(cardFamilies).filter(f=>allCards.some(e=>e.family===f));
  const known=!!titles[section];
  const unavailable=campaign==='riku'&&['shop','minigames','rewards'].includes(section);
  const href=(s:string,more:Record<string,string>={})=>recomHref(s,campaign,more);
  function changed(changes:Record<string,string>,destination=section) {
    const next=Object.fromEntries(params);for(const [key,value] of Object.entries(changes))value?next[key]=value:delete next[key];delete next.campaign;
    return href(destination,next);
  }
  const back=selectedId?changed({entry:''}):family?href('cards'):world?href('worlds'):href('contents');
  const open=(e:RecomEntry)=>changed({entry:e.id});
  useEffect(()=>{setDraft(q);setHelp(root?'Choose a section of your journal.':grid?'Choose a card to read its notes and acquisition sources.':'Select an entry to open its notes.');document.title=`${heading} · Re:Chain of Memories`;if(!root)main.current?.focus({preventScroll:true});},[route]);
  function check(e:RecomEntry) {return e.checkable!==false?<label className="com-check"><input type="checkbox" aria-label={`Complete ${e.name} (${e.campaign==='shared'?'shared':campaign==='sora'?'Sora':'Riku'})`} checked={pendingCheck?.id===e.id?pendingCheck.checked:!!profile.checks[e.id]} disabled={!ready||saving} onChange={event=>void saveCheck(e,event.target.checked)}/><span>{e.category==='cards'?'Discovered':'Recorded'}</span></label>:null;}
  function count(es:RecomEntry[]) {const n=recomProgress(es,profile.checks);return `${n.done} / ${n.total}`;}
  const utilityLinks=[['worlds','Worlds & Rewards'],['sleights','Sleights'],...(campaign==='sora'?[['shop','Moogle Shop']]:[['decks','Review Decks']]),['achievements','Achievements']];
  const filterBar=<form className="com-filters" onSubmit={e=>{e.preventDefault();location.hash=changed({q:draft,page:'',entry:''});}}>
    <label className="com-search"><span>Find an entry</span><input type="search" value={draft} onChange={e=>setDraft(e.target.value)} placeholder={grid?'Search cards…':'Name, world or notes…'}/></label><button type="submit">Find</button>
    {grid&&<label>Card type<select value={family} onChange={e=>{location.hash=changed({family:e.target.value,page:'',entry:''});}}><option value="">All types</option>{families.map(f=><option key={f} value={f}>{cardFamilies[f]}</option>)}</select></label>}
    {categoryEntries.some(e=>e.checkable!==false)&&<label>Show<select value={status} onChange={e=>{location.hash=changed({status:e.target.value,page:'',entry:''});}}><option value="">All entries</option><option value="remaining">Remaining</option><option value="done">Completed</option></select></label>}
    {(q||status||family&&grid)&&<a href={changed({q:'',status:'',page:'',entry:'',...(grid?{family:''}:{})})}>Clear filters</a>}
  </form>;
  const pagination=<nav className="com-pagination" aria-label="Entry pages"><a aria-label="Previous page" aria-disabled={page===0} tabIndex={page===0?-1:0} href={page===0?undefined:changed({page:String(page-1),entry:''})}>◀</a><span>{page+1} / {pages}</span><a aria-label="Next page" aria-disabled={page+1>=pages} tabIndex={page+1>=pages?-1:0} href={page+1>=pages?undefined:changed({page:String(page+1),entry:''})}>▶</a></nav>;
  function detail(e:RecomEntry) {
    const linkedRewards=scoped.filter(r=>r.category==='rewards'&&r.name===e.name);
    const linkedCards=scoped.filter(r=>r.category==='cards'&&r.name===e.name);
    return <article className={`com-detail ${e.category==='cards'?'com-card-detail':''}`}>
      {e.category==='cards'&&<div className="com-card-display"><CardFace entry={e}/><span>{cardFamilies[e.family||'']}</span>{check(e)}</div>}
      <div className="com-notes">
        <h2>{e.name}</h2>{e.category!=='cards'&&check(e)}
        {e.campaign==='shared'&&<p className="com-small">Shared run goal · applies across campaign views</p>}
        {!!e.stats?.length&&<dl className="com-stats">{e.stats.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
        <p>{e.summary}</p>
        {e.world&&<p><strong>World:</strong> {e.world}</p>}
        {e.prerequisites&&<section><h3>Requirements</h3><p>{e.prerequisites}</p></section>}
        {e.instructions&&e.instructions!==e.summary&&<section><h3>{e.category==='cards'?'Acquisition & use':'Notes'}</h3><p>{e.instructions}</p></section>}
        {!!e.drops?.length&&<section><h3>Enemy-card sources</h3>{e.drops.map((d,i)=><p key={i}><strong>{d.enemy}</strong> · {d.rate}<br/>{d.location}</p>)}<p className="com-small">Source-reported rates; not guaranteed results.</p></section>}
        {!!e.cards?.length&&<section><h3>World preset · source order</h3><ol className="com-deck-cards">{e.cards.map((c,i)=><li key={i}><span>{c.name}</span><strong>{c.value??'Enemy'}</strong></li>)}</ol></section>}
        {e.category==='minigames'&&e.unit&&<RecordInput key={e.id} entry={e} value={profile.owned[e.id]} ready={ready} save={value=>update(p=>{const owned={...p.owned};value===undefined?delete owned[e.id]:owned[e.id]=value;return {...p,owned};})}/>}
        {!!linkedRewards.length&&<section><h3>World rewards</h3>{linkedRewards.map(r=><a className="com-related" key={r.id} href={href('worlds',{world:r.world||'',entry:r.id})}>{r.world} · {r.summary}<span>›</span></a>)}</section>}
        {e.category==='rewards'&&!!linkedCards.length&&<section><h3>Card reference</h3>{linkedCards.map(c=><a className="com-related" key={c.id} href={href('cards',{family:c.family||'',entry:c.id})}>{c.name}<span>›</span></a>)}<p className="com-small">Reward checks and card discovery are separate records.</p></section>}
        {e.uncertainty&&<p className="com-content-note">{e.uncertainty}</p>}
        <details className="com-sources"><summary>Sources & reference notes</summary><ul>{e.sources?.map((url,i)=><li key={`${url}-${i}`}><a href={url} target="_blank" rel="noreferrer">{new URL(url).hostname} · {decodeURIComponent(url.split('/').pop()||'Reference').replaceAll('_',' ')}</a></li>)}</ul></details>
      </div>
    </article>;
  }
  const rootEntries=[['collection','Card Collection'],['cards','Card Index'],...(campaign==='sora'?[['minigames','Mini-games']]:[])];
  return <div className={`com-native com-${campaign} ${system?'com-system':''}`}>
    <a className="skip-link" href="#com-reading" onClick={e=>{e.preventDefault();main.current?.focus();}}>Skip to journal</a>
    <div className="com-outer"><a href="#/">‹ Games</a><span>RE:CHAIN OF MEMORIES · HD 1.5 ReMIX</span><nav aria-label="Journal tools"><a href={href('search')}>Search</a><a href={href('progress')}>Save & Settings</a></nav></div>
    <section className="com-volume" aria-label={`${campaign==='sora'?'Sora’s Journal':'Riku’s D-Report'}`}>
      <header className="com-header">
        <nav className="com-campaigns" aria-label="Campaign"><a href={recomHref('contents','sora')} aria-current={campaign==='sora'?'page':undefined}>Sora</a><a href={recomHref('contents','riku')} aria-current={campaign==='riku'?'page':undefined}>Riku · Reverse/Rebirth</a></nav>
        <span className="com-wordmark" aria-hidden="true">{system?'MENU':campaign==='riku'?'D-REPORT':'JOURNAL'}</span>
        <nav className="com-ribbons" aria-label="Journal location">{!root&&<a href={back}>‹ {selectedId?heading:family?'Card Index':world?'Worlds':'Contents'}</a>}<h1>{title}</h1></nav>
        {record?.category==='cards'&&<a className="com-switch-view" href={changed({},grid?'cards':'collection')}>{grid?'Card Index':'Card Collection'} ›</a>}
      </header>
      {updateNotice}{error&&<div className="com-error" role="alert">{error}<button onClick={retry}>Retry saved progress</button></div>}
      <main id="com-reading" ref={main} tabIndex={-1} className={`com-book ${root?'com-cover':''}`}>
        <div className="com-rings" aria-hidden="true">{Array.from({length:15},(_,i)=><i key={i}/>)}</div>
        {root?<div className="com-root-spread"><div className="com-jiminy">{campaign==='sora'?<><p>Choose an entry.</p><img src={asset+'jiminy-official.png'} alt="Jiminy Cricket"/></>:<div className="com-riku-inscription"><span>REVERSE / REBIRTH</span><p>A record of the journey.</p></div>}</div><div className="com-root-index"><h2>{campaign==='sora'?'Jiminy’s Journal':'D-Report'}</h2><nav aria-label="Report sections">{rootEntries.map(([s,label])=><a key={s} href={href(s)} onFocus={()=>setHelp(`Open ${label}.`)} onMouseEnter={()=>setHelp(`Open ${label}.`)}><span>{label}</span><small>{s==='minigames'?count(scoped.filter(e=>e.category==='minigames')):s==='collection'?`${cardCount.done} / ${cardCount.total}`:'›'}</small></a>)}</nav><p className="com-root-note">Your discoveries, kept together.</p></div></div>
        :!known?<div className="com-empty"><h2>Page not found</h2><a href={href('contents')}>Return to the journal</a></div>
        :section==='progress'?<div className="com-settings">{progressPage}</div>
        :unavailable?<div className="com-empty"><h2>{heading}</h2><p>This section belongs to Sora’s journey.</p><a href={recomHref(section,'sora')}>Open Sora’s {heading}</a></div>
        :selectedId?(record?detail(record):<div className="com-empty"><h2>Entry not found in this campaign</h2><a href={href(section)}>Return to {heading}</a></div>)
        :worldList?<div className="com-worlds"><h2>Through Castle Oblivion</h2><p className="com-small">Floor ranges are selectable groups. Reward progress counts finite claims, not room visits.</p><nav aria-label="Worlds">{recomWorlds.filter(w=>campaign==='sora'||w.rikuFloors!=='Not visited').map(w=><a className="com-index-link" key={w.id} href={campaign==='riku'?href('decks',{world:w.name}):href('worlds',{world:w.name})}><span>{w.name}<small>{campaign==='sora'?w.soraFloors:w.rikuFloors}</small></span><span>{campaign==='sora'?count(scoped.filter(e=>e.category==='rewards'&&e.world===w.name)):'Deck ›'}</span></a>)}</nav></div>
        :familyList?<div className="com-family-list"><h2>Card Index</h2><nav aria-label="Card families">{families.map(f=><a className="com-index-link" key={f} href={href('cards',{family:f})}><span>{cardFamilies[f]}</span><small>{count(allCards.filter(e=>e.family===f))}</small></a>)}</nav><p className="com-small">Documented card types. World Cards, Gimmick Cards and the complete Riku Battle Cards roster are still being reconciled.</p></div>
        :section==='minigames'?<div className="com-records"><h2>Mini-game records</h2>{['Monstro','100 Acre Wood'].map(w=><section key={w}><h3>{w}</h3>{scoped.filter(e=>e.category==='minigames'&&e.world===w).map(e=><div className="com-record-row" key={e.id}><a href={open(e)}>{e.name}<small>{e.unit?`Achievement target: ${e.summary}`:e.summary}</small></a><span>{profile.owned[e.id]!==undefined?`${profile.owned[e.id]} ${e.unit}`:'—'}</span>{check(e)}</div>)}</section>)}<p className="com-small">Open a record to save a score or read its rewards. Recording a result does not automatically award an achievement.</p></div>
        :<div className="com-catalogue">
          {grid?<div className="com-collection-heading"><div><span>Card discoveries</span><strong>{campaign==='sora'?'Sora':'Riku'}</strong></div><div><span>Documented cards</span><strong data-testid="com-card-progress">{cardCount.done} / {cardCount.total}</strong></div></div>:<h2>{title}</h2>}
          {grid&&<p className="com-small">Partial catalogue · this is your progress through documented cards, not the native completion percentage.</p>}
          {section==='worlds'&&<p className="com-small">Base, Days bonus and Bounty rewards are separate claims. Exact door costs remain under review.</p>}
          {filterBar}
          {grid?<nav className="com-card-grid" aria-label="Card Collection">{shown.map(e=><a key={e.id} href={open(e)} aria-label={`Read ${e.name}${profile.checks[e.id]?', discovered':''}`} className={profile.checks[e.id]?'com-discovered':''}><CardFace entry={e} small/><span>{e.name}</span><small>{profile.checks[e.id]?'✓ Discovered':cardFamilies[e.family||'']}</small></a>)}</nav>:<nav className="com-entry-list" aria-label={`${heading} entries`}>{shown.map(e=><div className="com-list-row" key={e.id}><a className="com-index-link" href={open(e)}><span>{e.name}<small>{[e.world,e.category==='rewards'||e.category==='shop'?e.summary:e.family?cardFamilies[e.family]||e.family:e.prerequisites].filter(Boolean).join(' · ')}</small></span><span aria-hidden="true">›</span></a>{check(e)}</div>)}</nav>}
          {!matching.length&&<div className="com-empty"><h2>No matching entries</h2><p>Try another name or clear the filters.</p></div>}{pagination}
        </div>}
      </main>
      <footer className="com-footer"><a href={root?'#/':back}>‹ {root?'Games':'Back'}</a>{campaign==='sora'&&<img src={asset+'jiminy-portrait-kh1.png'} alt=""/>}<span>{help}</span>{!root&&<a href={href('contents')}>Contents</a>}</footer>
    </section>
    <nav className="com-utilities" aria-label="Companion tools">{utilityLinks.map(([s,label])=><a key={s} href={href(s)} aria-current={section===s?'page':undefined}>{label}</a>)}</nav>
    <p className="com-save" role="status">{error?'Progress needs attention':saving?'Saving record…':savedMessage||notice||(!ready?'Opening saved progress…':'Progress saved on this device')}</p>
  </div>;
}
function RecordInput({entry,value,ready,save}:{entry:RecomEntry;value?:number;ready:boolean;save:(n:number|undefined)=>Promise<boolean>}) {
  const [draft,setDraft]=useState(value===undefined?'':String(value)),[message,setMessage]=useState('');
  useEffect(()=>setDraft(value===undefined?'':String(value)),[value]);
  return <form className="com-record-input" onSubmit={async e=>{e.preventDefault();const n=draft.trim()===''?undefined:Number(draft);if(n!==undefined&&(!Number.isInteger(n)||n<0||n>999999)){setMessage('Enter a whole number from 0 to 999999, or leave blank.');return;}setMessage(await save(n)?'Record saved.':'The record could not be saved.');}}><label>Your result ({entry.unit})<input inputMode="numeric" value={draft} onChange={e=>setDraft(e.target.value)} aria-label={`Your result in ${entry.unit}`}/></label><button disabled={!ready}>Save result</button><span role="status">{message}</span></form>;
}
