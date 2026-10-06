import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { compareMaterials, materialFamily } from '../../src/domain/materialPresentation';
import type { GameData } from '../../src/domain/types';

const data:GameData=JSON.parse(readFileSync('public/data/kh1fm.json','utf8'));
// Ten postcard records include a linked pair: nine acquisition actions.
const materials=data.entries.filter(e=>e.category==='material').sort(compareMaterials);

test('every material is reachable once in a complete ordered family',async({page})=>{
 await page.goto('./#/kh1fm/synthesis/materials');
 const index=page.getByRole('navigation',{name:'materials index',exact:true});
 await expect(index.locator('.kh1-material-family').first()).toBeVisible();
 const found:string[]=[];
 for(let turn=0;turn<materials.length;turn++){
  for(const group of await index.locator('.kh1-material-family').all()){
   const family=await group.locator('h3').innerText();
   const names=await group.locator('a').allTextContents();
   const actual=names.map(n=>n.replace(/›$/,'').trim());
   expect(actual).toEqual(materials.filter(e=>materialFamily(e)===family).map(e=>e.name));
   found.push(...actual);
  }
  const next=page.getByRole('link',{name:'Next index page',exact:true});
  if(!await next.count())break;
  const previous=await index.innerText();await next.click();await expect(index).not.toHaveText(previous);
 }
 expect(found).toEqual(materials.map(e=>e.name));
 expect(new Set(found).size).toBe(materials.length);
 await page.getByRole('searchbox').fill('Frost');
 await page.getByRole('button',{name:'Find',exact:true}).click();
 await expect(index.locator('h3')).toHaveText(['Frost']);
 await expect(index.locator('a')).toHaveCount(materials.filter(e=>materialFamily(e)==='Frost').length);
 await index.getByRole('link',{name:'Frost Shard',exact:true}).click();
 await page.reload();
 const indexButton=page.getByRole('button',{name:'Index',exact:true});
 if(await indexButton.isVisible())await indexButton.click();
 await expect(page.getByRole('searchbox')).toHaveValue('Frost');
 await expect(index.getByRole('link',{name:'Frost Shard',exact:true})).toHaveAttribute('aria-current','true');
});

for(const viewport of [{width:320,height:568},{width:390,height:844},{width:844,height:390},{width:1440,height:900}]){
 test(`collection controls remain usable at ${viewport.width}x${viewport.height}`,async({page})=>{
  await page.setViewportSize(viewport);
  await page.goto('./#/kh1fm/treasures');
  const shortcut=page.getByRole('link',{name:'Postcard collection ›',exact:true});
  await expect(shortcut).toBeVisible();await shortcut.click();
  await expect(page.locator('.kh1-collection-count')).toHaveText('0 / 9 collection actions');
  const check=page.getByRole('checkbox').first();await check.check();
  await expect(page.locator('.kh1-collection-count')).toHaveText('1 / 9 collection actions');
  await page.getByRole('combobox',{name:'Filter by collection status',exact:true}).selectOption('remaining');
  await expect(page.locator('.kh1-collection-count')).toHaveText('1 / 9 collection actions');
  await page.getByRole('button',{name:'Tools',exact:true}).click();
  await page.getByRole('button',{name:'Undo',exact:true}).click();
  await expect(page.locator('.kh1-collection-count')).toHaveText('0 / 9 collection actions');
  await page.reload();
  await expect(page.locator('.kh1-collection-count')).toHaveText('0 / 9 collection actions');
  await page.goto('./#/kh1fm/synthesis/materials?q=Frost');
  const family=page.locator('.kh1-material-family');
  await expect(family.locator('h3')).toHaveText('Frost');
  for(const link of await family.locator('a').all()){await link.scrollIntoViewIfNeeded();await expect(link).toBeInViewport();}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width+1);
 });
}
