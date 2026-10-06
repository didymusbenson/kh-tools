import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { revealJournalNote } from "./journal-note-reader";
const data = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8"));

async function savedJournal(page: Page) {
  await expect(page.locator(".journal-footer-save")).toHaveAttribute("title", "Progress saved on this device");
}

async function showBookPage(page: Page, name: string) {
  const tab = page.getByRole("navigation", { name: "Book pages" }).getByRole("button", { name, exact: true });
  if (await tab.isVisible()) await tab.click();
}

async function setSpiritStock(page: Page, value: string) {
  await page.goto("./#/kh1fm/synthesis/materials");
  await savedJournal(page);
  const search = page.getByRole("searchbox", { name: "Find a material", exact: true });
  await search.fill("Spirit Shard");
  await search.press("Enter");
  await page.getByRole("navigation", { name: "materials index", exact: true }).getByRole("link", { name: "Spirit Shard", exact: true }).click();
  const stock = page.getByRole("spinbutton", { name: "Spirit Shard owned", exact: true });
  await stock.fill(value);
  await stock.press("Tab");
  await savedJournal(page);
}

test("remaining filter preserves completed category counts", async ({ page }) => {
  const entry = data.entries.find((e: any) => e.category === "dalmatian" && e.checkable);
  const total = data.entries.filter((e: any) => e.category === "dalmatian" && e.world === entry.world && e.checkable).length;
  await page.goto(`./#/kh1fm/dalmatians?world=${encodeURIComponent(entry.world)}`);
  await savedJournal(page);
  await page.getByRole("checkbox", { name: `Acquired: ${entry.name}`, exact: true }).check();
  await expect(page.locator(".journal-footer-save")).toHaveAttribute("title", `${entry.name} updated.`);
  await page.getByRole("combobox", { name: "Filter by collection status", exact: true }).selectOption("remaining");
  const count = page.getByText(`1 / ${total} puppy groups found`, { exact: true });
  const footerCount = page.getByText(`1 / ${total} collection actions`, { exact: true });
  await expect(count).toHaveText(`1 / ${total} puppy groups found`);
  await expect(footerCount).toHaveText(`1 / ${total} collection actions`);
  await expect(page.locator(`a[data-record-id="${entry.id}"]`)).toHaveCount(0);
  await page.screenshot({ path: test.info().outputPath("filtered-category-counts.png"), fullPage: true });
  // Preserve the visible-count guarantee, including on phones. Soft assertions
  // let the reload/denominator checks run even when both summaries are hidden.
  await expect.soft(count.or(footerCount).filter({ visible: true }).first(), "Completed/total collection counts must remain visible on this viewport.").toBeVisible();
  await page.reload();
  await savedJournal(page);
  await expect(page.getByRole("combobox", { name: "Filter by collection status", exact: true })).toHaveValue("remaining");
  await expect(count).toHaveText(`1 / ${total} puppy groups found`);
  await expect(footerCount).toHaveText(`1 / ${total} collection actions`);
  await expect(page.locator(`a[data-record-id="${entry.id}"]`)).toHaveCount(0);
  await expect.soft(count.or(footerCount).filter({ visible: true }).first(), "Saved completed/total counts must remain visible after reload.").toBeVisible();
});

test("recipe entry distinguishes unknown, surplus and zero stock consistently", async ({ page }) => {
  const recipe = data.recipes.find((r: any) => r.name === "Energy Bangle");
  await page.goto(`./#/kh1fm/entry/${recipe.entryId}`);
  await savedJournal(page);
  const ingredients = page.getByRole("region", { name: `${recipe.name} ingredients`, exact: true });
  await revealJournalNote(page, ingredients.getByLabel("Unknown owned, 2 required; unknown remaining", { exact: true }));
  await setSpiritStock(page, "8");
  await page.goto(`./#/kh1fm/entry/${recipe.entryId}`);
  await revealJournalNote(page, ingredients.getByLabel("8 owned, 2 required; 0 remaining", { exact: true }));
  await setSpiritStock(page, "0");
  await page.goto(`./#/kh1fm/entry/${recipe.entryId}`);
  await revealJournalNote(page, ingredients.getByLabel("0 owned, 2 required; 2 remaining", { exact: true }));
  await expect(page.getByText("8 / 2 · 0 remaining", { exact: true })).toHaveCount(0);
});

test("reference filters survive native entry visits and same-route reloads", async ({ page }) => {
  await page.goto("./#/kh1fm/reference");
  await savedJournal(page);
  const world = page.getByRole("combobox", { name: "Filter by world", exact: true });
  const status = page.getByRole("combobox", { name: "Filter by collection status", exact: true });
  await world.selectOption("Traverse Town");
  await status.selectOption("remaining");
  await page.locator(".kh1-index-row a[data-record-id]").first().click();
  await expect(page.getByRole("heading", { name: "Notes", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "‹ Back", exact: true }).click();
  await expect(world).toHaveValue("Traverse Town");
  await expect(status).toHaveValue("remaining");
  await page.reload();
  await savedJournal(page);
  await expect(world).toHaveValue("Traverse Town");
  await expect(status).toHaveValue("remaining");
});

test("reference category selection survives entry visits and a bare-route revisit", async ({ page }) => {
  await page.goto("./#/kh1fm/reference");
  await savedJournal(page);
  // This is an unresolved acceptance contract, not a leftover wrapper selector:
  // the native reference index currently has no category-selection control.
  await page.screenshot({ path: test.info().outputPath("reference-category-contract.png"), fullPage: true });
  const weapons = page.getByRole("button", { name: /^Weapons/ });
  await expect(weapons, "Reference must retain a way to choose the Weapons category; its removal requires a product decision.").toBeVisible();
  await weapons.click();
  await page.getByRole("combobox", { name: "Filter by collection status", exact: true }).selectOption("remaining");
  const weaponIds = data.entries.filter((entry: any) => entry.category === "weapon").map((entry: any) => entry.id);
  const assertWeaponsIndex = async () => {
    const links = page.locator(".kh1-index-row a[data-record-id]");
    await expect(links.first()).toBeVisible();
    const shownIds = await links.evaluateAll((rows) => rows.map((row) => row.getAttribute("data-record-id")));
    expect(shownIds.every((id) => weaponIds.includes(id))).toBe(true);
  };
  await assertWeaponsIndex();
  await page.locator(".kh1-index-row a[data-record-id]").first().click();
  await expect(page.getByRole("heading", { name: "Notes", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "‹ Back", exact: true }).click();
  await assertWeaponsIndex();
  await expect(page.getByRole("combobox", { name: "Filter by collection status", exact: true })).toHaveValue("remaining");
  await page.goto("./#/kh1fm/challenges");
  await page.getByRole("combobox", { name: "Filter by collection status", exact: true }).selectOption("remaining");
  await page.reload();
  await savedJournal(page);
  await page.goto("./#/kh1fm/reference");
  await assertWeaponsIndex();
});

test("challenge filters survive entry visits and same-route reloads", async ({ page }) => {
  await page.goto("./#/kh1fm/challenges");
  await savedJournal(page);
  const status = page.getByRole("combobox", { name: "Filter by collection status", exact: true });
  await status.selectOption("remaining");
  await page.locator(".kh1-index-row a[data-record-id]").first().click();
  await expect(page.getByRole("heading", { name: "Notes", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "‹ Back", exact: true }).click();
  await expect(status).toHaveValue("remaining");
  await page.reload();
  await savedJournal(page);
  await expect(status).toHaveValue("remaining");
});

test("synthesis filters survive native recipe visits and same-route reloads", async ({ page }) => {
  await page.goto("./#/kh1fm/synthesis/recipes");
  await savedJournal(page);
  const search = page.getByRole("searchbox", { name: "Find a recipe", exact: true });
  const remaining = page.getByRole("checkbox", { name: "Not yet crafted", exact: true });
  await search.fill("Energy Bangle");
  await search.press("Enter");
  const result = page.getByRole("navigation", { name: "recipes index", exact: true }).getByRole("link", { name: "Energy Bangle", exact: true });
  await expect.poll(async () => new URLSearchParams((await result.getAttribute("href"))?.split("?")[1]).get("q")).toBe("Energy Bangle");
  await expect(remaining).not.toBeChecked();
  await remaining.click();
  await expect(remaining).toBeChecked();
  await expect.poll(async () => new URLSearchParams((await result.getAttribute("href"))?.split("?")[1]).get("remaining")).toBe("1");
  await result.click();
  await expect(page.getByRole("region", { name: "Synthesis notes" }).getByRole("heading", { name: "Energy Bangle", exact: true })).toBeVisible();
  await showBookPage(page, "Index");
  await expect(search).toHaveValue("Energy Bangle");
  await expect(remaining).toBeChecked();
  await page.reload();
  await savedJournal(page);
  await showBookPage(page, "Index");
  await expect(search).toHaveValue("Energy Bangle");
  await expect(remaining).toBeChecked();
});
