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

test("selected materials show direct drop rates and locations without expanding related sources", async ({ page }) => {
  // Selecting the native notes replaces opening the retired material card.
  // The direct summary contract remains: reading a related enemy is a separate action.
  await selectStockEntry(page, "materials", "Blaze Shard");
  const notes = page.getByRole("region", { name: "Synthesis notes", exact: true });
  await expect(notes.locator("details[open]")).toHaveCount(0);
  await page.screenshot({ path: test.info().outputPath("material-blaze-shard-summary.png"), fullPage: true });
  const shard = await notes.innerText();
  for (const text of ["Red Nocturne", "6%", "Wonderland", "Bizarre Room"]) {
    expect.soft(shard, `Blaze Shard's direct notes must show ${text} before expanding a source`).toContain(text);
  }
  await selectStockEntry(page, "materials", "Blaze Gem");
  await expect(notes.locator("details[open]")).toHaveCount(0);
  await page.screenshot({ path: test.info().outputPath("material-blaze-gem-summary.png"), fullPage: true });
  const gem = await notes.innerText();
  for (const text of ["Bandit", "4%", "Fat Bandit", "8%"]) {
    expect.soft(gem, `Blaze Gem's direct notes must show ${text} before expanding a source`).toContain(text);
  }
  // Hidden paragraphs inside closed enemy disclosures do not count as summaries.
  expect.soft(await notes.locator("p:visible").filter({ hasText: /(?:Bandit.*4%|Fat Bandit.*8%)/ }).count(), "Blaze Gem must show two separate enemy/drop-rate summary lines").toBe(2);
});

test("material index keeps the complete Frost family together under its heading", async ({ page }) => {
  await openStockWorkspace(page, "materials");
  const index = page.getByRole("navigation", { name: "materials index", exact: true });
  const frostGem = index.getByRole("link", { name: "Frost Gem", exact: true });
  // Browse the actual unfiltered index so filtering cannot fake family grouping.
  while (!await frostGem.count()) {
    const next = page.getByRole("link", { name: "Next index page", exact: true });
    await expect(next).toBeVisible();
    const previous = await index.innerText();
    await next.click();
    await expect(index).not.toHaveText(previous);
  }
  await expect(frostGem).toBeVisible();
  await page.screenshot({ path: test.info().outputPath("material-frost-family.png"), fullPage: true });
  const heading = page.getByRole("heading", { name: "Frost", exact: true });
  // This is intentionally a behavioral failure while the native index is ungrouped.
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
