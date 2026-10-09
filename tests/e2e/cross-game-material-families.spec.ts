import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import kh2Guide from '../../src/games/kh2fm';
import { materialFamily, sortMaterials } from '../../src/games/presentation';
import type { CollectionEntry } from '../../src/games/types';

const dddGuide = JSON.parse(readFileSync('src/games/dddhd/content.json', 'utf8'));
for (const [game, guide, prefix] of [['kh2fm', kh2Guide, 'kh2'], ['dddhd', dddGuide, 'ddd']] as const) {
  const materials = (guide.entries as CollectionEntry[]).filter(entry => ['material', 'materials'].includes(entry.category)).sort(sortMaterials);
  for (const viewport of [{ width: 1440, height: 900 }, { width: 320, height: 568 }, { width: 844, height: 390 }]) {
    test(`${game} whole material families page, search and deep-link at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(`./#/${game}/workshop/materials`);
      const index = page.locator(`.${prefix}-material-index`);
      const headings = index.locator('h3');
      const links = index.locator(`.${prefix}-index-row > a`);
      await expect(headings.first()).toBeVisible();
      const found: string[] = [];
      for (let turn = 0; turn < materials.length; turn++) {
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        });
        const families = await headings.allTextContents();
        const names = (await links.allTextContents()).map(name => name.replace(/›$/, '').trim());
        expect(names).toEqual(materials.filter(entry => families.includes(materialFamily(entry))).map(entry => entry.name));
        expect(families).toEqual([...new Set(materials.filter(entry => names.includes(entry.name)).map(materialFamily))]);
        found.push(...names);
        // Native leaf scroll is allowed when a whole family exceeds its height.
        for (const link of await links.all()) {
          await link.scrollIntoViewIfNeeded();
          await expect(link).toBeInViewport();
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
        const next = page.getByRole('link', { name: 'Next index page', exact: true });
        if (!await next.count() || !await next.isEnabled()) break;
        const first = await links.first().getAttribute('href');
        await next.click();
        await expect(links.first()).not.toHaveAttribute('href', first!);
      }
      expect(found).toEqual(materials.map(entry => entry.name));
      expect(new Set(found).size).toBe(materials.length);
      const family = game === 'kh2fm' ? 'Frost' : 'Intrepid';
      const search = page.getByRole('searchbox').first();
      await search.fill(family);
      await search.press('Enter');
      await expect(headings).toHaveText([family]);
      const expected = materials.filter(entry => materialFamily(entry) === family);
      await expect(links).toHaveCount(expected.length);
      const selected = expected.at(-1)!;
      await index.getByRole('link', { name: selected.name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(encodeURIComponent(selected.id)));
      const url = page.url();
      await page.reload();
      await expect(page).toHaveURL(url);
      // Reopen the list on phone layouts without dropping the search query.
      const indexButton = page.getByRole('button', { name: 'Index', exact: true });
      const indexLink = page.locator('.ddd-leaf-picker').getByRole('link', { name: 'Index', exact: true });
      if (await indexButton.isVisible()) await indexButton.click();
      else if (await indexLink.isVisible()) await indexLink.click();
      else if (game === 'dddhd') await page.getByRole('navigation', { name: 'Report location', exact: true }).getByRole('link', { name: 'Spirit Creation', exact: true }).click();
      await expect(search).toHaveValue(family);
      await expect(headings).toHaveText([family]);
      await expect(index.getByRole('link', { name: selected.name, exact: true })).toBeVisible();
    });
  }
}
