import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {kh1EnemyStats} from '../src/domain/kh1EnemyStats';
import type {GuideEntry} from '../src/domain/types';
const entries:GuideEntry[]=JSON.parse(readFileSync('data/kh1fm/reference.json','utf8'));
const enemies=entries.filter(e=>e.category==='enemy');
describe('lossless KH1 combat table presentation',()=>{
  it('preserves all 986 enemy and boss facts exactly once, without numeric coercion',()=>{
    const affected=entries.filter(e=>['enemy','boss'].includes(e.category));
    expect(affected).toHaveLength(54);
    let total=0,stats=0,multipliers=0;
    for(const entry of affected){
      const original=Object.entries(entry.facts||{}),before=JSON.stringify(entry);
      const view=kh1EnemyStats(entry,original);
      const cells=view.groups.flatMap(g=>g.rows.map(r=>[r.key,r.value]));
      expect(Object.fromEntries([...cells,...view.multipliers,...view.remaining])).toEqual(entry.facts);
      expect(cells.length+view.multipliers.length+view.remaining.length).toBe(original.length);
      expect(JSON.stringify(entry)).toBe(before);
      total+=original.length;stats+=cells.length;multipliers+=view.multipliers.length;
    }
    expect([total,stats,multipliers]).toEqual([986,475,352]);
  });
  it('keeps original phase/world labels, zero values, and narrative stat exceptions',()=>{
    for(const entry of enemies){
      const view=kh1EnemyStats(entry,Object.entries(entry.facts!));
      for(const group of view.groups){
        expect(group.rows).toHaveLength(5);
        for(const row of group.rows)expect(`${group.context} ${row.label}`).toBe(row.key);
      }
    }
    const shadow=enemies.find(e=>e.name==='Shadow')!;
    const groups=kh1EnemyStats(shadow,Object.entries(shadow.facts!)).groups;
    expect(groups).toHaveLength(13);
    expect(groups.map(g=>g.context)).toContain('After rescue');
    expect(groups[0].rows.find(r=>r.label==='MP recovery value')!.value).toBe(0);
    expect(groups.map(g=>g.context)).toContain('World of Chaos');
  });
  it('leaves non-stat boss facts and other games alone',()=>{
    for(const entry of entries.filter(e=>e.category==='boss')){
      const facts=Object.entries(entry.facts!);
      expect(kh1EnemyStats(entry,facts)).toEqual({groups:[],multipliers:[],remaining:facts});
    }
    const entry={...enemies[0],game:'kh2fm'} as unknown as GuideEntry;
    const facts=Object.entries(entry.facts!);
    expect(kh1EnemyStats(entry,facts)).toEqual({groups:[],multipliers:[],remaining:facts});
  });
});
