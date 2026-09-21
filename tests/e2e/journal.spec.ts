import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const data = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8"));

test("journal renders, stays within viewport, and shares saved checks between views", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("button", { name: /Kingdom Hearts.*Final Mix, open journal/i })
    .click();
  await expect(
    page.getByRole("heading", { name: "KHFM Journal" }),
  ).toBeVisible();
  const viewport = await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(viewport.scroll).toBeLessThanOrEqual(viewport.width + 1);
  await page.screenshot({
    path: `test-results/${test.info().project.name}-journal.png`,
    fullPage: true,
  });
  const entry = data.entries.find(
    (e: any) => e.category === "dalmatian" && e.checkable,
  );
  await page.goto(`./#/kh1fm/worlds/${encodeURIComponent(entry.world)}`);
  const check = page.getByRole("checkbox", {
    name: `Mark ${entry.name} as collected`,
    exact: true,
  });
  await check.click();
  await expect(
    page.getByRole("checkbox", {
      name: `Unmark ${entry.name} as collected`,
      exact: true,
    }),
  ).toHaveAttribute("aria-checked", "true");
  await page.goto(`./#/kh1fm/entry/${entry.id}`);
  await expect(page.locator('a[href^="https://"]')).toHaveCount(0);
  await expect(page.locator(".source-list, .record-id")).toHaveCount(0);
  await page.screenshot({
    path: `test-results/${test.info().project.name}-entry-final.png`,
    fullPage: true,
  });
  await expect(
    page.getByRole("checkbox", {
      name: `Unmark ${entry.name} as collected`,
      exact: true,
    }),
  ).toHaveAttribute("aria-checked", "true");
  await page.reload();
  await expect(
    page.getByRole("checkbox", {
      name: `Unmark ${entry.name} as collected`,
      exact: true,
    }),
  ).toHaveAttribute("aria-checked", "true");
  await page
    .getByRole("checkbox", {
      name: `Unmark ${entry.name} as collected`,
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("checkbox", {
      name: `Mark ${entry.name} as collected`,
      exact: true,
    }),
  ).toHaveAttribute("aria-checked", "false");
});

test("synthesis preserves stock and catalog independently across restart", async ({
  page,
}) => {
  await page.goto("./#/kh1fm/synthesis/materials");
  await page.getByRole("checkbox", { name: "Track owned materials" }).check();
  const stock = page.getByRole("textbox", {
    name: "Spirit Shard owned stock; blank means unknown",
    exact: true,
  });
  await stock.fill("8");
  await stock.press("Tab");
  await page.goto("./#/kh1fm/synthesis/recipes");
  await page
    .getByRole("searchbox", { name: "Find a synthesis recipe" })
    .fill("Energy Bangle");
  const card = page.locator(".recipe-card").filter({
    has: page.getByRole("button", { name: "Energy Bangle", exact: true }),
  });
  const recipeToggle = card.getByRole("button", { name: "Energy Bangle", exact: true });
  if (await recipeToggle.getAttribute("aria-expanded") !== "true") await recipeToggle.click();
  await expect(
    card.getByLabel("8 owned, 2 required; 0 remaining", { exact: true }),
  ).toBeVisible();
  await card
    .getByRole("checkbox", { name: "Mark Energy Bangle as crafted" })
    .click();
  await card
    .getByRole("button", { name: "Add one Energy Bangle to plan" })
    .click();
  await expect(card.getByRole("textbox", { name: "Energy Bangle craft plan quantity", exact: true })).toHaveValue("1");
  await expect(page.locator(".save-status")).toHaveText("Progress saved on this device");
  await page.reload();
  await page
    .getByRole("searchbox", { name: "Find a synthesis recipe" })
    .fill("Energy Bangle");
  await expect(
    card.getByRole("checkbox", { name: "Unmark Energy Bangle as crafted" }),
  ).toHaveAttribute("aria-checked", "true");
  if (await recipeToggle.getAttribute("aria-expanded") !== "true") await recipeToggle.click();
  await expect(
    card.getByLabel("8 owned, 2 required; 0 remaining", { exact: true }),
  ).toBeVisible();
  await expect(
    card.getByRole("textbox", {
      name: "Energy Bangle craft plan quantity",
      exact: true,
    }),
  ).toHaveValue("1");
  await page.screenshot({
    path: `test-results/${test.info().project.name}-synthesis.png`,
    fullPage: true,
  });
});

test("installed guide cold-reloads offline", async ({ page, context }) => {
  await page.goto("./#/kh1fm/contents");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect
    .poll(() =>
      page.evaluate(() => Boolean(navigator.serviceWorker.controller)),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page.evaluate(async () =>
        (await caches.keys()).some((key) => key.startsWith("workbox-precache")),
      ),
    )
    .toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "KHFM Journal" }),
  ).toBeVisible();
  await page.goto("./#/kh1fm/synthesis/recipes");
  await expect(
    page.getByRole("heading", { name: "Synthesis" }),
  ).toBeVisible();
});

test("the cover resumes the last saved journal page", async ({ page }) => {
  await page.goto("./#/kh1fm/synthesis/recipes");
  await expect(
    page.getByRole("heading", { name: "Synthesis" }),
  ).toBeVisible();
  await expect(page.locator(".save-status")).toContainText(
    "Progress saved on this device",
  );
  await page.getByRole("link", { name: "Ars Arcanum game selection" }).click();
  await expect(
    page.getByRole("link", { name: "Resume last page" }),
  ).toHaveAttribute("href", "#/kh1fm/synthesis/recipes");
  await page.reload();
  await page.getByRole("link", { name: "Resume last page" }).click();
  await expect(
    page.getByRole("heading", { name: "Synthesis" }),
  ).toBeVisible();
});
