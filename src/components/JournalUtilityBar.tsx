import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import './journal-chrome.css';
import './journal-viewport.css';

/** Companion controls belong to the active game's interface, never an outer frame. */
export function JournalUtilityBar({ className, game, children, tools }: {
  className: string;
  game: string;
  children?: ReactNode;
  tools?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault(); setOpen(false); trigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', key); };
  }, [open]);
  return <div ref={root} className={`journal-utility-bar journal-inset-tools ${className}`} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
  }}>
    <button ref={trigger} type="button" className="journal-tools-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>Tools</button>
    {open && <div id={id} className="journal-tools-panel" aria-label="Journal tools" onClick={event => {
      const action = (event.target as Element).closest('a[href],button');
      if (action) {
        setOpen(false);
        if (action.tagName === 'BUTTON') trigger.current?.focus();
      }
    }}>
      <span className="journal-game-label">{game}</span>
      <a className="journal-games-link" href="#/">‹ Ars Arcanum home</a>
      {tools}
      {children}
    </div>}
  </div>;
}
