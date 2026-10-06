import { test, expect } from "@playwright/test";
test("anchored game choices preview the original artwork with keyboard focus", async ({
  page,
}) => {
  await page.goto("./");
  const first = page.getByRole("button", {
    name: /Kingdom Hearts Final Mix, open journal/,
  });
  await expect(page.locator(".game-artwork")).toHaveAttribute(
    "src",
    /khfm\.jpg$/,
  );
  await page.screenshot({
    path: test.info().outputPath("cover-final.png"),
    fullPage: true,
    animations: "disabled",
  });
  const before = await first.boundingBox();
  await page
    .getByRole("button", {
      name: /Birth by Sleep Final Mix, open journal/,
    })
    .focus();
  await expect(page.locator(".game-artwork")).toHaveAttribute(
    "src",
    /bbs\.jpg$/,
  );
  const after = await first.boundingBox();
  expect(after?.y).toBe(before?.y);
  await expect(
    page.getByRole("button", { name: /Open Data Jiminy/ }),
  ).toHaveCount(0);
});
test("journal skip link, launcher safe region, and primary touch target", async ({
  page,
}) => {
  await page.goto("./#/kh1fm/worlds");
  await expect(
    page.getByRole("heading", { name: "Worlds" }),
  ).toBeVisible();
  const skip = page.getByRole("link", { name: "Skip to journal" });
  await skip.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#\/kh1fm\/worlds$/);
  await expect(page.locator("#kh1-reading")).toBeFocused();
  const launcher = page.getByRole("button", {
    name: "Open Data Jiminy for Kingdom Hearts Final Mix",
  });
  const button = await launcher.boundingBox();
  expect(button!.width).toBeGreaterThanOrEqual(44);
  expect.soft(button!.height, "The primary Jiminy control must retain a 44px touch target").toBeGreaterThanOrEqual(44);
  // Jiminy is now integrated into the header, not floating beside the paper.
  // Keep the substantive safe-region guarantee: it cannot cover the reading area.
  const geometry = await page.evaluate(() => {
    const reading = document.querySelector("#kh1-reading")!.getBoundingClientRect();
    const launcher = document.querySelector(".jiminy-launcher")!.getBoundingClientRect();
    return {
      width: innerWidth, scroll: document.documentElement.scrollWidth,
      readingTop: reading.top, launcherBottom: launcher.bottom,
      launcherLeft: launcher.left, launcherRight: launcher.right,
    };
  });
  expect(geometry.scroll).toBeLessThanOrEqual(geometry.width + 1);
  expect(geometry.launcherBottom).toBeLessThanOrEqual(geometry.readingTop);
  expect(geometry.launcherLeft).toBeGreaterThanOrEqual(0);
  expect(geometry.launcherRight).toBeLessThanOrEqual(geometry.width);
  await launcher.click();
  await expect(
    page.getByRole("dialog", { name: "Data Jiminy", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(launcher).toBeFocused();
  await page.screenshot({ path: test.info().outputPath("journal-jiminy-target.png") });
});
