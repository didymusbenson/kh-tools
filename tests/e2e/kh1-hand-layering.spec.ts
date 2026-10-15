import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
test.use({serviceWorkers:'block'});

for(const mode of ['hover','keyboard'] as const){
 test(`KH1 ${mode} glove paints above the binding without changing the book`,async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('./#/kh1fm/reference?world=Destiny%20Islands');
  const link=page.getByRole('link',{name:'Destiny Islands collection route Destiny Islands',exact:true});
  await expect(link).toBeVisible();await page.evaluate(()=>document.fonts.ready);
  const book=await page.locator('.kh1-spread').boundingBox(),binding=await page.locator('.kh1-spiral').boundingBox();
  if(mode==='hover')await link.hover();else{await page.keyboard.press('Tab');await link.focus();}
  const layer=await link.evaluate(el=>{
   const hand=getComputedStyle(el,'::before');
   const rings=getComputedStyle(document.querySelector('.kh1-spiral')!);
   return {content:hand.content,display:hand.display,z:Number(hand.zIndex),bindingZ:Number(rings.zIndex),pointer:hand.pointerEvents,cursor:getComputedStyle(el).cursor};
  });
  expect(layer.content).toBe('""');expect(layer.display).not.toBe('none');expect(layer.z).toBeGreaterThan(layer.bindingZ);expect(layer.pointer).toBe('none');expect(layer.cursor).toBe('pointer');
  expect(await page.locator('.kh1-spread').boundingBox()).toEqual(book);expect(await page.locator('.kh1-spiral').boundingBox()).toEqual(binding);
  // Give the decorative layers hit testing temporarily: their overlap must
  // resolve to the glove's link, proving actual paint order, not just numbers.
  await page.addStyleTag({content:'.kh1-spiral{pointer-events:auto!important}.kh1-index a::before{pointer-events:auto!important}'});
  // Keyboard focus need not wait for the native 150ms leaf fade. During that
  // fade, opacity temporarily creates a stacking context around the glove.
  // Wait for the same real paint-order assertion instead of sampling mid-frame.
  await expect.poll(()=>link.evaluate(el=>{
   const s=getComputedStyle(el,'::before'),row=el.parentElement!.getBoundingClientRect(),r=el.getBoundingClientRect();
   const left=row.left+parseFloat(s.left),top=r.top+(r.height-parseFloat(s.height))/2;
   for(const ring of document.querySelectorAll('.kh1-spiral i')){
    const b=ring.getBoundingClientRect(),x=Math.max(left,b.left)+4,y=Math.max(top,b.top)+4;
    if(x<Math.min(left+36,b.right)&&y<Math.min(top+36,b.bottom))return document.elementFromPoint(x,y)===el;
   }
   return null;
  })).toBe(true);
  await page.locator('style').last().evaluate(el=>el.remove());
  if(mode==='keyboard')await page.keyboard.press('Enter');else await link.click();
  await expect(page.locator('.kh1-entry-spread')).toBeVisible();
 });
}
test('phone keeps native controls and the existing hidden glove',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('./#/kh1fm/reference?world=Destiny%20Islands');
 const link=page.locator('.kh1-index-row a').first();await link.focus();
 expect(await link.evaluate(e=>getComputedStyle(e,'::before').display)).toBe('none');await link.click();await expect(page.locator('.kh1-entry-spread')).toBeVisible();
});

test('world artwork replaces speech while other Jiminy pages retain it',async({page})=>{
 const manifest=JSON.parse(readFileSync('public/assets/kh1-journal/worlds/manifest.json','utf8')) as {assets:{world:string}[]};
 expect(manifest.assets).toHaveLength(13);
 for(const {world} of manifest.assets){
  await page.goto('./#/kh1fm/worlds/'+encodeURIComponent(world));await expect(page.locator('.kh1-world-categories')).toBeVisible();
  await expect(page.locator('.kh1-speech')).toHaveCount(0);await expect(page.locator('.kh1-jiminy-art')).toHaveCount(0);
  const art=page.locator('.kh1-world-art');await expect(art).toHaveAttribute('alt',world+' world emblem');
  await expect.poll(()=>art.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  const visible=await art.isVisible();
  if(visible){
   const bounds=(await page.locator('.kh1-index-art').boundingBox())!,image=(await art.boundingBox())!,credit=(await page.locator('.kh1-world-art-credit').boundingBox())!;
   expect(image.x).toBeGreaterThanOrEqual(bounds.x);expect(image.x+image.width).toBeLessThanOrEqual(bounds.x+bounds.width);
   expect(image.y).toBeGreaterThanOrEqual(bounds.y);expect(image.y+image.height).toBeLessThanOrEqual(credit.y);
   expect(credit.y+credit.height).toBeLessThanOrEqual(bounds.y+bounds.height);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
 for(const route of ['contents','worlds','reference']){
  await page.goto('./#/kh1fm/'+route);await expect(page.locator('.kh1-jiminy-art')).toHaveCount(1);await expect(page.locator('.kh1-speech')).toHaveCount(1);
 }
});
