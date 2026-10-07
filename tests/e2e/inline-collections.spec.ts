import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import type { GameData } from "../../src/domain/types";
import { expectKh1Records, kh1Record, kh1Row, showKh1Notes, showKh1Overview } from "./native-collection-helpers";

const data: GameData = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8"));
const entry = data.entries.find(item => item.category === "trinity" && item.checkable)!;
const indexRoute = `./#/kh1fm/trinities?world=${encodeURIComponent(entry.world!)}`;
const statusFilter = (page: import("@playwright/test").Page) =>
  page.getByRole("combobox", { name: "Filter by collection status", exact: true });

test("category records open by keyboard and restore index focus and acquired state", async ({ page }) => {
  await page.goto(indexRoute);
  // Initial route/player hydration schedules focus on the reading area. Wait for
  // that startup focus before beginning the explicit keyboard navigation journey.
  await expect(page.locator(".journal-footer-save")).toHaveAttribute("title", "Progress saved on this device");
  await expect(page.locator("#kh1-reading")).toBeFocused();
  const record = kh1Record(page, entry.id);
  const originalUrl = page.url();
  await record.focus();
  await expect(record).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator(".entry-details-content")).toContainText(entry.instructions!);
  expect(new URLSearchParams(page.url().split("?")[1]).get("entry")).toBe(entry.id);

  // The native reading page replaces inline expansion and bulk expand/collapse.
  await showKh1Overview(page);
  const acquired = page.getByRole("checkbox", { name: "Acquired", exact: true });
  await acquired.focus();
  await page.keyboard.press("Space");
  await expect(acquired).toBeChecked();
  const back = page.getByRole("link", { name: "‹ Return to index", exact: true });
  await back.focus();
  await page.keyboard.press("Enter");
  await expect(record).toBeVisible();
  expect(new URL(page.url()).hash.split("?")[0]).toBe(new URL(originalUrl).hash.split("?")[0]);
  expect([...new URLSearchParams(page.url().split("?")[1])]).toEqual([...new URLSearchParams(originalUrl.split("?")[1])]);
  await expect(record).toBeFocused();
  await expect(kh1Row(page, entry.id).getByRole("checkbox")).toBeChecked();
  await page.reload();
  await expect(kh1Row(page, entry.id).getByRole("checkbox")).toBeChecked();
});

test("world collection pages expose every record in a single column on each viewport", async ({ page }) => {
  await page.goto(indexRoute);
  const expected = data.entries.filter(item => item.category === "trinity" && item.world === entry.world);
  await expect(page.getByRole("button", { name: "Compact index", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Location details", exact: true })).toHaveCount(0);
  await expect.poll(() => page.locator(".kh1-index-row").count()).toBeGreaterThan(1);
  await expectKh1Records(page, expected.map(item => item.id), async () => {
    const boxes = await page.locator(".kh1-index-row").evaluateAll(rows => rows.map(row => {
      const box = row.getBoundingClientRect();
      return { left: box.left, top: box.top, bottom: box.bottom, right: box.right };
    }));
    expect(boxes.length).toBeGreaterThan(0);
    for (let index = 1; index < boxes.length; index++) {
      expect(Math.abs(boxes[index].left - boxes[0].left)).toBeLessThanOrEqual(1);
      expect(boxes[index].top).toBeGreaterThanOrEqual(boxes[index - 1].bottom);
    }
    const width = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
    expect(width.document).toBeLessThanOrEqual(width.viewport + 1);
  });
});

test("legacy collectible links reveal acquired records despite a remaining filter", async ({ page }) => {
  await page.goto(indexRoute);
  await kh1Row(page, entry.id).getByRole("checkbox").check();
  await expect(kh1Row(page, entry.id).getByRole("checkbox")).toBeChecked();
  await statusFilter(page).selectOption("remaining");
  await expect(kh1Record(page, entry.id)).toHaveCount(0);
  await page.reload();
  await expect(statusFilter(page)).toHaveValue("remaining");
  await expect(kh1Record(page, entry.id)).toHaveCount(0);

  // Both historical entry routes and explicit filtered deep links remain usable.
  for (const route of [
    `./#/kh1fm/entry/${entry.id}`,
    `./#/kh1fm/trinities?status=remaining&entry=${entry.id}`,
  ]) {
    await page.goto(route);
    await expect(page.locator(".entry-details-content")).toContainText(entry.instructions!);
    await showKh1Overview(page);
    await expect(page.getByRole("checkbox", { name: "Acquired", exact: true })).toBeChecked();
    await page.reload();
    await expect(page.locator(".entry-details-content")).toContainText(entry.instructions!);
    await showKh1Overview(page);
    await expect(page.getByRole("checkbox", { name: "Acquired", exact: true })).toBeChecked();
  }
});

test("remaining filters hide acquired records after returning from readable notes", async ({ page }) => {
  await page.goto(indexRoute);
  await kh1Row(page, entry.id).getByRole("checkbox").check();
  await statusFilter(page).selectOption("remaining");
  await expect(kh1Record(page, entry.id)).toHaveCount(0);
  await statusFilter(page).selectOption("");
  await expect(kh1Record(page, entry.id)).toBeVisible();
  await kh1Row(page, entry.id).getByRole("checkbox").uncheck();
  await statusFilter(page).selectOption("remaining");
  await expect(kh1Record(page, entry.id)).toBeVisible();
  await kh1Record(page, entry.id).click();
  await expect(page.locator(".entry-details-content")).toContainText(entry.instructions!);
  await showKh1Overview(page);
  await page.getByRole("checkbox", { name: "Acquired", exact: true }).check();
  await showKh1Notes(page);
  await expect(page.locator(".entry-details-content")).toContainText(entry.instructions!);
  await showKh1Overview(page);
  await page.getByRole("link", { name: "‹ Return to index", exact: true }).click();
  await expect(statusFilter(page)).toHaveValue("remaining");
  await expect(kh1Record(page, entry.id)).toHaveCount(0);
});
