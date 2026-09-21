import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const data = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8"));

test("remaining filter preserves completed category counts", async ({ page }) => {
  const entry = data.entries.find((e: any) => e.category === "dalmatian" && e.checkable);
  const total = data.entries.filter((e: any) => e.category === "dalmatian" && e.world === entry.world && e.checkable).length;
  await page.goto(`./#/kh1fm/dalmatians?world=${encodeURIComponent(entry.world)}`);
  await page.getByRole("checkbox", {name: `Mark ${entry.name} as collected`, exact: true}).click();
  await page.getByLabel("Filter by completion").selectOption("remaining");
  const heading = page.locator(".compact-category-heading").filter({hasText: "Dalmatian groups"});
  await expect(heading).toContainText(`1/${total} groups`);
  await expect(page.locator(".save-status")).toHaveText("Progress saved on this device");
  await page.reload();
  await expect(heading).toContainText(`1/${total} groups`);
});

test("recipe entry distinguishes unknown, surplus and zero stock consistently", async ({ page }) => {
  const recipe = data.recipes.find((r: any) => r.name === "Energy Bangle");
  await page.goto("./#/kh1fm/synthesis/materials");
  await page.goto(`./#/kh1fm/entry/${recipe.entryId}`);
  await expect(page.locator(".recipe-card").filter({has: page.getByRole("button", {name: recipe.name, exact: true})}).getByLabel("Unknown owned, 2 required; unknown remaining", {exact: true})).toBeVisible();
  await page.goto("./#/kh1fm/synthesis/materials");
  const stock = page.getByRole("textbox", {name: "Spirit Shard owned stock; blank means unknown", exact: true});
  await stock.fill("8"); await stock.press("Tab");
  await page.goto(`./#/kh1fm/entry/${recipe.entryId}`);
  await expect(page.locator(".recipe-card").filter({has: page.getByRole("button", {name: recipe.name, exact: true})}).getByLabel("8 owned, 2 required; 0 remaining", {exact: true})).toBeVisible();
  await page.goto("./#/kh1fm/synthesis/materials");
  await stock.fill("0"); await stock.press("Tab");
  await page.goto(`./#/kh1fm/entry/${recipe.entryId}`);
  await expect(page.locator(".recipe-card").filter({has: page.getByRole("button", {name: recipe.name, exact: true})}).getByLabel("0 owned, 2 required; 2 remaining", {exact: true})).toBeVisible();
  await expect(page.getByText("8 / 2 · 0 remaining", {exact: true})).toHaveCount(0);
});

test("reference, challenge and synthesis filters survive entry visits and reloads", async ({ page }) => {
  await page.goto("./#/kh1fm/reference");
  await page.getByRole("button", {name: /^Weapons/}).click();
  await page.getByLabel("Filter reference entries by completion").selectOption("remaining");
  const referenceItem = page.locator(".entry-row h3 button").first();
  await referenceItem.click();
  await expect(referenceItem).toHaveAttribute("aria-expanded", "true");
  await referenceItem.click();
  await expect(referenceItem).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("button", {name: /^Weapons/})).toHaveClass("active");
  await expect(page.getByLabel("Filter reference entries by completion")).toHaveValue("remaining");
  await page.goto("./#/kh1fm/challenges");
  await page.getByLabel("Filter by completion").selectOption("remaining");
  await page.reload();
  await expect(page.getByLabel("Filter by completion")).toHaveValue("remaining");
  await page.goto("./#/kh1fm/reference");
  await expect(page.getByRole("button", {name: /^Weapons/})).toHaveClass("active");
  await page.goto("./#/kh1fm/synthesis/recipes");
  await page.getByRole("searchbox", {name: "Find a synthesis recipe"}).fill("Energy Bangle");
  await page.getByRole("checkbox", {name: "Not yet crafted"}).check();
  const recipeItem = page.locator(".recipe-card h2 button");
  await recipeItem.click();
  await expect(recipeItem).toHaveAttribute("aria-expanded", "true");
  await recipeItem.click();
  await expect(recipeItem).toHaveAttribute("aria-expanded", "false");
  await page.reload();
  await expect(page.getByRole("searchbox", {name: "Find a synthesis recipe"})).toHaveValue("Energy Bangle");
  await expect(page.getByRole("checkbox", {name: "Not yet crafted"})).toBeChecked();
});
