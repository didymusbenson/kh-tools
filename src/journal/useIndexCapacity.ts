import { useLayoutEffect, useRef, useState } from 'react';

/** Keep compact rows, and spend the available leaf height on more entries. */
export function useIndexCapacity(scope: string, minimumRowHeight = 44, grid = false) {
  const ref = useRef<HTMLElement>(null);
  const [capacity, setCapacity] = useState(5);
  const measured = useRef({scope: '', width: 0, height: 0, row: minimumRowHeight});
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    let disposed = false;
    const measure = () => {
      if (disposed || !node.clientHeight || !node.clientWidth) return;
      const {width, height} = node.getBoundingClientRect();
      const previous = measured.current;
      const sameSpace = previous.scope === scope && previous.width === width && previous.height === height;
      // Retain the largest encountered row in this layout so wrapped titles cannot
      // cause the page size to oscillate as rows enter or leave the rendered page.
      const row = Math.max(minimumRowHeight, sameSpace ? previous.row : 0,
        ...Array.from(node.children, child => child.getBoundingClientRect().height));
      measured.current = {scope, width, height, row};
      const style = getComputedStyle(node);
      const columns = grid ? style.gridTemplateColumns.split(' ').length : 1;
      const gap = grid ? parseFloat(style.rowGap) || 0 : 0;
      setCapacity(Math.max(1, Math.floor((height + gap) / (row + gap))) * columns);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    for (const child of node.children) observer.observe(child);
    measure();
    void document.fonts.ready.then(measure);
    return () => { disposed = true; observer.disconnect(); };
  });
  return {ref, capacity};
}
