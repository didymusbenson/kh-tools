import { test, expect } from '@playwright/test';

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 568 }, { width: 844, height: 390 }]) {
  test(`KH2 material action stays compact and saves at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('./#/kh2fm/workshop/materials');
    await page.locator('.kh2-index').getByRole('link', { name: 'Blazing Shard', exact: true }).click();
    const heading = page.locator('.kh2-record-heading');
    const title = heading.getByRole('heading', { name: 'Blazing Shard', exact: true });
    const add = heading.getByRole('button', { name: 'Add to farming plan', exact: true });
    await expect(add).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const bounds = await heading.boundingBox();
    const actionBounds = await add.boundingBox();
    const titleBounds = await title.boundingBox();
    expect(actionBounds!.width).toBeLessThan(bounds!.width - 30);
    expect(actionBounds!.height).toBeGreaterThanOrEqual(44);
    expect(Math.abs(actionBounds!.x + actionBounds!.width - bounds!.x - bounds!.width)).toBeLessThan(2);
    if (viewport.width >= 1000) {
      expect(actionBounds!.x).toBeGreaterThan(titleBounds!.x + titleBounds!.width + 10);
      expect(titleBounds!.y).toBeLessThan(actionBounds!.y + actionBounds!.height);
    }
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
    await page.screenshot({ path: test.info().outputPath(`kh2-material-action-${viewport.width}.png`), fullPage: true });
    const owned = page.getByRole('spinbutton', { name: 'Owned Blazing Shard', exact: true });
    await owned.fill('7');
    await owned.press('Tab');
    await expect(page.locator('.kh2-save')).toHaveAttribute('title', 'Progress saved on this device');
    await add.focus();
    await expect(add).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(heading.getByRole('button', { name: 'In farming plan', exact: true })).toBeDisabled();
    await expect(page.getByRole('status').filter({ hasText: 'Material added to your plan.' })).toBeVisible();
    await page.reload();
    const notes = page.getByRole('button', { name: 'Notes', exact: true });
    if (await notes.isVisible()) await notes.click();
    await expect(owned).toHaveValue('7');
    await expect(heading.getByRole('button', { name: 'In farming plan', exact: true })).toBeDisabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
    // Longer material names may wrap but may never push the action outside the leaf.
    await title.evaluate(el => { el.textContent = 'A very long material name with an unusually long suffix'; });
    const longHeading = await heading.boundingBox();
    const button = await heading.getByRole('button').boundingBox();
    expect(button!.x).toBeGreaterThanOrEqual(longHeading!.x - 1);
    expect(button!.x + button!.width).toBeLessThanOrEqual(longHeading!.x + longHeading!.width + 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
  });
}
