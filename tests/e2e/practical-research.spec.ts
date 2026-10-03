import { test, expect } from '@playwright/test';

for (const item of [
  {game:'kh02', category:'objectives', id:'kh02:objective:13', text:'Budget for 50'},
  {game:'kh02', category:'wardrobe', id:'kh02:wardrobe:mystic-pauldron', text:'Budget for 50'},
  {game:'dddhd', category:'reference', id:'dddhd:reference:portal-hunting', text:'Reports'},
  {game:'kh3', category:'keyblades', id:'kh3.equipment.forest-clasp', text:'Shore'},
]) {
  test(`${item.game} practical guidance reaches ${item.id}`, async ({page}) => {
    if(item.game==='dddhd'){
      await page.goto(`./#/${item.game}/${item.category}?entry=${encodeURIComponent(item.id)}`);
      await expect(page.locator('.ddd-detail')).toContainText(item.text);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      return;
    }
    await page.goto(`./#/${item.game}/${item.category}`);
    const row=page.locator(`[id="entry-${item.id}"]`);
    await row.locator('.guide-expand').click();
    await expect(row).toContainText(item.text);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  });
}
