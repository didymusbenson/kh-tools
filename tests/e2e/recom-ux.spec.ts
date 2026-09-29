import {test,expect,type Page,type Locator} from '@playwright/test';

// A continuation is intentionally clipped until its numbered page is selected.
async function turnTo(page:Page,target:Locator){
 for(let i=0;i<20;i++){
  const box=await target.boundingBox(), leaf=await page.locator('.kh1-note-window').boundingBox();
  if(box&&leaf&&box.x>=leaf.x-1&&box.x+box.width<=leaf.x+leaf.width+1&&box.y>=leaf.y-1&&box.y+box.height<=leaf.y+leaf.height+1)return;
  await page.getByRole('button',{name:'Next notes page'}).click();
 }
 throw new Error('The requested content was not reachable through note pages');
}

const com = (page:string) => `./#/recom/${page}`;
test('home order and campaign-specific report roots',async({page})=>{
 await page.goto('./#/');
 const choices=page.getByRole('navigation',{name:'Choose a game'}).getByRole('button');
 const names=await choices.allTextContents();
 expect(names[0]).toContain('Kingdom Hearts');expect(names[1]).toContain('Re:Chain of Memories');expect(names[2]).toContain('Kingdom Hearts II');
 await page.getByRole('button',{name:'Re:Chain of Memories HD 1.5 ReMIX, open journal',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Journal',exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:/Mini-games 0/})).toBeVisible();
 await page.getByRole('link',{name:'Riku · Reverse/Rebirth'}).click();
 await expect(page.getByRole('heading',{name:'D-Report',exact:true}).first()).toBeVisible();
 await expect(page.getByRole('link',{name:'Moogle Shop',exact:true})).toHaveCount(0);
 await expect(page.getByRole('link',{name:'Review Decks',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`test-results/${test.info().project.name}-recom-riku.png`});
});
test('card discovery persists through filtered collection and stays in its campaign',async({page})=>{
 await page.goto(com('collection?campaign=sora'));
 const total=await page.getByTestId('com-card-progress').innerText();
 await page.getByRole('searchbox',{name:'Find an entry'}).fill('Shadow');
 await page.getByRole('button',{name:'Find',exact:true}).click();
 await expect(page.getByTestId('com-card-progress')).toHaveText(total);
 await page.getByRole('link',{name:'Read Shadow',exact:true}).click();
 const check=page.getByRole('checkbox',{name:'Complete Shadow (Sora)',exact:true});
 await expect(check).toBeEnabled();await check.check();await expect(page.locator(".com-save")).toHaveText("Record saved.");await page.reload();await expect(check).toBeChecked();
 await page.getByRole('link',{name:'‹ Card Collection',exact:true}).click();
 await expect(page.getByRole('searchbox')).toHaveValue('Shadow');
 await expect(page.getByTestId('com-card-progress')).toHaveText(total.replace(/^0/,'1'));
 await page.goto(com('cards?campaign=riku&family=enemy&entry=recom-riku-enemy-shadow'));
 await expect(page.getByRole('checkbox',{name:'Complete Shadow (Riku)',exact:true})).not.toBeChecked();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('records, reward links and Riku presets work on narrow and wide screens',async({page})=>{
 await page.goto(com('minigames?campaign=sora'));
 await page.getByRole('link',{name:/Balloon Glider/}).click();
 await turnTo(page,page.getByRole('textbox',{name:'Your result in points'}));
 await page.getByRole('textbox',{name:'Your result in points'}).fill('520');
 await page.getByRole('button',{name:'Save result'}).click();
 await expect(page.getByText('Record saved.',{exact:true})).toBeVisible();await page.reload();
 await expect(page.getByRole('textbox',{name:'Your result in points'})).toHaveValue('520');
 await expect(page.getByRole('checkbox')).not.toBeChecked();
 await page.goto(com('cards?campaign=sora&family=attack&entry=recom-sora-card-attack-midnight-roar'));
 await expect(page.getByRole('heading',{name:'Midnight Roar',exact:true}).last()).toBeVisible();
 await turnTo(page,page.getByRole('link',{name:/Neverland · Room of Rewards/}));
 await page.getByRole('link',{name:/Neverland · Room of Rewards/}).click();
 await expect(page.getByRole('checkbox',{name:'Complete Midnight Roar (Sora)'})).toBeVisible();
 await page.goto(com('decks?campaign=riku'));
 await page.getByRole('link',{name:/Traverse Town/}).click();
 await expect(page.getByRole('heading',{name:'World deck · card order'})).toBeVisible();
 await expect(page.getByRole('checkbox')).toHaveCount(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`test-results/${test.info().project.name}-recom-deck.png`});
});
test('invalid entries recover, filters have an empty state, and saves expose backups',async({page})=>{
 await page.goto(com('cards?campaign=riku&entry=bad-id'));
 await expect(page.getByRole('heading',{name:'Entry not found in this campaign'})).toBeVisible();
 await page.goto(com('search?campaign=sora&q=zzzznonexistent'));
 await expect(page.getByRole('heading',{name:'No matching entries'})).toBeVisible();
 await page.getByRole('link',{name:'Save & Settings'}).click();
 await expect(page.getByRole('button',{name:'Export backup'})).toBeEnabled();
 await expect(page.getByText(/Sora’s 152-card collection and Riku’s 59-card collection/)).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('collection filters remain usable and the journal reopens offline',async({page,context})=>{
 await page.goto(com('collection?campaign=sora'));
 await expect(page.getByRole('link',{name:'Read Kingdom Key',exact:true})).toBeVisible();
 for(const label of ['Card type','Show']){
  const box=await page.getByRole('combobox',{name:label,exact:true}).boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(90);expect(box!.height).toBeGreaterThanOrEqual(39);
 }
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 // The prompt-based service worker controls a subsequent visit, not its installing page.
 await page.reload();
 await expect.poll(()=>page.evaluate(()=>!!navigator.serviceWorker.controller)).toBe(true);
 await context.setOffline(true);
 await page.reload();
 await expect(page.getByRole('link',{name:'Read Kingdom Key',exact:true})).toBeVisible();
 await page.getByRole('link',{name:'Riku · Reverse/Rebirth'}).click();
 await expect(page.getByRole('heading',{name:'D-Report',exact:true}).first()).toBeVisible();
 await context.setOffline(false);
});

test('every journal destination keeps its frame and paged content inside the viewport',async({page})=>{
 const destinations=['contents','collection','collection?campaign=sora&status=remaining','cards','cards?campaign=sora&family=enemy','worlds','minigames','sleights','shop','achievements','progress','decks?campaign=riku'];
 let frame:{x:number;y:number;width:number;height:number}|null=null;
 for(const destination of destinations){
  await page.goto(com(destination));
  await expect(page.locator('.com-book')).toBeVisible();
  await page.evaluate(()=>document.fonts.ready);
  await expect.poll(()=>page.evaluate(()=>{
   const book=document.querySelector('.com-book')!;
   const indices=[...document.querySelectorAll('.com-paged-index,.com-entry-list,.com-card-grid')];
   return {vertical:Math.max(0,document.documentElement.scrollHeight-innerHeight),horizontal:Math.max(0,document.documentElement.scrollWidth-innerWidth),book:Math.max(0,book.scrollHeight-book.clientHeight),index:Math.max(0,...indices.flatMap(index=>[...index.children].map(child=>Math.ceil(child.getBoundingClientRect().bottom-index.getBoundingClientRect().bottom))))};
  })).toEqual({vertical:0,horizontal:0,book:0,index:0});
  const current=await page.locator('.com-book').boundingBox();
  if(frame)expect(current).toEqual(frame);else frame=current;
  if(['contents','collection'].includes(destination))await page.screenshot({path:`test-results/${test.info().project.name}-recom-${destination}-revised.png`});
 }
});

test('collection capacity grows with height and Back restores the selected card and page',async({page})=>{
 await page.setViewportSize({width:1280,height:720});
 await page.goto(com('collection'));
 const cards=page.getByRole('navigation',{name:'Card Collection',exact:true}).getByRole('link');
 await expect(cards.first()).toBeVisible();
 await expect.poll(()=>cards.count()).toBeGreaterThan(5);
 const short=await cards.count();
 await page.setViewportSize({width:1280,height:1000});
 await expect.poll(()=>cards.count()).toBeGreaterThan(short);
 await page.getByRole('link',{name:'Next page',exact:true}).click();
 await expect(page).toHaveURL(/page=1/);
 await expect(page.getByRole('navigation',{name:'Entry pages'})).toContainText('2 /');
 const selected=cards.nth(1), name=await selected.getAttribute('aria-label');
 const frame=await page.locator('.com-book').boundingBox();
 await selected.hover();
 expect(await page.locator('.com-book').boundingBox()).toEqual(frame);
 await selected.click();
 await page.getByRole('link',{name:'‹ Card Collection',exact:true}).click();
 await expect(page.getByRole('link',{name:name!,exact:true})).toBeFocused();
 await expect(page).toHaveURL(/page=1/);
});

test('long Riku decks continue to the final card without scrolling',async({page})=>{
 await page.goto(com('decks?campaign=riku'));
 await page.getByRole('link',{name:/Traverse Town/}).click();
 const last=page.locator('.com-deck-cards li').last();
 await turnTo(page,last);
 await expect(page.getByRole('button',{name:'Previous notes page'})).toBeEnabled();
 expect(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1)).toBe(true);
 await page.screenshot({path:`test-results/${test.info().project.name}-recom-paged-deck.png`});
});

test('shared capacity still pages the KH1 and KH2 indices',async({page})=>{
 for(const game of ['kh1fm','kh2fm']){
  await page.setViewportSize({width:1280,height:720});
  await page.goto(`./#/${game}/contents`);
  const index=page.locator(game==='kh1fm'?'.kh1-index':'.kh2-index');
  await expect(index).toBeVisible();
  await expect.poll(()=>index.locator(':scope > *').count()).toBeGreaterThan(1);
  const short=await index.locator(':scope > *').count();
  await page.setViewportSize({width:1280,height:1000});
  await expect.poll(()=>index.locator(':scope > *').count()).toBeGreaterThan(short);
  expect(await index.evaluate(el=>[...el.children].every(row=>row.getBoundingClientRect().bottom<=el.getBoundingClientRect().bottom+1))).toBe(true);
 }
});

test('collection checks save in place, remain separate from opening a card, and can be undone',async({page})=>{
 await page.goto(com('collection?campaign=sora'));
 const grid=page.getByRole('navigation',{name:'Card Collection',exact:true});
 const check=grid.getByRole('checkbox',{name:'Complete Kingdom Key (Sora)',exact:true});
 const count=await page.getByTestId('com-card-progress').innerText();
 const frame=await page.locator('.com-book').boundingBox();
 await check.check();
 await expect(page.locator('.com-save')).toHaveText('Record saved.');
 await expect(page).not.toHaveURL(/entry=/);
 await expect(page.getByTestId('com-card-progress')).toHaveText(count.replace(/^0/,'1'));
 expect(await page.locator('.com-book').boundingBox()).toEqual(frame);
 await page.reload();
 await expect(check).toBeChecked();
 await grid.getByRole('link',{name:'Read Kingdom Key, discovered',exact:true}).click();
 await expect(page.getByRole('checkbox',{name:'Complete Kingdom Key (Sora)',exact:true})).toBeChecked();
 await page.getByRole('link',{name:'‹ Card Collection',exact:true}).click();
 await check.focus();await page.keyboard.press('Space');
 await expect(page.locator('.com-save')).toHaveText('Record saved.');
 await expect(check).not.toBeChecked();
 await expect(page.getByTestId('com-card-progress')).toHaveText(count);
 await page.getByRole('combobox',{name:'Show',exact:true}).selectOption('remaining');
 await check.check();
 await expect(check).toHaveCount(0);
 await expect(page).not.toHaveURL(/entry=/);
});

test('attack notes contain acquisition guidance without citations or research TODOs',async({page})=>{
 for(const slug of ['diamond-dust','one-winged-angel']){
  await page.goto(com(`cards?campaign=sora&family=attack&entry=recom-sora-card-attack-${slug}`));
  await expect(page.locator('.com-notes')).toContainText('After defeating Marluxia for the first time');
  await expect(page.locator('.com-notes')).toContainText('Moogle Shop packs');
  await expect(page.locator('.com-book')).not.toContainText(/not yet available|remains to reconcile|Sources & reference notes/);
  await expect(page.locator('.com-book a[href^="http"]')).toHaveCount(0);
 }
});

test('CP tables and longer acquisition notes remain reachable through journal pages',async({page})=>{
 await page.goto(com('collection?campaign=sora&entry=recom-sora-card-attack-two-become-one'));
 const costs=page.locator('.com-cp-values');
 await turnTo(page,costs);
 await expect(costs.locator('div')).toHaveCount(10);
 await expect(costs.locator('div').last()).toHaveText('Value 038 CP');
 await expect(page.locator('.com-keyblade-guard')).toHaveCount(1);
 const premium=page.getByRole('heading',{name:'Premium cards',exact:true});
 await turnTo(page,premium);
 await turnTo(page,page.getByRole('link',{name:/Destiny Islands · Room of Rewards/}));
 expect(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1&&document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:`test-results/${test.info().project.name}-recom-card-data.png`});
 await page.goto(com('cards?campaign=riku&family=gimmick&entry=recom-riku-card-gimmick-card'));
 const darkside=page.getByRole('heading',{name:'Darkside',exact:true});
 await turnTo(page,darkside);
 await expect(page.locator('.com-notes')).toContainText('17 seconds');
 await expect(page.locator('.com-book')).not.toContainText(/Sources & reference notes|needs checking|not yet available/);
});
