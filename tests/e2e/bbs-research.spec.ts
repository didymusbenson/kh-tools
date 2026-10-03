import { test, expect } from '@playwright/test';

test('BBS corrective locators and character-scoped farm routes remain usable after modal dismissal', async ({ page }) => {
  await page.goto('./#/bbsfm/stickers?character=Terra&entry=bbsfm%3Aterra%3Adwarf-woodlands%3Asticker%3Alouie-sticker%3Aunderground-waterway');
  await expect(page.locator('.bbs-detail-leaf')).toContainText('southwest projecting ledge');
  await page.goto('./#/bbsfm/melding?character=Terra&tab=crystals&item=Chaos%20Crystal');
  await page.getByRole('button', { name: 'Chaos Crystal', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Waterside');
  await expect(page.getByRole('dialog')).toContainText('not directly observed');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Ventus', exact: true }).click();
  await page.getByRole('button', { name: 'Chaos Crystal', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Deep Woods');
  await expect(page.getByRole('dialog')).not.toContainText('Land at Forest Clearing');
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.getByRole('button', { name: 'Secret Gem', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Fountain Court');
  await expect(page.getByRole('dialog')).toContainText('original Japanese PSP');
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.reload();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Ventus', exact: true })).toHaveAttribute('aria-pressed', 'true');
});
