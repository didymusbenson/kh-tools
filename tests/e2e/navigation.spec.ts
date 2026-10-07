import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import type { GameData } from "../../src/domain/types";
import { expectKh1Records, kh1Record, showKh1Overview } from "./native-collection-helpers";

const data: GameData = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8"));
const entry = data.entries.find(item => item.category === "trinity" && item.checkable)!;

test("world hub opens a complete world-scoped record index", async ({ page }) => {
  await page.goto("./#/kh1fm/worlds");
  // The native heading includes a decorative CSS numeral in its accessible name.
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Worlds");
  await page.locator(`a[href="#/kh1fm/worlds/${encodeURIComponent(entry.world!)}"]`).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(entry.world!);
  const expected = data.entries.filter(item => item.world === entry.world);
  await expectKh1Records(page, expected.map(item => item.id));

  // Saved collection links still select the world even though world indexes no longer have shortcut cards.
  await page.goto(`./#/kh1fm/trinities?world=${encodeURIComponent(entry.world!)}`);
  await expect(page.getByRole("combobox", { name: "Filter by world", exact: true })).toHaveValue(entry.world!);
  await expectKh1Records(page, expected.filter(item => item.category === "trinity").map(item => item.id));
});

test("collection indexes browse all worlds and filter to one world", async ({ page }) => {
  const trinities = data.entries.filter(item => item.category === "trinity");
  const other = trinities.find(item => item.world !== entry.world)!;
  await page.goto("./#/kh1fm/trinities");
  await expectKh1Records(page, trinities.map(item => item.id));
  await page.getByRole("combobox", { name: "Filter by world", exact: true }).selectOption(other.world!);
  await expect(kh1Record(page, entry.id)).toHaveCount(0);
  await expect(kh1Record(page, other.id)).toBeVisible();
  await expectKh1Records(page, trinities.filter(item => item.world === other.world).map(item => item.id));
});

test("treasure overview exposes a usable postcard collection shortcut", async ({ page }) => {
  await page.goto("./#/kh1fm/treasures");
  await expect(page.getByTestId("treasure-summary")).toBeVisible();
  const postcards = page.getByRole("link", { name: "Postcard collection ›", exact: true });
  await page.screenshot({ path: test.info().outputPath("postcard-overview.png") });
  // Keep this visibility assertion: the current phone overview hides the only shortcut.
  await expect(postcards).toBeVisible();
  await postcards.click();
  await expectKh1Records(page, data.entries.filter(item => item.category === "postcard").map(item => item.id));
});

test("postcard deep links expose every record on each viewport", async ({ page }) => {
  await page.goto("./#/kh1fm/treasures?list=postcards");
  await expectKh1Records(page, data.entries.filter(item => item.category === "postcard").map(item => item.id));
});

test("challenge indexes keep achievements in their own collection", async ({ page }) => {
  await page.goto("./#/kh1fm/challenges");
  await expectKh1Records(page, data.entries.filter(item => ["cup", "boss", "minigame", "gummi"].includes(item.category)).map(item => item.id));
  await page.goto("./#/kh1fm/achievements");
  await expectKh1Records(page, data.entries.filter(item => item.category === "achievement").map(item => item.id));
});

test("contents and legacy world entry routes retain navigation and entry focus", async ({ page }) => {
  await page.goto("./#/kh1fm/contents");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Contents");
  const trinityLink = page.locator('main a[href="#/kh1fm/trinities"]');
  await expect(trinityLink).toBeVisible();
  await trinityLink.click();
  await expect(kh1Record(page, entry.id)).toBeVisible();

  const worldRoute = `#/kh1fm/worlds/${encodeURIComponent(entry.world!)}`;
  await page.goto(`./${worldRoute}?entry=${entry.id}`);
  await expect(page.locator(".entry-details-content")).toContainText(entry.instructions!);
  await showKh1Overview(page);
  await page.getByRole("link", { name: "‹ Return to index", exact: true }).click();
  expect(new URL(page.url()).hash).toBe(worldRoute);
  await expect(kh1Record(page, entry.id)).toBeVisible();
  await expect(kh1Record(page, entry.id)).toBeFocused();
});

test("cover resumes a collection type with its selected world", async ({ page }) => {
  const hash = `#/kh1fm/trinities?world=${encodeURIComponent(entry.world!)}`;
  await page.goto(`./${hash}`);
  await expect(page.getByRole("combobox", { name: "Filter by world", exact: true })).toHaveValue(entry.world!);
  await expect(page.getByRole("status").filter({ hasText: "Progress saved on this device" })).toHaveText("Progress saved on this device");
  await page.getByRole("button", { name: "Tools", exact: true }).click();
  await page.getByRole("link", { name: "‹ Ars Arcanum home", exact: true }).click();
  await expect(page.getByRole("link", { name: "Resume last page", exact: true })).toHaveAttribute("href", hash);
  await page.reload();
  await page.getByRole("link", { name: "Resume last page", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "Filter by world", exact: true })).toHaveValue(entry.world!);
  await expect(kh1Record(page, entry.id)).toBeVisible();
});
