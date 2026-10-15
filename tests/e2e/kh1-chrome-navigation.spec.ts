import { test, expect } from '@playwright/test';
test.use({serviceWorkers:'block'});

test('search to Gummi returns to exact query and page after reload', async ({page}) => {
  await page.goto('./#/kh1fm/search?q=Cure-G');
  const record=page.locator('.kh1-index a[href*="/gummi/"]').first();
  await expect(record).toBeVisible();
  const origin=new URL(page.url()).hash;
  await record.click();
  await page.reload();
  await expect(page.locator('.kh1-back')).toHaveText('‹ Search results');
  await page.locator('.kh1-back').click();
  await expect.poll(()=>new URL(page.url()).hash).toBe(origin);
  await expect(page.getByRole('searchbox')).toHaveValue('Cure-G');
});

test('utilities restore the exact collection filter and index page', async ({page}) => {
  await page.goto('./#/kh1fm/trinities?color=Blue&sort=world&page=1');
  await expect(page.locator('.kh1-index a[data-record-id]').first()).toBeVisible();
  const origin=new URL(page.url()).hash;
  await page.locator('.kh1-utilities').getByRole('link',{name:'Search',exact:true}).click();
  await expect(page.locator('.kh1-back')).toHaveText('‹ Trinity Marks');
  await page.locator('.kh1-utilities').getByRole('link',{name:'Save & Settings',exact:true}).click();
  await expect(page.locator('.kh1-back')).toHaveText('‹ Search results');
  await page.locator('.kh1-back').click();
  await page.locator('.kh1-back').click();
  await expect.poll(()=>new URL(page.url()).hash).toBe(origin);
});

test('synthesis item returns to its filtered index, not Contents', async ({page}) => {
  await page.goto('./#/kh1fm/synthesis/recipes?set=1');
  const index=page.locator('.kh1-synthesis-index');
  await expect(index.locator('.kh1-index a').first()).toBeAttached();
  const picker=page.getByRole('button',{name:'Index',exact:true});
  if(await picker.isVisible())await picker.click();
  const origin=new URL(page.url()).hash;
  await index.locator('.kh1-index a').first().click();
  await expect(page.locator('.kh1-back')).toHaveText('‹ Recipes');
  await page.reload();
  await page.locator('.kh1-back').click();
  await expect.poll(()=>new URL(page.url()).hash).toBe(origin);
});

test('guidance is associated with its entry and resets when focus leaves the index', async ({page}) => {
  await page.goto('./#/kh1fm/contents');
  const help=page.locator('#kh1-context-help');
  const first=page.locator('.kh1-index > a').first();
  await first.focus();
  await expect(first).toHaveAttribute('aria-describedby','kh1-context-help');
  await expect(help).toContainText('Ansem’s Reports:');
  await page.locator('.kh1-heading-menu a').focus();
  await expect(help).toHaveText('Which part of the journal would you like to read?');
  await expect(page.locator('.kh1-bottom > a')).toHaveCount(0);
  await expect(page.locator('.kh1-leaf-picker')).toHaveCount(0);
});


test('Search utility reopens the search form from a search-result detail', async ({page}) => {
  await page.goto('./#/kh1fm/search?q=Shadow');
  await page.locator('.kh1-index a[data-record-id]').first().click();
  await expect(page.locator('.kh1-entry-spread')).toBeVisible();
  const origin=new URL(page.url()).hash;
  await page.locator('.kh1-utilities').getByRole('link',{name:'Search',exact:true}).click();
  await expect(page.getByRole('searchbox')).toBeVisible();
  await page.locator('.kh1-back').click();
  await expect.poll(()=>new URL(page.url()).hash).toBe(origin);
});
