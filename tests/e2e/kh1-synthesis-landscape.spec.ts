import { expect, test, type Locator, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { showStockLeaf, expectJournalSaved, filterStockPlan } from './stock-native-ui';

type Recipe = { entryId: string; name: string; ingredients: { itemId: string; name: string; quantity: number }[] };
const data: { recipes: Recipe[] } = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8'));
const ultima = data.recipes.find(recipe => recipe.name === 'Ultima Weapon')!;

test.use({ serviceWorkers: 'block' });

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
