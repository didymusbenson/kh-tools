import {expect, test, type Page} from '@playwright/test';
import {readFileSync} from 'node:fs';

type TreasureRecord = {id:string; world:string; kind:string; included:boolean};
const records:TreasureRecord[]=JSON.parse(readFileSync('src/games/treasure-data/kh1fm.json','utf8')).records;
const traverse=records.filter(record=>record.included&&record.world==='Traverse Town'&&record.kind==='chest');
const route=(params:Record<string,string>={})=>`./#/kh1fm/treasures?${new URLSearchParams(params)}`;
const selected=(page:Page)=>page.locator('[data-treasure-id][aria-pressed=true]:visible');
const collected=(page:Page)=>page.locator('.treasure-check:visible input').first();
const worlds=(page:Page)=>page.getByRole('link',{name:'Back to Worlds',exact:true});
const layout=(page:Page)=>page.locator('.treasure-kh1fm');

async function ready(page:Page) {
 await expect(layout(page)).toBeVisible();
 await page.evaluate(()=>document.fonts.ready);
}

async function noFilterControls(page:Page) {
 await expect(page.locator('.treasure-kh1fm .treasure-toolbar')).toHaveCount(0);
 await expect(page.locator('.treasure-kh1fm .treasure-compact-filter')).toHaveCount(0);
 await expect(page.locator('.treasure-kh1fm .treasure-filters')).toHaveCount(0);
 for(const name of ['Find & filter','Previous matching treasure','Next matching treasure']) {
  await expect(page.getByRole('button',{name,exact:true})).toHaveCount(0);
 }
}

async function frame(page:Page) {
 return {
  volume:await page.locator('.kh1-volume').boundingBox(),
  spread:await page.locator('.kh1-spread').boundingBox(),
 };
}

async function noOuterOverflow(page:Page) {
 await expect.poll(()=>page.evaluate(()=>({
  horizontal:Math.max(0,document.documentElement.scrollWidth-innerWidth),
  vertical:Math.max(0,document.documentElement.scrollHeight-innerHeight),
 }))).toEqual({horizontal:0,vertical:0});
}

async function centeredBindingAndClearContent(page:Page) {
 await expect(page.locator('.kh1-spiral')).toBeVisible();
 await expect.poll(()=>layout(page).evaluate(root=>{
  const errors:string[]=[];
  const spread=root.closest('.kh1-spread')!.getBoundingClientRect();
  const binding=root.closest('.kh1-spread')!.querySelector('.kh1-spiral')!.getBoundingClientRect();
  const leaves=[...root.querySelectorAll<HTMLElement>(':scope > .treasure-leaf')];
  const [left,right]=leaves.map(leaf=>leaf.getBoundingClientRect());
  const center=binding.x+binding.width/2;
  if(Math.abs(center-(spread.x+spread.width/2))>1)errors.push('binding is not centered in the spread');
  if(Math.abs(center-(left.right+right.left)/2)>1)errors.push('binding is not centered on the page seam');
  if(Math.abs(left.width-right.width)>1)errors.push('treasure leaves have unequal widths');
  leaves.forEach((leaf,index)=>{
   for(const node of leaf.children) {
    const rect=node.getBoundingClientRect();
    if(!rect.width||!rect.height||getComputedStyle(node).visibility==='hidden')continue;
    if(rect.top>=binding.bottom||rect.bottom<=binding.top)continue;
    if(index===0&&rect.right>binding.left+1)errors.push(`left content crosses binding: ${node.className}`);
    if(index===1&&rect.left<binding.right-1)errors.push(`right content crosses binding: ${node.className}`);
   }
  });
  for(const count of root.querySelectorAll('.treasure-worlds strong')) {
   if(count.getBoundingClientRect().right>binding.left+1)errors.push('world count overlaps binding');
  }
  return errors;
 })).toEqual([]);
}

async function mobileTargets(page:Page) {
 await expect.poll(()=>layout(page).evaluate(root=>{
  const bad:string[]=[];
  const leaf=[...root.querySelectorAll<HTMLElement>(':scope > .treasure-leaf')].find(node=>node.getBoundingClientRect().width>0)!;
  const bounds=leaf.getBoundingClientRect();
  for(const node of root.querySelectorAll<HTMLElement>('button,a,select,.treasure-check')) {
   if(node.closest('.kh1-note-flow'))continue;
   const rect=node.getBoundingClientRect();
   if(!rect.width||!rect.height||getComputedStyle(node).visibility==='hidden')continue;
   const name=node.getAttribute('aria-label')||node.textContent?.trim()||node.tagName;
   if(rect.width<43.5||rect.height<43.5)bad.push(`${name} target is ${rect.width} x ${rect.height}`);
   if(rect.left<bounds.left-1||rect.right>bounds.right+1||rect.top<bounds.top-1||rect.bottom>bounds.bottom+1)bad.push(`${name} escapes the leaf`);
  }
  return bad;
 })).toEqual([]);
 await noOuterOverflow(page);
}

for(const viewport of [{width:1440,height:900},{width:2048,height:1468}]) {
 test(`KH1 treasure binding stays centered and clear at ${viewport.width}x${viewport.height}`,async({page},testInfo)=>{
  await page.setViewportSize(viewport);
  await page.goto(route());await ready(page);
  const bounds=await frame(page);
  await centeredBindingAndClearContent(page);await noOuterOverflow(page);
  await page.screenshot({path:testInfo.outputPath('kh1-world-summary.png')});
  await page.goto(route({entry:traverse[1].id,view:'grid'}));await ready(page);
  await expect(selected(page)).toHaveAttribute('data-treasure-id',traverse[1].id);
  await centeredBindingAndClearContent(page);await noFilterControls(page);
  expect(await frame(page)).toEqual(bounds);await noOuterOverflow(page);
  await expect(worlds(page)).toBeVisible();
  await expect(page.getByRole('navigation',{name:'Treasure grid pages'})).toBeVisible();
  await expect(collected(page)).toBeEnabled();
  const tools=page.getByRole('navigation',{name:'Journal tools',exact:true});
  await expect(tools.getByRole('link',{name:'Search',exact:true})).toBeVisible();
  await expect(tools.getByRole('link',{name:'Save & Settings',exact:true})).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('kh1-world-detail.png')});
  await page.locator('.treasure-preview').getByRole('link',{name:'Notes ›',exact:true}).click();
  await expect(page.locator('.treasure-notes')).toBeVisible();
  await centeredBindingAndClearContent(page);expect(await frame(page)).toEqual(bounds);
  await page.goBack();await expect(selected(page)).toHaveAttribute('data-treasure-id',traverse[1].id);
  await expect(selected(page)).toBeFocused();
  await worlds(page).click();await expect(page.getByTestId('treasure-summary')).toBeVisible();
  await centeredBindingAndClearContent(page);expect(await frame(page)).toEqual(bounds);
  await page.goBack();await expect(selected(page)).toHaveAttribute('data-treasure-id',traverse[1].id);
  await expect(selected(page)).toBeFocused();await noFilterControls(page);
 });
}

for(const viewport of [{width:390,height:844},{width:320,height:568}]) {
 test(`KH1 phone treasures hide binding and retain touch controls at ${viewport.width}x${viewport.height}`,async({page},testInfo)=>{
  await page.setViewportSize(viewport);
  await page.goto(route());await ready(page);
  const bounds=await frame(page);
  await expect(page.locator('.kh1-spiral')).toBeHidden();await mobileTargets(page);
  await page.screenshot({path:testInfo.outputPath('kh1-mobile-world-summary.png')});
  await page.goto(route({entry:traverse[1].id,view:'grid'}));await ready(page);
  await expect(selected(page)).toHaveAttribute('data-treasure-id',traverse[1].id);
  await expect(page.locator('.kh1-spiral')).toBeHidden();await noFilterControls(page);await mobileTargets(page);
  expect(await frame(page)).toEqual(bounds);
  await collected(page).click();await expect(page.locator('.treasure-save:visible')).toContainText('Marked collected.');
  await mobileTargets(page);await expect(collected(page)).toBeChecked();
  await page.screenshot({path:testInfo.outputPath('kh1-mobile-collected.png')});
  await page.locator('.treasure-save:visible').getByRole('button',{name:'Undo',exact:true}).click();
  await expect(collected(page)).not.toBeChecked();await mobileTargets(page);
  await page.locator('.treasure-preview:visible').getByRole('link',{name:'Notes ›',exact:true}).click();
  await expect(page.locator('.treasure-notes:visible')).toBeVisible();await mobileTargets(page);
  expect(await frame(page)).toEqual(bounds);
  await page.getByRole('link',{name:'‹ Grid',exact:true}).click();
  await expect(selected(page)).toHaveAttribute('data-treasure-id',traverse[1].id);await expect(selected(page)).toBeFocused();
  await worlds(page).click();await expect(page.getByTestId('treasure-summary')).toBeVisible();
  await page.goBack();await expect(selected(page)).toHaveAttribute('data-treasure-id',traverse[1].id);
  await expect(selected(page)).toBeFocused();await noFilterControls(page);await mobileTargets(page);
 });
}

test('KH1 ignores legacy hidden filters while keeping pagination and selected acquisition IDs',async({page})=>{
 await page.setViewportSize({width:320,height:568});
 await page.goto(route({entry:traverse[1].id,view:'grid',q:'no-matching-treasure',area:'unknown-area',group:'unknown-group',status:'done'}));
 await ready(page);await noFilterControls(page);
 await expect(page.locator('.treasure-muted')).toHaveCount(0);
 await expect(selected(page)).toHaveAttribute('data-treasure-id',traverse[1].id);
 const count=await page.getByTestId('treasure-count').innerText();
 await collected(page).click();await expect(page.locator('.treasure-save:visible')).toContainText('Marked collected.');
 await expect(page.locator('.treasure-muted')).toHaveCount(0);
 expect((await page.getByTestId('treasure-count').innerText()).split('/')[1]).toBe(count.split('/')[1]);
 await page.getByRole('button',{name:'Next treasure grid page',exact:true}).click();
 await expect(page.getByRole('navigation',{name:'Treasure grid pages',exact:true})).toContainText('Grid 2 /');
 const secondPageId=await selected(page).getAttribute('data-treasure-id');
 expect(secondPageId).not.toBe(traverse[1].id);await noFilterControls(page);
 await expect(page.locator('.treasure-muted')).toHaveCount(0);
 await page.reload();await expect(selected(page)).toHaveAttribute('data-treasure-id',secondPageId!);
 await page.getByRole('button',{name:'Previous treasure grid page',exact:true}).click();
 await page.locator(`[data-treasure-id="${traverse[1].id}"]`).click();await expect(collected(page)).toBeChecked();
 await mobileTargets(page);
});
