import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const data = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8"));
const entry = data.entries.find((item: any) => item.category === "trinity" && item.checkable);

test("world hub opens an overview whose collection links select that world", async ({ page }) => {
  await page.goto("./#/kh1fm/worlds");
  await expect(page.getByRole("heading", { name: "Worlds", exact: true })).toBeVisible();
  await page.locator(`a[href="#/kh1fm/worlds/${encodeURIComponent(entry.world)}"]`).first().click();
  await expect(page.getByRole("heading", { name: entry.world, exact: true })).toBeVisible();
  await page.locator(`a[href="#/kh1fm/trinities?world=${encodeURIComponent(entry.world)}"]`).first().click();
  await expect(page.getByRole("combobox", { name: "Filter by world", exact: true })).toHaveValue(entry.world);
  await expect(page.locator(`#row-${entry.id}`)).toBeVisible();
  const visibleIds = await page.locator(".entry-row").evaluateAll((rows) => rows.map((row) => row.id.replace(/^row-/, "")));
  expect(visibleIds.length).toBeGreaterThan(0);
  expect(visibleIds.every((id) => data.entries.find((item: any) => item.id === id)?.world === entry.world)).toBe(true);
});

test("collection type pages browse across worlds and keep achievements separate", async ({ page }) => {
  await page.goto("./#/kh1fm/trinities");
  const other = data.entries.find((item: any) => item.category === "trinity" && item.world !== entry.world);
  await expect(page.locator(`#row-${entry.id}`)).toBeVisible();
  await expect(page.locator(`#row-${other.id}`)).toBeVisible();
  await page.getByRole("combobox", { name: "Filter by world", exact: true }).selectOption(other.world);
  await expect(page.locator(`#row-${entry.id}`)).toHaveCount(0);
  await expect(page.locator(`#row-${other.id}`)).toBeVisible();
  await page.goto("./#/kh1fm/treasures");
  const postcard = data.entries.find((item: any) => item.category === "postcard");
  await expect(page.locator(`#row-${postcard.id}`)).toBeVisible();
  const achievement = data.entries.find((item: any) => item.category === "achievement");
  await page.goto("./#/kh1fm/challenges");
  await expect(page.locator(`#row-${achievement.id}`)).toHaveCount(0);
  await page.goto("./#/kh1fm/achievements");
  await expect(page.locator(`#row-${achievement.id}`)).toBeVisible();
});

test("legacy contents and world entry routes reach the new canonical pages", async ({ page }) => {
  await page.goto("./#/kh1fm/contents");
  await expect(page).toHaveURL(/#\/kh1fm\/worlds$/);
  await expect(page.getByRole("heading", { name: "Worlds", exact: true })).toBeVisible();
  await page.goto(`./#/kh1fm/worlds/${encodeURIComponent(entry.world)}?entry=${entry.id}`);
  await expect(page).toHaveURL(new RegExp(`#/kh1fm/trinities\\?entry=${entry.id}$`));
  await expect(page.locator(`#row-${entry.id} h3 button`)).toHaveAttribute("aria-expanded", "true");
});

test("cover resumes a collection type with its selected world", async ({ page }) => {
  const hash = `#/kh1fm/trinities?world=${encodeURIComponent(entry.world)}`;
  await page.goto(`./${hash}`);
  await expect(page.getByRole("combobox", { name: "Filter by world", exact: true })).toHaveValue(entry.world);
  await expect(page.locator(".save-status")).toHaveText("Progress saved on this device");
  await page.getByRole("link", { name: "Ars Arcanum game selection" }).click();
  await expect(page.getByRole("link", { name: "Resume last page", exact: true })).toHaveAttribute("href", hash);
  await page.reload();
  await page.getByRole("link", { name: "Resume last page", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "Filter by world", exact: true })).toHaveValue(entry.world);
  await expect(page.locator(`#row-${entry.id}`)).toBeVisible();
});
