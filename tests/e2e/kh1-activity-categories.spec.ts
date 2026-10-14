import { kh1ActivitySection } from '../../src/domain/kh1Activities';
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import type { GameData } from '../../src/domain/types';
import { expectKh1Records, showKh1Overview } from './native-collection-helpers';
const data = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) as GameData;
for (const [section, title, categories] of [
  ['coliseum', 'Coliseum', ['cup']],
  ['challenges', 'Challenges', ['boss', 'minigame']],
] as const) {
  test(`${title} exposes only its own records and preserves saved checks`, async ({ page }) => {
    const entries = data.entries.filter(e => kh1ActivitySection(e) === section);
    await page.goto(`./#/kh1fm/${section}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expectKh1Records(page, entries.map(e => e.id));
    const entry = entries.find(e => e.checkable)!;
    await page.goto(`./#/kh1fm/${section}?entry=${entry.id}`);
    await showKh1Overview(page);
    const check = page.getByRole('checkbox', {name:'Acquired', exact:true});
    await check.check();
    await expect(page.getByRole('status').filter({hasText:'updated.'})).toBeVisible();
    await page.reload();
    await showKh1Overview(page);
    await expect(check).toBeChecked();
    await page.getByRole('link', {name:'‹ Return to index',exact:true}).click();
    await page.getByRole('combobox',{name:'Filter by collection status',exact:true}).selectOption('remaining');
    await expect(page.locator(`[data-record-id="${entry.id}"]`)).toHaveCount(0);
  });
}
test('old combined deep links open the new section and retain world context', async ({ page }) => {
  for(const [category, section, title] of [['cup','coliseum','Coliseum']]) {
    const entry = data.entries.find(e => e.category === category && e.world)!;
    const params = new URLSearchParams({entry:entry.id,world:entry.world!,fromWorld:entry.world!,worldCategory:'challenges'});
    await page.goto(`./#/kh1fm/challenges?${params}`);
    await expect(page).toHaveURL(new RegExp(`/kh1fm/${section}\\?`));
    await expect(page.getByRole('heading',{level:1})).toHaveText(title);
    await showKh1Overview(page);
    await page.getByRole('link',{name:'‹ Return to index',exact:true}).click();
    await expect(page.getByRole('combobox',{name:'Filter by world',exact:true})).toHaveValue(entry.world!);
    await expectKh1Records(page,data.entries.filter(e=>kh1ActivitySection(e)===section&&e.world===entry.world).map(e=>e.id));
  }
});

test('Contents links reach each activity section and world links return to their directory', async ({ page }) => {
  for(const [section,title] of [['coliseum','Coliseum'],['gummi','Gummi Ship'],['challenges','Challenges']]) {
    await page.goto('./#/kh1fm/contents');
    await expect(page.getByRole('heading',{level:1})).toHaveText('Contents');
    await page.evaluate(async()=>{await document.fonts.ready; await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
    const link = page.locator(`main a[href="#/kh1fm/${section}"]`);
    while(await link.count() === 0) {
      const first = page.locator('.kh1-index > a').first();
      const previous = await first.getAttribute('href');
      await page.getByRole('link',{name:'Next index page',exact:true}).click();
      await expect(first).not.toHaveAttribute('href',previous!);
    }
    await link.click();
    await expect(page.getByRole('heading',{level:1})).toHaveText(title);
  }
  for(const [world,section] of [['Olympus Coliseum','coliseum'],['Destiny Islands','challenges']]) {
    await page.goto(`./#/kh1fm/worlds/${encodeURIComponent(world)}`);
    await expect(page.getByRole('heading',{level:1})).toHaveText(world);
    await page.evaluate(async()=>{await document.fonts.ready; await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
    const link = page.locator(`[data-world-category="${section}"]`);
    while(await link.count() === 0) {
      const first = page.locator('.kh1-index > a').first();
      const previous = await first.getAttribute('href');
      await page.getByRole('link',{name:'Next index page',exact:true}).click();
      await expect(first).not.toHaveAttribute('href',previous!);
    }
    await link.click();
    await expect(page.getByRole('combobox',{name:'Filter by world',exact:true})).toHaveValue(world);
    await expectKh1Records(page,data.entries.filter(e=>kh1ActivitySection(e)===section&&e.world===world).map(e=>e.id));
    await page.getByRole('link',{name:'‹ Back',exact:true}).click();
    await expect(page.getByRole('heading',{level:1})).toHaveText(world);
    await expect(page.locator('.kh1-world-categories')).toBeVisible();
  }
});
