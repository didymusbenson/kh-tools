import { test, expect, type Page, type Locator } from '@playwright/test';
import { readFileSync } from 'node:fs';
import kh2Guide from '../../src/games/kh2fm';
const bbsGuide = JSON.parse(readFileSync('src/games/bbsfm/content.json', 'utf8'));
const dddGuide = JSON.parse(readFileSync('src/games/dddhd/content.json', 'utf8'));
const kh3Guide = JSON.parse(readFileSync('src/games/kh3/content.json', 'utf8'));

type Material = { id: string; name: string; source: string; rate: string };
type SourceTab = 'Enemy drops' | 'Other sources';
type PlanCase = { game: string; route: string; world: string; materials: Material[]; sourceTab?: SourceTab };

// These are real catalog records, deliberately chosen to share a destination.
// The two store formats are the application's existing formats, not test-only APIs.
const plans: PlanCase[] = [
  { game: 'kh1fm', route: 'kh1fm/synthesis/plan', world: 'Wonderland', materials: [
    { id: 'kh1fm-material-blaze-shard', name: 'Blaze Shard', source: 'Red Nocturne', rate: '6%' },
    { id: 'kh1fm-material-frost-shard', name: 'Frost Shard', source: 'Blue Rhapsody', rate: '12%' },
  ] },
  { game: 'kh2fm', route: 'kh2fm/workshop/plan', world: 'Timeless River', materials: [
    { id: 'kh2fm.materials.dark-shard', name: 'Dark Shard', source: 'Shadow', rate: '4%' },
    { id: 'kh2fm.materials.bright-shard', name: 'Bright Shard', source: 'Soldier', rate: '4%' },
  ] },
  { game: 'bbsfm', route: 'bbsfm/plan?character=Terra', world: 'Mirage Arena', sourceTab: 'Other sources', materials: [
    { id: 'bbsfm:terra:material:fleeting-crystal', name: 'Fleeting Crystal', source: 'Medal shop', rate: 'Conditional' },
    { id: 'bbsfm:terra:material:shimmering-crystal', name: 'Shimmering Crystal', source: 'Medal shop', rate: 'Conditional' },
  ] },
  { game: 'dddhd', route: 'dddhd/workshop/plan', world: 'Symphony of Sorcery', sourceTab: 'Other sources', materials: [
    { id: 'dddhd:materials:brilliant-fantasy', name: 'Brilliant Fantasy', source: 'Riku Special Portal 6', rate: '100%' },
    { id: 'dddhd:materials:wild-fantasy', name: 'Wild Fantasy', source: 'Sora Special Portal 6', rate: '100%' },
  ] },
  { game: 'kh3', route: 'kh3/workshop/plan', world: 'The Caribbean', materials: [
    { id: 'kh3.material.lucid-crystal', name: 'Lucid Crystal', source: 'Anchor Raider', rate: '8%' },
    { id: 'kh3.material.wellspring-crystal', name: 'Wellspring Crystal', source: 'Anchor Raider', rate: '8%' },
  ] },
];

async function seed(page: Page, plan: PlanCase, targets?: Record<string, number>, owned: Record<string, number> = {}, checks: Record<string, boolean> = {}) {
  await page.goto('./');
  await page.evaluate(async ({ game, route, targets, owned, checks }) => {
    const request = indexedDB.open(game === 'kh1fm' ? 'ars-arcanum-player' : 'ars-arcanum-guides', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('profiles');
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const transaction = db.transaction('profiles', 'readwrite');
    const profile = game === 'kh1fm' ? {
      revision: 1,
      state: { schemaVersion: 1, game, checks, inventoryEnabled: true, inventory: owned,
        plan: {}, farmPlan: targets, planMode: 'selected', lastRoute: `#/${route}`, updatedAt: new Date().toISOString() },
    } : { version: 1, game, checks, owned, targets, route };
    transaction.objectStore('profiles').put(profile, game === 'kh1fm' ? 'kh1fm-current' : game);
    await new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    db.close();
  }, { game: plan.game, route: plan.route, targets: targets ?? Object.fromEntries(plan.materials.map(m => [m.id, 5])), owned, checks });
  await page.goto(`./#/${plan.route}`);
  await expect(page.locator('.farming-material-row').first()).toBeVisible();
  await expect(page.locator('.farming-material-row input').first()).toBeEnabled();
}

function materialRow(page: Page, material: Material) {
  return page.locator('.farming-material-row').filter({ has: page.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true }) });
}

async function panel(page: Page, name: 'Materials' | 'World route') {
  const button = page.getByRole('button', { name, exact: true });
  const link = page.locator('.ddd-leaf-picker, .guide-plan-switch').getByRole('link', { name, exact: true });
  if (await button.isVisible()) await button.click();
  else if (await link.isVisible()) await link.click();
  await expect(page.locator(name === 'Materials' ? '.farming-material-row' : '.farming-itinerary').first()).toBeVisible();
}

async function turnMaterialPage(page: Page, control: Locator) {
  const first = page.locator('.farming-material-row').first();
  const id = await first.getAttribute('data-material-id');
  await control.click();
  await expect(first).not.toHaveAttribute('data-material-id', id!);
}

async function revealMaterial(page: Page, material: Material) {
  await panel(page, 'Materials');
  const previous = page.getByRole('link', { name: /^(Previous index page|Previous page|Previous material page)$/ });
  while (await previous.isVisible() && await previous.isEnabled()) await turnMaterialPage(page, previous);
  for (let turn = 0; turn < 100; turn++) {
    const row = materialRow(page, material);
    if (await row.count()) {
      await expect(row).toBeVisible();
      return row;
    }
    const next = page.getByRole('link', { name: /^(Next index page|Next page|Next material page)$/ });
    await expect(next).toBeEnabled();
    await turnMaterialPage(page, next);
  }
  throw new Error(`Could not find planned ${material.name}`);
}

async function edit(input: Locator, value: string) {
  await input.fill(value);
  await input.press('Tab');
  // The field stays disabled until its asynchronous IndexedDB commit settles.
  // A successful zero-target save may remove the field altogether.
  await expect.poll(() => input.evaluateAll(nodes => nodes.length === 0 || !(nodes[0] as HTMLInputElement).disabled)).toBe(true);
}

async function savedStock(page: Page, game: string, id: string, field: 'owned' | 'targets' = 'owned') {
  return page.evaluate(async ({ game, id, field }) => {
    const open = indexedDB.open(game === 'kh1fm' ? 'ars-arcanum-player' : 'ars-arcanum-guides', 1);
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      open.onsuccess = () => resolve(open.result);
      open.onerror = () => reject(open.error);
    });
    const get = db.transaction('profiles').objectStore('profiles').get(game === 'kh1fm' ? 'kh1fm-current' : game);
    const result = await new Promise<any>((resolve, reject) => {
      get.onsuccess = () => resolve(get.result);
      get.onerror = () => reject(get.error);
    });
    db.close();
    return game === 'kh1fm' ? result.state[field === 'owned' ? 'inventory' : 'farmPlan'][id] : result[field][id];
  }, { game, id, field });
}

async function visibleSource(page: Page) {
  let index = -1;
  // Font/viewport and tab changes remeasure columns on the next animation frame.
  await expect.poll(async () => {
    index = await page.locator('.farming-itinerary').evaluate(route => {
      const window = route.querySelector('.kh1-note-window')!.getBoundingClientRect();
      return [...route.querySelectorAll<HTMLElement>('.farming-source-summary')].findIndex(button => {
        const box = button.getBoundingClientRect();
        return box.left >= window.left - 1 && box.right <= window.right + 1 && box.top >= window.top - 1 && box.bottom <= window.bottom + 1;
      });
    });
    return index;
  }).toBeGreaterThanOrEqual(0);
  return page.locator('.farming-source').nth(index);
}

async function selectSourceTab(page: Page, name: SourceTab) {
  const route = page.locator('.farming-itinerary');
  await route.getByRole('tab', { name, exact: true }).click();
  await expect(route.getByRole('tab', { name, exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(route.getByRole('tabpanel', { name, exact: true })).toBeVisible();
}

async function routeSnapshot(page: Page, sourceTab: SourceTab = 'Enemy drops') {
  await panel(page, 'World route');
  await selectSourceTab(page, sourceTab);
  const previous = page.getByRole('button', { name: 'Previous route page', exact: true });
  while (await previous.isVisible() && await previous.isEnabled()) await previous.click();
  const route = page.locator('.farming-itinerary');
  // All source records stay in the DOM while CSS columns turn one page at a time.
  const text = await route.innerText();
  const ids = await route.locator('.farming-source').evaluateAll(rows => rows.map(row => row.getAttribute('data-source-id')!));
  expect(ids.every(Boolean)).toBe(true);
  expect(new Set(ids).size).toBe(ids.length);
  const worlds = await route.locator('[data-world]').evaluateAll(groups => groups.map(group => group.getAttribute('data-world')));
  expect(new Set(worlds).size).toBe(worlds.length);
  const seen = new Set<string>();
  let pages = 0;
  while (true) {
    const visible = await route.evaluate(node => {
      const window = node.querySelector('.kh1-note-window')!.getBoundingClientRect();
      return [...node.querySelectorAll('.farming-source-summary')].filter(button => {
        const box = button.getBoundingClientRect();
        return box.left >= window.left - 1 && box.right <= window.right + 1 && box.top >= window.top - 1 && box.bottom <= window.bottom + 1;
      }).map(button => button.closest('.farming-source')!.getAttribute('data-source-id')!);
    });
    visible.forEach(id => seen.add(id));
    const next = page.getByRole('button', { name: 'Next route page', exact: true });
    if (!await next.isVisible() || !await next.isEnabled()) break;
    await next.click();
    expect(++pages).toBeLessThan(1000);
  }
  expect([...seen].sort()).toEqual([...ids].sort());
  // Leave the first source in view for disclosure and keyboard tests.
  while (await previous.isVisible() && await previous.isEnabled()) await previous.click();
  return { text, ids };
}

async function fixedBounds(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => page.evaluate(() => ({
    horizontal: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    vertical: Math.max(0, document.documentElement.scrollHeight - innerHeight),
    clippedRows: [...document.querySelectorAll('.farming-material-row:has(input)')].filter(row => {
      const box = row.getBoundingClientRect();
      const list = row.closest('nav')?.getBoundingClientRect();
      return box.width > 0 && (box.left < -1 || box.right > innerWidth + 1 || box.bottom > innerHeight + 1 || !!list && box.bottom > list.bottom + 1);
    }).length,
  }))).toEqual({ horizontal: 0, vertical: 0, clippedRows: 0 });
}

for (const plan of plans) {
  test(`${plan.game} shows editable material rows and the entire plan grouped by real destinations`, async ({ page }) => {
    await seed(page, plan);
    for (const material of plan.materials) {
      const row = await revealMaterial(page, material);
      await expect(row).toBeVisible();
      await expect(row).toHaveClass(/farming-material-row-compact/);
      await expect(row.locator('.farming-remaining')).toHaveCount(0);
      await expect(row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true })).toHaveValue('');
      await expect(row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true })).toHaveValue('5');
    }
    const route = await routeSnapshot(page, plan.sourceTab);
    expect(route.text.toLowerCase()).toContain(plan.world.toLowerCase());
    for (const material of plan.materials) {
      expect(route.text).toContain(material.name);
      expect(route.text).toContain(material.source);
      expect(route.text).toContain(material.rate);
      const sourcesAtWorld = page.locator('.farming-world').filter({ has: page.getByRole('heading', { name: plan.world, exact: true }) }).locator('.farming-source');
      expect(await sourcesAtWorld.evaluateAll((rows, material) => rows.some(row => row.getAttribute('data-material-id') === material.id && row.textContent?.includes(material.source) && row.textContent?.includes(material.rate)), material)).toBe(true);
    }
    expect(route.ids.length).toBeGreaterThanOrEqual(plan.materials.length);
    // Source toggles are local disclosures, never navigation to a selected-material detail screen.
    const source = await visibleSource(page), summary = source.locator('.farming-source-summary');
    const url = page.url();
    await summary.click();
    await expect(source.locator('.farming-source-summary')).toHaveAttribute('aria-expanded', 'true');
    expect(page.url()).toBe(url);
    await expect(source.getByRole('button')).toHaveCount(1);
    await expect(source.locator('.farming-source-notes')).toHaveCount(1);
    await summary.click();
    await expect(source.locator('.farming-source-summary')).toHaveAttribute('aria-expanded', 'false');
    await expect(summary).toBeFocused();
  });
}

for (const plan of plans) {
  test(`${plan.game} preserves unknown, surplus and zero stock while updating the route`, async ({ page }) => {
    await seed(page, plan);
    const material = plan.materials[0], row = await revealMaterial(page, material);
    const owned = row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true });
    const target = row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true });
    await expect(row.locator('.farming-remaining')).toHaveCount(0);
    await edit(owned, '2');
    await expect(row.locator('.farming-remaining')).toHaveCount(0);
    expect((await routeSnapshot(page, plan.sourceTab)).text).toContain(material.name);
    await panel(page, 'Materials');
    await edit(owned, '8');
    await expect(row.locator('.farming-remaining')).toHaveCount(0);
    await expect(target).toHaveValue('5');
    const met = await routeSnapshot(page, plan.sourceTab);
    expect(met.text).not.toContain(material.name);
    expect(met.text).toContain('already met');
    await panel(page, 'Materials');
    await edit(owned, '0');
    expect((await routeSnapshot(page, plan.sourceTab)).text).toContain(material.name);
    await panel(page, 'Materials');
    await expect(row.locator('.farming-remaining')).toHaveCount(0);
    await page.reload();
    await expect(owned).toHaveValue('0');
    await edit(owned, '');
    const unknown = await routeSnapshot(page, plan.sourceTab);
    expect(unknown.text).toContain(material.name);
    expect(unknown.text).toContain('unknown stock');
    await panel(page, 'Materials');
    await expect(row.locator('.farming-remaining')).toHaveCount(0);
    await edit(owned, '3');
    await edit(target, '0');
    await expect(row).toHaveCount(0);
    expect((await routeSnapshot(page, plan.sourceTab)).text).not.toContain(material.name);
    await page.reload();
    await panel(page, 'Materials');
    await expect(row).toHaveCount(0);
    expect(await savedStock(page, plan.game, material.id)).toBe(3);
  });
}

for (const plan of plans) {
 test(`${plan.game} invalid quantities remain drafts, and explicit removal preserves the owned inventory`, async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 664 });
  const material = [...plan.materials].sort((a, b) => a.name.localeCompare(b.name)).at(-1)!;
  await seed(page, plan, undefined, { [material.id]: 3 });
  const row = await revealMaterial(page, material), target = row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true });
  for (const invalid of ['-1', '1.5', '1000000']) {
    await edit(target, invalid);
    await expect(target).toHaveAttribute('aria-invalid', 'true');
    await expect(row.getByRole('alert')).toContainText('whole number');
    await expect(row.locator('.farming-remaining')).toHaveCount(0);
    expect(await savedStock(page, plan.game, material.id, 'targets')).toBe(5);
    expect((await routeSnapshot(page, plan.sourceTab)).text).toContain(material.name);
    await panel(page, 'Materials');
    if (plan.game !== 'kh3') await fixedBounds(page);
  }
  await page.reload();
  await expect(target).toHaveValue('5');
  await row.getByRole('button', { name: `Remove ${material.name} from farming plan`, exact: true }).click();
  await expect(row).toHaveCount(0);
  await expect(page.locator('.farming-material-row input').first()).toBeFocused();
  expect(await savedStock(page, plan.game, material.id)).toBe(3);
  await page.reload();
  await expect(row).toHaveCount(0);
 });
}

test('long source details keep citations and page back to the name for keyboard collapse', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, plans[0]);
  await panel(page, 'World route');
  const source = await visibleSource(page), summary = source.locator('.farming-source-summary');
  const url = page.url();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(summary).toHaveAttribute('aria-expanded', 'true');
  await expect(source.getByRole('button')).toHaveCount(1);
  const citation = source.locator('.farming-citations a').last();
  await expect(citation).toHaveAttribute('href', /^https?:/);
  let turns = 0;
  while (!await citation.evaluate(button => {
    const box = button.getBoundingClientRect(), window = button.closest('.kh1-note-window')!.getBoundingClientRect();
    return box.left >= window.left - 1 && box.right <= window.right + 1 && box.top >= window.top - 1 && box.bottom <= window.bottom + 1;
  })) {
    await page.getByRole('button', { name: 'Next route page', exact: true }).click();
    expect(++turns).toBeLessThan(30);
  }
  expect(turns).toBeGreaterThan(0);
  await expect(citation).toBeVisible();
  const previous = page.getByRole('button', { name: 'Previous route page', exact: true });
  while (await previous.isEnabled()) await previous.click();
  await summary.focus();
  await page.keyboard.press('Space');
  await expect(summary).toHaveAttribute('aria-expanded', 'false');
  await expect(summary).toBeFocused();
  expect(page.url()).toBe(url);
  await visibleSource(page);
  await page.keyboard.press('Space');
  await expect(summary).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Enter');
  await expect(summary).toHaveAttribute('aria-expanded', 'false');
  await expect(summary).toBeFocused();
  await expect(source.locator('.farming-source-notes')).toHaveCount(0);
});

test('search narrows material rows while the world route explicitly retains the full plan', async ({ page }) => {
  const plan = plans[1];
  await seed(page, plan);
  const search = page.getByRole('searchbox').first();
  await search.fill('Dark Shard');
  await search.press('Enter');
  await expect(materialRow(page, plan.materials[0])).toBeVisible();
  await expect(materialRow(page, plan.materials[1])).toHaveCount(0);
  const route = await routeSnapshot(page);
  expect(route.text).toContain('Dark Shard');
  expect(route.text).toContain('Bright Shard');
  expect(route.text).toMatch(/full plan|all planned|entire plan/i);
  await page.goBack();
  await panel(page, 'Materials');
  await expect(materialRow(page, plan.materials[1])).toBeVisible();
  await page.goForward();
  await expect(materialRow(page, plan.materials[1])).toHaveCount(0);
});

test('BBS keeps character targets and owned counts separate across switching and reload', async ({ page }) => {
  const plan = plans[2], material = plan.materials[0], aqua = material.id.replace(':terra:', ':aqua:');
  await seed(page, plan, { [material.id]: 5, [aqua]: 9 }, { [material.id]: 2, [aqua]: 7 });
  let row = materialRow(page, material);
  await expect(row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true })).toHaveValue('5');
  await page.getByRole('button', { name: 'Aqua', exact: true }).click();
  row = materialRow(page, material);
  await expect(row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true })).toHaveValue('9');
  await expect(row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true })).toHaveValue('7');
  await edit(row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true }), '11');
  await expect.poll(() => savedStock(page, plan.game, aqua, 'targets')).toBe(11);
  await page.reload();
  await expect(row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true })).toHaveValue('11');
  await page.getByRole('button', { name: 'Terra', exact: true }).click();
  await expect(row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true })).toHaveValue('5');
  await expect(row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true })).toHaveValue('2');
});

test('DDD filters character-specific sources without losing shared Dream Piece targets', async ({ page }) => {
  const plan = plans[3];
  await seed(page, plan);
  await page.getByRole('button', {name:'Tools',exact:true}).click();
  await page.getByRole('combobox', { name: 'Filter by character', exact: true }).selectOption('Riku');
  await page.keyboard.press('Escape');
  const riku = await routeSnapshot(page, 'Other sources');
  expect(riku.text).toContain('Riku Special Portal');
  expect(riku.text).not.toContain('Sora Special Portal');
  await panel(page, 'Materials');
  await revealMaterial(page, plan.materials[1]);
  await page.getByRole('button', {name:'Tools',exact:true}).click();
  await page.getByRole('combobox', { name: 'Filter by character', exact: true }).selectOption('Sora');
  await page.keyboard.press('Escape');
  const sora = await routeSnapshot(page, 'Other sources');
  expect(sora.text).toContain('Sora Special Portal');
  expect(sora.text).not.toContain('Riku Special Portal');
});

test('material edits synchronize across tabs without losing an unrelated target change', async ({ page, context }) => {
  const plan = plans[1], [first, second] = plan.materials;
  await seed(page, plan);
  const other = await context.newPage();
  await other.goto(`./#/${plan.route}`);
  await revealMaterial(page, first);
  await revealMaterial(other, first);
  await edit(materialRow(page, first).getByRole('spinbutton', { name: `Owned ${first.name}`, exact: true }), '2');
  await expect(materialRow(other, first).getByRole('spinbutton', { name: `Owned ${first.name}`, exact: true })).toHaveValue('2');
  await revealMaterial(other, second);
  await revealMaterial(page, second);
  await edit(materialRow(other, second).getByRole('spinbutton', { name: `Target ${second.name}`, exact: true }), '12');
  await expect(materialRow(page, second).getByRole('spinbutton', { name: `Target ${second.name}`, exact: true })).toHaveValue('12');
  await page.reload();
  await revealMaterial(page, first);
  await expect(materialRow(page, first).getByRole('spinbutton', { name: `Owned ${first.name}`, exact: true })).toHaveValue('2');
  await revealMaterial(page, second);
  await expect(materialRow(page, second).getByRole('spinbutton', { name: `Target ${second.name}`, exact: true })).toHaveValue('12');
  await other.close();
});

for (const plan of plans.filter(plan => ['kh1fm', 'kh2fm'].includes(plan.game))) {
 test(`${plan.game} failed storage writes do not claim success or remove the last saved target`, async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 664 });
  const material = [...plan.materials].sort((a, b) => a.name.localeCompare(b.name)).at(-1)!;
  await seed(page, plan);
  await revealMaterial(page, material);
  await page.evaluate(() => {
    const original = IDBObjectStore.prototype.put;
    (window as any).restoreFarmingWrites = () => { IDBObjectStore.prototype.put = original; };
    IDBObjectStore.prototype.put = function () { throw new DOMException('Simulated full storage', 'QuotaExceededError'); };
  });
  const input = materialRow(page, material).getByRole('spinbutton', { name: `Target ${material.name}`, exact: true });
  await edit(input, '0');
  await expect(page.getByRole('alert').filter({ hasText: /save|storage/i }).first()).toBeVisible();
  await expect(materialRow(page, material)).toBeVisible();
  await page.evaluate(() => (window as any).restoreFarmingWrites());
  await page.reload();
  await expect(input).toHaveValue('5');
  await edit(input, '9');
  await expect.poll(() => savedStock(page, plan.game, material.id, 'targets')).toBe(9);
  await page.reload();
  await expect(input).toHaveValue('9');
 });
}

test('installed farming plan and source disclosures reopen with saved counts offline', async ({ page, context }) => {
  const plan = plans[1], material = plan.materials[0];
  await seed(page, plan, undefined, { [material.id]: 2 });
  await revealMaterial(page, material);
  await routeSnapshot(page);
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await context.setOffline(true);
  try {
    await page.reload();
    await expect(materialRow(page, material).getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true })).toHaveValue('2');
    const route = await routeSnapshot(page);
    expect(route.text).toContain('Dark Shard');
    const source = await visibleSource(page);
    await source.locator('.farming-source-summary').click();
    await expect(source.locator('.farming-source-summary')).toHaveAttribute('aria-expanded', 'true');
  } finally { await context.setOffline(false); }
});

test('dense plans and long source disclosures stay within 320px, phone and landscape leaves', async ({ page }) => {
  test.setTimeout(180_000);
  const plan = plans[0];
  const data = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8'));
  const targets = Object.fromEntries(data.entries.filter((e: { category: string }) => e.category === 'material').map((e: { id: string }) => [e.id, 5]));
  await seed(page, plan, targets);
  for (const size of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(size);
    await panel(page, 'Materials');
    await fixedBounds(page);
    await panel(page, 'World route');
    await fixedBounds(page);
    await routeSnapshot(page);
    const source = await visibleSource(page);
    await source.locator('.farming-source-summary').click();
    await fixedBounds(page);
    const nextNotes = page.getByRole('button', { name: 'Next route page', exact: true });
    let count = 0;
    while (await nextNotes.isVisible() && await nextNotes.isEnabled()) {
      await nextNotes.click();
      expect(++count).toBeLessThan(1000);
      await fixedBounds(page);
    }
    await page.screenshot({ path: `test-results/${test.info().project.name}-farming-${size.width}x${size.height}.png` });
    const previous = page.getByRole('button', { name: 'Previous route page', exact: true });
    while (await previous.isEnabled()) await previous.click();
    await source.locator('.farming-source-summary').click();
  }
});

for (const plan of plans.filter(plan => plan.game !== 'kh3')) {
  test(`${plan.game} native plan leaves fit compact phone and landscape sizes`, async ({ page }) => {
    await seed(page, plan);
    for (const size of [{ width: 320, height: 568 }, { width: 390, height: 664 }, { width: 390, height: 844 }, { width: 844, height: 390 }]) {
      await page.setViewportSize(size);
      await panel(page, 'Materials');
      await fixedBounds(page);
      await panel(page, 'World route');
      await selectSourceTab(page, plan.sourceTab ?? 'Enemy drops');
      await fixedBounds(page);
      expect((await page.locator('.farming-itinerary .kh1-note-window').boundingBox())!.height).toBeGreaterThan(50);
      await visibleSource(page);
    }
  });
}

for (const original of plans) for (const size of [{ width: 1280, height: 800 }, { width: 320, height: 568 }, { width: 390, height: 844 }]) {
  test(`${original.game} compact farming rows keep name, Owned, Target and remove on one line at ${size.width}px`, async ({ page }) => {
    await page.setViewportSize(size);
    const data = original.game === 'kh1fm' ? JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) : ({ kh2fm: kh2Guide, bbsfm: bbsGuide, dddhd: dddGuide, kh3: kh3Guide } as const)[original.game as 'kh2fm' | 'bbsfm' | 'dddhd' | 'kh3'];
    const longest: Material[] = data.entries
      .filter((entry: { category: string; character?: string }) => ['material', 'materials'].includes(entry.category) && (original.game !== 'bbsfm' || entry.character === 'Terra'))
      .sort((a: Material, b: Material) => b.name.length - a.name.length || a.name.localeCompare(b.name))
      .slice(0, 3);
    const plan = { ...original, materials: longest };
    expect(longest).toHaveLength(3);
    const quantity = plan.game === 'kh1fm' ? 9999 : 999999;
    const counts = Object.fromEntries(longest.map(material => [material.id, quantity]));
    await seed(page, plan, counts, counts);
    await page.evaluate(() => document.fonts.ready);
    for (const material of longest) {
      const row = await revealMaterial(page, material);
      const name = row.locator('strong').first();
      const owned = row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true });
      const target = row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true });
      const remove = row.getByRole('button', { name: `Remove ${material.name} from farming plan`, exact: true });
      await expect(name).toHaveText(material.name);
      await expect(name).toHaveAttribute('title', material.name);
      await expect(page.locator('.kh1-farming-columns, .farming-plan-columns')).toContainText('Owned');
      await expect(page.locator('.kh1-farming-columns, .farming-plan-columns')).toContainText('Target');
      await expect(owned).toHaveValue(String(quantity));
      await expect(target).toHaveValue(String(quantity));
      await expect(remove).toBeVisible();
      await expect(row.locator('.farming-remaining')).toHaveCount(0);
      await expect(row).not.toContainText(/Remaining|Stock met/);
      const boxes = await Promise.all([row.locator('.farming-material-heading'), owned, target, remove].map(control => control.boundingBox()));
      const rowBox = (await row.boundingBox())!;
      for (const box of boxes) {
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(rowBox.x - 1);
        expect(box!.x + box!.width).toBeLessThanOrEqual(rowBox.x + rowBox.width + 1);
        expect(box!.y).toBeGreaterThanOrEqual(rowBox.y - 1);
        expect(box!.y + box!.height).toBeLessThanOrEqual(rowBox.y + rowBox.height + 1);
      }
      // Visual left-to-right order and shared vertical band prohibit a stacked row.
      for (let index = 1; index < boxes.length; index++) {
        expect(boxes[index - 1]!.x + boxes[index - 1]!.width).toBeLessThanOrEqual(boxes[index]!.x + 1);
      }
      const bandTop = Math.max(...boxes.map(box => box!.y));
      const bandBottom = Math.min(...boxes.map(box => box!.y + box!.height));
      expect(bandBottom - bandTop).toBeGreaterThan(8);
      for (const box of boxes) {
        expect(Math.abs((box!.y + box!.height / 2) - (boxes[1]!.y + boxes[1]!.height / 2))).toBeLessThanOrEqual(1);
      }
      expect(boxes[3]!.width).toBeGreaterThanOrEqual(44);
      expect(boxes[3]!.height).toBeGreaterThanOrEqual(44);
      expect(await row.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
      for (const input of [owned, target]) {
        expect(await input.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
      }
      // DOM/tab order follows the visual order, with distinct material-specific names.
      await owned.focus();
      await page.keyboard.press('Tab');
      await expect(target).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(remove).toBeFocused();
      if (plan.game !== 'kh3') await fixedBounds(page);
      else expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    await page.screenshot({ path: test.info().outputPath(`${plan.game}-compact-farming-${size.width}.png`), fullPage: true });
  });
}

test('KH1 compact farming edits, remove and Undo preserve saved inventory and route state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const plan = plans[0], material = plan.materials[0];
  await seed(page, plan);
  const row = await revealMaterial(page, material);
  const owned = row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true });
  const target = row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true });
  await edit(owned, '9999');
  await edit(target, '9999');
  await page.reload();
  await revealMaterial(page, material);
  await expect(owned).toHaveValue('9999');
  await expect(target).toHaveValue('9999');
  expect((await routeSnapshot(page)).text).not.toContain(material.name);
  await panel(page, 'Materials');
  await row.getByRole('button', { name: `Remove ${material.name} from farming plan`, exact: true }).click();
  await expect(row).toHaveCount(0);
  await expect(page.locator('.farming-material-row input').first()).toBeFocused();
  expect(await savedStock(page, plan.game, material.id)).toBe(9999);
  // Presentation-only tab changes must not replace the removal in the Undo history.
  await routeSnapshot(page, 'Other sources');
  await routeSnapshot(page, 'Enemy drops');
  await page.getByRole('button', { name: 'Tools', exact: true }).click();
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await page.keyboard.press('Escape');
  await revealMaterial(page, material);
  await expect(owned).toHaveValue('9999');
  await expect(target).toHaveValue('9999');
  await page.reload();
  await revealMaterial(page, material);
  await expect(target).toHaveValue('9999');
  await edit(owned, '0');
  expect((await routeSnapshot(page)).text).toContain(material.name);
});

// Each game uses real catalog sources on both sides of the partition. A source's
// notes may mention another acquisition method; its summary determines this check.
const sourceTabPlans = plans.map(plan => {
  if (plan.game === 'dddhd') return { ...plan, materials: [
    { id: 'dddhd:materials:intrepid-figment', name: 'Intrepid Figment', source: 'Hebby Repp (Nightmare)', rate: '12%' },
    ...plan.materials,
  ] };
  if (plan.game === 'kh3') return { ...plan, materials: [
    { id: 'kh3.material.frost-shard', name: 'Frost Shard', source: 'Winterhorn', rate: '16%' },
    ...plan.materials,
  ] };
  return plan;
});
const categorySources: Record<string, { enemy: RegExp; other: RegExp }> = {
  kh1fm: { enemy: /· Red Nocturne/, other: /· Bambi gauge reward/ },
  kh2fm: { enemy: /· Shadow/, other: /· Chest/ },
  bbsfm: { enemy: /· Spiderchest/, other: /· Medal shop/ },
  dddhd: { enemy: /· Hebby Repp \(Nightmare\)/, other: /· Riku Special Portal 6/ },
  kh3: { enemy: /· Winterhorn/, other: /· Moogle Shop/ },
};
const savedCheckIds: Record<string, string> = {
  kh1fm: 'kh1fm-treasure-destiny-islands-cove-protect-chain-09',
  kh2fm: 'kh2fm.treasure.twilight-town.01',
  bbsfm: 'bbsfm:terra:land-of-departure:treasure:1',
  dddhd: 'dddhd:treasure:sora:traverse-town:001',
  kh3: 'kh3.base.olympus.chest.001',
};

async function savedProgress(page: Page, game: string) {
  return page.evaluate(async game => {
    const request = indexedDB.open(game === 'kh1fm' ? 'ars-arcanum-player' : 'ars-arcanum-guides', 1);
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const get = db.transaction('profiles').objectStore('profiles').get(game === 'kh1fm' ? 'kh1fm-current' : game);
    const profile = await new Promise<any>((resolve, reject) => {
      get.onsuccess = () => resolve(get.result);
      get.onerror = () => reject(get.error);
    });
    db.close();
    return game === 'kh1fm'
      ? { checks: profile.state.checks, owned: profile.state.inventory, targets: profile.state.farmPlan }
      : { checks: profile.checks, owned: profile.owned, targets: profile.targets };
  }, game);
}

async function expectSelectedSourceTab(page: Page, selected: SourceTab) {
  const route = page.locator('.farming-itinerary');
  const tabs = route.getByRole('tablist', { name: 'Farming source types', exact: true });
  await expect(tabs.getByRole('tab')).toHaveCount(2);
  await expect(tabs.getByRole('tab')).toHaveText(['Enemy drops', 'Other sources']);
  for (const name of ['Enemy drops', 'Other sources'] as const) {
    const tab = tabs.getByRole('tab', { name, exact: true });
    await expect(tab).toHaveAttribute('aria-selected', String(name === selected));
    await expect(tab).toHaveAttribute('tabindex', name === selected ? '0' : '-1');
  }
  const tab = tabs.getByRole('tab', { name: selected, exact: true });
  const selectedPanel = route.getByRole('tabpanel', { name: selected, exact: true });
  await expect(route.getByRole('tabpanel')).toHaveCount(1);
  await expect(selectedPanel).toBeVisible();
  await expect(selectedPanel).toHaveAttribute('id', (await tab.getAttribute('aria-controls'))!);
  await expect(selectedPanel).toHaveAttribute('aria-labelledby', (await tab.getAttribute('id'))!);
}

for (const plan of sourceTabPlans) {
  test(`${plan.game} source tabs partition real routes and preserve independent disclosures`, async ({ page }) => {
    await seed(page, plan, undefined, { [plan.materials[0].id]: 1 }, { [savedCheckIds[plan.game]]: true });
    await panel(page, 'World route');
    await expectSelectedSourceTab(page, 'Enemy drops');
    const before = await savedProgress(page, plan.game);
    const url = page.url();
    const snapshots = new Map<SourceTab, Awaited<ReturnType<typeof routeSnapshot>>>();
    const opened = new Map<SourceTab, string>();
    for (const [name, kind] of [['Enemy drops', 'enemy'], ['Other sources', 'other']] as const) {
      const snapshot = await routeSnapshot(page, name);
      snapshots.set(name, snapshot);
      expect(snapshot.ids.length).toBeGreaterThan(0);
      const route = page.getByRole('tabpanel', { name, exact: true });
      await expect(route.locator(`.farming-source:not([data-source-kind="${kind}"])`)).toHaveCount(0);
      expect(await route.locator('.farming-source-summary').filter({ hasText: categorySources[plan.game][kind] }).count()).toBeGreaterThan(0);
      await expect(route.locator('.farming-source-summary').filter({ hasText: categorySources[plan.game][kind === 'enemy' ? 'other' : 'enemy'] })).toHaveCount(0);
      const source = await visibleSource(page);
      opened.set(name, (await source.getAttribute('data-source-id'))!);
      const summary = source.locator('.farming-source-summary');
      await summary.click();
      await expect(summary).toHaveAttribute('aria-expanded', 'true');
      await expect(source.locator('.farming-source-notes')).toContainText('Source option for');
      expect(await source.locator('.farming-citations a[href^="https://"]').count()).toBeGreaterThan(0);
    }
    const enemyIds = snapshots.get('Enemy drops')!.ids;
    const otherIds = snapshots.get('Other sources')!.ids;
    expect(enemyIds.filter(id => otherIds.includes(id))).toEqual([]);
    for (const name of ['Enemy drops', 'Other sources', 'Enemy drops'] as const) {
      await selectSourceTab(page, name);
      await expectSelectedSourceTab(page, name);
      const source = page.locator(`.farming-source[data-source-id=${JSON.stringify(opened.get(name))}]`);
      await expect(source.locator('.farming-source-summary')).toHaveAttribute('aria-expanded', 'true');
      await expect(source.locator('.farming-source-notes')).toContainText('Source option for');
      await expect(page.getByRole('button', { name: 'Previous route page', exact: true })).toBeDisabled();
    }
    expect(page.url()).toBe(url);
    expect(await savedProgress(page, plan.game)).toEqual(before);
  });

  test(`${plan.game} both source tabs recompute remaining targets without changing saved checks`, async ({ page }) => {
    const material = plan.materials[0];
    const checks = { [savedCheckIds[plan.game]]: true };
    await seed(page, plan, undefined, { [material.id]: 2 }, checks);
    const row = await revealMaterial(page, material);
    const owned = row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true });
    const target = row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true });
    for (const name of ['Enemy drops', 'Other sources'] as const) {
      await routeSnapshot(page, name);
      expect(await page.locator(`.farming-source[data-material-id="${material.id}"]`).count()).toBeGreaterThan(0);
    }
    await revealMaterial(page, material);
    await edit(owned, '5');
    for (const name of ['Enemy drops', 'Other sources'] as const) {
      await routeSnapshot(page, name);
      await expect(page.locator(`.farming-source[data-material-id="${material.id}"]`)).toHaveCount(0);
      await expect(page.getByRole('tabpanel', { name, exact: true })).toContainText('already met');
    }
    await revealMaterial(page, material);
    await edit(target, '6');
    for (const name of ['Enemy drops', 'Other sources'] as const) {
      await routeSnapshot(page, name);
      expect(await page.locator(`.farming-source[data-material-id="${material.id}"]`).count()).toBeGreaterThan(0);
    }
    await page.reload();
    await revealMaterial(page, material);
    await expect(owned).toHaveValue('5');
    await expect(target).toHaveValue('6');
    expect((await savedProgress(page, plan.game)).checks).toEqual(checks);
  });
}

for (const plan of sourceTabPlans) test(`${plan.game} source tabs automatically activate with arrows, Home and End and reset route paging`, async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, plan);
  await panel(page, 'World route');
  const route = page.locator('.farming-itinerary');
  await route.getByRole('tab', { name: 'Enemy drops', exact: true }).focus();
  for (const [key, name] of [
    ['ArrowRight', 'Other sources'], ['ArrowRight', 'Enemy drops'],
    ['ArrowLeft', 'Other sources'], ['Home', 'Enemy drops'], ['End', 'Other sources'],
  ] as const) {
    await page.keyboard.press(key);
    await expectSelectedSourceTab(page, name);
    await expect(route.getByRole('tab', { name, exact: true })).toBeFocused();
  }
  for (const name of ['Other sources', 'Enemy drops'] as const) {
    await selectSourceTab(page, name);
    const source = await visibleSource(page);
    const summary = source.locator('.farming-source-summary');
    await summary.click();
    await expect(summary).toHaveAttribute('aria-expanded', 'true');
    const next = page.getByRole('button', { name: 'Next route page', exact: true });
    if (await next.isEnabled()) {
      await next.click();
      await expect(page.getByRole('button', { name: 'Previous route page', exact: true })).toBeEnabled();
    }
    await selectSourceTab(page, name === 'Enemy drops' ? 'Other sources' : 'Enemy drops');
    await expect(page.getByRole('button', { name: 'Previous route page', exact: true })).toBeDisabled();
    await selectSourceTab(page, name);
    await expect(page.getByRole('button', { name: 'Previous route page', exact: true })).toBeDisabled();
    await expect(summary).toHaveAttribute('aria-expanded', 'true');
    await summary.focus();
    await page.keyboard.press('Space');
    await expect(summary).toHaveAttribute('aria-expanded', 'false');
    await expect(summary).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(summary).toHaveAttribute('aria-expanded', 'true');
  }
});

test('portal-only materials explain an empty Enemy tab and retain Other sources', async ({ page }) => {
  await seed(page, plans[3]);
  await panel(page, 'World route');
  await expectSelectedSourceTab(page, 'Enemy drops');
  await expect(page.getByRole('tabpanel', { name: 'Enemy drops', exact: true }).locator('.farming-empty')).toContainText('No enemy drops');
  await expect(page.locator('.farming-source')).toHaveCount(0);
  const other = await routeSnapshot(page, 'Other sources');
  expect(other.text).toContain('Riku Special Portal 6');
  expect(other.text).toContain('Sora Special Portal 6');
  await selectSourceTab(page, 'Enemy drops');
  await expect(page.locator('.farming-source')).toHaveCount(0);
  expect(await savedStock(page, plans[3].game, plans[3].materials[0].id, 'targets')).toBe(5);
});

test('enemy-only materials explain an empty Other tab without hiding the enemy route', async ({ page }) => {
  const plan = { ...plans[0], materials: [{ id: 'kh1fm-material-bright-crystal', name: 'Bright Crystal', source: 'Defender', rate: '2%' }] };
  await seed(page, plan);
  expect((await routeSnapshot(page)).text).toContain('Defender');
  await selectSourceTab(page, 'Other sources');
  await expect(page.getByRole('tabpanel', { name: 'Other sources', exact: true }).locator('.farming-empty')).toContainText('No other sources');
  await expect(page.locator('.farming-source')).toHaveCount(0);
  await selectSourceTab(page, 'Enemy drops');
  await expect(page.locator('.farming-source-summary')).toContainText(['Defender', 'Defender']);
});

for (const plan of sourceTabPlans) {
  test(`${plan.game} source tabs and both route panels fit narrow and landscape leaves`, async ({ page }) => {
    await seed(page, plan);
    for (const size of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }, { width: 640, height: 360 }]) {
      await page.setViewportSize(size);
      await panel(page, 'World route');
      for (const name of ['Enemy drops', 'Other sources'] as const) {
        await selectSourceTab(page, name);
        await expectSelectedSourceTab(page, name);
        await page.evaluate(() => document.fonts.ready);
        const tabs = page.getByRole('tablist', { name: 'Farming source types', exact: true });
        for (const tab of await tabs.getByRole('tab').all()) {
          const box = (await tab.boundingBox())!;
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.y).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(size.width + 1);
          expect(box.y + box.height).toBeLessThanOrEqual(size.height + 1);
        }
        expect((await page.locator('.farming-itinerary .kh1-note-window').boundingBox())!.height).toBeGreaterThan(50);
        await visibleSource(page);
        if (plan.game !== 'kh3') await fixedBounds(page);
        else expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  });
}
