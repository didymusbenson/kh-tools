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
      const title = `${entry.world} — ${entry.area}`;
      const colorName = `${entry.facts?.color} Trinity`;
      const icon = record.locator('img.kh1-trinity-icon');
      await expect(record.locator('small')).toHaveCount(0);
      await expect(record).toHaveText(title);
      await expect(record).toHaveAccessibleName(`${title} (${colorName})`);
      await expect(kh1Row(page, id).getByRole('checkbox'))
        .toHaveAccessibleName(`Acquired: ${title} (${colorName})`);
      await expect(icon).toHaveAttribute('src', new RegExp(`assets/kh1-journal/trinity-${String(entry.facts?.color).toLowerCase()}\\.png$`));
      await expect(icon).toHaveAttribute('alt', '');
      await expect(icon).toHaveAttribute('title', colorName);
      await expect(icon).toBeVisible();
      await expect.poll(() => icon.evaluate(image => {
        const png = image as HTMLImageElement;
        return png.complete && png.naturalWidth === 500 && png.naturalHeight === 500;
      })).toBe(true);
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

for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }, { width: 1440, height: 900 }]) {
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
      const icon = row.querySelector('.kh1-trinity-icon')!.getBoundingClientRect();
      const label = row.querySelector('.kh1-trinity-row-label > span')!.getBoundingClientRect();
      return {
        left: box.left, right: box.right, height: box.height, textRight: text.right,
        checkLeft: check.left, scroll: row.scrollWidth, width: row.clientWidth,
        iconLeft: icon.left, iconRight: icon.right, iconWidth: icon.width, iconHeight: icon.height,
        labelLeft: label.left, labelHeight: label.height,
        verticalOffset: Math.abs(icon.y + icon.height / 2 - label.y - label.height / 2),
      };
    }));
    for (const row of geometry) {
      expect(row.left).toBeGreaterThanOrEqual(0);
      expect(row.right).toBeLessThanOrEqual(viewport.width + 1);
      expect(row.textRight).toBeLessThanOrEqual(row.checkLeft);
      expect(row.scroll).toBeLessThanOrEqual(row.width + 1);
      expect(row.iconLeft).toBeGreaterThanOrEqual(row.left);
      expect(row.iconRight).toBeLessThan(row.labelLeft);
      expect(row.iconWidth).toBeGreaterThanOrEqual(24);
      expect(row.iconWidth).toBeLessThanOrEqual(36);
      expect(row.iconHeight).toBe(row.iconWidth);
      expect(row.verticalOffset).toBeLessThanOrEqual(1);
      expect(row.height).toBeGreaterThanOrEqual(44);
      expect(row.height, 'compact rows add no subtitle-height band')
        .toBeLessThanOrEqual(Math.max(44, row.labelHeight + 12));
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
  });
}


test('all five Minimal icons keep visible hover, keyboard focus and independent selection', async ({ page, isMobile }, testInfo) => {
  await page.goto('./#/kh1fm/trinities');
  for (const selected of TRINITY_COLORS) {
    await color(page).selectOption(selected);
    const entry = marks.filter(mark => mark.facts?.color === selected).sort(compareTrinities)[0];
    const record = kh1Record(page, entry.id);
    const checkbox = kh1Row(page, entry.id).getByRole('checkbox');
    const icon = record.locator('img.kh1-trinity-icon');
    const name = `${entry.world} — ${entry.area} (${selected} Trinity)`;
    await expect(record).toHaveAccessibleName(name);
    await expect(checkbox).toHaveAccessibleName(`Acquired: ${name}`);
    await expect(icon).toHaveAttribute('title', `${selected} Trinity`);
    await expect.poll(() => icon.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBe(500);
    await page.mouse.move(0, 0);
    await page.evaluate(() => document.fonts.ready);
    await expect(record).toBeVisible();
    const plainBackground = await record.evaluate(node => getComputedStyle(node).backgroundColor);
    if (!isMobile) {
      await record.hover();
      expect(await record.evaluate(node => getComputedStyle(node).backgroundColor)).not.toBe(plainBackground);
      await expect(icon).toBeVisible();
      await page.mouse.move(0, 0);
    }
    // Enter keyboard modality before focusing the native record link.
    await page.keyboard.press('Tab');
    await record.focus();
    await expect(record).toBeFocused();
    expect(await record.evaluate(node => node.matches(':focus-visible'))).toBe(true);
    expect(await record.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe('none');
    await expect(icon).toBeVisible();
    const route = page.url();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    expect(page.url(), 'checking a mark must not follow its detail link').toBe(route);
    await expect(record).toHaveAccessibleName(name);
    await expect(icon).toBeVisible();
    const screenshotName = `trinity-${selected.toLowerCase()}-${isMobile ? 'phone' : 'desktop'}`;
    const screenshotPath = testInfo.outputPath(`${screenshotName}.png`);
    await page.screenshot({ path: screenshotPath });
    await testInfo.attach(screenshotName, { path: screenshotPath, contentType: 'image/png' });
    await checkbox.uncheck();
  }
});
