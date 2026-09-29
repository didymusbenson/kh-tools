import { useEffect, useRef, useState, type ReactNode } from 'react';
import { bbsCharacters, type BbsCharacter } from '../games/bbsModel';
export function CharacterPills({value,onChange}:{value:BbsCharacter;onChange:(c:BbsCharacter)=>void}) {return <div className="bbs-character-pills" role="group" aria-label="Character filter">{bbsCharacters.map(c=><button type="button" key={c} className={`bbs-pill ${c.toLowerCase()}`} aria-pressed={value===c} onClick={()=>onChange(c)}><span aria-hidden="true">{value===c?'✓':'○'}</span>{c}</button>)}</div>;}
export function CharacterMarks({characters}:{characters:readonly string[]}) {return <span className="bbs-character-marks" aria-label={`Available to ${characters.join(', ')}`}>{bbsCharacters.map(c=><span key={c} className={`${c.toLowerCase()} ${characters.includes(c)?'':'unavailable'}`} aria-hidden="true">{characters.includes(c)?c[0]:'–'}</span>)}</span>;}
export function BbsModal({title,children,onClose}:{title:string;children:ReactNode;onClose:()=>void}) {
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const prior=document.activeElement as HTMLElement|null;const d=dialog.current;d?.showModal();return()=>{d?.close();prior?.focus();}},[]);
 return <dialog className="bbs-modal" ref={dialog} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}} aria-label={title}><header><h2>{title}</h2><button onClick={onClose} aria-label="Close dialog">Close ×</button></header><div className="bbs-modal-body">{children}</div></dialog>;
}
export function BbsQuantity({label,value,disabled,save}:{label:string;value?:number;disabled:boolean;save:(n:number|undefined)=>Promise<boolean>}) {
 const [draft,setDraft]=useState(value?.toString()??''),[error,setError]=useState(''),[saving,setSaving]=useState(false),[saved,setSaved]=useState(false);
 useEffect(()=>{setDraft(value?.toString()??'');setError('')},[value,label]);
 async function commit(){const n=draft===''?undefined:Number(draft);if(n!==undefined&&(!Number.isInteger(n)||n<0||n>999999)){setError('Enter a whole number from 0 to 999999.');return;}if(n!==value){setSaving(true);try{const ok=await save(n);setError(ok?'':'Could not save this count.');setSaved(ok)}finally{setSaving(false)}}else setError('');}
 return <label className="bbs-quantity">{label}<input aria-label={label} type="number" min="0" max="999999" step="1" value={draft} placeholder="?" disabled={disabled||saving} onChange={e=>{setDraft(e.target.value);setSaved(false)}} onBlur={()=>void commit()} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}} aria-invalid={!!error}/>{error?<small role="alert">{error}</small>:<span className="bbs-quantity-status" role="status">{saving?'Saving…':saved?'Saved':''}</span>}</label>;
}
