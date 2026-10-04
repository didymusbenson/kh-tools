import { useEffect, useState } from 'react';
import type { GameData } from '../domain/types';
import type { PlayerController } from '../state/usePlayerState';
import { useIndexCapacity } from './useIndexCapacity';
import { JournalNotePages } from './JournalNotePages';
import { FarmingMaterialRow, FarmingItinerary } from './FarmingPlan';
import { buildKh1FarmingPlan } from '../games/farmingPlan';
import { EntryDetails } from '../components/EntryDetails';

function Stock({value, label, save}: {value?:number; label:string; save:(n:number|undefined)=>Promise<void>}) {
  const [draft,setDraft]=useState(value?.toString()??'');
  const [error,setError]=useState('');
  useEffect(()=>setDraft(value?.toString()??''),[value]);
  return <label className="kh1-stock"><span>{label}</span><input type="number" min="0" step="1" value={draft} placeholder="?" onChange={e=>setDraft(e.target.value)} onBlur={async()=>{const n=draft.trim()===''?undefined:Number(draft);if(n!==undefined&&(!Number.isSafeInteger(n)||n<0||n>9999)){setError('Use a whole number from 0 to 9,999.');return;}if(n===value){setError('');return;}try{await save(n);setError('');}catch{setError('Could not save. Try again.');}}}/>{error&&<small role="alert">{error}</small>}</label>;
}

export function Kh1Synthesis({data,player,route}: {data:GameData;player:PlayerController;route:string}) {
  const rawTab=route.split('?')[0].split('/')[2];
  const tab=rawTab==='materials'||rawTab==='plan'?rawTab:'recipes';
  const params=new URLSearchParams(route.split('?')[1]||'');
  const query=params.get('q')||'';
  const set=params.get('set')||'';
  const [search,setSearch]=useState(query);
  useEffect(()=>setSearch(query),[query]);
  const [notice,setNotice]=useState('');
  const [busy,setBusy]=useState(false);
  useEffect(()=>setNotice(''),[route]);
  const state=player.state;
  const materials=data.entries.filter(e=>e.category==='material').sort((a,b)=>a.name.localeCompare(b.name));
  const recipes=data.recipes.filter(r=>(!set||r.set===Number(set))&&(!params.has('remaining')||!state.checks[r.entryId]));
  const items=(tab==='recipes'?recipes.map(r=>data.entries.find(e=>e.id===r.entryId)!).filter(Boolean):tab==='plan'?materials.filter(e=>(state.farmPlan?.[e.id]||0)>0):materials).filter(e=>e.name.toLowerCase().includes(query.toLowerCase()));
  const {ref:indexRef,capacity:pageSize}=useIndexCapacity(`${tab}:${query}:${set}:${params.has('remaining')}`,tab==='plan'?116:36);
  const pages=Math.max(1,Math.ceil(items.length/pageSize));
  const requested=params.get('item')||params.get('entry');
  const requestedPage=Math.floor(Math.max(0,items.findIndex(e=>e.id===requested))/pageSize);
  const page=Math.min(pages-1,Math.max(0,Math.floor(Number(requested?requestedPage:params.get('page')??0))||0));
  const shown=items.slice(page*pageSize,(page+1)*pageSize);
  const selected=shown.find(e=>e.id===requested)||shown[0];
  const recipe=tab==='recipes'?data.recipes.find(r=>r.entryId===selected?.id):undefined;
  function link(changes:Record<string,string>) {const next=new URLSearchParams(params);next.delete('entry');for(const [key,value] of Object.entries(changes))value?next.set(key,value):next.delete(key);return `#/kh1fm/synthesis/${tab}${next.size?'?'+next:''}`;}
  async function act(action:()=>Promise<void>,message:string) {setBusy(true);try{await action();setNotice(message);}catch{setNotice('Could not save the change. Please try again.');}finally{setBusy(false);}}
  async function save(action:()=>Promise<void>) {try {await action();return true;}catch{return false;}}
  const farmingPlan=buildKh1FarmingPlan(data,materials,state.inventory,state.farmPlan||{});
  return <>
    <aside className={`kh1-leaf-left kh1-paper kh1-synthesis-index ${tab==='plan'?'kh1-farming-index':''}`} aria-label="Synthesis index">
      <p className="kh1-entry-category">Moogle’s workshop</p>
      <nav className="kh1-book-tabs" aria-label="Synthesis workspace">{[['recipes','Recipes'],['materials','Materials'],['plan','Farming Plan']].map(([id,label])=><a key={id} href={`#/kh1fm/synthesis/${id}`} aria-current={tab===id?'page':undefined}>{label}</a>)}</nav>
      <form className="kh1-filters" onSubmit={e=>{e.preventDefault();location.hash=link({q:search,page:'',item:''});}}><label>Find {tab==='recipes'?'a recipe':'a material'}<input type="search" value={search} onChange={e=>setSearch(e.target.value)}/></label>
      {tab==='recipes'&&<label>Set<select value={set} onChange={e=>{location.hash=link({set:e.target.value,page:'',item:''});}}><option value="">All sets</option>{[...new Set(data.recipes.map(r=>r.set))].sort((a,b)=>a-b).map(n=><option key={n}>{n}</option>)}</select></label>}<button className="kh1-book-action" type="submit">Find</button></form>
      {tab==='recipes'&&<label className="kh1-remaining"><input type="checkbox" checked={params.has('remaining')} onChange={e=>{location.hash=link({remaining:e.target.checked?'1':'',page:'',item:''});}}/> Not yet crafted</label>}
      <nav ref={indexRef} className="kh1-index" aria-label={`${tab} index`}>{shown.map(e=>tab==='plan'?<FarmingMaterialRow key={e.id} id={e.id} name={e.name} owned={state.inventory[e.id]} target={state.farmPlan?.[e.id]||0} ready={player.ready} max={9999} saveOwned={n=>save(()=>player.setInventory(e.id,n??null))} saveTarget={n=>save(()=>player.setFarmTarget(e.id,n||0))} remove={()=>save(()=>player.setFarmTarget(e.id,0))}/>:<a key={e.id} href={link({item:e.id})} aria-current={selected?.id===e.id?'true':undefined}><span>{e.name}</span><span aria-hidden="true">{tab==='recipes'&&state.checks[e.id]?'✓':'›'}</span></a>)}</nav>
      {!items.length&&<p className="kh1-small">{tab==='plan'?(query?'No planned materials match this name.':'Add recipe ingredients or a material to begin your farming plan.'):'No matching entries.'}</p>}
      {tab==='plan'&&<p className="farming-plan-help">Target = total stock to have. Blank Owned = unknown. Changes save on leaving the field. Search filters this list only.</p>}
      <div className="kh1-page-controls"><span>{page>0&&<a aria-label="Previous index page" href={link({page:String(page-1),item:''})}>◀</a>}</span><span>{page+1} / {pages}</span><span>{page+1<pages&&<a aria-label="Next index page" href={link({page:String(page+1),item:''})}>▶</a>}</span></div>
      <p className="kh1-small">{tab==='recipes'?`${data.recipes.filter(r=>state.checks[r.entryId]).length} / ${data.recipes.length} crafted`:`${items.length} materials`}</p>
    </aside>
    <section key={tab==='plan'?'plan':selected?.id||tab} className="kh1-leaf-right kh1-paper kh1-synthesis-detail" aria-label="Synthesis notes">
      {tab==='plan'?<FarmingItinerary plan={farmingPlan}/>:<>
      <p className="kh1-entry-category">{recipe?`Synthesis · Set ${recipe.set}`:'Material notes'}</p>
      <h2>{selected?.name||'No matching entries'}</h2>
      {selected?<>
        {recipe?<>
          <label className="kh1-acquired"><input type="checkbox" checked={!!state.checks[selected.id]} disabled={!player.ready||busy} onChange={()=>void act(()=>player.toggleCheck(selected.id),'Crafting record saved.')}/>Crafted</label>
          <p className="kh1-small">Marking a recipe crafted does not deduct stock.</p>
          <button className="kh1-book-action" disabled={busy} onClick={()=>void act(()=>player.addRecipeToFarmPlan(recipe.id),'Ingredients added to your farming plan.')}>Add ingredients to farming plan</button>
        </>:<>
          <div className="kh1-stock-fields"><Stock key={selected.id+'owned'} label={`${selected.name} owned`} value={state.inventory[selected.id]} save={n=>player.setInventory(selected.id,n??null)}/>
</div>
          <p className="kh1-small">Blank stock means unknown. Changes save when you leave the field.</p>
          <button className="kh1-book-action" disabled={busy||(state.farmPlan?.[selected.id]||0)>0} onClick={()=>void act(()=>player.addMaterialToFarmPlan(selected.id),'Material added to your farming plan.')}>{(state.farmPlan?.[selected.id]||0)>0?'In farming plan':'Add to farming plan'}</button>
        </>}
        <div role="status" className="kh1-synthesis-notice">{notice}</div>
        <JournalNotePages key={selected.id+tab}>{recipe?<div className="kh1-recipe-notes">
          <h3>Ingredients</h3><p className="kh1-small">Owned / required · ? means unknown</p>
          <ul>{recipe.ingredients.map(i=><li key={i.itemId}><a href={`#/kh1fm/synthesis/materials?entry=${encodeURIComponent(i.itemId)}`}>{i.name}</a><span>{state.inventory[i.itemId]??'?'} / {i.quantity}</span></li>)}</ul>
          <p><strong>Unlock:</strong> {selected.prerequisites||recipe.unlock}</p>
          <p><strong>Makes:</strong> {recipe.name} ×{recipe.outputQuantity}</p>
          {(recipe.uncertainty||selected.uncertainty)&&<p>{recipe.uncertainty||selected.uncertainty}</p>}
        </div>:<EntryDetails data={data} state={state} entry={selected} compactMaterial/>}</JournalNotePages>
      </>:<p className="kh1-summary">Try another search or filter to find an entry.</p>}
      </>}
    </section>
  </>;
}
