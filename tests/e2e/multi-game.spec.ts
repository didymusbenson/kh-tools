import { test, expect, type Page } from "@playwright/test";
import { recipes as kh2Recipes, entries as kh2Entries } from "../../src/games/kh2fm/catalog";

async function savedGuideProfile(page: Page, game: string) {
  return page.evaluate(game => new Promise<{
    checks: Record<string, boolean>;
    owned: Record<string, number>;
    targets: Record<string, number>;
  }>((resolve, reject) => {
    const open = indexedDB.open("ars-arcanum-guides", 1);
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result;
      const read = db.transaction("profiles", "readonly").objectStore("profiles").get(game);
      read.onerror = () => { db.close(); reject(read.error); };
      read.onsuccess = () => { db.close(); resolve(read.result); };
    };
  }), game);
}

const guides = ["kh2fm", "dddhd", "kh02", "kh3"];
// BBS has character-scoped coverage below and in bbs-ux.spec.ts.
for (const game of guides) {
  test(`${game} collections persist and fit`, async ({ page }) => {
    await page.goto(`./#/${game}/treasures`);
    await expect(page.getByRole("main")).toBeVisible();
    if (game === "kh3") {
      await page.getByTestId("treasure-grouped-overview").locator(".treasure-group-row button").first().click();
    } else {
      await page.locator(".treasure-worlds > a").first().click();
    }
    await expect(page.getByTestId("treasure-board")).toBeVisible();
    const selected = page.locator("[data-treasure-id][aria-pressed=true]");
    const id = await selected.getAttribute("data-treasure-id");
    expect(id).toBeTruthy();
    const check = page.locator(".treasure-preview:visible .treasure-check input");
    const label = await check.getAttribute("aria-label");
    expect(label).toBeTruthy();
    await expect(check).toBeEnabled();
    await expect(check).not.toBeChecked();
    await check.click();
    await expect(page.locator(".treasure-save:visible").first()).toContainText("Marked collected.");
    await expect(check).toBeChecked();
    await page.locator(".treasure-preview:visible").getByRole("link", { name: "Notes ›", exact: true }).click();
    await expect(page.locator(".treasure-notes:visible")).toBeVisible();
    await page.reload();
    await expect(page.locator(".treasure-notes:visible").getByRole("checkbox", { name: label!, exact: true })).toBeChecked();
    await expect(selected).toHaveAttribute("data-treasure-id", id!);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (game !== "dddhd") {
      const stage = page.locator(game === "kh2fm" ? ".kh2-native" : ".digital-stage");
      expect(await stage.evaluate(el => parseFloat(getComputedStyle(el).paddingBottom))).toBeLessThan(50);
      await expect(page.locator(".jiminy-launcher")).toHaveCount(0);
    }
    await page.screenshot({ path: test.info().outputPath(`${game}-guide.png`) });
  });
}

test("workshop preserves material targets, source notes and game isolation", async ({ page }) => {
  const recipe = kh2Recipes[0];
  const ingredient = recipe.ingredients[0];
  const material = kh2Entries.find(item => item.id === ingredient.id)!;
  await page.goto(`./#/kh2fm/workshop/recipes?entry=${recipe.id}`);
  const add = page.getByRole("button", { name: "Add ingredients to farming plan", exact: true });
  await expect(add).toBeEnabled();
  await add.click();
  await expect(page.locator(".kh2-action-status")).toHaveText("Ingredients added to your farming plan.");
  await add.click();
  await expect(add).toBeEnabled();
  await expect.poll(async () => (await savedGuideProfile(page, "kh2fm")).targets[ingredient.id]).toBe(ingredient.quantity * 2);
  const indexTab = page.getByRole("button", { name: "Index", exact: true });
  if (await indexTab.isVisible()) await indexTab.click();
  await page.getByRole("link", { name: "Farming Plan", exact: true }).click();
  const search = page.getByRole("searchbox", { name: "Find an entry", exact: true });
  await search.fill(material.name);
  await search.press("Enter");
  const row = page.getByRole("group", { name: `${material.name} farming target`, exact: true });
  const target = row.getByRole("spinbutton", { name: `Target ${material.name}`, exact: true });
  const owned = row.getByRole("spinbutton", { name: `Owned ${material.name}`, exact: true });
  await expect(target).toHaveValue(String(ingredient.quantity * 2));
  expect(ingredient.quantity * 2).toBeGreaterThan(1);
  await owned.fill("1");
  await owned.press("Tab");
  await expect(owned).toBeEnabled();
  await expect(owned).toHaveValue("1");
  await expect.poll(async () => (await savedGuideProfile(page, "kh2fm")).owned[ingredient.id]).toBe(1);

  // Sources now expand on the plan's World route leaf, still within the plan URL.
  const worldRoute = page.getByRole("button", { name: "World route", exact: true });
  if (await worldRoute.isVisible()) await worldRoute.click();
  const planUrl = page.url();
  const source = page.locator(".farming-source-summary").first();
  await source.click();
  await expect(source).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".farming-source-open .farming-source-notes")).toBeVisible();
  await expect(page.locator(".farming-source-open .farming-source-notes")).toContainText("Source option for");
  expect(page.url()).toBe(planUrl);
  await page.reload();
  await expect(owned).toHaveValue("1");
  await expect(target).toHaveValue(String(ingredient.quantity * 2));
  await page.goto("./#/bbsfm/workshop/plan");
  await expect(page.locator(".bbs-empty")).toHaveText("Your farming plan is empty for this character. Add ingredients or materials to set targets.");
  await expect(page.getByRole("group", { name: / farming target$/ })).toHaveCount(0);
});

test("character treasure filters isolate checks and restore the selected record", async ({ page }) => {
  await page.goto("./#/bbsfm/treasures");
  await page.getByRole("button", { name: "Terra", exact: true }).click();
  await page.locator(".treasure-worlds > a").first().click();
  await expect(page.getByTestId("treasure-board")).toBeVisible();
  const selected = page.locator("[data-treasure-id][aria-pressed=true]");
  const terraId = await selected.getAttribute("data-treasure-id");
  expect(terraId).toContain("terra");
  const ids = await page.locator("[data-treasure-id]").evaluateAll(tiles => tiles.map(tile => tile.getAttribute("data-treasure-id")));
  expect(ids.length).toBeGreaterThan(0);
  for (const id of ids) expect(id).toContain("terra");
  const check = page.locator(".treasure-preview:visible .treasure-check input");
  await expect(check).not.toBeChecked();
  await check.click();
  await expect(page.locator(".treasure-save:visible").first()).toContainText("Marked collected.");
  await expect(check).toBeChecked();
  await page.getByRole("button", { name: "Ventus", exact: true }).click();
  await page.locator(".treasure-worlds > a").first().click();
  await expect(selected).toHaveAttribute("data-treasure-id", /ventus/);
  await expect(check).not.toBeChecked();
  await page.getByRole("button", { name: "Terra", exact: true }).click();
  await expect(selected).toHaveAttribute("data-treasure-id", terraId!);
  await expect(check).toBeChecked();
  await page.reload();
  await expect(selected).toHaveAttribute("data-treasure-id", terraId!);
  await expect(check).toBeChecked();
});

test("Torn Pages and treasure boards share acquisition identity", async ({ page }) => {
  await page.goto("./#/kh2fm/pages");
  const row = page.locator(".kh2-index-row").first();
  await expect(row).toBeVisible();
  const href = await row.getByRole("link").getAttribute("href");
  const id = new URLSearchParams(href!.split("?")[1]).get("entry");
  expect(id).toBeTruthy();
  await row.getByRole("checkbox").check();
  await expect(row.getByRole("checkbox")).toBeChecked();
  // The native index check is optimistic; wait for the actual saved acquisition before leaving.
  await expect.poll(async () => (await savedGuideProfile(page, "kh2fm")).checks[id!]).toBe(true);
  await page.goto(`./#/kh2fm/treasures?entry=${encodeURIComponent(id!)}&view=grid`);
  await expect(page.locator("[data-treasure-id][aria-pressed=true]")).toHaveAttribute("data-treasure-id", id!);
  const check = page.locator(".treasure-preview:visible .treasure-check input");
  await expect(check).toBeChecked();
  await page.reload();
  await expect(check).toBeChecked();
  // Verify the reverse direction as well: aliases must not keep separate progress.
  await check.click();
  await expect(page.locator(".treasure-save:visible").first()).toContainText("Marked not collected.");
  await page.goto("./#/kh2fm/pages");
  const alias = page.locator(".kh2-index-row").filter({ has: page.locator(`a[href*="entry=${id}"]`) });
  await expect(alias.getByRole("checkbox")).toBeEnabled();
  await expect(alias.getByRole("checkbox")).not.toBeChecked();
});

test("new journals can reopen cached content offline", async ({ page, context }) => {
  await page.goto("./#/kh02/worlds");
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await expect(page.getByRole("heading", { name: "Worlds", exact: true })).toBeVisible();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.goto("./#/dddhd/spirits");
  await expect(page.getByRole("heading", { name: "Dream Eaters", exact: true })).toBeVisible();
  await page.reload();
  await expect(page.locator(".ddd-index-row").first()).toBeVisible();
  await context.setOffline(false);
});
