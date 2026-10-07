import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import type { GameData, GuideEntry } from '../../src/domain/types';
import { TRINITY_COLORS, compareTrinities } from '../../src/domain/trinityPresentation';
import { kh1Record, kh1Row } from './native-collection-helpers';

const data = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) as GameData;
const marks = data.entries.filter(entry => entry.category === 'trinity');
const sort = (page: Page) => page.getByRole('combobox', { name: 'Sort Trinity marks', exact: true });
const color = (page: Page) => page.getByRole('combobox', { name: 'Filter by Trinity color', exact: true });
const world = (page: Page) => page.getByRole('combobox', { name: 'Filter by world', exact: true });
const status = (page: Page) => page.getByRole('combobox', { name: 'Filter by collection status', exact: true });

/** Deliberately do not deduplicate: responsive page-size changes must not repeat or skip a mark. */
async function expectOrderedMarks(page: Page, expected: GuideEntry[], checkPage?: () => Promise<void>) {
  const found: string[] = [];
  const records = page.locator('.kh1-index a[data-record-id]');
  const visited = new Set<string>();
  while (true) {
    await expect(records.first()).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    });
    expect(visited.has(page.url()), 'pagination must not loop').toBe(false);
    visited.add(page.url());
    expect(visited.size).toBeLessThanOrEqual(expected.length);
    const ids = await records.evaluateAll(nodes => nodes.map(node => node.getAttribute('data-record-id')!));
    for (const id of ids) {
      const entry = marks.find(mark => mark.id === id)!;
      const record = kh1Record(page, id);
      await expect(record.locator('small')).toHaveText(`${entry.facts?.color} Trinity`);
      const title = await record.evaluate(node => {
        const clone = node.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('small').forEach(small => small.remove());
        return clone.textContent?.trim();
      });
      expect(title).toBe(`${entry.world} — ${entry.area}`);
    }
    if (checkPage) await checkPage();
    found.push(...ids);
    const next = page.getByRole('link', { name: 'Next index page', exact: true });
    if (!await next.count()) break;
    await next.click();
    await expect(records.first()).not.toHaveAttribute('data-record-id', ids[0]);
  }
  expect(found).toEqual(expected.map(entry => entry.id));
  expect(new Set(found).size).toBe(found.length);
}

for (const mode of ['color', 'world', 'location'] as const) {
  test(`${mode} sorting exposes all 46 location-first marks exactly once`, async ({ page }) => {
    await page.goto('./#/kh1fm/trinities');
    await expect(sort(page)).toHaveValue('color');
    expect(await color(page).locator('option').evaluateAll(options => options.map(option => (option as HTMLOptionElement).value)))
      .toEqual(['', ...TRINITY_COLORS]);
    await sort(page).selectOption(mode);
    await expectOrderedMarks(page, [...marks].sort((a, b) => compareTrinities(a, b, mode)));
  });
}

test('color, world and remaining filters combine and survive reload; changing filters resets pagination', async ({ page }) => {
  await page.goto('./#/kh1fm/trinities');
  await page.getByRole('link', { name: 'Next index page', exact: true }).click();
  for (const selected of TRINITY_COLORS) {
    await color(page).selectOption(selected);
    await expect(page.getByRole('link', { name: 'Previous index page', exact: true })).toHaveCount(0);
    await expectOrderedMarks(page, marks.filter(entry => entry.facts?.color === selected).sort(compareTrinities));
  }
  await color(page).selectOption('Blue');
  await world(page).selectOption('Traverse Town');
  await sort(page).selectOption('location');
  await status(page).selectOption('remaining');
  await page.reload();
  await expect(color(page)).toHaveValue('Blue');
  await expect(world(page)).toHaveValue('Traverse Town');
  await expect(sort(page)).toHaveValue('location');
  await expect(status(page)).toHaveValue('remaining');
  await expectOrderedMarks(page, marks.filter(entry => entry.facts?.color === 'Blue' && entry.world === 'Traverse Town')
    .sort((a, b) => compareTrinities(a, b, 'location')));
});

test('same-room marks keep independent canonical completion through sorting, Undo and reload', async ({ page }) => {
  const first = 'kh1fm-trinity-blue-01';
  const second = 'kh1fm-trinity-blue-02';
  await page.goto('./#/kh1fm/trinities?world=Traverse%20Town&color=Blue');
  await expect(kh1Record(page, first)).toBeVisible();
  await kh1Row(page, first).getByRole('checkbox').check();
  await expect(kh1Row(page, first).getByRole('checkbox')).toBeChecked();
  await expect(kh1Row(page, second).getByRole('checkbox')).not.toBeChecked();
  await sort(page).selectOption('world');
  await page.reload();
  await expect(kh1Row(page, first).getByRole('checkbox')).toBeChecked();
  await expect(kh1Row(page, second).getByRole('checkbox')).not.toBeChecked();
  await kh1Row(page, second).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Tools', exact: true }).click();
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await expect(kh1Row(page, first).getByRole('checkbox')).toBeChecked();
  await expect(kh1Row(page, second).getByRole('checkbox')).not.toBeChecked();
  await status(page).selectOption('remaining');
  await expect(kh1Record(page, first)).toHaveCount(0);
  await expect(kh1Record(page, second)).toBeVisible();
  await page.reload();
  await expect(kh1Record(page, first)).toHaveCount(0);
  await expect(kh1Record(page, second)).toBeVisible();
});

for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }]) {
  test(`Trinity controls and long location names fit at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('./#/kh1fm/trinities?world=Olympus%20Coliseum');
    for (const control of [sort(page), color(page), world(page), status(page)]) {
      await expect(control).toBeVisible();
      await control.scrollIntoViewIfNeeded();
      await expect(control).toBeInViewport();
      const box = await control.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
    }
    await expectOrderedMarks(page, marks.filter(entry => entry.world === 'Olympus Coliseum').sort(compareTrinities), async () => {
      const controls = await page.locator('.kh1-page-controls').boundingBox();
      const rows = await page.locator('.kh1-index > .kh1-index-row').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().bottom));
      for (const bottom of rows) expect(bottom).toBeLessThanOrEqual(controls!.y + 1);
    });
    const geometry = await page.locator('.kh1-index > .kh1-index-row').evaluateAll(rows => rows.map(row => {
      const box = row.getBoundingClientRect();
      const text = row.querySelector('a')!.getBoundingClientRect();
      const check = row.querySelector('input')!.getBoundingClientRect();
      return { left: box.left, right: box.right, textRight: text.right, checkLeft: check.left, scroll: row.scrollWidth, width: row.clientWidth };
    }));
    for (const row of geometry) {
      expect(row.left).toBeGreaterThanOrEqual(0);
      expect(row.right).toBeLessThanOrEqual(viewport.width + 1);
      expect(row.textRight).toBeLessThanOrEqual(row.checkLeft);
      expect(row.scroll).toBeLessThanOrEqual(row.width + 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
  });
}
