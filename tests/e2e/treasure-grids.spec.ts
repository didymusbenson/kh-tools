import {test, expect, type Page} from '@playwright/test';
import {readFileSync} from 'node:fs';

type TreasureRecord={id:string;world:string;character?:string;scope:string;kind:string;included:boolean;group?:string;companionOrder:number;journalSlot?:number;acquisitionGroupId?:string};
const games=['kh1fm','recom','kh2fm','bbsfm','dddhd','kh02','kh3'] as const;
const records=(game:string):TreasureRecord[]=>JSON.parse(readFileSync(`src/games/treasure-data/${game}.json`,'utf8')).records;
const first=(game:string)=>records(game).find(r=>r.included)!;
const route=(game:string,params:Record<string,string>={})=>`./#/${game}/${game==='recom'?'rewards':'treasures'}?${new URLSearchParams(params)}`;
const board=(page:Page)=>page.getByTestId('treasure-board');
const tiles=(page:Page)=>page.locator('[data-treasure-id]:visible');
const selected=(page:Page)=>page.locator('[data-treasure-id][aria-pressed=true]:visible');
const check=(page:Page)=>page.locator('.treasure-check:visible input').first();
const saved=(page:Page)=>page.locator('.treasure-save:visible').first();
const identity=(page:Page)=>tiles(page).evaluateAll(nodes=>nodes.map(n=>({id:n.getAttribute('data-treasure-id'),number:n.querySelector('.treasure-number')?.textContent})));
async function boxes(page:Page){return tiles(page).evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {id:n.getAttribute('data-treasure-id'),x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};}));}
async function open(page:Page,game:string,id=first(game).id,extra:Record<string,string>={}){
 await page.goto(route(game,{entry:id,view:'grid',...extra}));
 await expect(board(page)).toBeVisible();await expect(check(page)).toBeEnabled();
 await page.evaluate(()=>document.fonts.ready);
 await expect(selected(page)).toHaveAttribute('data-treasure-id',id);
}
async function profile(page:Page,game:string){
 return page.evaluate(({game})=>new Promise<any>((resolve,reject)=>{
  const request=indexedDB.open(game==='kh1fm'?'ars-arcanum-player':'ars-arcanum-guides',1);
  request.onsuccess=()=>{const db=request.result,read=db.transaction('profiles').objectStore('profiles').get(game==='kh1fm'?'kh1fm-current':game);read.onsuccess=()=>{resolve(game==='kh1fm'?read.result?.state:read.result);db.close();};read.onerror=()=>reject(read.error);};request.onerror=()=>reject(request.error);
 }),{game});
}
async function expectSelected(page:Page,id:string){await expect(selected(page)).toHaveAttribute('data-treasure-id',id);}
async function expectTargetsAndBounds(page:Page){
 await expect.poll(()=>board(page).evaluate(root=>{
  const bad:string[]=[];const bounds=root.getBoundingClientRect();
  for(const node of root.querySelectorAll<HTMLElement>('button,a[href],select,.treasure-check')){
   if(node.closest('.kh1-note-flow'))continue;
   const r=node.getBoundingClientRect();if(!r.width||!r.height||getComputedStyle(node).visibility==='hidden')continue;
   const name=node.getAttribute('aria-label')||node.textContent?.trim()||node.tagName;
   if(r.height<43.5||r.width<43.5)bad.push(`small target ${name}: ${r.width.toFixed(1)}×${r.height.toFixed(1)}`);
   if(r.left<bounds.left-1||r.right>bounds.right+1||r.top<bounds.top-1||r.bottom>bounds.bottom+1)bad.push(`outside board ${name}`);
  }
  if(document.documentElement.scrollWidth>innerWidth+1)bad.push('horizontal document overflow');
  return bad;
 }),{timeout:3000}).toEqual([]);
}

for(const game of games){
 test(`${game}: selection, remaining, mark/unmark and Undo preserve slot identity`,async({page})=>{
  await open(page,game);
  const initial=await identity(page),count=await page.getByTestId('treasure-count').innerText();
  expect(initial.length).toBeGreaterThan(0);
  const second=tiles(page).nth(Math.min(1,initial.length-1));const id=(await second.getAttribute('data-treasure-id'))!;
  await second.click();await expectSelected(page,id);await expect(check(page)).not.toBeChecked();
  expect((await profile(page,game))?.checks?.[id]).not.toBe(true);
  await page.getByRole('button',{name:'Find & filter',exact:true}).click();
  await page.getByRole('combobox',{name:'Treasure status',exact:true}).selectOption('remaining');
  await page.getByRole('button',{name:'Close filters',exact:true}).click();
  const before=await boxes(page);expect(await identity(page)).toEqual(initial);
  await check(page).click();await expect(saved(page)).toContainText('Marked collected.');
  await expectSelected(page,id);await expect(check(page)).toBeChecked();
  expect(await identity(page)).toEqual(initial);expect(await boxes(page)).toEqual(before);
  await expect(page.locator('.treasure-selection-hint:visible')).toContainText('no longer matches');
  expect((await page.getByTestId('treasure-count').innerText()).split('/')[1]).toBe(count.split('/')[1]);
  await saved(page).getByRole('button',{name:'Undo',exact:true}).click();
  await expect(saved(page)).toContainText('undone');await expect(check(page)).not.toBeChecked();await expectSelected(page,id);
  await check(page).click();await expect(saved(page)).toContainText('Marked collected.');
  await check(page).click();await expect(saved(page)).toContainText('Marked not collected.');
  await page.reload();await expect(check(page)).not.toBeChecked();await expectSelected(page,id);
  expect((await profile(page,game)).checks[id]).toBe(false);
 });
 test(`${game}: legacy deep link, notes history, resize and 44px controls`,async({page})=>{
  const record=records(game).filter(r=>r.included).find(r=>r.companionOrder>=15)||first(game);
  await page.goto(`./#/${game}/entry/${encodeURIComponent(record.id)}`);
  await expect(board(page)).toBeVisible();await expect(check(page)).toBeEnabled();
  await expect(page.locator('[data-treasure-id][aria-pressed=true]')).toHaveAttribute('data-treasure-id',record.id);
  const legacyReturn=page.getByRole('link',{name:'‹ Grid',exact:true});
  if(await legacyReturn.isVisible())await legacyReturn.click();else await open(page,game,record.id);
  await expectSelected(page,record.id);
  const ids=await identity(page);const gridURL=page.url();
  await expectTargetsAndBounds(page);
  await page.locator('.treasure-preview:visible').getByRole('link',{name:'Notes ›',exact:true}).click();
  await expect(page.locator('.treasure-notes:visible')).toBeVisible();
  await expect(check(page)).not.toBeChecked();
  await page.goBack();await expectSelected(page,record.id);expect(page.url()).toBe(gridURL);expect(await identity(page)).toEqual(ids);
  await page.goForward();await expect(page.locator('.treasure-notes:visible')).toBeVisible();
  const back=page.getByRole('link',{name:'‹ Grid',exact:true});
  if(await back.isVisible())await back.click();else await page.goBack();
  await expectSelected(page,record.id);await expect(selected(page)).toBeFocused();
  await page.setViewportSize({width:320,height:568});await expectSelected(page,record.id);await expectTargetsAndBounds(page);
  await check(page).click();await expect(saved(page)).toContainText('Marked collected.');await expectTargetsAndBounds(page);
  await saved(page).getByRole('button',{name:'Undo',exact:true}).click();await expect(saved(page)).toContainText('undone');await expect(check(page)).not.toBeChecked();
  await page.setViewportSize({width:1440,height:900});await expectSelected(page,record.id);await expectTargetsAndBounds(page);
 });
}

test('character and episode scopes have independent denominators and checks',async({page})=>{
 for(const [game,scopes] of Object.entries({kh2fm:[['Sora','main',301],['Roxas','prologue',16]],bbsfm:[['Terra','main',122],['Ventus','main',130],['Aqua','main',122],['Aqua · Secret Episode','secret',8]],dddhd:[['Sora','main',225],['Riku','main',213]],kh3:[['Sora','main',245],['Sora','remind',9]]} as Record<string,[string,string,number][]>)){
  for(const [character,scope,total] of scopes){
   await page.goto(route(game,{character,scope,overview:'list'}));await expect(page.getByTestId('treasure-summary')).toBeVisible();
   await expect(page.locator('.treasure-heading:visible').first()).toContainText(`0 / ${total}`);
   const record=records(game).find(r=>r.included&&(r.character||'')===character&&r.scope===scope)!;
   await open(page,game,record.id);await expect(check(page)).not.toBeChecked();await check(page).click();await expect(saved(page)).toContainText('Marked collected.');
  }
 }
});

test('all seven stores synchronize another tab and Undo preserves newer unrelated checks',async({page,context})=>{
 test.setTimeout(120_000);
 for(const game of games){
  const record=first(game);const otherRecord=records(game).find(r=>r.included&&r.id!==record.id)!;
  await open(page,game,record.id);const other=await context.newPage();await open(other,game,record.id);
  await check(page).click();await expect(saved(page)).toContainText('Marked collected.');await expect(check(other)).toBeChecked();
  await open(other,game,otherRecord.id);await check(other).click();await expect(saved(other)).toContainText('Marked collected.');
  await saved(page).getByRole('button',{name:'Undo',exact:true}).click();await expect(saved(page)).toContainText('undone');
  const state=await profile(page,game);expect(state.checks[record.id]).not.toBe(true);expect(state.checks[otherRecord.id]).toBe(true);
  await other.close();
 }
});

test('a failed write is announced and cannot claim collection success',async({page})=>{
 const record=first('dddhd');
 await page.addInitScript(({id})=>{const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(value:any,...rest:any[]){if(this.name==='profiles'&&value?.game==='dddhd'&&value.checks?.[id])throw new DOMException('Test storage is full','QuotaExceededError');return put.call(this,value,...rest as [IDBValidKey?]);};},{id:record.id});
 await open(page,'dddhd',record.id);await check(page).click();
 await expect(page.locator('.treasure-save-error:visible').first()).toContainText('Could not save');await expect(check(page)).not.toBeChecked();
 expect((await profile(page,'dddhd'))?.checks?.[record.id]).not.toBe(true);
});

test('Re:CoM reward claims never mark card discovery or add a Riku reward board',async({page})=>{
 const reward=first('recom');
 await page.goto('./#/recom/worlds?campaign=sora');
 await page.getByRole('navigation',{name:'Worlds',exact:true}).getByRole('link',{name:/^Traverse Town/}).click();
 await expect(board(page)).toBeVisible();await expectSelected(page,reward.id);await expect(check(page)).toBeEnabled();
 await check(page).click();await expect(saved(page)).toContainText('Marked collected.');
 const card='recom-sora-card-attack-lionheart';
 expect((await profile(page,'recom')).checks[card]).not.toBe(true);
 await page.goto(`./#/recom/cards?campaign=sora&family=attack&entry=${card}`);
 await expect(page.getByRole('checkbox',{name:'Complete Lionheart (Sora)',exact:true})).not.toBeChecked();
 await page.goto('./#/recom/rewards?campaign=riku');await expect(board(page)).toHaveCount(0);await expect(page.getByTestId('treasure-summary')).toHaveCount(0);
});

test('KH0.2 Zodiac facet checks the same chest ID and keeps world positions',async({page})=>{
 const zodiac=records('kh02').find(r=>r.group==='Zodiac')!;
 await open(page,'kh02',zodiac.id);const before=await identity(page);
 await page.getByRole('button',{name:'Find & filter',exact:true}).click();
 await page.getByRole('combobox',{name:'Group',exact:true}).selectOption('Zodiac');await page.getByRole('button',{name:'Close filters',exact:true}).click();
 expect(await identity(page)).toEqual(before);await check(page).click();await expect(saved(page)).toContainText('Marked collected.');
 await open(page,'kh02',zodiac.id);await expect(check(page)).toBeChecked();
 const state=await profile(page,'kh02');expect(Object.keys(state.checks)).toEqual([zodiac.id]);
});

test('KH1 postcard list and its original acquisition details remain reachable',async({page})=>{
 await page.goto('./#/kh1fm/treasures?list=postcards');await expect(board(page)).toHaveCount(0);
 await expect(page.getByRole('link',{name:/Postcard/}).first()).toBeVisible();
 const entry=page.locator('a[href*="entry="]').filter({hasText:/Postcard/}).first();await entry.click();
 await expect(page.getByRole('main')).toContainText('Postcard');
 if(!(await page.getByRole('checkbox').first().isVisible()))await page.getByRole('button',{name:'Overview',exact:true}).click();
 await expect(page.getByRole('checkbox').first()).toBeEnabled();
});

test('filter and search keep selected record, full denominator and physical slots',async({page})=>{
 await open(page,'kh2fm');const before=await identity(page),total=await page.getByTestId('treasure-count').innerText();
 await page.getByRole('button',{name:'Find & filter',exact:true}).click();
 await page.getByRole('searchbox',{name:'Find a treasure',exact:true}).fill('zzzz-no-such-acquisition');
 await page.getByRole('button',{name:'Find',exact:true}).click();
 await expect(page.locator('.treasure-toolbar')).toContainText('0 matches');expect(await identity(page)).toEqual(before);
 await expect(page.getByTestId('treasure-count')).toHaveText(total);await expectSelected(page,first('kh2fm').id);
 await expect(page.getByRole('button',{name:'Next matching treasure',exact:true})).toBeDisabled();
});

test('short landscape reflow keeps controls and complete note pagination reachable',async({page})=>{
 test.setTimeout(120_000);
 await page.setViewportSize({width:844,height:390});
 for(const game of games){
  await open(page,game);await expectTargetsAndBounds(page);
  await page.locator('.treasure-preview:visible').getByRole('link',{name:'Notes ›',exact:true}).click();
  const notes=page.locator('.treasure-notes:visible');await expect(notes).toBeVisible();
  const window=notes.locator('.kh1-note-window');await expect(window).toBeVisible();
  expect((await window.boundingBox())!.height).toBeGreaterThanOrEqual(60);
  const next=notes.getByRole('button',{name:'Next notes page'});let turns=0;
  while(!(await next.isDisabled())){await next.click();expect(++turns).toBeLessThan(60);}
  await expect(check(page)).toBeEnabled();await check(page).click();await expect(saved(page)).toContainText('Marked collected.');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});

test('production bundles reopen all seven treasure grids offline with saved checks @offline',async({page,context})=>{
 test.skip(!process.env.CI&&process.env.ARS_TEST_OFFLINE!=='1','Requires the freshly built production preview: CI or explicit ARS_TEST_OFFLINE=1.');
 test.setTimeout(120_000);
 for(const game of games){await open(page,game);await check(page).click();await expect(saved(page)).toContainText('Marked collected.');}
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();
 await expect.poll(()=>page.evaluate(()=>!!navigator.serviceWorker.controller)).toBe(true);
 await context.setOffline(true);
 try {for(const game of games){await open(page,game);await page.reload();await expect(check(page)).toBeChecked();await expectSelected(page,first(game).id);}}
 finally {await context.setOffline(false);}
});

test('stale Undo does not report success over a newer same-ID change in another tab',async({page,context})=>{
 test.setTimeout(120_000);
 for(const game of games){
  const record=first(game);await open(page,game,record.id);
  const other=await context.newPage();await open(other,game,record.id);
  await check(page).click();await expect(saved(page)).toContainText('Marked collected.');await expect(check(other)).toBeChecked();
  await check(other).click();await expect(saved(other)).toContainText('Marked not collected.');await expect(check(page)).not.toBeChecked();
  await saved(page).getByRole('button',{name:'Undo',exact:true}).click();
  await expect(page.locator('.treasure-save-error:visible').first()).toContainText('Undo was not applied');
  await expect(check(page)).not.toBeChecked();expect((await profile(page,game)).checks[record.id]).toBe(false);
  await other.close();
 }
});

test('KH1 failed writes retain saved collection state and show a retryable error',async({page})=>{
 const record=first('kh1fm');
 await page.addInitScript(({id})=>{const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(value:any,...rest:any[]){if(this.name==='profiles'&&value?.state?.checks?.[id])throw new DOMException('Test storage is full','QuotaExceededError');return put.call(this,value,...rest as [IDBValidKey?]);};},{id:record.id});
 await open(page,'kh1fm',record.id);await check(page).click();
 await expect(page.locator('.treasure-save-error:visible').first()).toContainText('Could not save');await expect(check(page)).not.toBeChecked();
 expect((await profile(page,'kh1fm'))?.checks?.[record.id]).not.toBe(true);
});

test('keyboard selection never writes progress, and the separate checkbox works with Space',async({page})=>{
 test.setTimeout(120_000);
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const game of games){
  await open(page,game);const target=tiles(page).nth(Math.min(1,(await tiles(page).count())-1));
  const id=(await target.getAttribute('data-treasure-id'))!;await target.focus();await target.press('Space');
  await expectSelected(page,id);await expect(check(page)).not.toBeChecked();expect((await profile(page,game))?.checks?.[id]).not.toBe(true);
  await check(page).focus();await check(page).press('Space');await expect(saved(page)).toContainText('Marked collected.');await expect(check(page)).toBeChecked();
 }
});

test('KH3 grouped overview retains separate base and Re Mind boards',async({page})=>{
 await page.goto(route('kh3'));const overview=page.getByTestId('treasure-grouped-overview');await expect(overview).toBeVisible();
 await expect(overview.locator('.treasure-heading')).toContainText('0 / 245 chests');
 await overview.locator('.treasure-group-row button').first().click();await expect(board(page)).toBeVisible();
 await expectSelected(page,first('kh3').id);await expect(check(page)).not.toBeChecked();
 await page.goto(route('kh3',{scope:'remind'}));await expect(overview).toBeVisible();await expect(overview.locator('.treasure-heading')).toContainText('0 / 9 chests');
 await overview.locator('.treasure-group-row button').first().click();
 await expect(board(page)).toHaveAttribute('data-partition',/remind/);await expect(check(page)).not.toBeChecked();
});

test('marking and undo keep the current acquisition note continuation page',async({page})=>{
 await open(page,'recom');await page.locator('.treasure-preview:visible').getByRole('link',{name:'Notes ›',exact:true}).click();
 const notes=page.locator('.treasure-notes:visible');const next=notes.getByRole('button',{name:'Next notes page'});
 await expect(next).toBeEnabled();await next.click();const pagination=notes.locator('.kh1-note-pagination span'),position=await pagination.innerText();
 await check(page).click();await expect(saved(page)).toContainText('Marked collected.');await expect(pagination).toHaveText(position);
 await saved(page).getByRole('button',{name:'Undo',exact:true}).click();await expect(saved(page)).toContainText('undone');await expect(pagination).toHaveText(position);
});


test('compact portrait filters keep every control reachable without outer-page scrolling',async({page})=>{
 test.setTimeout(120_000);await page.setViewportSize({width:320,height:568});
 for(const game of games){
  await open(page,game);await page.getByRole('button',{name:'Find & filter',exact:true}).click();
  const controls=page.locator('.treasure-filters').locator('button,input,select');
  for(let i=0;i<await controls.count();i++){
   const control=controls.nth(i);if(!(await control.isVisible()))continue;await control.scrollIntoViewIfNeeded();
   const bounds=await control.boundingBox();expect(bounds!.y,game).toBeGreaterThanOrEqual(0);expect(bounds!.y+bounds!.height,game).toBeLessThanOrEqual(569);
   expect(await control.evaluate(node=>{const r=node.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return hit===node||node.contains(hit);}),game).toBe(true);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1),game).toBe(true);
  await page.getByRole('button',{name:'Close filters',exact:true}).click();await expect(page.locator('.treasure-filters')).toHaveCount(0);
 }
});

test('native BBS and DDD character controls restore each character\'s last treasure ID',async({page})=>{
 for(const [game,firstCharacter,secondCharacter] of [['bbsfm','Terra','Ventus'],['dddhd','Sora','Riku']]){
  const own=(character:string)=>records(game).filter(r=>r.included&&r.scope==='main'&&r.character===character);
  const firstRecord=own(firstCharacter).at(-1)!,secondRecords=own(secondCharacter),secondRecord=secondRecords[Math.floor(secondRecords.length/2)];
  await open(page,game,firstRecord.id,{character:firstCharacter});await check(page).click();await expect(saved(page)).toContainText('Marked collected.');
  await open(page,game,secondRecord.id,{character:secondCharacter});await expect(check(page)).not.toBeChecked();
  const switchNative=async(character:string)=>{
   if(game==='bbsfm')await page.getByRole('button',{name:character,exact:true}).click();
   else await page.getByRole('combobox',{name:'Filter by character',exact:true}).selectOption(character);
  };
  await switchNative(firstCharacter);await expectSelected(page,firstRecord.id);await expect(check(page)).toBeChecked();await expect(board(page).locator('.treasure-heading').first()).toContainText(firstRecord.world);
  await switchNative(secondCharacter);await expectSelected(page,secondRecord.id);await expect(check(page)).not.toBeChecked();await expect(board(page).locator('.treasure-heading').first()).toContainText(secondRecord.world);
  await page.reload();await expectSelected(page,secondRecord.id);await switchNative(firstCharacter);await expectSelected(page,firstRecord.id);await expect(check(page)).toBeChecked();
 }
});
