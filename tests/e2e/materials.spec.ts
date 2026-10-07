import { test, expect } from "@playwright/test";
import { editStock, expectJournalSaved, openStockWorkspace, selectStockEntry } from "./stock-native-ui";

test("material stock is always available and zero remains distinct from unknown after reload", async ({ page }) => {
  await openStockWorkspace(page, "materials");
  await expect(page.getByRole("checkbox", { name: "Track owned materials" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Farming Plan", exact: true })).toHaveAttribute("href", "#/kh1fm/synthesis/plan");
  await selectStockEntry(page, "materials", "Blaze Shard");
  const stock = page.getByRole("spinbutton", { name: "Blaze Shard owned", exact: true });
  await expect(stock).toBeVisible();
  await expect(stock).toHaveValue("");
  await editStock(stock, "0");
  await page.reload();
  await expectJournalSaved(page);
  await expect(stock).toHaveValue("0");
  await editStock(stock, "");
  await page.reload();
  await expectJournalSaved(page);
  await expect(stock).toHaveValue("");
  await page.goto("./#/kh1fm/progress");
  await expectJournalSaved(page);
  await expect(page.getByText("Optional material inventory", { exact: true })).toHaveCount(0);
});

test("material index keeps the complete Frost family together under its heading", async ({ page }) => {
  await openStockWorkspace(page, "materials");
  const index = page.getByRole("navigation", { name: "materials index", exact: true });
  const frostGem = index.getByRole("link", { name: "Frost Gem", exact: true });
  // Browse the actual unfiltered index so filtering cannot fake family grouping.
  while (!await frostGem.count()) {
    const next = page.getByRole("link", { name: "Next index page", exact: true });
    await expect(next).toBeVisible();
    const target = Number(new URLSearchParams((await next.getAttribute('href'))!.split('?')[1]).get('page')) + 1;
    await next.click();
    // Wait for the rendered index, not just the hash/history transition.
    await expect(page.locator('.kh1-synthesis-index .kh1-page-controls>span').nth(1)).toHaveText(new RegExp(`^${target} / `));
  }
  await expect(frostGem).toBeVisible();
  await page.screenshot({ path: test.info().outputPath("material-frost-family.png"), fullPage: true });
  const heading = page.getByRole("heading", { name: "Frost", exact: true });
  // Family grouping remains a behavioral contract at every viewport.
  await expect(heading, "Materials must retain a visible Frost family heading and contiguous family members").toBeVisible();
  const family = heading.locator("..");
  await expect(family).toHaveCount(1);
  await expect(family.getByRole("link", { name: "Frost Gem", exact: true })).toBeVisible();
  await expect(family.getByRole("link", { name: "Frost Stone", exact: true })).toBeVisible();
  await expect(family.getByRole("link", { name: "Frost Shard", exact: true })).toBeVisible();
  await expect(family.getByRole("link", { name: "Blaze Gem", exact: true })).toHaveCount(0);
});

test("material notes omit generic Lucky Strike boilerplate", async ({ page }) => {
  await selectStockEntry(page, "materials", "Blaze Shard");
  const details = page.getByRole("region", { name: "Synthesis notes", exact: true }).locator(".entry-details-content").first();
  await expect(details).toBeVisible();
  const paragraphs = details.locator(":scope > p");
  expect(await paragraphs.count()).toBeGreaterThan(0);
  for (const paragraph of await paragraphs.all()) {
    await expect(paragraph).not.toContainText("Lucky Strike");
  }
});
