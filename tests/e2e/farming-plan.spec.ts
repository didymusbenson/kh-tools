import { test, expect } from "@playwright/test";
import { editStock, expectJournalSaved, filterStockPlan, openStockWorkspace, revealStockNote, selectStockEntry, showStockLeaf } from "./stock-native-ui";

test("recipes add shared ingredients to targets without deducting owned stock", async ({ page }) => {
  await selectStockEntry(page, "materials", "Spirit Shard");
  await editStock(page.getByRole("spinbutton", { name: "Spirit Shard owned", exact: true }), "8");
  for (const recipe of ["Energy Bangle", "Mega-Potion"]) {
    await selectStockEntry(page, "recipes", recipe);
    await page.getByRole("button", { name: "Add ingredients to farming plan", exact: true }).click();
    await expect(page.getByRole("status").filter({ hasText: "Ingredients added to your farming plan." })).toBeVisible();
    await expectJournalSaved(page);
  }
  const row = await filterStockPlan(page, "Spirit Shard");
  const target = row.getByRole("spinbutton", { name: "Target Spirit Shard", exact: true });
  await expect(target).toHaveValue("3");
  await expect(row.getByRole("spinbutton", { name: "Owned Spirit Shard", exact: true })).toHaveValue("8");
  await expect(page.getByRole("combobox", { name: /acquisition route/ })).toHaveCount(0);
  await expect(page.getByRole("textbox", { name: /craft plan quantity/ })).toHaveCount(0);
  await expect(page.getByRole("spinbutton", { name: /craft plan quantity/ })).toHaveCount(0);
  await page.reload();
  await expectJournalSaved(page);
  await expect(target).toHaveValue("3");
  await selectStockEntry(page, "recipes", "Energy Bangle");
  await page.getByRole("button", { name: "Add ingredients to farming plan", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "Ingredients added to your farming plan." })).toBeVisible();
  await expectJournalSaved(page);
  await filterStockPlan(page, "Spirit Shard");
  await expect(target).toHaveValue("5");
});

test("material farming targets keep unknown, partial and surplus stock separate and persist edits", async ({ page }) => {
  await selectStockEntry(page, "materials", "Blaze Shard");
  await page.getByRole("button", { name: "Add to farming plan", exact: true }).click();
  const added = page.getByRole("button", { name: "In farming plan", exact: true });
  await expect(added).toBeDisabled();
  await expect(added).toHaveText("In farming plan");
  await openStockWorkspace(page, "plan");
  const row = page.getByRole("group", { name: "Blaze Shard farming target", exact: true });
  const target = row.getByRole("spinbutton", { name: "Target Blaze Shard", exact: true });
  const owned = row.getByRole("spinbutton", { name: "Owned Blaze Shard", exact: true });
  await expect(owned).toHaveValue("");
  await expect(row.getByLabel("Blaze Shard: unknown remaining", { exact: true })).toBeVisible();
  await editStock(target, "5");
  await editStock(owned, "2");
  await expect(row.getByLabel("Blaze Shard: 3 remaining", { exact: true })).toBeVisible();
  await page.screenshot({ path: test.info().outputPath("farm-plan.png"), fullPage: true });
  await editStock(owned, "8");
  await expect(target).toHaveValue("5");
  await expect(row.getByLabel("Blaze Shard: 0 remaining", { exact: true })).toBeVisible();
  await page.reload();
  await expectJournalSaved(page);
  await expect(target).toHaveValue("5");
  await expect(owned).toHaveValue("8");
  await editStock(owned, "");
  await expect(row.getByLabel("Blaze Shard: unknown remaining", { exact: true })).toBeVisible();

  // Sources now have their own leaf within the same plan, rather than an inline row.
  const currentUrl = page.url();
  await showStockLeaf(page, "World route");
  const source = page.getByRole("button", { name: /Blaze Shard · Red Nocturne/ });
  await revealStockNote(page, source);
  await expect(source).toContainText("Red Nocturne");
  await expect(source).toContainText("6%");
  await source.click();
  await expect(source).toHaveAttribute("aria-expanded", "true");
  const details = page.locator(".farming-source-open").filter({ has: source });
  await expect(details.locator(".farming-source-notes")).toBeVisible();
  await expect(details).toContainText("Wonderland");
  await expect(details).toContainText("Bizarre Room");
  expect(page.url()).toBe(currentUrl);

  await showStockLeaf(page, "Materials");
  await editStock(target, "0");
  await expect(row).toHaveCount(0);
  await expectJournalSaved(page);
  await page.reload();
  await expectJournalSaved(page);
  await expect(row).toHaveCount(0);
});

test("removing a farming target preserves its owned inventory", async ({ page }) => {
  await selectStockEntry(page, "materials", "Blaze Shard");
  await page.getByRole("button", { name: "Add to farming plan", exact: true }).click();
  await expect(page.getByRole("button", { name: "In farming plan", exact: true })).toBeDisabled();
  await openStockWorkspace(page, "plan");
  const row = page.getByRole("group", { name: "Blaze Shard farming target", exact: true });
  await editStock(row.getByRole("spinbutton", { name: "Owned Blaze Shard", exact: true }), "3");
  await row.getByRole("button", { name: "Remove Blaze Shard from farming plan", exact: true }).click();
  await expect(row).toHaveCount(0);
  await expectJournalSaved(page);
  await selectStockEntry(page, "materials", "Blaze Shard");
  await expect(page.getByRole("spinbutton", { name: "Blaze Shard owned", exact: true })).toHaveValue("3");
});

test("craftable material information includes its ingredients without leaving the farming plan", async ({ page }) => {
  await selectStockEntry(page, "materials", "Dark Matter");
  await page.getByRole("button", { name: "Add to farming plan", exact: true }).click();
  await expect(page.getByRole("button", { name: "In farming plan", exact: true })).toBeDisabled();
  await openStockWorkspace(page, "plan");
  const rows = page.getByRole("navigation", { name: "plan index", exact: true }).getByRole("group");
  await expect(rows).toHaveCount(1);
  await showStockLeaf(page, "World route");
  const source = page.getByRole("button", { name: /Dark Matter · Synthesis/ });
  await revealStockNote(page, source);
  await source.click();
  await expect(source).toHaveAttribute("aria-expanded", "true");
  const details = page.locator(".farming-source-open").filter({ has: source });
  await expect(details).toContainText("Lucid Shard");
  await expect(details).toContainText("Gale");
  await expect(details).toContainText("Mythril");
  await page.screenshot({ path: test.info().outputPath("farm-plan-dark-matter.png"), fullPage: true });
  await expect(page).toHaveURL(/#\/kh1fm\/synthesis\/plan$/);

  // Keep nested ingredient exploration as a live contract. The native plan
  // currently provides only first-level prose; retiring this needs a decision.
  const mythril = details.getByText("More info about Mythril", { exact: true });
  await expect(mythril, "The farming plan must expose nested Mythril recipe notes without leaving the plan").toBeVisible();
  await revealStockNote(page, mythril);
  await mythril.click();
  const nested = mythril.locator("..");
  await expect(nested).toHaveAttribute("open", "");
  await expect(nested).toContainText("Mythril Shard");
  await expect(page).toHaveURL(/#\/kh1fm\/synthesis\/plan$/);
  await showStockLeaf(page, "Materials");
  await expect(rows).toHaveCount(1);
});
