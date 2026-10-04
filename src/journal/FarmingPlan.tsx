import { useEffect, useId, useRef, useState } from 'react';
import type { buildGuideFarmingPlan } from '../games/farmingPlan';
import { JournalNotePages } from './JournalNotePages';
import './farming-plan.css';

type Save = (value: number | undefined) => Promise<boolean>;
type Plan = ReturnType<typeof buildGuideFarmingPlan>;
type Feedback = {message:string; id:string};

function anchorMaterial(node: Element | null) {
  const row = node?.closest<HTMLElement>('.farming-material-row');
  if (row?.dataset.materialId) row.dispatchEvent(new CustomEvent('farming-material-activity', {bubbles:true, detail:row.dataset.materialId}));
}

function FarmQuantity({label, name, value, ready, max, save, report}: {label:string; name:string; value?:number; ready:boolean; max:number; save:Save; report:(feedback:Feedback)=>void}) {
  const [draft, setDraft] = useState(value?.toString() ?? '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const errorId = useId();
  const field = useRef<HTMLLabelElement>(null);
  useEffect(() => { setDraft(value?.toString() ?? ''); }, [value]);
  function feedback(message:string) {setError(message); report({message,id:errorId});}
  async function commit() {
    anchorMaterial(field.current);
    const n = draft.trim() === '' ? undefined : Number(draft);
    if (n !== undefined && (!/^\d+$/.test(draft) || !Number.isSafeInteger(n) || n < 0 || n > max)) {
      feedback(`Use whole numbers 0–${max.toLocaleString()}.`); return;
    }
    if (n === value) { feedback(''); return; }
    setSaving(true);
    try { feedback(await save(n) ? '' : 'Could not save. Try again.'); }
    catch { feedback('Could not save. Try again.'); }
    finally { setSaving(false); }
  }
  return <label ref={field} className="farming-quantity"><span>{label}</span><input type="number" inputMode="numeric" min="0" max={max} step="1" placeholder="?" aria-label={`${label} ${name}`} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} value={draft} disabled={!ready || saving} onChange={e => {anchorMaterial(field.current); setDraft(e.target.value);}} onBlur={() => void commit()} onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); }}/></label>;
}

/** Keep all quantity semantics beside the material, independent of source expansion. */
export function FarmingMaterialRow({id, name, owned, target, ready, max=999999, saveOwned, saveTarget, remove, character}: {id:string; name:string; owned?:number; target:number; ready:boolean; max?:number; saveOwned:Save; saveTarget:Save; remove:()=>Promise<boolean>; character?:string}) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, Feedback>>({});
  const report = (label:string) => (feedback:Feedback) => setFieldErrors(old => ({...old,[label]:feedback}));
  const remaining = owned === undefined ? undefined : Math.max(0, target - owned);
  return <div className="farming-material-row" data-material-id={id} role="group" aria-label={`${name}${character ? ` (${character})` : ''} farming target`}>
    <div className="farming-material-heading"><strong>{name}</strong>{character && <small>{character}</small>}<button className="farming-remove" aria-label={`Remove ${name} from farming plan`} disabled={!ready || busy} onClick={async e => {anchorMaterial(e.currentTarget); const list = e.currentTarget.closest('.farming-material-row')?.parentElement; const pane = list?.closest('section, aside'); setBusy(true); try {const saved = await remove(); setError(saved ? '' : 'Could not remove. Try again.'); if (saved) requestAnimationFrame(() => (list?.querySelector<HTMLElement>('input') || pane?.querySelector<HTMLElement>('input[type=search]'))?.focus());} catch {setError('Could not remove. Try again.');} finally {setBusy(false);}}}>×</button></div>
    <div className="farming-counts"><FarmQuantity label="Owned" name={name} value={owned} ready={ready} max={max} save={saveOwned} report={report('Owned')}/><FarmQuantity label="Target" name={name} value={target} ready={ready} max={max} save={saveTarget} report={report('Target')}/><span className="farming-remaining" aria-label={`${name}: ${remaining === undefined ? 'unknown' : remaining} remaining`}>Remaining<strong>{remaining ?? '?'}</strong>{remaining === 0 && <small>Stock met</small>}</span></div>
    {(error || Object.values(fieldErrors).some(e=>e.message)) && <div className="farming-row-errors">{error && <small role="alert">{error}</small>}{Object.entries(fieldErrors).filter(([,e])=>e.message).map(([label,e])=><small key={label} id={e.id} role="alert">{label}: {e.message}</small>)}</div>}
  </div>;
}

/** One source option per line, grouped by world; long instructions turn onto notes pages. */
export function FarmingItinerary({plan, scopeLabel}: {plan:Plan; scopeLabel?:string}) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const instance = useId();
  function toggle(id:string) {setExpanded(old => {const next = new Set(old); next.has(id) ? next.delete(id) : next.add(id); return next;});}
  return <div className="farming-itinerary">
    <h2>World route</h2>
    <p className="farming-route-help">{scopeLabel ? `${scopeLabel}.` : 'All planned materials.'} Choose source options below; you don’t need every stop. Expand a line for its route.</p>
    <JournalNotePages label="Route">
      {plan.groups.map(group => <section className="farming-world" key={group.world} data-world={group.world} aria-label={group.world}>
        <h3>{group.world}</h3>
        {group.rows.map(row => {
          const open = expanded.has(row.id), controls = `${instance}-${encodeURIComponent(row.id)}`;
          return <section className={`farming-source ${open ? 'farming-source-open' : ''}`} key={row.id} data-source-id={row.id} data-material-id={row.materialId}>
            <button className="farming-source-summary" aria-expanded={open} id={`${controls}-toggle`} aria-controls={controls} onClick={() => toggle(row.id)}><span aria-hidden="true">{open ? '▾' : '▸'}</span><span><strong>{row.materialName}</strong><span> · {row.source}</span><small>{row.rate.length > 120 ? 'Conditional rate · see notes' : row.rate || 'Rate not recorded'}{row.character ? ` · ${row.character}` : ''}{row.alternative ? ' · option' : ''}</small></span></button>
            {open && <div id={controls} className="farming-source-notes"><p className="farming-option-note">Source option for {row.materialName}. Gather only the remaining amount.</p>{row.rate.length > 120 && <p><strong>Rate / reward:</strong> {row.rate}</p>}{row.location && <p><strong>Location:</strong> {row.location}</p>}{row.details.map((text,i) => <p key={i}>{text}</p>)}{row.sources.length > 0 && <p className="farming-citations">Sources: {row.sources.map((source,i) => <span key={source.url}>{i > 0 && ' · '}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span>)}</p>}<button className="farming-collapse" onClick={() => {toggle(row.id); requestAnimationFrame(() => document.getElementById(`${controls}-toggle`)?.focus());}}>Collapse {row.materialName} source</button></div>}
          </section>;
        })}
      </section>)}
      {!plan.groups.length && <p className="farming-empty">{plan.satisfiedCount > 0 && plan.pendingCount === 0 ? 'All planned stock targets are met. No farming stops needed.' : plan.pendingCount > 0 ? 'No source options match this scope. Check the material notes or choose another character or world.' : 'Add materials or recipe ingredients to start your route.'}</p>}
      {plan.unknownCount > 0 && <p className="farming-stock-note">{plan.unknownCount} {plan.unknownCount === 1 ? 'material has' : 'materials have'} unknown stock. Source options stay in the route until you enter Owned.</p>}
      {plan.satisfiedCount > 0 && <p className="farming-stock-note">{plan.satisfiedCount} {plan.satisfiedCount === 1 ? 'target is' : 'targets are'} already met and omitted from the route.</p>}
    </JournalNotePages>
  </div>;
}
