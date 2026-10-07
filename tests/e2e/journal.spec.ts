import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { revealJournalNote } from "./journal-note-reader";
const data = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8"));

async function savedJournal(page: Page) {
  await expect(page.locator(".journal-footer-save")).toHaveAttribute(
    "title", "Progress saved on this device",
  );
}

async function showBookPage(page: Page, name: string) {
  const tab = page.getByRole("navigation", { name: "Book pages" }).getByRole("button", { name, exact: true });
  if (await tab.isVisible()) await tab.click();
}

async function selectSynthesisItem(page: Page, tab: "materials" | "recipes", name: string) {
  await page.goto(`./#/kh1fm/synthesis/${tab}`);
  await savedJournal(page);
  const search = page.getByRole("searchbox", { name: tab === "materials" ? "Find a material" : "Find a recipe", exact: true });
  await search.fill(name);
  await search.press("Enter");
  const result = page.getByRole("navigation", { name: `${tab} index`, exact: true }).getByRole("link", { name, exact: true });
  await expect.poll(async () => new URLSearchParams((await result.getAttribute("href"))?.split("?")[1]).get("q")).toBe(name);
  await result.click();
  await expect(page.getByRole("region", { name: "Synthesis notes" }).getByRole("heading", { name, exact: true })).toBeVisible();
}

test("journal renders, stays within viewport, and shares saved checks between views", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: /^Kingdom Hearts Final Mix, open journal$/i }).click();
  await expect(page.getByRole("heading", { name: /Contents$/, level: 1 })).toBeVisible();
  await savedJournal(page);
  const viewport = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
  expect(viewport.scroll).toBeLessThanOrEqual(viewport.width + 1);
  await page.screenshot({ path: test.info().outputPath("journal.png"), fullPage: true });

  const entry = data.entries.find((e: any) => e.category === "dalmatian" && e.checkable);
  await page.goto(`./#/kh1fm/dalmatians?world=${encodeURIComponent(entry.world)}`);
  await savedJournal(page);
  const check = page.getByRole("checkbox", { name: `Acquired: ${entry.name}`, exact: true });
  await check.check();
  await expect(check).toBeChecked();
  // The native notice is emitted only after the IndexedDB write has completed.
  await expect(page.locator(".journal-footer-save")).toHaveAttribute("title", `${entry.name} updated.`);

  await page.goto(`./#/kh1fm/entry/${entry.id}`);
  await expect(page.getByRole("heading", { name: "Notes", exact: true })).toBeVisible();
  await expect(page.locator('a[href^="https://"]')).toHaveCount(0);
  await expect(page.getByText(entry.id, { exact: true })).toHaveCount(0);
  for (const source of entry.sources) {
    await expect(page.getByText(source.label, { exact: true })).toHaveCount(0);
    await expect(page.getByText(source.url, { exact: true })).toHaveCount(0);
  }
  await page.screenshot({ path: test.info().outputPath("entry-final.png"), fullPage: true });
  await showBookPage(page, "Overview");
  const acquired = page.getByRole("checkbox", { name: "Acquired", exact: true });
  await expect(acquired).toBeChecked();
  await page.reload();
  await savedJournal(page);
  await showBookPage(page, "Overview");
  await expect(acquired).toBeChecked();
  await acquired.uncheck();
  await expect(acquired).not.toBeChecked();
  await expect(page.locator(".journal-footer-save")).toHaveAttribute("title", `${entry.name} updated.`);
  await page.goto(`./#/kh1fm/dalmatians?world=${encodeURIComponent(entry.world)}`);
  await expect(check).not.toBeChecked();
});

test("synthesis preserves stock and catalog independently across restart", async ({ page }) => {
  const recipe = data.recipes.find((r: any) => r.name === "Energy Bangle");
  await selectSynthesisItem(page, "materials", "Spirit Shard");
  const stock = page.getByRole("spinbutton", { name: "Spirit Shard owned", exact: true });
  await stock.fill("8");
  await stock.press("Tab");
  await savedJournal(page);
  await selectSynthesisItem(page, "recipes", recipe.name);
  const notes = page.getByRole("region", { name: "Synthesis notes" });
  const ingredient = notes.getByRole("listitem").filter({ has: page.getByRole("link", { name: "Spirit Shard", exact: true }) });
  await expect(ingredient).toContainText("8 / 2");
  await notes.getByRole("checkbox", { name: "Crafted", exact: true }).check();
  await expect(notes.getByRole("status")).toHaveText("Crafting record saved.");
  await notes.getByRole("button", { name: "Add ingredients to farming plan", exact: true }).click();
  await expect(notes.getByRole("status")).toHaveText("Ingredients added to your farming plan.");
  await savedJournal(page);

  await page.reload();
  await savedJournal(page);
  await expect(notes.getByRole("checkbox", { name: "Crafted", exact: true })).toBeChecked();
  await expect(ingredient).toContainText("8 / 2");
  // Direct entry notes retain the explicit remaining arithmetic. The workspace
  // display is deferred: ai_docs/design/synthesis-lab-design-session.md#deferred-acceptance-todos.
  await page.goto(`./#/kh1fm/entry/${recipe.entryId}`);
  await revealJournalNote(page, page.getByRole("region", { name: `${recipe.name} ingredients`, exact: true }).getByLabel("8 owned, 2 required; 0 remaining", { exact: true }));
  await page.reload();
  await savedJournal(page);
  await revealJournalNote(page, page.getByLabel("8 owned, 2 required; 0 remaining", { exact: true }));

  await page.goto("./#/kh1fm/synthesis/plan");
  const search = page.getByRole("searchbox", { name: "Find a material", exact: true });
  await search.fill("Spirit Shard");
  await search.press("Enter");
  const target = page.getByRole("group", { name: "Spirit Shard farming target", exact: true });
  await expect(target.getByRole("spinbutton", { name: "Target Spirit Shard", exact: true })).toHaveValue("2");
  await expect(target.getByRole("spinbutton", { name: "Owned Spirit Shard", exact: true })).toHaveValue("8");
  await page.screenshot({ path: test.info().outputPath("synthesis.png"), fullPage: true });
});

test("installed guide cold-reloads offline", async ({ page, context }) => {
  await page.goto("./#/kh1fm/worlds");
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await expect.poll(() => page.evaluate(async () => (await caches.keys()).some((key) => key.startsWith("workbox-precache")))).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("heading", { name: /Worlds$/, level: 1 })).toBeVisible();
  await page.goto("./#/kh1fm/synthesis/recipes");
  await expect(page.getByRole("heading", { name: /Synthesis$/, level: 1 })).toBeVisible();
});

test("the cover resumes the last saved journal page", async ({ page }) => {
  await page.goto("./#/kh1fm/synthesis/recipes");
  await expect(page.getByRole("heading", { name: /Synthesis$/, level: 1 })).toBeVisible();
  await savedJournal(page);
  await page.getByRole("button", { name: "Tools", exact: true }).click();
  await page.getByRole("link", { name: "‹ Ars Arcanum home", exact: true }).click();
  await expect(page.getByRole("link", { name: "Resume last page" })).toHaveAttribute("href", "#/kh1fm/synthesis/recipes");
  await page.reload();
  await page.getByRole("link", { name: "Resume last page" }).click();
  await expect(page.getByRole("heading", { name: /Synthesis$/, level: 1 })).toBeVisible();
});
