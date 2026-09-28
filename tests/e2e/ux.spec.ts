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
    path: `test-results/${test.info().project.name}-cover-final.png`,
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
  const skip = page.getByRole("link", { name: "Skip to journal content" });
  await skip.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#\/kh1fm\/worlds$/);
  await expect(page.locator("#journal-main")).toBeFocused();
  const launcher = page.getByRole("button", {
    name: "Open Data Jiminy for Kingdom Hearts Final Mix",
  });
  const button = await launcher.boundingBox();
  expect(button!.width).toBeGreaterThanOrEqual(44);
  expect(button!.height).toBeGreaterThanOrEqual(44);
  const geometry = await page.evaluate(() => {
    const shell = document
        .querySelector(".journal-shell")!
        .getBoundingClientRect(),
      paper = document.querySelector(".journal-page")!.getBoundingClientRect(),
      launcher = document
        .querySelector(".jiminy-launcher")!
        .getBoundingClientRect();
    return {
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      shellBottom: shell.bottom,
      paperRight: paper.right,
      launcherLeft: launcher.left,
      launcherTop: launcher.top,
    };
  });
  expect(geometry.scroll).toBeLessThanOrEqual(geometry.width + 1);
  if (geometry.width <= 650)
    expect(geometry.shellBottom).toBeLessThanOrEqual(geometry.launcherTop);
  else expect(geometry.paperRight).toBeLessThan(geometry.launcherLeft);
  await launcher.click();
  await expect(
    page.getByRole("dialog", { name: "Data Jiminy", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(launcher).toBeFocused();
});
