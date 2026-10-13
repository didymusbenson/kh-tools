import {test,expect,type Page} from '@playwright/test';
import {readFileSync} from 'node:fs';
import type {GameData} from '../../src/domain/types';
import {kh1WorldCategories,kh1WorldCategoryHref} from '../../src/domain/kh1WorldCategories';
const data=JSON.parse(readFileSync('public/data/kh1fm.json','utf8')) as GameData;
test.use({serviceWorkers:'block'});
async function settled(page:Page){await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});}
async function openWorld(page:Page,world:string){await page.goto('./#/kh1fm/worlds/'+encodeURIComponent(world));await expect(page.locator('.kh1-world-categories')).toBeVisible();await settled(page);}
async function category(page:Page,id:string){await expect(page.locator('.kh1-world-categories')).toBeVisible();let row=page.locator('[data-world-category="'+id+'"]');while(!await row.count()){await page.getByRole('link',{name:'Next index page',exact:true}).click();}return row;}
test('every world has a clean, complete category directory and usable category targets',async({page})=>{
 for(const world of [...new Set(data.entries.flatMap(e=>e.world?[e.world]:[]))]){
  await openWorld(page,world);const expected=kh1WorldCategories(data.entries,world,{});const seen:string[]=[];
  for(;;){
   for(const row of await page.locator('[data-world-category]').all()){
    const id=(await row.getAttribute('data-world-category'))!;seen.push(id);const cat=expected.find(c=>c.id===id)!;
    expect(cat).toBeTruthy();expect(cat.members.length).toBeGreaterThan(0);await expect(row).toHaveAttribute('href',kh1WorldCategoryHref(cat,world));await expect(row).toHaveAttribute('data-complete','false');
    await expect(row).toContainText(cat.total?'0 / '+cat.total:cat.references+' reference');
    const box=await row.boundingBox();expect(box!.height).toBeGreaterThanOrEqual(44);
   }
   const next=page.getByRole('link',{name:'Next index page',exact:true});if(!await next.count())break;const target=await next.getAttribute('href');await next.click();await expect.poll(()=>page.evaluate(()=>location.hash)).toBe(target);await settled(page);
  }
  expect(seen).toEqual(expected.map(c=>c.id));expect(await page.locator('.kh1-index-row').count()).toBe(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
});
test('Destiny Islands treasures preserve scope, save, completion, undo and reload',async({page})=>{
 await openWorld(page,'Destiny Islands');await (await category(page,'treasures')).click();
 await expect(page.getByTestId('treasure-summary')).toBeVisible();
 const worlds=page.locator('.treasure-worlds>a');await expect(worlds).toHaveCount(2);await expect(worlds.nth(0)).toContainText('Chests & containers');await expect(worlds.nth(1)).toContainText('Other acquisitions');
 await worlds.first().click();await expect(page.getByTestId('treasure-count')).toHaveText('0 / 1 acquisitions');
 await page.locator('.treasure-preview').getByRole('checkbox').check();await expect(page.getByTestId('treasure-count')).toHaveText('1 / 1 acquisitions');
 await page.getByRole('link',{name:'Back to Worlds',exact:true}).click();await expect(page.locator('.treasure-worlds>a')).toHaveCount(2);
 await page.locator('.treasure-worlds>a').nth(1).click();await expect(page.getByTestId('treasure-count')).toHaveText('0 / 3 acquisitions');
 let count=0;for(const button of await page.locator('[data-treasure-id]').all()){await button.click();await expect(button).toHaveAttribute('aria-pressed','true');await page.locator('.treasure-preview').getByRole('checkbox').check();await expect(page.getByTestId('treasure-count')).toHaveText((++count)+' / 3 acquisitions');}
 await openWorld(page,'Destiny Islands');await expect(await category(page,'treasures')).toContainText('4 / 4');await expect(await category(page,'treasures')).toHaveAttribute('data-complete','true');
 await page.reload();await expect(await category(page,'treasures')).toHaveAttribute('data-complete','true');
 await (await category(page,'treasures')).click();await page.locator('.treasure-worlds>a').first().click();await page.locator('.treasure-preview').getByRole('checkbox').uncheck();await page.locator('.treasure-grid-leaf .treasure-save').getByRole('button',{name:'Undo',exact:true}).click();await expect(page.getByTestId('treasure-count')).toHaveText('1 / 1 acquisitions');
});
test('world-scoped enemy, challenge and notes destinations and back navigation',async({page})=>{
 for(const [id,expected] of [['enemies','Shadow'],['challenges','Racing Riku'],['notes','Destiny Islands collection route']]){
  await openWorld(page,'Destiny Islands');const row=await category(page,id);await row.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('combobox',{name:'Filter by world',exact:true})).toHaveValue('Destiny Islands');
  await expect(page.locator('.kh1-index')).toContainText(expected);
  await page.locator('.kh1-bottom>a').first().click();await expect(page.locator('.kh1-world-categories')).toBeVisible();
 }
 await openWorld(page,'Unknown world');await expect(page.locator('[data-world-category]')).toHaveCount(0);await expect(page.locator('.kh1-empty')).toBeVisible();
});
