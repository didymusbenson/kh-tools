import type { EnemyFact, EnemyStatGroup } from '../domain/kh1EnemyStats';

/** Numeric contexts compare across rows; narrative exceptions retain room to wrap. */
export function Kh1EnemyStats({groups, multipliers}: {groups: EnemyStatGroup[]; multipliers: EnemyFact[]}) {
  const blocks: EnemyStatGroup[][] = [];
  for (const group of groups) {
    const previous = blocks.at(-1);
    const numeric = group.rows.every(row => typeof row.value === 'number');
    if (numeric && previous && previous.length < 3 && previous.every(g => g.rows.every(r => typeof r.value === 'number'))
      && previous[0].rows.map(r=>r.label).join('|') === group.rows.map(r=>r.label).join('|')) previous.push(group);
    else blocks.push([group]);
  }
  return <div className="kh1-enemy-stats">
    {blocks.map((block,index) => block.every(g=>g.rows.every(r=>typeof r.value==='number'))
      ? <table className="kh1-enemy-stat-table kh1-enemy-matrix" key={block[0].context}>
        <caption>Combat stats{index ? ' (continued)' : ''}<span className="kh1-stat-key">STR: Strength · DEF: Defense</span></caption>
        <thead><tr><th scope="col">Context</th>{block[0].rows.map(row=><th scope="col" key={row.label}>{row.label === 'Strength' ? <abbr title="Strength">STR</abbr> : row.label === 'Defense' ? <abbr title="Defense">DEF</abbr> : row.label}</th>)}</tr></thead>
        <tbody>{block.map(group=><tr key={group.context}><th scope="row">{group.context}</th>{group.rows.map(row=><td key={row.key} data-stat-key={row.key}>{String(row.value)}</td>)}</tr>)}</tbody>
      </table>
      : <table className="kh1-enemy-stat-table" key={block[0].context}>
        <caption>{block[0].context}</caption>
        <thead><tr><th scope="col">Stat</th><th scope="col">Value</th></tr></thead>
        <tbody>{block[0].rows.map(row => <tr key={row.key} data-stat-key={row.key}>
          <th scope="row">{row.label}</th><td>{String(row.value)}</td>
        </tr>)}</tbody>
      </table>)}
    {Array.from({length:Math.ceil(multipliers.length/4)}, (_, index) => <table className="kh1-enemy-stat-table" key={`multipliers-${index}`}>
      <caption>Damage multipliers{index ? ' (continued)' : ''}</caption>
      <thead><tr><th scope="col">Type</th><th scope="col">Multiplier / condition</th></tr></thead>
      <tbody>{multipliers.slice(index*4,index*4+4).map(([key,value]) => <tr key={key} data-stat-key={key}>
        <th scope="row">{key.replace(/ multiplier$/, '')}</th><td>{String(value)}</td>
      </tr>)}</tbody>
    </table>)}
  </div>;
}
