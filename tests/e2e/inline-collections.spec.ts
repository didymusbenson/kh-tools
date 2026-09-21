import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const data = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8"));
const entry = data.entries.find((item: any) => item.category === "trinity" && item.checkable);

test("category items expand inline by keyboard and bulk controls without leaving the list", async ({ page }) => {
  await page.goto(`./#/kh1fm/worlds/${encodeURIComponent(entry.world)}`);
  const row = page.locator(`#row-${entry.id}`);
  const category = page.locator(".compact-category").filter({ has: row });
  const toggle = row.locator("h3 button");
  const originalUrl = page.url();
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(row.locator(".entry-inline-details")).toContainText(entry.instructions);
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await category.getByRole("button", { name: "Expand all", exact: true }).click();
  const buttons = category.locator(".entry-row h3 button");
  expect(await buttons.count()).toBeGreaterThan(0);
  for (const button of await buttons.all()) await expect(button).toHaveAttribute("aria-expanded", "true");
  await row.getByRole("checkbox", { name: `Mark ${entry.name} as collected`, exact: true }).click();
  await category.getByRole("button", { name: "Collapse all", exact: true }).click();
  for (const button of await buttons.all()) await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(row.getByRole("checkbox", { name: `Unmark ${entry.name} as collected`, exact: true })).toHaveAttribute("aria-checked", "true");
  expect(page.url()).toBe(originalUrl);
});

test("world collection rows remain a single column on each viewport", async ({ page }) => {
  await page.goto(`./#/kh1fm/worlds/${encodeURIComponent(entry.world)}`);
  await expect(page.locator(`#row-${entry.id}`)).toBeVisible();
  await expect(page.getByRole("button", { name: "Compact index", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Location details", exact: true })).toHaveCount(0);
  const boxes = await page.locator(".entry-row").evaluateAll((rows) => rows.map((row) => {
    const box = row.getBoundingClientRect();
    return { left: box.left, top: box.top, bottom: box.bottom, right: box.right };
  }));
  expect(boxes.length).toBeGreaterThan(1);
  for (let index = 1; index < boxes.length; index++) {
    expect(Math.abs(boxes[index].left - boxes[0].left)).toBeLessThanOrEqual(1);
    expect(boxes[index].top).toBeGreaterThanOrEqual(boxes[index - 1].bottom);
  }
  const width = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  expect(width.document).toBeLessThanOrEqual(width.viewport + 1);
});

test("legacy collectible links reveal focused items despite a saved remaining filter", async ({ page }) => {
  await page.goto(`./#/kh1fm/worlds/${encodeURIComponent(entry.world)}`);
  const row = page.locator(`#row-${entry.id}`);
  await row.getByRole("checkbox", { name: `Mark ${entry.name} as collected`, exact: true }).click();
  await expect(page.locator(".save-status")).toHaveText("Progress saved on this device");
  await page.getByLabel("Filter by completion").selectOption("remaining");
  await expect(row).toHaveCount(0);
  await page.goto(`./#/kh1fm/entry/${entry.id}`);
  await expect(page).toHaveURL(new RegExp(`\\?entry=${entry.id}$`));
  await expect(row.locator("h3 button")).toHaveAttribute("aria-expanded", "true");
  await expect(row.locator(".entry-inline-details")).toBeVisible();
  await expect(row.getByRole("checkbox", { name: `Unmark ${entry.name} as collected`, exact: true })).toHaveAttribute("aria-checked", "true");
  await page.reload();
  await expect(row.locator("h3 button")).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: /^Back to / })).toHaveCount(0);
});

test("explicit filters hide expanded completed items while a new check stays readable until collapse", async ({ page }) => {
  await page.goto(`./#/kh1fm/worlds/${encodeURIComponent(entry.world)}`);
  const row = page.locator(`#row-${entry.id}`);
  await row.locator("h3 button").click();
  await row.getByRole("checkbox", { name: `Mark ${entry.name} as collected`, exact: true }).click();
  await page.getByLabel("Filter by completion").selectOption("remaining");
  await expect(row).toHaveCount(0);
  await page.getByLabel("Filter by completion").selectOption("all");
  await row.getByRole("checkbox", { name: `Unmark ${entry.name} as collected`, exact: true }).click();
  await page.getByLabel("Filter by completion").selectOption("remaining");
  await expect(row.locator("h3 button")).toHaveAttribute("aria-expanded", "true");
  await row.getByRole("checkbox", { name: `Mark ${entry.name} as collected`, exact: true }).click();
  await expect(row.locator(".entry-inline-details")).toBeVisible();
  await row.locator("h3 button").click();
  await expect(row).toHaveCount(0);
});

test("following the same Jiminy citation reopens a collapsed focused item", async ({ page }) => {
  await page.goto("./#/kh1fm/contents");
  const launcher = page.getByRole("button", { name: "Open Data Jiminy for Kingdom Hearts Final Mix" });
  await launcher.click();
  await page.getByRole("textbox", { name: "Ask about Kingdom Hearts Final Mix" }).fill("Where are the Torn Pages in Agrabah?");
  await page.getByRole("button", { name: "Ask Data Jiminy", exact: true }).click();
  const citation = page.locator('.answer-citations a[href$="?entry=kh1fm-torn-page-agrabah"]');
  await citation.click();
  const row = page.locator("#row-kh1fm-torn-page-agrabah");
  await expect(row.locator("h3 button")).toHaveAttribute("aria-expanded", "true");
  await row.locator("h3 button").click();
  await expect(row.locator("h3 button")).toHaveAttribute("aria-expanded", "false");
  const currentUrl = page.url();
  await launcher.click();
  await citation.click();
  expect(page.url()).toBe(currentUrl);
  await expect(row.locator("h3 button")).toHaveAttribute("aria-expanded", "true");
  await expect(row.locator(".entry-inline-details")).toBeVisible();
});
