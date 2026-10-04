import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/** Flow long notes onto facing-book-sized pages instead of a scrollable leaf. */
export function JournalNotePages({children, label='Notes'}: {children:ReactNode; label?:string}) {
  const windowRef=useRef<HTMLDivElement>(null);
  const flowRef=useRef<HTMLDivElement>(null);
  const [layout,setLayout]=useState({width:0,pages:1});
  const [page,setPage]=useState(0);
  useLayoutEffect(()=>{
    const window=windowRef.current!;
    const flow=flowRef.current!;
    let frame=0;
    const measure=()=>{
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const width=window.getBoundingClientRect().width;
        flow.style.columnWidth=`${width}px`;
        const pages=Math.max(1,Math.round((flow.scrollWidth+24)/(width+24)));
        setLayout(old=>old.width===width&&old.pages===pages?old:{width,pages});
        setPage(old=>Math.min(old,pages-1));
      });
    };
    const resize=new ResizeObserver(measure);
    resize.observe(window);
    const mutation=new MutationObserver(measure);
    mutation.observe(flow,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['open']});
    document.fonts.ready.then(measure);
    measure();
    return ()=>{cancelAnimationFrame(frame);resize.disconnect();mutation.disconnect();};
  },[children]);
  return <div className="kh1-note-pages">
    <div ref={windowRef} className="kh1-note-window" onFocusCapture={e=>{
      const target=e.target.getBoundingClientRect();
      const bounds=windowRef.current!.getBoundingClientRect();
      const next=page+Math.floor((target.left-bounds.left+1)/(layout.width+24));
      setPage(Math.max(0,Math.min(layout.pages-1,next)));
    }}>
      <div ref={flowRef} className="kh1-note-flow" style={{transform:`translateX(-${page*(layout.width+24)}px)`}}>{children}</div>
    </div>
    <nav className="kh1-note-pagination" aria-label={`${label} pages`}>
      <button aria-label={`Previous ${label.toLowerCase()} page`} disabled={page===0} onClick={()=>setPage(p=>p-1)}>◀</button>
      <span aria-live="polite">{label} {page+1} / {layout.pages}</span>
      <button aria-label={`Next ${label.toLowerCase()} page`} disabled={page+1>=layout.pages} onClick={()=>setPage(p=>p+1)}>▶</button>
    </nav>
  </div>;
}
