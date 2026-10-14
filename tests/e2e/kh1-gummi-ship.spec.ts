import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import type { GameData } from '../../src/domain/types';
import { expectKh1Records, kh1Record, showKh1Overview, showKh1Notes } from './native-collection-helpers';
import { revealJournalNote } from './journal-note-reader';

test.use({ serviceWorkers: 'block' });
const data = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) as GameData;
const guides = [
  'kh1fm-guide-gummi-no-damage-builds', 'kh1fm-guide-gummi-small-build-missions',
  'kh1fm-guide-gummi-collection-missions', 'kh1fm-guide-gummi-weapon-restricted-missions',
];
const collections = [
  { path: 'parts', title: 'Parts', entries: data.entries.filter(e => ['gummi-part', 'gummi-tool'].includes(String(e.facts?.subtype))), count: 87, progress: '87 parts & tools · Reference only' },
  { path: 'missions', title: 'Missions', entries: data.entries.filter(e => e.facts?.subtype === 'gummi-mission' || guides.includes(e.id)), count: 34, progress: '0 / 30 missions completed · 4 strategy guides' },
  { path: 'blueprints', title: 'Blueprints', entries: data.entries.filter(e => e.facts?.subtype === 'blueprint'), count: 48, progress: '0 / 48 blueprints collected' },
] as const;
const heading = (page: Page) => page.getByRole('heading', { level: 1 });
const params = (page: Page) => new URLSearchParams(new URL(page.url()).hash.split('?')[1]);

for (const collection of collections) {
  test(`${collection.title}: exact inventory, headings and checkability across every index page`, async ({ page }) => {
    test.setTimeout(90_000);
    expect(collection.entries).toHaveLength(collection.count);
    await page.goto(`./#/kh1fm/gummi/${collection.path}`);
    await expect(heading(page)).toHaveText(`Gummi Ship · ${collection.title}`);
    await expect(page.locator('.kh1-collection-count')).toHaveText(collection.progress);
    const found: string[] = [];
    const labels = new Set<string>();
    await expectKh1Records(page, collection.entries.map(e => e.id), async () => {
      const records = page.locator('.kh1-index a[data-record-id]');
      for (const record of await records.all()) {
        const id = (await record.getAttribute('data-record-id'))!;
        found.push(id);
        const entry = collection.entries.find(e => e.id === id)!;
        await expect(record.locator('..').getByRole('checkbox')).toHaveCount(entry.checkable ? 1 : 0);
        await expect(record).toHaveAttribute('href', new RegExp(`^#/kh1fm/gummi/${collection.path}\\?`));
        if (collection.path !== 'blueprints') {
          const label = collection.path === 'parts'
            ? entry.facts?.subtype === 'gummi-tool' ? 'Tools' : String(entry.facts?.partClass)
            : entry.category === 'guide' ? 'Build & strategy guidance' : String(entry.facts?.destination || entry.world);
          labels.add(label);
          const group = record.locator('xpath=ancestor::section[1]');
          await expect(group).toHaveAttribute('data-world', label);
          await expect(group.locator('h2')).toHaveText(label);
          if (entry.facts?.subtype === 'gummi-mission') await expect(record).toHaveText(`Mission ${entry.facts.mission}`);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    });
    expect(found.slice().sort()).toEqual(collection.entries.map(e => e.id).sort());
    expect(new Set(found).size, 'No canonical record is duplicated across native index pages').toBe(found.length);
    if (collection.path === 'parts') {
      expect([...labels]).toEqual(['Cockpit', 'Engine', 'Armor', 'Wing', 'Special', 'Weapon', 'Design', 'Tools']);
      expect(collection.entries.filter(e => e.facts?.subtype === 'gummi-tool')).toHaveLength(7);
      await expect(page.getByRole('combobox', { name: 'Filter by collection status', exact: true })).toHaveCount(0);
    }
    if (collection.path === 'missions') expect(labels.size).toBe(11);
  });
}

test('Gummi Ship hub shows three distinct cards with reference and completion totals', async ({ page }) => {
  await page.goto('./#/kh1fm/gummi');
  await expect(heading(page)).toHaveText('Gummi Ship');
  await expect(page.locator('[data-gummi-page]')).toHaveCount(3);
  await expect(page.locator('[data-gummi-page="parts"]')).toContainText('87 references');
  await expect(page.locator('[data-gummi-page="missions"]')).toContainText('0 / 30');
  await expect(page.locator('[data-gummi-page="missions"]')).toContainText('+ 4 guides');
  await expect(page.locator('[data-gummi-page="blueprints"]')).toContainText('0 / 48');
  await expect(page.locator('.kh1-index [data-record-id]')).toHaveCount(0);
  for (const collection of collections) {
    await page.locator(`[data-gummi-page="${collection.path}"]`).click();
    await expect(heading(page)).toHaveText(`Gummi Ship · ${collection.title}`);
    await page.getByRole('link', { name: '‹ Back', exact: true }).click();
    await expect(heading(page)).toHaveText('Gummi Ship');
  }
});

for (const collection of collections.slice(1)) {
  test(`${collection.title}: legacy entry IDs retain saved checks and update hub progress`, async ({ page }) => {
    const entry = collection.entries.find(e => e.checkable)!;
    await page.goto(`./#/kh1fm/gummi?entry=${entry.id}`);
    await expect(page).toHaveURL(new RegExp(`/gummi/${collection.path}\\?`));
    await showKh1Overview(page);
    await page.getByRole('checkbox', { name: 'Acquired', exact: true }).check();
    await expect(page.locator('.journal-footer-save')).toHaveAttribute('title', /updated\.$/);
    await page.reload();
    await showKh1Overview(page);
    await expect(page.getByRole('checkbox', { name: 'Acquired', exact: true })).toBeChecked();
    await page.getByRole('link', { name: '‹ Return to index', exact: true }).click();
    await page.getByRole('combobox', { name: 'Filter by collection status', exact: true }).selectOption('remaining');
    await expectKh1Records(page, collection.entries.filter(e => e.checkable && e.id !== entry.id).map(e => e.id));
    await page.goto('./#/kh1fm/gummi');
    await expect(page.locator(`[data-gummi-page="${collection.path}"]`)).toContainText(`1 / ${collection.path === 'missions' ? 30 : 48}`);
  });
}

test('legacy Gummi and combined Challenges links normalize every subgroup without stale pagination', async ({ page }) => {
  for (const collection of collections) for (const old of ['gummi', 'challenges']) {
    const entry = collection.entries[0];
    const query = new URLSearchParams({ entry: entry.id, world: entry.world || 'Traverse Town', fromWorld: 'Traverse Town', status: 'remaining', page: '99' });
    await page.goto(`./#/kh1fm/${old}?${query}`);
    await expect(page).toHaveURL(new RegExp(`/gummi/${collection.path}\\?`));
    for (const key of ['entry', 'world', 'fromWorld', 'status']) expect(params(page).get(key)).toBe(query.get(key));
    expect(params(page).has('page')).toBe(false);
  }
});

test('world categories enter the scoped hub and return through the subgroup to the world', async ({ page }) => {
  const world = 'Traverse Town';
  await page.goto(`./#/kh1fm/worlds/${encodeURIComponent(world)}`);
  await expect(heading(page)).toHaveText(world);
  await expect(page.locator('.kh1-world-categories > a').first()).toBeVisible();
  await page.evaluate(async () => { await document.fonts.ready; await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))); });
  const link = page.locator('[data-world-category="gummi"]');
  while (!await link.count()) {
    const next = page.getByRole('link', { name: 'Next index page', exact: true });
    await expect(next).toBeVisible();
    const before = await page.locator('.kh1-world-categories > a').first().getAttribute('href');
    await next.click();
    await expect(page.locator('.kh1-world-categories > a').first()).not.toHaveAttribute('href', before!);
  }
  await link.click();
  await expect(heading(page)).toHaveText('Gummi Ship');
  await page.locator('[data-gummi-page="missions"]').click();
  await expect(page.getByRole('combobox', { name: 'Filter by world', exact: true })).toHaveValue(world);
  await expectKh1Records(page, collections[1].entries.filter(e => e.world === world).map(e => e.id));
  await page.getByRole('link', { name: '‹ Back', exact: true }).click();
  await expect(heading(page)).toHaveText('Gummi Ship');
  await page.getByRole('link', { name: '‹ Back', exact: true }).click();
  await expect(heading(page)).toHaveText(world);
});

test('search and related entries link directly to canonical Gummi subpages', async ({ page }) => {
  for (const collection of collections) {
    const entry = collection.entries[0];
    await page.goto(`./#/kh1fm/search?q=${encodeURIComponent(entry.name)}`);
    await expect(kh1Record(page, entry.id)).toHaveAttribute('href', new RegExp(`^#/kh1fm/gummi/${collection.path}\\?`));
    await kh1Record(page, entry.id).click();
    await expect(page).toHaveURL(new RegExp(`/gummi/${collection.path}\\?`));
    expect(params(page).get('entry')).toBe(entry.id);
  }
  const target = data.entries.find(e => e.facts?.subtype === 'gummi-mission' && data.entries.some(source => source.relatedIds.includes(e.id)))!;
  const source = data.entries.find(e => e.relatedIds.includes(target.id))!;
  await page.goto(`./#/kh1fm/gummi/parts?entry=${source.id}`);
  await showKh1Notes(page);
  const related = page.locator(`.entry-details-related a[href*="entry=${target.id}"]`);
  await expect(related).toHaveAttribute('href', new RegExp('^#/kh1fm/gummi/missions\\?'));
  await revealJournalNote(page, related);
  await related.click();
  await expect(page).toHaveURL(/\/gummi\/missions\?/);
  expect(params(page).get('entry')).toBe(target.id);
});

test('subpage detail return preserves the selected native index page', async ({ page }) => {
  for (const collection of collections) {
    await page.goto(`./#/kh1fm/gummi/${collection.path}`);
    await page.getByRole('link', { name: 'Next index page', exact: true }).click();
    const first = page.locator('.kh1-index a[data-record-id]').first();
    await expect(first).toBeVisible();
    await page.evaluate(async () => { await document.fonts.ready; await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))); });
    const id = (await first.getAttribute('data-record-id'))!;
    const indexHash = new URL(page.url()).hash;
    await first.click();
    await expect(page.locator('.kh1-entry-spread')).toBeVisible();
    const overview = page.getByRole('button', { name: 'Overview', exact: true });
    if (await overview.isVisible()) await overview.click();
    await page.getByRole('link', { name: '‹ Return to index', exact: true }).click();
    await expect.poll(() => new URL(page.url()).hash).toBe(indexHash);
    await expect(kh1Record(page, id)).toBeVisible();
    await page.getByRole('link', { name: '‹ Back', exact: true }).click();
    await expect(heading(page)).toHaveText('Gummi Ship');
    expect(params(page).has('page')).toBe(false);
  }
});

test('Gummi pages retain readable first-page geometry', async ({ page }) => {
  for (const path of ['', '/parts', '/missions']) {
    await page.goto(`./#/kh1fm/gummi${path}`);
    await expect(page.locator('.kh1-index a').first()).toBeVisible();
    await page.evaluate(async () => { await document.fonts.ready; await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))); });
    await page.screenshot({ path: test.info().outputPath(`gummi-${path.slice(1) || 'hub'}.png`) });
    const bounds = await page.locator('.kh1-index').evaluate(index => {
      const box = index.getBoundingClientRect();
      return [...index.querySelectorAll('a')].map(node => {
        const r = node.getBoundingClientRect();
        return { left: r.left - box.left, top: r.top - box.top, right: r.right - box.right, bottom: r.bottom - box.bottom };
      });
    });
    for (const row of bounds) {
      expect(row.left).toBeGreaterThanOrEqual(-1);
      expect(row.top).toBeGreaterThanOrEqual(-1);
      expect(row.right).toBeLessThanOrEqual(1);
      expect(row.bottom).toBeLessThanOrEqual(1);
    }
  }
});


test('legacy remaining status never hides reference-only Parts after returning from details', async ({ page }) => {
  const entry = collections[0].entries[0];
  await page.goto(`./#/kh1fm/gummi?entry=${entry.id}&status=remaining`);
  await expect(page).toHaveURL(/\/gummi\/parts\?/);
  await showKh1Overview(page);
  await page.getByRole('link', { name: '‹ Return to index', exact: true }).click();
  expect(params(page).get('status')).toBe('remaining');
  await expectKh1Records(page, collections[0].entries.map(e => e.id));
});
