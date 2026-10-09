import {describe, expect, it} from 'vitest';
import {groupMaterialFamilies, materialFamilyPages} from '../src/games/materialPages';
import {materialFamily, sortMaterials} from '../src/games/presentation';
import kh2 from '../src/games/kh2fm';
import ddd from '../src/games/dddhd';

const family=(name:string)=>name.split(' ')[0];
describe('material inventory family pages',()=>{
  it('budgets a heading per family and preserves full rank groups',()=>{
    const items=['Blazing Shard','Blazing Stone','Blazing Gem','Dark Shard','Dark Stone'];
    expect(materialFamilyPages(items,6,family)).toEqual([items.slice(0,3),items.slice(3)]);
    expect(materialFamilyPages(items,7,family)).toEqual([items]);
  });
  it('keeps oversized families whole and provides one empty page',()=>{
    expect(materialFamilyPages(['Blazing Shard','Blazing Stone'],1,family)).toEqual([['Blazing Shard','Blazing Stone']]);
    expect(materialFamilyPages([],5,family)).toEqual([[]]);
  });
  it('preserves filtered groups and consolidates interleaved families',()=>{
    expect(groupMaterialFamilies(['Dark Shard','Blazing Shard','Dark Crystal'],family)).toEqual([{family:'Dark',items:['Dark Shard','Dark Crystal']},{family:'Blazing',items:['Blazing Shard']}]);
  });
  for(const guide of [kh2,ddd])it(`${guide.id} retains every inventory entry once, without splitting families`,()=>{
    const items=guide.entries.filter(e=>['material','materials'].includes(e.category)).sort(sortMaterials);
    for(const capacity of [1,3,5,8,12]){
      const pages=materialFamilyPages(items,capacity,materialFamily);
      expect(pages.flat().map(e=>e.id)).toEqual(items.map(e=>e.id));
      for(const {family,items:group} of groupMaterialFamilies(items,materialFamily)){
        expect(pages.filter(page=>page.some(e=>materialFamily(e)===family))).toHaveLength(1);
        expect(pages.find(page=>page.includes(group[0]))).toEqual(expect.arrayContaining(group));
      }
    }
  });
});
