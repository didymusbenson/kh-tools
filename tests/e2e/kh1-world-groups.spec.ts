import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { entryTitle } from '../../src/domain/entryPresentation';
import type { GameData, GuideEntry } from '../../src/domain/types';
import { kh1Record, kh1Row, showKh1Overview } from './native-collection-helpers';

// Use a fresh build rather than a service worker's earlier index layout.
test.use({ serviceWorkers: 'block' });

const data = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) as GameData;
const collections = [
  { route: 'ansem-reports', category: 'report', label: 'Ansem’s Reports', total: 13, actions: 10, unit: 'collection actions' },
  { route: 'dalmatians', category: 'dalmatian', label: '101 Dalmatians', total: 33, actions: 33, unit: 'puppy groups found' },
] as const;
type Collection = typeof collections[number];
const entriesFor = (collection: Collection) => data.entries.filter(entry => entry.category === collection.category);
const groups = (page: Page) => page.locator('.kh1-index > .kh1-world-group');
const records = (page: Page) => groups(page).locator('a[data-record-id]');
const worldFilter = (page: Page) => page.getByRole('combobox', { name: 'Filter by world', exact: true });
const statusFilter = (page: Page) => page.getByRole('combobox', { name: 'Filter by collection status', exact: true });
const numberFor = (entry: GuideEntry) => entry.category === 'report'
  ? Number(entry.name.match(/(\d+)$/)![1]) : Number(entry.facts?.puppyStart);

async function settled(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}

/** Inspect the displayed groups only; measurement copies must never be reachable records. */
async function inspectGroups(page: Page, expected: GuideEntry[]) {
  const found: string[] = [];
  const expectedById = new Map(expected.map(entry => [entry.id, entry]));
  const pageWorlds: string[] = [];
  for (const group of await groups(page).all()) {
    const world = await group.getAttribute('data-world');
    expect(world).toBeTruthy();
    pageWorlds.push(world!);
    await expect(group.locator('h2')).toHaveText(world!);
    const rows = group.locator('.kh1-index-row');
    expect(await rows.count(), `The ${world} heading must have at least one record`).toBeGreaterThan(0);
    for (const row of await rows.all()) {
      const record = row.locator('a[data-record-id]');
      await expect(record).toHaveCount(1);
      const id = (await record.getAttribute('data-record-id'))!;
      const entry = expectedById.get(id);
      expect(entry, `${id} must belong to the requested collection/filter`).toBeDefined();
      expect(entry!.world, `${id} must be under its canonical world`).toBe(world);
      const title = await record.evaluate(node => {
        const clone = node.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('small').forEach(small => small.remove());
        return clone.textContent!.trim();
      });
      expect(title).toBe(entry!.category === 'report' ? `Report ${numberFor(entry!)}` : entryTitle(entry!));
      // Puppy locations are still useful, but the world belongs to the heading.
      if (entry!.category === 'dalmatian') await expect(record.locator('small')).toHaveText(entry!.area!);
      else await expect(record.locator('small')).toHaveCount(0);
      expect(await record.locator('small').allTextContents()).not.toContain(world!);
      await expect(row.getByRole('checkbox')).toHaveCount(1);
      const target = new URLSearchParams((await record.getAttribute('href'))!.split('?')[1]);
      expect(target.get('entry')).toBe(id);
      found.push(id);
    }
  }
  expect(new Set(pageWorlds).size, 'A world has one heading per index page').toBe(pageWorlds.length);
  expect(await page.locator('.kh1-index > .kh1-index-row').count()).toBe(0);
  expect(await page.locator('.kh1-index a[data-record-id]:not([aria-hidden="true"])').count()).toBe(found.length);
  return found;
}

async function expectGeometry(page: Page) {
  const geometry = await page.locator('.kh1-index').evaluate(index => {
    const bounds = index.getBoundingClientRect();
    const controls = document.querySelector('.kh1-page-controls')!.getBoundingClientRect();
    return {
      viewport: { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight },
      index: { left: bounds.left, right: bounds.right, top: bounds.top, bottom: bounds.bottom, width: index.clientWidth, scrollWidth: index.scrollWidth },
      controlsTop: controls.top,
      groups: [...index.querySelectorAll(':scope > .kh1-world-group')].map(group => {
        const heading = group.querySelector('h2')!.getBoundingClientRect();
        return {
          heading: { top: heading.top, bottom: heading.bottom, left: heading.left, right: heading.right },
          rows: [...group.querySelectorAll('.kh1-index-row')].map(row => {
            const r = row.getBoundingClientRect(), link = row.querySelector('a')!.getBoundingClientRect(), check = row.querySelector('input')!.getBoundingClientRect();
            return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: row.clientWidth, scrollWidth: row.scrollWidth, linkRight: link.right, checkLeft: check.left };
          }),
        };
      }),
    };
  });
  expect(geometry.viewport.scrollWidth).toBeLessThanOrEqual(geometry.viewport.width + 1);
  expect(geometry.viewport.scrollHeight).toBeLessThanOrEqual(geometry.viewport.height + 1);
  expect(geometry.index.scrollWidth).toBeLessThanOrEqual(geometry.index.width + 1);
  expect(geometry.index.bottom).toBeLessThanOrEqual(geometry.controlsTop + 1);
  for (const group of geometry.groups) {
    expect(group.heading.left).toBeGreaterThanOrEqual(geometry.index.left - 1);
    expect(group.heading.right).toBeLessThanOrEqual(geometry.index.right + 1);
    expect(group.heading.top).toBeGreaterThanOrEqual(geometry.index.top - 1);
    expect(group.rows.length).toBeGreaterThan(0);
    expect(group.heading.bottom, 'No orphan heading without its first row on the same leaf').toBeLessThanOrEqual(group.rows[0].top + 1);
    for (const [position, row] of group.rows.entries()) {
      expect(row.left).toBeGreaterThanOrEqual(geometry.index.left - 1);
      expect(row.right).toBeLessThanOrEqual(geometry.index.right + 1);
      expect(row.top).toBeGreaterThanOrEqual(geometry.index.top - 1);
      expect(row.bottom, 'Group rows must stay above index paging controls').toBeLessThanOrEqual(geometry.index.bottom + 1);
      expect(row.scrollWidth).toBeLessThanOrEqual(row.width + 1);
      expect(row.linkRight).toBeLessThanOrEqual(row.checkLeft + 1);
      if (position) expect(row.top).toBeGreaterThanOrEqual(group.rows[position - 1].bottom - 1);
    }
  }
  if (geometry.viewport.width > 650) {
    const leaves = await page.evaluate(() => {
      const book = document.querySelector('.kh1-spread')!.getBoundingClientRect();
      const left = document.querySelector('.kh1-leaf-left')!.getBoundingClientRect();
      const right = document.querySelector('.kh1-leaf-right')!.getBoundingClientRect();
      const binding = document.querySelector('.kh1-spiral')!.getBoundingClientRect();
      return [Math.abs(left.width - right.width), Math.abs(left.right - right.left), Math.abs(binding.x + binding.width / 2 - (book.x + book.width / 2))];
    });
    for (const difference of leaves) expect(difference).toBeLessThan(1);
  }
}

/** No deduplication: changing responsive page capacity may not skip or repeat records. */
async function expectAllRecords(page: Page, expected: GuideEntry[], geometry = false) {
  const found: string[] = [];
  const visited = new Set<string>();
  const worldSequence: string[] = [];
  while (true) {
    await expect(records(page).first()).toBeVisible();
    await settled(page);
    expect(visited.has(page.url()), 'Index pagination must not loop').toBe(false);
    visited.add(page.url());
    expect(visited.size).toBeLessThanOrEqual(expected.length);
    const current = await inspectGroups(page, expected);
    if (geometry) await expectGeometry(page);
    found.push(...current);
    worldSequence.push(...await groups(page).evaluateAll(nodes => nodes.map(node => node.getAttribute('data-world')!)));
    const next = page.getByRole('link', { name: 'Next index page', exact: true });
    if (!await next.count()) break;
    await next.click();
    await expect(records(page).first()).not.toHaveAttribute('data-record-id', current[0]);
  }
  expect(found.slice().sort()).toEqual(expected.map(entry => entry.id).sort());
  expect(new Set(found).size, 'Every canonical record is displayed exactly once').toBe(found.length);
  const worldRuns = worldSequence.filter((world, index) => world !== worldSequence[index - 1]);
  expect(new Set(worldRuns).size, 'A continued world must not reappear after a different world').toBe(worldRuns.length);
  expect(worldRuns).toEqual([...new Set(expected.map(entry => entry.world!))].sort((a, b) => a.localeCompare(b)));
  for (const world of new Set(expected.map(entry => entry.world))) {
    const entries = expected.filter(entry => entry.world === world).sort((a, b) => numberFor(a) - numberFor(b));
    expect(found.filter(id => entries.some(entry => entry.id === id))).toEqual(entries.map(entry => entry.id));
  }
}

for (const collection of collections) {
  for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }, { width: 1440, height: 900 }]) {
    test(`${collection.label}: all ${collection.total} records are grouped exactly once without clipping at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      test.setTimeout(90_000);
      const entries = entriesFor(collection);
      expect(entries).toHaveLength(collection.total);
      await page.setViewportSize(viewport);
      await page.goto(`./#/kh1fm/${collection.route}`);
      await expect(page.locator('.kh1-heading h1')).toHaveText(collection.label);
      await expect(page.locator('.kh1-collection-count')).toHaveText(`0 / ${collection.actions} ${collection.unit}`);
      await expectAllRecords(page, entries, true);
      await page.goto(`./#/kh1fm/${collection.route}`);
      await expect(records(page).first()).toBeVisible();
      await settled(page);
      await page.screenshot({ path: test.info().outputPath(`${collection.route}-${viewport.width}x${viewport.height}.png`) });
    });
  }

  test(`${collection.label}: world/status filters preserve denominators, canonical saves, Undo and reload`, async ({ page }) => {
    const entries = entriesFor(collection);
    const selectedWorld = collection.category === 'report' ? 'Agrabah' : 'Traverse Town';
    const expected = entries.filter(entry => entry.world === selectedWorld).sort((a, b) => numberFor(a) - numberFor(b));
    const first = expected[0];
    await page.goto(`./#/kh1fm/${collection.route}`);
    await page.getByRole('link', { name: 'Next index page', exact: true }).click();
    await worldFilter(page).selectOption(selectedWorld);
    await expect(page.getByRole('link', { name: 'Previous index page', exact: true })).toHaveCount(0);
    await expectAllRecords(page, expected);
    // The filter setter resets any pagination acquired while inspecting the full world.
    await statusFilter(page).selectOption('remaining');
    await expect(page.getByRole('link', { name: 'Previous index page', exact: true })).toHaveCount(0);
    // This row disappears under Uncollected, so assert removal after the click.
    await kh1Row(page, first.id).getByRole('checkbox').click();
    await expect(kh1Record(page, first.id)).toHaveCount(0);
    await expect(page.locator('.kh1-collection-count')).toHaveText(`1 / ${expected.length} ${collection.unit}`);
    await page.getByRole('button', { name: 'Tools', exact: true }).click();
    await page.getByRole('button', { name: 'Undo', exact: true }).click();
    await expect(kh1Row(page, first.id).getByRole('checkbox')).not.toBeChecked();
    await expect(page.locator('.kh1-collection-count')).toHaveText(`0 / ${expected.length} ${collection.unit}`);
    await expect(page.locator('.kh1-save-line')).toContainText('Last change undone.');
    // This row disappears under Uncollected, so assert removal after the click.
    await kh1Row(page, first.id).getByRole('checkbox').click();
    await expect(page.locator('.kh1-collection-count')).toHaveText(`1 / ${expected.length} ${collection.unit}`);
    await page.reload();
    await expect(worldFilter(page)).toHaveValue(selectedWorld);
    await expect(statusFilter(page)).toHaveValue('remaining');
    await expect(page.locator('.kh1-collection-count')).toHaveText(`1 / ${expected.length} ${collection.unit}`);
    await expectAllRecords(page, expected.slice(1));
    await statusFilter(page).selectOption('');
    await expect(kh1Row(page, first.id).getByRole('checkbox')).toBeChecked();
    await expect(kh1Row(page, expected[1].id).getByRole('checkbox')).not.toBeChecked();
    await worldFilter(page).selectOption('');
    await expect(page.locator('.kh1-collection-count')).toHaveText(`1 / ${collection.actions} ${collection.unit}`);
  });

  test(`${collection.label}: an exhausted world has no orphan heading and recovers with Undo`, async ({ page }) => {
    const entries = entriesFor(collection);
    const selectedWorld = collection.category === 'report' ? 'Atlantica' : 'Olympus Coliseum';
    const only = entries.filter(entry => entry.world === selectedWorld);
    expect(only).toHaveLength(1);
    await page.goto(`./#/kh1fm/${collection.route}?world=${encodeURIComponent(selectedWorld)}&status=remaining`);
    await kh1Row(page, only[0].id).getByRole('checkbox').click();
    await expect(groups(page)).toHaveCount(0);
    await expect(page.locator('.kh1-empty')).toHaveText('No entries match this selection.');
    await expect(page.locator('.kh1-collection-count')).toHaveText(`1 / 1 ${collection.unit}`);
    await expect(page.getByRole('link', { name: 'Next index page', exact: true })).toHaveCount(0);
    await page.getByRole('button', { name: 'Tools', exact: true }).click();
    await page.getByRole('button', { name: 'Undo', exact: true }).click();
    await expect(groups(page)).toHaveCount(1);
    await expect(kh1Row(page, only[0].id).getByRole('checkbox')).not.toBeChecked();
    await page.reload();
    await expect(kh1Row(page, only[0].id).getByRole('checkbox')).not.toBeChecked();
    await expect(page.locator('.kh1-collection-count')).toHaveText(`0 / 1 ${collection.unit}`);
  });

  test(`${collection.label}: detail return restores the grouped row focus, page and saved check`, async ({ page }) => {
    await page.goto(`./#/kh1fm/${collection.route}`);
    await expect(page.locator('.journal-footer-save')).toHaveAttribute('title', 'Progress saved on this device');
    await page.getByRole('link', { name: 'Next index page', exact: true }).click();
    await settled(page);
    const record = records(page).first();
    const id = (await record.getAttribute('data-record-id'))!;
    const originalHash = new URL(page.url()).hash;
    const entry = entriesFor(collection).find(entry => entry.id === id)!;
    await record.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.entry-details-content')).toContainText(entry.instructions!);
    await showKh1Overview(page);
    await expect(page.locator('.kh1-leaf-left h2')).toHaveText(entryTitle(entry));
    const acquired = page.getByRole('checkbox', { name: 'Acquired', exact: true });
    await acquired.focus();
    await page.keyboard.press('Space');
    await expect(acquired).toBeChecked();
    await page.getByRole('link', { name: '‹ Return to index', exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => new URL(page.url()).hash).toBe(originalHash);
    await expect(kh1Record(page, id)).toBeFocused();
    await expect(kh1Row(page, id).getByRole('checkbox')).toBeChecked();
    await expect(kh1Record(page, id).locator('xpath=ancestor::section[1]')).toHaveAttribute('data-world', entry.world!);
    await page.reload();
    await expect(kh1Row(page, id).getByRole('checkbox')).toBeChecked();
    await expect.poll(() => new URL(page.url()).hash).toBe(originalHash);
  });
}

test('the KH1 cover names the grouped report collection Ansem’s Reports', async ({ page }) => {
  await page.goto('./#/kh1fm/contents');
  await page.getByRole('link', { name: 'Ansem’s Reports', exact: true }).click();
  await expect(page.locator('.kh1-heading h1')).toHaveText('Ansem’s Reports');
});
