import { expect, test, type Locator, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { showStockLeaf, expectJournalSaved, filterStockPlan } from './stock-native-ui';

type Recipe = { entryId: string; name: string; ingredients: { itemId: string; name: string; quantity: number }[] };
const data: { recipes: Recipe[] } = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8'));
const ultima = data.recipes.find(recipe => recipe.name === 'Ultima Weapon')!;

test.use({ serviceWorkers: 'block' });

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await page.screenshot({ path: testInfo.outputPath('kh1-synthesis-failure.png') });
});

async function settle(page: Page) {
  await expectJournalSaved(page);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}

/** CSS-column content can be mounted and "visible" while outside the clipped page. */
async function fullyInside(target: Locator, container: Locator) {
  const bounds = await container.boundingBox();
  if (!bounds) return false;
  return target.evaluate((element, box) => {
    const rects = [...element.getClientRects()];
    return rects.length > 0 && rects.every(rect => rect.width > 0 && rect.height > 0
      && rect.left >= box.x - 1 && rect.right <= box.x + box.width + 1
      && rect.top >= box.y - 1 && rect.bottom <= box.y + box.height + 1);
  }, bounds);
}

async function containedFrame(page: Page) {
  await expect.poll(() => page.evaluate(() => ({
    x: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    y: Math.max(0, document.documentElement.scrollHeight - innerHeight),
  }))).toEqual({ x: 0, y: 0 });
  for (const selector of ['.kh1-synthesis-index', '.kh1-synthesis-detail']) {
    const leaf = page.locator(selector);
    if (!await leaf.isVisible()) continue;
    await expect(leaf).toBeInViewport({ ratio: 1 });
    // Check real interactive content and page windows, not just the decorative book.
    for (const control of await leaf.locator('.kh1-filters, .kh1-book-tabs, .kh1-index, .kh1-page-controls, .kh1-note-window, .kh1-note-pagination, .kh1-acquired, button.kh1-book-action').all()) {
      if (await control.isVisible()) await expect.poll(() => fullyInside(control, leaf)).toBe(true);
    }
  }
  const index = page.locator('.kh1-synthesis-index');
  if (await index.isVisible()) {
    const rows = index.locator('.kh1-index > a');
    const filters = await index.locator('.kh1-filters').boundingBox();
    const controls = await index.locator('.kh1-page-controls').boundingBox();
    let previousBottom = filters!.y + filters!.height;
    for (const row of await rows.all()) {
      const box = await row.boundingBox();
      expect(box!.y).toBeGreaterThanOrEqual(previousBottom - 1);
      expect(box!.y + box!.height).toBeLessThanOrEqual(controls!.y + 1);
      previousBottom = box!.y + box!.height;
    }
  }
  const detail = page.locator('.kh1-synthesis-detail');
  if (await detail.isVisible()) {
    const window = detail.locator('.kh1-note-window');
    const pager = detail.getByRole('navigation', { name: 'Notes pages', exact: true });
    const notesBox = await window.boundingBox();
    const pagerBox = await pager.boundingBox();
    expect(notesBox).not.toBeNull();
    expect(pagerBox).not.toBeNull();
    expect(notesBox!.y + notesBox!.height).toBeLessThanOrEqual(pagerBox!.y + 1);
    for (const action of await detail.locator('.kh1-acquired, button.kh1-book-action').all()) {
      const box = await action.boundingBox();
      expect(box!.y + box!.height).toBeLessThanOrEqual(notesBox!.y + 1);
    }
  }
}

async function readableFirstIngredients(page: Page) {
  const window = page.locator('.kh1-synthesis-detail .kh1-note-window');
  await expect.poll(() => fullyInside(page.getByRole('heading', { name: 'Ingredients', exact: true }), window)).toBe(true);
  await expect.poll(() => fullyInside(page.locator('.kh1-recipe-notes li').first(), window)).toBe(true);
}

async function allIngredientsViaPager(page: Page, recipe: Recipe) {
  const window = page.locator('.kh1-synthesis-detail .kh1-note-window');
  const pager = page.getByRole('navigation', { name: 'Notes pages', exact: true });
  const next = pager.getByRole('button', { name: 'Next notes page', exact: true });
  const visited = new Set<string>();
  const seen = new Set<string>();
  while (true) {
    const label = await pager.innerText();
    expect(visited.has(label), 'Native note pagination must not loop').toBe(false);
    visited.add(label);
    for (const ingredient of recipe.ingredients) {
      const row = page.locator('.kh1-recipe-notes li').filter({ has: page.getByRole('link', { name: ingredient.name, exact: true }) });
      if (await fullyInside(row, window)) {
        await expect(row).toContainText(`? / ${ingredient.quantity}`);
        seen.add(ingredient.itemId);
      }
    }
    if (await next.isDisabled()) break;
    await next.click();
    await expect(pager).not.toHaveText(label);
  }
  expect([...seen].sort(), 'Every ingredient and quantity must be readable using only the existing pager').toEqual(recipe.ingredients.map(ingredient => ingredient.itemId).sort());
  return visited.size;
}

for (const height of [350, 390]) {
  test(`KH1 short landscape synthesis exposes useful content at 844x${height}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 844, height });
    await page.goto('./#/kh1fm/synthesis/recipes');
    await settle(page);
    const index = page.getByRole('navigation', { name: 'recipes index', exact: true });
    await expect.poll(async () => {
      let visibleRows = 0;
      for (const row of await index.getByRole('link').all()) if (await fullyInside(row, index)) visibleRows++;
      return visibleRows;
    }, { message: 'The short landscape index must show at least three complete recipe rows' }).toBeGreaterThanOrEqual(3);
    await readableFirstIngredients(page);
    await containedFrame(page);
    await page.screenshot({ path: testInfo.outputPath(`kh1-synthesis-${844}x${height}-recipes.png`) });

    await page.goto(`./#/kh1fm/synthesis/recipes?item=${ultima.entryId}`);
    await settle(page);
    await expect(page.getByRole('heading', { name: ultima.name, exact: true })).toBeVisible();
    await readableFirstIngredients(page);
    expect(await allIngredientsViaPager(page, ultima)).toBeGreaterThan(1);
    await containedFrame(page);
    await page.screenshot({ path: testInfo.outputPath(`kh1-synthesis-844x${height}-ingredients.png`) });

    const notes = page.getByRole('region', { name: 'Synthesis notes', exact: true });
    await notes.getByRole('checkbox', { name: 'Crafted', exact: true }).check();
    await expect(notes.getByRole('status')).toHaveText('Crafting record saved.');
    await notes.getByRole('button', { name: 'Add ingredients to farming plan', exact: true }).click();
    await expect(notes.getByRole('status')).toHaveText('Ingredients added to your farming plan.');
    await containedFrame(page);
    await settle(page);
    await page.reload();
    await settle(page);
    await expect(notes.getByRole('checkbox', { name: 'Crafted', exact: true })).toBeChecked();
    // Verify every saved target through the real plan UI, including unknown stock.
    for (const ingredient of ultima.ingredients) {
      const target = await filterStockPlan(page, ingredient.name);
      await expect(target.getByRole('spinbutton', { name: `Target ${ingredient.name}`, exact: true })).toHaveValue(String(ingredient.quantity));
      await expect(target.getByRole('spinbutton', { name: `Owned ${ingredient.name}`, exact: true })).toHaveValue('');
    }
  });
}

for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
  test(`KH1 synthesis retains containment at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto('./#/kh1fm/synthesis/recipes');
    await settle(page);
    await showStockLeaf(page, 'Index');
    await containedFrame(page);
    await page.screenshot({ path: testInfo.outputPath(`kh1-synthesis-${viewport.width}x${viewport.height}-index.png`) });
    await showStockLeaf(page, 'Details');
    await readableFirstIngredients(page);
    await containedFrame(page);
    await page.screenshot({ path: testInfo.outputPath(`kh1-synthesis-${viewport.width}x${viewport.height}-notes.png`) });
  });
}

async function compactWorkspaceControls(page: Page) {
  await expect.poll(() => page.evaluate(() => ({
    x: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    y: Math.max(0, document.documentElement.scrollHeight - innerHeight),
  }))).toEqual({ x: 0, y: 0 });
  const index = page.locator('.kh1-synthesis-index');
  const detail = page.locator('.kh1-synthesis-detail');
  for (const leaf of [index, detail]) await expect(leaf).toBeInViewport({ ratio: 1 });
  for (const control of await index.locator('.kh1-book-tabs, .kh1-filters, .kh1-index, .kh1-page-controls').all()) {
    await expect.poll(() => fullyInside(control, index)).toBe(true);
  }
  for (const control of await detail.locator('.kh1-stock-fields, button.kh1-book-action, .farming-source-tabs, .kh1-note-window, .kh1-note-pagination').all()) {
    if (await control.isVisible()) await expect.poll(() => fullyInside(control, detail)).toBe(true);
  }
  const listBox = await index.locator('.kh1-index').boundingBox();
  const filtersBox = await index.locator('.kh1-filters').boundingBox();
  const pagerBox = await index.locator('.kh1-page-controls').boundingBox();
  expect(listBox!.y).toBeGreaterThanOrEqual(filtersBox!.y + filtersBox!.height - 1);
  expect(listBox!.y + listBox!.height).toBeLessThanOrEqual(pagerBox!.y + 1);
}

test('KH1 short landscape synthesis keeps crowded material families usable at 844x350', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 844, height: 350 });
  await page.goto('./#/kh1fm/synthesis/materials?entry=kh1fm-material-power-crystal');
  await settle(page);
  const index = page.getByRole('navigation', { name: 'materials index', exact: true });
  const family = index.locator('.kh1-material-family').filter({ has: page.getByRole('heading', { name: 'Power', exact: true }) });
  await expect(family).toHaveCount(1);
  const names = ['Power Shard', 'Power Gem', 'Power Crystal', 'Power Stone'];
  await expect(family.getByRole('link')).toHaveCount(names.length);
  await compactWorkspaceControls(page);
  for (const name of names) {
    const link = family.getByRole('link', { name, exact: true });
    // Whole families deliberately stay together; inner index scrolling is allowed.
    await link.scrollIntoViewIfNeeded();
    await expect.poll(() => fullyInside(link, index)).toBe(true);
    await compactWorkspaceControls(page);
  }
  await page.getByRole('spinbutton', { name: 'Power Crystal owned', exact: true }).fill('3');
  await page.getByRole('spinbutton', { name: 'Power Crystal owned', exact: true }).press('Tab');
  await settle(page);
  await expect(page.getByRole('spinbutton', { name: 'Power Crystal owned', exact: true })).toHaveValue('3');
  await page.screenshot({ path: testInfo.outputPath('kh1-synthesis-844x350-material-family.png') });
});

test('KH1 short landscape synthesis keeps unfiltered farming rows reachable at 844x350', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 844, height: 350 });
  await page.goto(`./#/kh1fm/synthesis/recipes?item=${ultima.entryId}`);
  await settle(page);
  await page.getByRole('button', { name: 'Add ingredients to farming plan', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Ingredients added to your farming plan.' })).toBeVisible();
  await settle(page);
  await page.goto('./#/kh1fm/synthesis/plan');
  await settle(page);
  await expect(page.getByRole('searchbox', { name: 'Find a material', exact: true })).toHaveValue('');
  const index = page.getByRole('navigation', { name: 'plan index', exact: true });
  const seen = new Set<string>();
  const visited = new Set<string>();
  while (true) {
    await compactWorkspaceControls(page);
    const pagination = page.locator('.kh1-synthesis-index .kh1-page-controls');
    const label = await pagination.innerText();
    expect(visited.has(label), 'Farming index pagination must not loop').toBe(false);
    visited.add(label);
    const rows = index.locator('.farming-material-row');
    expect(await rows.count()).toBeGreaterThan(0);
    for (const row of await rows.all()) {
      const id = (await row.getAttribute('data-material-id'))!;
      const ingredient = ultima.ingredients.find(item => item.itemId === id)!;
      expect(ingredient).toBeDefined();
      await expect.poll(() => fullyInside(row, index)).toBe(true);
      for (const control of await row.locator('input, button').all()) {
        await expect.poll(() => fullyInside(control, row)).toBe(true);
        await expect(control).toBeEnabled();
      }
      await expect(row.getByRole('spinbutton', { name: `Target ${ingredient.name}`, exact: true })).toHaveValue(String(ingredient.quantity));
      seen.add(id);
    }
    await page.screenshot({ path: testInfo.outputPath(`kh1-synthesis-844x350-farming-page-${visited.size}.png`) });
    const next = page.getByRole('link', { name: 'Next index page', exact: true });
    if (!await next.count()) break;
    await next.click();
    await expect(pagination).not.toHaveText(label);
    await settle(page);
  }
  expect([...seen].sort()).toEqual(ultima.ingredients.map(ingredient => ingredient.itemId).sort());
});

async function workspaceParity(page: Page) {
  return page.evaluate(() => {
    const node = (selector: string) => document.querySelector<HTMLElement>(selector)!;
    const box = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom };
    };
    const css = (element: Element, properties: string[]) => {
      const style = getComputedStyle(element);
      return Object.fromEntries(properties.map(property => [property, style.getPropertyValue(property)]));
    };
    const visibleWithin = (element: Element, container: Element) => {
      const rect = element.getBoundingClientRect(), bounds = container.getBoundingClientRect();
      const style = getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0
        && rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1
        && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
    };
    const index = node('.kh1-synthesis-index');
    const tabs = node('.kh1-book-tabs');
    const search = node('.kh1-filters input[type=search]');
    const searchLabel = search.closest('label')!.querySelector('span')!;
    const count = node('.kh1-synthesis-index-footer > .kh1-small');
    const pager = node('.kh1-synthesis-index .kh1-page-controls');
    const notePager = node('.kh1-synthesis-detail .kh1-note-pagination');
    return {
      farmingRows: [...index.querySelectorAll('.farming-material-row')].map(row => ({
        id: row.getAttribute('data-material-id'), bounds: box(row),
        insideIndex: visibleWithin(row, node('.kh1-synthesis-index .kh1-index')),
        controlsInsideRow: [...row.querySelectorAll('input, button')].every(control => visibleWithin(control, row)),
      })),
      recipeFirstPage: (() => {
        const heading = document.querySelector('.kh1-recipe-notes h3');
        const ingredient = document.querySelector('.kh1-recipe-notes li');
        const window = document.querySelector('.kh1-synthesis-detail .kh1-note-window');
        return heading && ingredient && window ? {
          headingInsideWindow: visibleWithin(heading, window),
          firstIngredientInsideWindow: visibleWithin(ingredient, window),
        } : null;
      })(),
      header: box(node('.kh1-heading')), book: box(node('.kh1-spread')),
      indexPadding: css(index, ['padding-top', 'padding-right', 'padding-bottom', 'padding-left']),
      tabs: box(tabs), tabStyle: css(tabs, ['font-family', 'font-size', 'line-height', 'gap', 'padding', 'margin']),
      tabLinks: [...tabs.querySelectorAll('a')].map(link => ({ bounds: box(link), styles: css(link, ['font-family', 'font-size', 'line-height', 'padding', 'margin']) })),
      searchLabelVisible: visibleWithin(searchLabel, index), searchHeight: box(search).height,
      countVisible: visibleWithin(count, index), countBottom: box(count).bottom,
      footerBottom: Math.max(box(count).bottom, box(pager).bottom),
      pagerVisible: visibleWithin(pager, index), pagerStyle: css(pager, ['font-family', 'font-size', 'line-height']),
      pagerButtonHeights: [...pager.querySelectorAll('a')].map(link => box(link).height),
      notePagerStyle: css(notePager, ['min-height', 'font-family', 'font-size', 'line-height']),
      noteButtonHeights: [...notePager.querySelectorAll('button')].map(button => box(button).height),
    };
  });
}

for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 390, height: 650 }, { width: 844, height: 350 }]) {
  test(`KH1 synthesis comparison captures all workspaces at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto(`./#/kh1fm/synthesis/recipes?item=${ultima.entryId}`);
    await settle(page);
    await showStockLeaf(page, 'Details');
    await page.getByRole('button', { name: 'Add ingredients to farming plan', exact: true }).click();
    await expect(page.getByRole('status').filter({ hasText: 'Ingredients added to your farming plan.' })).toBeVisible();
    await settle(page);

    const samples: { tab: string; leaf: string; metrics: Awaited<ReturnType<typeof workspaceParity>> }[] = [];
    // Keep every comparison capture before assertions so failures retain all
    // three workspaces, including their intentionally different functional data.
    for (const tab of ['recipes', 'materials', 'plan'] as const) {
      await page.goto(`./#/kh1fm/synthesis/${tab}`);
      await settle(page);
      for (const leaf of ['index', 'detail'] as const) {
        await showStockLeaf(page, tab === 'plan'
          ? leaf === 'index' ? 'Materials' : 'World route'
          : leaf === 'index' ? 'Index' : 'Details');
        await settle(page);
        const name = `kh1-synthesis-compare-${viewport.width}x${viewport.height}-${tab}-${leaf}`;
        await page.screenshot({ path: testInfo.outputPath(`${name}.png`) });
        const geometry = await page.evaluate(() => {
          const selectors = {
            header: '.kh1-heading', book: '.kh1-spread', volume: '.kh1-volume',
            picker: '.kh1-leaf-picker', tabs: '.kh1-book-tabs', filters: '.kh1-filters',
            indexLeaf: '.kh1-synthesis-index', detailLeaf: '.kh1-synthesis-detail',
            index: '.kh1-synthesis-index .kh1-index', indexPager: '.kh1-page-controls',
            noteWindow: '.kh1-note-window', notePager: '.kh1-note-pagination',
            indexFooter: '.kh1-synthesis-index-footer', routeTabs: '.farming-source-tabs',
          };
          const nodes = Object.fromEntries(Object.entries(selectors).map(([key, selector]) => [key,
            [...document.querySelectorAll(selector)].map(element => {
              const rect = element.getBoundingClientRect();
              const style = getComputedStyle(element);
              return {
                selector, text: element.textContent?.trim(),
                bounds: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                clientWidth: element.clientWidth, clientHeight: element.clientHeight,
                scrollWidth: element.scrollWidth, scrollHeight: element.scrollHeight,
                styles: Object.fromEntries(['display', 'visibility', 'position', 'font-family', 'font-size', 'line-height',
                  'padding', 'margin', 'gap', 'min-height', 'height', 'max-height', 'overflow-x', 'overflow-y',
                  'flex-direction', 'grid-template-columns', 'grid-template-rows'].map(property => [property, style.getPropertyValue(property)])),
              };
            }),
          ]));
          return { url: location.href, viewport: { width: innerWidth, height: innerHeight, devicePixelRatio }, nodes };
        });
        const metrics = await workspaceParity(page);
        samples.push({ tab, leaf, metrics });
        await testInfo.attach(`${name}.json`, { body: JSON.stringify({ ...geometry, parityMetrics: metrics }, null, 2), contentType: 'application/json' });
      }
    }
    const indexes = samples.filter(sample => sample.leaf === 'index');
    const farming = indexes.find(sample => sample.tab === 'plan')!.metrics;
    expect(farming.farmingRows.length, 'The populated unfiltered farming index must expose actual rows').toBeGreaterThan(0);
    for (const row of farming.farmingRows) {
      expect(row.insideIndex, `${row.id} must fit entirely inside the measured farming index`).toBe(true);
      expect(row.controlsInsideRow, `${row.id} stock and removal controls must fit inside their row`).toBe(true);
    }
    if (viewport.width === 320) {
      const recipe = samples.find(sample => sample.tab === 'recipes' && sample.leaf === 'detail')!.metrics.recipeFirstPage;
      expect(recipe, 'The first recipe must retain its ingredient content').not.toBeNull();
      expect(recipe!.headingInsideWindow, 'Ingredients heading must be readable on the first note page at 320×568').toBe(true);
      expect(recipe!.firstIngredientInsideWindow, 'Ingredients heading must have a complete ingredient beside it on the first note page at 320×568').toBe(true);
    }
    const baseline = indexes[0].metrics;
    const equalBox = (actual: Record<string, number>, expected: Record<string, number>, label: string) => {
      for (const key of Object.keys(expected)) expect(actual[key], `${label}: ${key}`).toBeCloseTo(expected[key], 0);
    };
    const indexButtonHeight = indexes.flatMap(sample => sample.metrics.pagerButtonHeights)[0];
    expect(indexButtonHeight, 'At least one populated index must expose native pagination').toBeDefined();
    for (const { tab, metrics } of indexes) {
      equalBox(metrics.header, baseline.header, `${tab} header`);
      equalBox(metrics.book, baseline.book, `${tab} book`);
      expect(metrics.indexPadding, `${tab} index padding`).toEqual(baseline.indexPadding);
      equalBox(metrics.tabs, baseline.tabs, `${tab} workspace tabs`);
      expect(metrics.tabStyle, `${tab} tab typography and spacing`).toEqual(baseline.tabStyle);
      expect(metrics.tabLinks).toHaveLength(baseline.tabLinks.length);
      metrics.tabLinks.forEach((link, index) => {
        equalBox(link.bounds, baseline.tabLinks[index].bounds, `${tab} tab ${index}`);
        expect(link.styles).toEqual(baseline.tabLinks[index].styles);
      });
      expect(metrics.searchLabelVisible, `${tab} search label remains readable`).toBe(true);
      expect(metrics.searchHeight, `${tab} search input height`).toBeCloseTo(baseline.searchHeight, 0);
      expect(metrics.countVisible, `${tab} distinct count remains readable`).toBe(true);
      expect(metrics.pagerVisible, `${tab} native index pager remains readable`).toBe(true);
      expect(metrics.countBottom, `${tab} count baseline`).toBeCloseTo(baseline.countBottom, 0);
      expect(metrics.footerBottom, `${tab} footer bottom`).toBeCloseTo(baseline.footerBottom, 0);
      expect(metrics.pagerStyle, `${tab} index pager typography`).toEqual(baseline.pagerStyle);
      for (const height of metrics.pagerButtonHeights) expect(height, `${tab} index page-button height`).toBeCloseTo(indexButtonHeight, 0);
    }
    const details = samples.filter(sample => sample.leaf === 'detail');
    const detailBaseline = details[0].metrics;
    for (const { tab, metrics } of details) {
      expect(metrics.notePagerStyle, `${tab} Notes/Route pager minimum height and typography`).toEqual(detailBaseline.notePagerStyle);
      expect(metrics.noteButtonHeights, `${tab} Notes/Route page-button heights`).toEqual(detailBaseline.noteButtonHeights);
    }
  });
}
