import { test, expect, type Page, type Locator } from '@playwright/test';
import { readFileSync } from 'node:fs';

type Material = { id: string; name: string; source: string; rate: string };
type PlanCase = { game: string; route: string; world: string; materials: Material[] };

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
  { game: 'bbsfm', route: 'bbsfm/plan?character=Terra', world: 'Mirage Arena', materials: [
    { id: 'bbsfm:terra:material:fleeting-crystal', name: 'Fleeting Crystal', source: 'Medal shop', rate: 'Conditional' },
    { id: 'bbsfm:terra:material:shimmering-crystal', name: 'Shimmering Crystal', source: 'Medal shop', rate: 'Conditional' },
  ] },
  { game: 'dddhd', route: 'dddhd/workshop/plan', world: 'Symphony of Sorcery', materials: [
    { id: 'dddhd:materials:brilliant-fantasy', name: 'Brilliant Fantasy', source: 'Riku Special Portal 6', rate: '100%' },
    { id: 'dddhd:materials:wild-fantasy', name: 'Wild Fantasy', source: 'Sora Special Portal 6', rate: '100%' },
  ] },
  { game: 'kh3', route: 'kh3/workshop/plan', world: 'The Caribbean', materials: [
    { id: 'kh3.material.lucid-crystal', name: 'Lucid Crystal', source: 'Anchor Raider', rate: '8%' },
    { id: 'kh3.material.wellspring-crystal', name: 'Wellspring Crystal', source: 'Anchor Raider', rate: '8%' },
  ] },
];

async function seed(page: Page, plan: PlanCase, targets?: Record<string, number>, owned: Record<string, number> = {}) {
  await page.goto('./');
  await page.evaluate(async ({ game, route, targets, owned }) => {
    const request = indexedDB.open(game === 'kh1fm' ? 'ars-arcanum-player' : 'ars-arcanum-guides', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('profiles');
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const transaction = db.transaction('profiles', 'readwrite');
    const profile = game === 'kh1fm' ? {
      revision: 1,
      state: { schemaVersion: 1, game, checks: {}, inventoryEnabled: true, inventory: owned,
        plan: {}, farmPlan: targets, planMode: 'selected', lastRoute: `#/${route}`, updatedAt: new Date().toISOString() },
    } : { version: 1, game, checks: {}, owned, targets, route };
    transaction.objectStore('profiles').put(profile, game === 'kh1fm' ? 'kh1fm-current' : game);
    await new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    db.close();
  }, { game: plan.game, route: plan.route, targets: targets ?? Object.fromEntries(plan.materials.map(m => [m.id, 5])), owned });
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
}

async function savedStock(page: Page, game: string, id: string) {
  return page.evaluate(async ({ game, id }) => {
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
    return game === 'kh1fm' ? result.state.inventory[id] : result.owned[id];
  }, { game, id });
}

async function visibleSource(page: Page) {
  const index = await page.locator('.farming-itinerary').evaluate(route => {
    const window = route.querySelector('.kh1-note-window')!.getBoundingClientRect();
    return [...route.querySelectorAll<HTMLElement>('.farming-source-summary')].findIndex(button => {
      const box = button.getBoundingClientRect();
      return box.left >= window.left - 1 && box.right <= window.right + 1 && box.top >= window.top - 1 && box.bottom <= window.bottom + 1;
    });
  });
  expect(index).toBeGreaterThanOrEqual(0);
  return page.locator('.farming-source').nth(index);
}

async function routeSnapshot(page: Page) {
  await panel(page, 'World route');
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
      await expect(row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true })).toHaveValue('');
      await expect(row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true })).toHaveValue('5');
    }
    const route = await routeSnapshot(page);
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
    await summary.click();
    await expect(source.locator('.farming-source-summary')).toHaveAttribute('aria-expanded', 'false');
    await expect(summary).toBeFocused();
  });
}

for (const plan of plans.filter(p => ['kh1fm', 'kh2fm'].includes(p.game))) {
  test(`${plan.game} preserves unknown, surplus and zero stock while updating the route`, async ({ page }) => {
    await seed(page, plan);
    const material = plan.materials[0], row = await revealMaterial(page, material);
    const owned = row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true });
    const target = row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true });
    await expect(row.locator('.farming-remaining strong')).toHaveText('?');
    await edit(owned, '2');
    await expect(row.locator('.farming-remaining strong')).toHaveText('3');
    expect((await routeSnapshot(page)).text).toContain(material.name);
    await panel(page, 'Materials');
    await edit(owned, '8');
    await expect(row.locator('.farming-remaining strong')).toHaveText('0');
    await expect(target).toHaveValue('5');
    const met = await routeSnapshot(page);
    expect(met.text).not.toContain(material.name);
    expect(met.text).toContain('already met');
    await panel(page, 'Materials');
    await edit(owned, '0');
    await expect(row.locator('.farming-remaining strong')).toHaveText('5');
    await page.reload();
    await expect(owned).toHaveValue('0');
    await edit(owned, '');
    await expect(row.locator('.farming-remaining strong')).toHaveText('?');
    await edit(owned, '3');
    await edit(target, '0');
    await expect(row).toHaveCount(0);
    expect((await routeSnapshot(page)).text).not.toContain(material.name);
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
    await expect(row.locator('.farming-remaining strong')).toHaveText('2');
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

test('long source details turn pages and collapse back to the original keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, plans[0]);
  await panel(page, 'World route');
  const source = await visibleSource(page), summary = source.locator('.farming-source-summary');
  const url = page.url();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(summary).toHaveAttribute('aria-expanded', 'true');
  const collapse = source.getByRole('button', { name: /^Collapse .* source$/ });
  let turns = 0;
  while (!await collapse.evaluate(button => {
    const box = button.getBoundingClientRect(), window = button.closest('.kh1-note-window')!.getBoundingClientRect();
    return box.left >= window.left - 1 && box.right <= window.right + 1 && box.top >= window.top - 1 && box.bottom <= window.bottom + 1;
  })) {
    await page.getByRole('button', { name: 'Next route page', exact: true }).click();
    expect(++turns).toBeLessThan(30);
  }
  expect(turns).toBeGreaterThan(0);
  await collapse.click();
  await expect(summary).toHaveAttribute('aria-expanded', 'false');
  await expect(summary).toBeFocused();
  expect(page.url()).toBe(url);
  await visibleSource(page);
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
  await page.reload();
  await expect(row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true })).toHaveValue('11');
  await page.getByRole('button', { name: 'Terra', exact: true }).click();
  await expect(row.getByRole('spinbutton', { name: `Target ${material.name}`, exact: true })).toHaveValue('5');
  await expect(row.getByRole('spinbutton', { name: `Owned ${material.name}`, exact: true })).toHaveValue('2');
});

test('DDD filters character-specific sources without losing shared Dream Piece targets', async ({ page }) => {
  const plan = plans[3];
  await seed(page, plan);
  await page.getByRole('combobox', { name: 'Filter by character', exact: true }).selectOption('Riku');
  const riku = await routeSnapshot(page);
  expect(riku.text).toContain('Riku Special Portal');
  expect(riku.text).not.toContain('Sora Special Portal');
  await panel(page, 'Materials');
  await revealMaterial(page, plan.materials[1]);
  await page.getByRole('combobox', { name: 'Filter by character', exact: true }).selectOption('Sora');
  const sora = await routeSnapshot(page);
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
      await fixedBounds(page);
      expect((await page.locator('.farming-itinerary .kh1-note-window').boundingBox())!.height).toBeGreaterThan(50);
      await visibleSource(page);
    }
  });
}
