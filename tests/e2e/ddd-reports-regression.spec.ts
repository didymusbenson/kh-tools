import {test, expect, type Page, type Locator} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {entryTitle} from '../../src/domain/entryPresentation';

const guide=JSON.parse(readFileSync('src/games/dddhd/content.json','utf8'));
const sora=guide.entries.find((e:any)=>e.category==='treasures'&&e.character==='Sora');
const riku=guide.entries.find((e:any)=>e.category==='treasures'&&e.character==='Riku');
const recipe=guide.recipes.find((r:any)=>r.id==='dddhd:recipe:aura-lion:source-1');
const material=guide.entries.find((e:any)=>e.id===recipe.ingredients[0].id);
const path=(section:string,values:Record<string,string>={})=>`./#/dddhd/${section}${Object.keys(values).length?'?'+new URLSearchParams(values):''}`;
const checkbox=(page:Page,e:any)=>page.getByRole('checkbox',{name:e.category==='treasures'?`Collected ${entryTitle(e)}`:`Complete ${e.name}${e.character?` (${e.character})`:''}`,exact:true});
const treasureSave=(page:Page)=>page.locator('.treasure-save:visible');
const treasureTotal=(page:Page)=>page.getByTestId('treasure-summary').locator('.treasure-heading > span');
async function profile(page:Page){
 return page.evaluate(()=>new Promise<any>((resolve,reject)=>{
  const request=indexedDB.open('ars-arcanum-guides',1);
  request.onsuccess=()=>{const db=request.result, read=db.transaction('profiles').objectStore('profiles').get('dddhd');read.onsuccess=()=>{resolve(read.result);db.close();};read.onerror=()=>reject(read.error);};request.onerror=()=>reject(request.error);
 }));
}
async function revealNote(page:Page,target:Locator){
 for(let n=0;n<60;n++){
  const box=await target.boundingBox(),leaf=await page.locator('.kh1-note-window').boundingBox();
  if(box&&leaf&&box.x>=leaf.x-1&&box.x+box.width<=leaf.x+leaf.width+1&&box.y>=leaf.y-1&&box.y+box.height<=leaf.y+leaf.height+1)return;
  const next=page.getByRole('button',{name:'Next notes page'});
  if(await next.isDisabled())throw new Error('Requested note control is not reachable');
  await next.click();
 }
 throw new Error('Requested note control exceeded bounded pagination');
}

test('DDD character-scoped records sync through search, history, reload and another tab',async({page,context})=>{
 await page.goto(path('treasures',{character:'Sora',entry:sora.id}));
 await expect(checkbox(page,sora)).toBeEnabled();
 await checkbox(page,sora).click();
 await expect(treasureSave(page)).toContainText('Marked collected.');
 await page.reload();await expect(checkbox(page,sora)).toBeChecked();
 await page.goto(path('search',{q:sora.reward,entry:sora.id}));
 await expect(checkbox(page,sora)).toBeChecked();
 await page.goto(path('treasures',{character:'Riku',entry:riku.id}));
 await expect(checkbox(page,riku)).not.toBeChecked();
 await page.goBack();await expect(checkbox(page,sora)).toBeChecked();
 const other=await context.newPage();await other.goto(path('treasures',{entry:sora.id}));
 await expect(checkbox(other,sora)).toBeChecked();
 await checkbox(page,sora).click();
 await expect(checkbox(other,sora)).not.toBeChecked();
 await other.close();
});

test('DDD displayed treasure totals do not shrink with search or completion filters',async({page})=>{
 await page.goto(path('treasures',{character:'Sora'}));
 await expect(treasureTotal(page)).toHaveText('0 / 225 chests');
 const full=await treasureTotal(page).innerText();
 await page.getByTestId('treasure-summary').getByRole('link',{name:new RegExp(sora.world)}).click();
 const worldTotal=page.getByTestId('treasure-count'),worldFull=await worldTotal.innerText();
 await page.getByRole('button',{name:'Find & filter',exact:true}).click();
 await page.getByRole('searchbox',{name:'Find a treasure',exact:true}).fill(sora.reward);
 await page.getByRole('button',{name:'Find',exact:true}).click();
 await expect(worldTotal).toHaveText(worldFull);
 await page.getByRole('button',{name:'Find & filter',exact:true}).click();
 await page.getByRole('combobox',{name:'Treasure status',exact:true}).selectOption('remaining');
 await page.getByRole('button',{name:'Close filters',exact:true}).click();
 await expect(worldTotal).toHaveText(worldFull);
 await page.getByRole('link',{name:'All treasure worlds',exact:true}).click();
 await expect(treasureTotal(page)).toHaveText(full);
 await page.getByRole('button', {name:'Tools',exact:true}).click();
 await page.getByRole('combobox',{name:'Filter by character',exact:true}).selectOption('Riku');
 await page.keyboard.press('Escape');
 await expect(treasureTotal(page)).toHaveText('0 / 213 chests');
});

test('DDD recipe targets add, unknown stock differs from zero, and creating spends nothing',async({page})=>{
 await page.goto(path('workshop/recipes',{entry:recipe.id}));
 await expect(page.getByRole('button',{name:'Add ingredients to farming plan'})).toBeEnabled();
 expect(recipe.ingredients[0].quantity).toBe(3);
 for(let n=0;n<2;n++){
  await page.getByRole('button',{name:'Add ingredients to farming plan'}).click();
  await expect(page.locator('.ddd-save')).toContainText('Ingredients added');
 }
 await expect.poll(async()=> (await profile(page)).targets[material.id]).toBe(6);
 await page.goto(path('workshop/plan',{entry:material.id}));
 const owned=page.getByRole('spinbutton',{name:`Owned ${material.name}`,exact:true});
 await expect(owned).toHaveValue('');
 const remaining=page.locator(`[data-material-id="${material.id}"] .farming-remaining strong`);
 await expect(remaining).toHaveText('?');
 await owned.fill('0');await owned.press('Tab');
 await expect.poll(async()=> (await profile(page)).owned[material.id]).toBe(0);
 await expect(remaining).toHaveText('6');
 await owned.fill('9');await owned.press('Tab');
 await expect.poll(async()=> (await profile(page)).owned[material.id]).toBe(9);
 await expect(remaining).toHaveText('0');
 await page.goto(path('workshop/recipes',{entry:recipe.id}));
 await checkbox(page,recipe).check();
 await expect.poll(async()=> (await profile(page)).checks[recipe.id]).toBe(true);
 expect((await profile(page)).owned[material.id]).toBe(9);
 expect((await profile(page)).targets[material.id]).toBe(6);
 await page.reload();await expect(checkbox(page,recipe)).toBeChecked();
 await revealNote(page,page.getByRole('link',{name:material.name,exact:true}));
 await page.getByRole('link',{name:material.name,exact:true}).click();
 await expect(owned).toHaveValue('9');
 await owned.fill('');await owned.press('Tab');
 await expect.poll(async()=> (await profile(page)).owned[material.id]).toBeUndefined();
 await page.reload();await expect(owned).toHaveValue('');
});

test('DDD backup export, import and recovery preserve canonical progress',async({page})=>{
 await page.goto(path('treasures',{entry:sora.id}));await checkbox(page,sora).click();
 await expect(treasureSave(page)).toContainText('Marked collected.');
 await page.goto(path('progress'));
 const exported=page.waitForEvent('download');
 await page.getByRole('button',{name:'Export backup'}).click();
 const download=await exported;expect(download.suggestedFilename()).toBe('ars-arcanum-dddhd.json');
 const backup=JSON.parse(readFileSync((await download.path())!,'utf8'));
 expect(backup.checks[sora.id]).toBe(true);
 await page.locator('input[type=file]').setInputFiles({name:'ddd-test-backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...backup,checks:{...backup.checks,[sora.id]:false,[riku.id]:true}}))});
 await expect(page.locator('.ddd-save')).toContainText('Backup imported');
 expect((await profile(page)).checks[riku.id]).toBe(true);
 await revealNote(page,page.getByRole('button',{name:'Recover pre-import progress'}));
 await page.getByRole('button',{name:'Recover pre-import progress'}).click();
 await expect.poll(async()=> (await profile(page)).checks[sora.id]).toBe(true);
 expect((await profile(page)).checks[riku.id]).not.toBe(true);
});

test('DDD failed writes remain visibly unsuccessful and do not change persisted checks',async({page})=>{
 await page.addInitScript(({id})=>{
  const put=IDBObjectStore.prototype.put;
  IDBObjectStore.prototype.put=function(value:any,...rest:any[]){
   if(this.name==='profiles'&&value?.game==='dddhd'&&value.checks?.[id])throw new DOMException('Test storage is full','QuotaExceededError');
   return put.call(this,value,...rest as [IDBValidKey?]);
  };
 },{id:sora.id});
 await page.goto(path('treasures',{entry:sora.id}));await checkbox(page,sora).click();
 await expect(page.locator('.ddd-error[role=alert]')).toContainText('Test storage is full');
 await expect(page.locator('.treasure-save-error:visible')).toContainText('Could not save');
 await expect(checkbox(page,sora)).not.toBeChecked();
 expect((await profile(page)).checks[sora.id]).not.toBe(true);
});

test('DDD installed journal reopens offline with saved state and supplied guidance',async({page,context})=>{
 await page.goto(path('treasures',{entry:sora.id}));await checkbox(page,sora).click();
 await expect(treasureSave(page)).toContainText('Marked collected.');
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await page.reload();await expect.poll(()=>page.evaluate(()=>!!navigator.serviceWorker.controller)).toBe(true);
 await context.setOffline(true);await page.reload();
 await expect(checkbox(page,sora)).toBeChecked();
 await page.goto(path('reference',{entry:'dddhd:reference:portal-hunting'}));
 await expect(page.locator('.ddd-detail')).toContainText('Reports');
 await page.goto(path('contents'));await expect(page.getByRole('navigation',{name:'Report sections'})).toBeVisible();
 await context.setOffline(false);
});

test('DDD compact portrait and landscape leave usable reading space without overlapping rows',async({page})=>{
 for(const viewport of [{width:320,height:568},{width:844,height:390},{width:640,height:360}]){
  await page.setViewportSize(viewport);
  for(const route of ['contents','worlds/Traverse%20Town','treasures',`workshop/recipes?entry=${recipe.id}`,`workshop/materials?entry=${material.id}`,`workshop/plan?entry=${material.id}&view=route`,'progress']){
   await page.goto(path(route));await expect(page.locator('.ddd-book')).toBeVisible();await page.evaluate(()=>document.fonts.ready);
   await expect.poll(()=>page.evaluate(()=>{
    const index=document.querySelector('.ddd-index'),note=document.querySelector('.kh1-note-window'),overview=document.querySelector('.ddd-world-summary');
    const overflow=index?Math.max(0,...[...index.children].map(child=>Math.round(child.getBoundingClientRect().bottom-index.getBoundingClientRect().bottom))):0;
    return {horizontal:Math.max(0,document.documentElement.scrollWidth-innerWidth),vertical:Math.max(0,document.documentElement.scrollHeight-innerHeight),index:overflow,readable:!note||note.getBoundingClientRect().height>=60,overview:!overview||overview.scrollHeight<=overview.clientHeight};
   })).toEqual({horizontal:0,vertical:0,index:0,readable:true,overview:true});
  }
 }
});
