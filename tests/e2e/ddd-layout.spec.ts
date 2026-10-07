import { test, expect, type Page } from '@playwright/test';

const destinations=['contents','worlds','worlds/Traverse%20Town','collection','spirits','records','completion','treasures','workshop/recipes','workshop/materials','workshop/plan','reference','search?q=Faith','progress','spirits?entry=dddhd:spirits:aura-lion'];
async function fit(page:Page){
 await expect(page.locator('.ddd-book')).toBeVisible();
 await page.evaluate(()=>document.fonts.ready);
 await expect.poll(()=>page.evaluate(()=>{
  const book=document.querySelector('.ddd-book')!;
  const summary=document.querySelector('.treasure-summary'),summaryHost=summary?.closest('.ddd-page');
  return {summary:summaryHost?Math.max(0,summaryHost.scrollHeight-summaryHost.clientHeight):0,vertical:Math.max(0,document.documentElement.scrollHeight-innerHeight),horizontal:Math.max(0,document.documentElement.scrollWidth-innerWidth),book:Math.max(0,book.scrollHeight-book.clientHeight),index:Math.max(0,...[...document.querySelectorAll('.ddd-index,.treasure-worlds,.treasure-grid')].flatMap(index=>[...index.children].map(child=>Math.ceil(child.getBoundingClientRect().bottom-index.getBoundingClientRect().bottom))))};
 })).toEqual({summary:0,vertical:0,horizontal:0,book:0,index:0});
}
test('Reports preserves a fixed broad open leaf across all reading destinations',async({page})=>{
 let frame:null|{x:number;y:number;width:number;height:number}=null;
 for(const destination of destinations){
  await page.goto(`./#/dddhd/${destination}`);
  await expect(page.locator('.ddd-book')).toBeVisible();
  await fit(page);
  const current=await page.locator('.ddd-book').boundingBox();
  // Closed covers deliberately occupy one leaf on wide screens; open leaves
  // retain a fixed frame independent of route content.
  if(destination!=='contents'){if(frame)expect(current).toEqual(frame);else frame=current;}
 }
});
test('cover, single leaf, completion capsules and cursor keep stable geometry',async({page})=>{
 await page.goto('./#/dddhd/contents');await fit(page);
 const book=await page.locator('.ddd-book').boundingBox();
 const first=page.locator('.ddd-index-row a').first(),row=await first.boundingBox();
 await first.hover();expect(await first.boundingBox()).toEqual(row);expect(await page.locator('.ddd-book').boundingBox()).toEqual(book);
 await first.focus();expect(await first.boundingBox()).toEqual(row);
 await page.screenshot({path:`test-results/${test.info().project.name}-ddd-cover.png`});
 await page.goto('./#/dddhd/completion');await fit(page);
 await expect(page.locator('.ddd-completion-icon').first()).toBeVisible();
 await expect(page.locator('.ddd-index')).not.toContainText(/Play Time|Story|43 notes/);
 await page.screenshot({path:`test-results/${test.info().project.name}-ddd-completion.png`});
});
test('entry capacity grows with height and Back restores selection after resizing',async({page})=>{
 await page.setViewportSize({width:1280,height:720});
 await page.goto('./#/dddhd/treasures?character=Sora&world=La%20Cit%C3%A9%20des%20Cloches');await fit(page);
 const slots=page.locator('[data-treasure-id]:visible');const short=await slots.count();
 expect(short).toBeGreaterThan(0);
 await page.setViewportSize({width:1280,height:1000});
 await expect.poll(()=>slots.count()).toBeGreaterThan(short);await fit(page);
 await page.getByRole('button',{name:'Next treasure grid page',exact:true}).click();
 await expect(page.getByRole('navigation',{name:'Treasure grid pages'})).toContainText('Grid 2 /');
 const id=await slots.nth(1).getAttribute('data-treasure-id');
 await page.locator(`[data-treasure-id="${id}"]`).click();
 await page.getByRole('link',{name:'Notes ›',exact:true}).click();
 await page.setViewportSize({width:1280,height:720});
 await page.getByRole('link',{name:'‹ Grid',exact:true}).click();
 await expect(page.locator(`[data-treasure-id="${id}"]`)).toBeFocused();await fit(page);
});

test('long Spirit notes can reach the last continuation without page scrolling',async({page})=>{
 await page.goto('./#/dddhd/spirits?entry=dddhd:spirits:aura-lion');
 await expect(page.getByRole('button',{name:'Next notes page'})).toBeEnabled();
 let turned=0;
 while(await page.getByRole('button',{name:'Next notes page'}).isEnabled()){
  await page.getByRole('button',{name:'Next notes page'}).click();
  expect(++turned).toBeLessThan(35);
 }
 await fit(page);
 const last=page.locator('.ddd-related').last();
 const target=await last.boundingBox(),window=await page.locator('.kh1-note-window').boundingBox();
 expect(target!.x).toBeGreaterThanOrEqual(window!.x-1);
 expect(target!.x+target!.width).toBeLessThanOrEqual(window!.x+window!.width+1);
 await page.screenshot({path:`test-results/${test.info().project.name}-ddd-last-notes.png`});
});
test('Dream Eaters, treasure counts and existing guide tools remain report-native',async({page})=>{
 await page.goto('./#/dddhd/spirits');
 await expect(page.locator('.ddd-species-heading')).toContainText('0 / 54');
 await expect(page.getByRole('link',{name:'Nightmares',exact:true})).toHaveCount(0);
 await expect(page.locator('.ddd-index-row')).not.toHaveCount(0);
 await page.goto('./#/dddhd/treasures?character=Sora');
 await expect(page.getByTestId('treasure-summary').locator('.treasure-heading > span')).toHaveText('0 / 225 chests');
 await page.locator('.treasure-worlds > a').first().click();
 const count=page.getByTestId('treasure-count'),full=await count.innerText();
 await page.getByRole('button',{name:'Find & filter',exact:true}).click();
 await page.getByRole('searchbox',{name:'Find a treasure',exact:true}).fill('Potion');
 await page.getByRole('button',{name:'Find',exact:true}).click();
 await expect(count).toHaveText(full);
 await page.getByRole('link',{name:'All treasure worlds',exact:true}).click();
 await expect(page.getByTestId('treasure-summary').locator('.treasure-heading > span')).toHaveText('0 / 225 chests');
 await fit(page);
 await expect(page.locator('.ddd-book a[href^="http"]')).toHaveCount(0);
});

 test('material drafts never travel to adjacent materials and malformed world links recover',async({page})=>{
  await page.goto('./#/dddhd/workshop/materials?entry=dddhd:materials:brilliant-fantasy');
  const owned=page.getByRole('spinbutton',{name:'Owned Brilliant Fantasy'});
  await expect(owned).toBeEnabled();await owned.fill('-2');
  await page.getByRole('link',{name:'Next entry',exact:true}).click();
  await expect(page.getByRole('spinbutton',{name:/Owned/})).toHaveValue('');
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.getByRole('link',{name:'Previous entry',exact:true}).click();
  await page.getByRole('spinbutton',{name:'Owned Brilliant Fantasy'}).fill('7');
  await page.getByRole('link',{name:'Next entry',exact:true}).click();
  await expect(page.getByRole('spinbutton',{name:/Owned/})).toHaveValue('');
  await page.getByRole('spinbutton',{name:/Owned/}).focus();await page.keyboard.press('Tab');
  await page.getByRole('link',{name:'Previous entry',exact:true}).click();
  await expect(page.getByRole('spinbutton',{name:'Owned Brilliant Fantasy'})).toHaveValue('7');
  await page.goto('./#/dddhd/worlds/%');
  await expect(page.getByRole('heading',{name:'Page not found',exact:true}).last()).toBeVisible();
  await page.getByRole('link',{name:'Return to Reports',exact:true}).click();
  await expect(page.locator('.ddd-cover')).toBeVisible();
 });

test('phone section and Details controls open the active visible page item',async({page})=>{
 await page.setViewportSize({width:320,height:568});
 // The unchanged root still has an index-page/active-section shortcut.
 await page.goto('./#/dddhd/contents');await fit(page);
 await page.getByRole('link',{name:'Next index page',exact:true}).click();
 await expect(page.getByRole('navigation',{name:'Index pages'})).toContainText('2 /');
 const visible=page.locator('.ddd-index-row a').first();
 const href=await visible.getAttribute('href');
 await page.getByRole('navigation',{name:'Report pages'}).getByRole('link',{name:'Open section',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>location.hash)).toBe(href);
 // Treasures now paginate worlds, then select a positional slot before Notes.
 await page.goto('./#/dddhd/treasures');await fit(page);
 await page.getByRole('navigation',{name:'Treasure world pages'}).getByRole('link').last().click();
 await expect(page.getByRole('navigation',{name:'Treasure world pages'})).toContainText('Worlds 2 /');
 await page.locator('.treasure-worlds > a').first().click();
 const world=new URLSearchParams(new URL(page.url()).hash.split('?')[1]).get('world');
 expect(world).toBeTruthy();
 await page.goto(`./#/dddhd/treasures?world=${encodeURIComponent(world!)}`);
 const nativePages=page.getByRole('navigation',{name:'Report pages',exact:true});
 await expect(nativePages.getByRole('link',{name:'Grid',exact:true})).toHaveAttribute('aria-current','page');
 await expect(nativePages.getByRole('link',{name:'Notes',exact:true})).not.toHaveAttribute('aria-current','page');
 const slot=page.locator('[data-treasure-id]:visible').first(),id=await slot.getAttribute('data-treasure-id');
 await slot.click();await page.getByRole('link',{name:'Notes ›',exact:true}).click();
 await expect(page.locator('.treasure-notes:visible')).toBeVisible();
 await expect(nativePages.getByRole('link',{name:'Notes',exact:true})).toHaveAttribute('aria-current','page');
 await expect(nativePages.getByRole('link',{name:'Grid',exact:true})).not.toHaveAttribute('aria-current','page');
 expect(new URLSearchParams(new URL(page.url()).hash.split('?')[1]).get('entry')).toBe(id);
 await page.getByRole('link',{name:'‹ Grid',exact:true}).click();await expect(page.locator(`[data-treasure-id="${id}"]`)).toBeFocused();await fit(page);
});

test('compact and zoom-equivalent viewports preserve useful reading space and complete world summaries',async({page})=>{
 for(const [width,height] of [[844,390],[320,568],[640,360]]){
  await page.setViewportSize({width,height});
  for(const route of ['treasures','worlds/Traverse%20Town','workshop/recipes?entry=dddhd:recipe:aura-lion:source-1','workshop/plan?entry=dddhd:materials:brilliant-fantasy&view=route']){
   await page.goto(`./#/dddhd/${route}`);await fit(page);
   const notes=page.locator('.kh1-note-window');
   if(await notes.count())expect((await notes.boundingBox())!.height).toBeGreaterThan(50);
   const summary=page.locator('.ddd-world-summary');
   if(await summary.count())expect(await summary.evaluate(el=>el.scrollHeight<=el.clientHeight)).toBe(true);
  }
 }
});

test('full-height phone primary controls have at least44 pixel hit areas',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('./#/dddhd/spirits?entry=dddhd:spirits:aura-lion');
 await expect(page.locator('.ddd-book')).toBeVisible();
 await page.getByRole('button',{name:'Tools',exact:true}).click();
 for(const target of [page.getByRole('combobox',{name:'Filter by character'}),page.getByRole('link',{name:'Search',exact:true}),page.getByRole('link',{name:'Save & Settings',exact:true}),page.getByRole('link',{name:'Next entry',exact:true}),page.getByRole('button',{name:'Next notes page',exact:true})]){
  const box=await target.boundingBox();expect(box!.height).toBeGreaterThanOrEqual(44);expect(box!.width).toBeGreaterThanOrEqual(44);
 }
});
