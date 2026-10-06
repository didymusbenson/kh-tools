import { expect, type Locator, type Page } from "@playwright/test";

export async function expectJournalSaved(page: Page) {
  await expect(page.locator(".journal-footer-save")).toHaveAttribute("title", "Progress saved on this device");
}

export async function showStockLeaf(page: Page, name: "Index" | "Details" | "Materials" | "World route") {
  const button = page.getByRole("button", { name, exact: true });
  if (await button.isVisible()) await button.click();
}

export async function openStockWorkspace(page: Page, tab: "materials" | "recipes" | "plan") {
  await page.goto(`./#/kh1fm/synthesis/${tab}`);
  await expectJournalSaved(page);
  await showStockLeaf(page, tab === "plan" ? "Materials" : "Index");
}

export async function selectStockEntry(page: Page, tab: "materials" | "recipes", name: string) {
  await openStockWorkspace(page, tab);
  const search = page.getByRole("searchbox", { name: tab === "materials" ? "Find a material" : "Find a recipe", exact: true });
  await search.fill(name);
  await search.press("Enter");
  await page.getByRole("navigation", { name: `${tab} index`, exact: true }).getByRole("link", { name, exact: true }).click();
  await showStockLeaf(page, "Details");
  await expect(page.getByRole("region", { name: "Synthesis notes", exact: true }).getByRole("heading", { name, exact: true })).toBeVisible();
  await expectJournalSaved(page);
}

export async function editStock(input: Locator, value: string) {
  await input.fill(value);
  await input.press("Tab");
  await expectJournalSaved(input.page());
}

export async function filterStockPlan(page: Page, name: string) {
  await openStockWorkspace(page, "plan");
  const search = page.getByRole("searchbox", { name: "Find a material", exact: true });
  await search.fill(name);
  await search.press("Enter");
  return page.getByRole("group", { name: `${name} farming target`, exact: true });
}

/** Notes use CSS columns: mounted elements on later pages are not clickable yet. */
export async function revealStockNote(page: Page, control: Locator, kind: "route" | "notes" = "route") {
  await expect(control).toHaveCount(1);
  await page.evaluate(() => document.fonts.ready);
  const window = page.getByRole("region", { name: "Synthesis notes", exact: true }).locator(".kh1-note-window");
  const next = page.getByRole("button", { name: `Next ${kind} page`, exact: true });
  const pagination = page.getByRole("navigation", { name: kind === "route" ? "Route pages" : "Notes pages", exact: true });
  while (true) {
    const box = await control.boundingBox();
    const bounds = await window.boundingBox();
    if (box && bounds && box.x >= bounds.x - 1 && box.x + box.width <= bounds.x + bounds.width + 1) return;
    await expect(next, `The ${kind} pages must expose the requested control`).toBeEnabled();
    const previous = await pagination.innerText();
    await next.click();
    await expect(pagination).not.toHaveText(previous);
  }
}
