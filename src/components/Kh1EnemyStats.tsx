import {useLayoutEffect, useRef, useState} from 'react';
import type { EnemyFact, EnemyStatGroup } from '../domain/kh1EnemyStats';

/** Numeric contexts compare across rows; narrative exceptions retain room to wrap. */
export function Kh1EnemyStats({groups, multipliers}: {groups: EnemyStatGroup[]; multipliers: EnemyFact[]}) {
  const root = useRef<HTMLDivElement>(null);
  const [leafHeight,setLeafHeight] = useState(Infinity);
  useLayoutEffect(()=>{
    const leaf=root.current?.closest('.kh1-note-window');
    if(!leaf)return;
    const measure=()=>{const height=leaf.getBoundingClientRect().height;if(height>0)setLeafHeight(height);};
    const observer=new ResizeObserver(measure);observer.observe(leaf);measure();
    return ()=>observer.disconnect();
  },[]);
  const shortLeaf=leafHeight<320;
  const rowLimit=leafHeight<180?1:shortLeaf?2:3;
  // Long exception prose must use the full leaf width and may flow between pages.
  // Keeping it in a narrow, unbreakable table cell can hide lines on short screens.
  const longValue = (value: string | number) => String(value).length > 64 || (shortLeaf && typeof value === 'string' && !/^x?\d+(?:\.\d+)?$/.test(value));
  const conditions: EnemyFact[] = [
    ...groups.flatMap(group => group.rows.filter(row => longValue(row.value)).map(row => [row.key, row.value] as EnemyFact)),
    ...multipliers.filter(([,value]) => longValue(value)),
  ];
  const tableGroups = groups.map(group => ({...group, rows:group.rows.filter(row => !longValue(row.value))})).filter(group=>group.rows.length);
  const multiplierRows=leafHeight<180?1:4;
  const tableMultipliers = multipliers.filter(([,value]) => !longValue(value));
  const blocks: EnemyStatGroup[][] = [];
  for (const group of tableGroups) {
    const previous = blocks.at(-1);
    const numeric = group.rows.every(row => typeof row.value === 'number');
    if (numeric && previous && previous.length < rowLimit && previous.every(g => g.rows.every(r => typeof r.value === 'number'))
      && previous[0].rows.map(r=>r.label).join('|') === group.rows.map(r=>r.label).join('|')) previous.push(group);
    else blocks.push([group]);
  }
  return <div className="kh1-enemy-stats" ref={root}>
    {groups.length > 0 && <p className="kh1-stat-key">STR: Strength · DEF: Defense · MP rec.: MP recovery value</p>}
    {blocks.map((block,index) => block.every(g=>g.rows.every(r=>typeof r.value==='number'))
      ? <table className="kh1-enemy-stat-table kh1-enemy-matrix" key={block[0].context}>
        <caption>Combat stats{index ? ' (continued)' : ''}</caption>
        <thead><tr><th scope="col">Context</th>{block[0].rows.map(row=><th scope="col" key={row.label}>{row.label === 'Strength' ? <abbr title="Strength">STR</abbr> : row.label === 'Defense' ? <abbr title="Defense">DEF</abbr> : row.label === 'MP recovery value' ? <abbr title="MP recovery value">MP rec.</abbr> : row.label}</th>)}</tr></thead>
        <tbody>{block.map(group=><tr key={group.context}><th scope="row">{group.context}</th>{group.rows.map(row=><td key={row.key} data-stat-key={row.key}>{String(row.value)}</td>)}</tr>)}</tbody>
      </table>
      : <table className="kh1-enemy-stat-table" key={block[0].context}>
        <caption>{block[0].context}</caption>
        <thead><tr><th scope="col">Stat</th><th scope="col">Value</th></tr></thead>
        <tbody>{block[0].rows.map(row => <tr key={row.key} data-stat-key={row.key}>
          <th scope="row">{row.label}</th><td>{String(row.value)}</td>
        </tr>)}</tbody>
      </table>)}
    {Array.from({length:Math.ceil(tableMultipliers.length/multiplierRows)}, (_, index) => <table className="kh1-enemy-stat-table" key={`multipliers-${index}`}>
      <caption>Damage multipliers{index ? ' (continued)' : ''}</caption>
      <thead><tr><th scope="col">Type</th><th scope="col">Multiplier / condition</th></tr></thead>
      <tbody>{tableMultipliers.slice(index*multiplierRows,index*multiplierRows+multiplierRows).map(([key,value]) => <tr key={key} data-stat-key={key}>
        <th scope="row">{key.replace(/ multiplier$/, '')}</th><td>{String(value)}</td>
      </tr>)}</tbody>
    </table>)}
    {conditions.length > 0 && <section className="kh1-stat-conditions" aria-label="Combat stat conditions">
      <h3>Stat conditions</h3>
      {conditions.map(([key,value]) => <div className="kh1-stat-condition" key={key}>
        <h4>{key}</h4><p data-stat-key={key} className="kh1-stat-condition-value">{String(value)}</p>
      </div>)}
    </section>}
  </div>;
}
