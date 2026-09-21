import { test, expect } from "@playwright/test";

test("material stock is always available and zero remains distinct from unknown after reload", async ({ page }) => {
  await page.goto("./#/kh1fm/synthesis/materials");
  await expect(page.getByRole("checkbox", { name: "Track owned materials" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Farming Plan", exact: true })).toHaveAttribute("href", "#/kh1fm/synthesis/plan");
  const stock = page.locator("#row-kh1fm-material-blaze-shard").getByRole("textbox", { name: "Blaze Shard owned stock; blank means unknown", exact: true });
  await expect(stock).toBeVisible();
  await expect(stock).toHaveValue("");
  await stock.fill("0");
  await stock.press("Tab");
  await expect(page.locator(".save-status")).toHaveText("Progress saved on this device");
  await page.reload();
  await expect(stock).toHaveValue("0");
  await stock.fill("");
  await stock.press("Tab");
  await expect(page.locator(".save-status")).toHaveText("Progress saved on this device");
  await page.reload();
  await expect(stock).toHaveValue("");
  await page.goto("./#/kh1fm/progress");
  await expect(page.getByText("Optional material inventory", { exact: true })).toHaveCount(0);
});

test("collapsed materials show drop rates and locations within contiguous families", async ({ page }) => {
  await page.goto("./#/kh1fm/synthesis/materials");
  const shard = page.locator("#row-kh1fm-material-blaze-shard");
  await expect(shard.locator("h3 button")).toHaveAttribute("aria-expanded", "false");
  const drops = shard.locator(".material-drop-summary");
  await expect(drops).toBeVisible();
  await expect(drops).toContainText("Red Nocturne");
  await expect(drops).toContainText("6%");
  await expect(shard).toContainText("Wonderland");
  await expect(shard).toContainText("Bizarre Room");
  const gem = page.locator("#row-kh1fm-material-blaze-gem .material-drop-summary");
  await expect(gem.locator("p")).toHaveCount(2);
  await expect(gem).toContainText("Bandit");
  await expect(gem).toContainText("4%");
  await expect(gem).toContainText("Fat Bandit");
  await expect(gem).toContainText("8%");
  const frost = page.locator(".material-family").filter({ has: page.locator("#row-kh1fm-material-frost-gem") });
  await expect(frost).toHaveCount(1);
  await expect(frost.getByRole("heading", { name: "Frost", exact: true })).toBeVisible();
  await expect(frost.locator("#row-kh1fm-material-frost-stone")).toBeVisible();
  await expect(frost.locator("#row-kh1fm-material-frost-shard")).toBeVisible();
  await expect(frost.locator("#row-kh1fm-material-blaze-gem")).toHaveCount(0);
  await shard.locator("h3 button").click();
  await expect(shard.locator(".entry-inline-details")).toBeVisible();
  for (const paragraph of await shard.locator(".entry-inline-details > .entry-details-content > p").all()) {
    await expect(paragraph).not.toContainText("Lucky Strike");
  }
});
