import { test, expect } from '@playwright/test';
import { entries } from '../../src/games/kh2fm/catalog';
import { readFileSync } from 'node:fs';

test('KH1 new item references are reachable from the equipment chapter', async ({ page }) => {
  const guide = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8'));
  const item = guide.entries.find((e: { category: string; name: string }) => e.category === 'item' && e.name === 'Potion');
  expect(item).toBeDefined();
  await page.goto(`./#/kh1fm/equipment?entry=${encodeURIComponent(item.id)}`);
  await expect(page.locator('.kh1-leaf-right')).toBeVisible();
  await expect(page.locator('.kh1-leaf-right')).toContainText(item.summary);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('KH2 map aliases share treasure progress after navigation and reload', async ({ page }) => {
  const map = entries.find(e => e.category === 'treasures' && e.categories?.includes('maps'))!;
  expect(map).toBeDefined();
  await page.goto(`./#/kh2fm/maps?entry=${encodeURIComponent(map.id)}`);
  const recorded = page.getByRole('checkbox', { name: 'Recorded', exact: true });
  await expect(recorded).toBeEnabled();
  await recorded.check();
  await page.goto(`./#/kh2fm/treasures?entry=${encodeURIComponent(map.id)}`);
  await expect(recorded).toBeChecked();
  await page.reload();
  await expect(recorded).toBeChecked();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('KH3 Gummi fragments persist while special weapons remain reference entries', async ({ page }) => {
  const guide = JSON.parse(readFileSync('src/games/kh3/content.json', 'utf8'));
  const fragment = guide.entries.find((e: { category: string }) => e.category === 'gummi-fragments');
  expect(fragment).toBeDefined();
  await page.goto('./#/kh3/gummi-fragments');
  const row = page.locator(`[id="entry-${fragment.id}"]`);
  await row.locator('input[type=checkbox]').check();
  await page.reload();
  await expect(row.locator('input[type=checkbox]')).toBeChecked();
  const repair = guide.entries.find((e: { category: string; name: string }) => e.category === 'gummi-reference' && e.name === 'Repair Kit');
  expect(repair).toBeDefined();
  await page.goto('./#/kh3/gummi-reference');
  const reference = page.locator(`[id="entry-${repair.id}"]`);
  await reference.locator('.guide-expand').click();
  await expect(reference).toContainText(/half|50%/);
  await expect(reference).toContainText('36');
  await expect(reference.locator('input[type=checkbox]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('KH2 expanded equipment and ability references are readable without completion checks', async ({ page }) => {
  for (const category of ['equipment', 'abilities']) {
    const entry = entries.find(e => e.category === category && e.checkable === false)!;
    expect(entry).toBeDefined();
    await page.goto(`./#/kh2fm/${category}?entry=${encodeURIComponent(entry.id)}`);
    const details = page.getByRole('region', { name: 'Journal details' });
    await expect(details.getByRole('heading', { name: entry.name, exact: true })).toBeVisible();
    await expect(details.locator('input[type=checkbox]')).toHaveCount(0);
    await expect(details).toContainText(entry.summary);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
