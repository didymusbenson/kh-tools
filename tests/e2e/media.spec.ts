import { test, expect, type Page, type Locator } from "@playwright/test";
import { readFileSync } from "node:fs";
test.use({ serviceWorkers: "block" });
const original = JSON.parse(readFileSync("public/data/kh1fm.json", "utf8"));
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="#daf0cd"/><path d="M80 350L360 170L680 100" fill="none" stroke="#345d43" stroke-width="18"/><text x="45" y="60" font-size="32">Synthetic UI fixture — not game content</text></svg>';
async function fixture(page: any, media: any[]) {
  const data = structuredClone(original);
  const entry = data.entries.find((e: any) => e.collectible);
  entry.media = media;
  await page.route("**/data/kh1fm.json", (route: any) =>
    route.fulfill({ json: data }),
  );
  await page.route("**/test-fixture.svg", (route: any) =>
    route.fulfill({ contentType: "image/svg+xml", body: svg }),
  );
  await page.goto(`./#/kh1fm/entry/${entry.id}`);
  await expect(
    page.locator(".entry-details-content"),
  ).toBeVisible();
  return entry;
}
// Notes are clipped into genuine book pages; visit each target's page before
// asserting visibility or interacting, rather than reading off-page DOM content.
async function turnTo(page: Page, target: Locator) {
  const leaf = page.locator(".kh1-leaf-right");
  for (let turn = 0; turn < 40; turn++) {
    const box = await target.boundingBox();
    const window = await leaf.locator(".kh1-note-window").boundingBox();
    if (box && window && box.x >= window.x - 1 &&
      box.x + box.width <= window.x + window.width + 1 &&
      box.y >= window.y - 1 && box.y + box.height <= window.y + window.height + 1) return;
    const next = leaf.getByRole("button", { name: "Next notes page" });
    await expect(next, "Media content must be reachable through the note pages").toBeEnabled();
    await next.click();
  }
  throw new Error("Media content was not reachable through the note pages");
}
const image = {
  id: "synthetic-screenshot",
  kind: "screenshot",
  src: "test-fixture.svg",
  alt: "Synthetic path fixture",
  caption: "Test location view",
  width: 800,
  height: 450,
  ruleset: "Final Mix",
  platform: "Synthetic desktop fixture",
  provenance: "Project-owned test SVG",
  rights: "approved",
};
test("entry without media has no empty gallery", async ({ page }) => {
  const entry = await fixture(page, []);
  await expect(
    page.getByRole("region", { name: "Location images and maps" }),
  ).toHaveCount(0);
  const directions = page.getByText(entry.instructions, { exact: true });
  const previous = page.locator(".kh1-leaf-right").getByRole("button", { name: "Previous notes page" });
  while (await previous.isEnabled()) await previous.click();
  await turnTo(page, directions);
  await expect(directions).toBeVisible();
});
test("image and map captions, zoom, focus restoration, and unclipped phone layout", async ({
  page,
}) => {
  await fixture(page, [
    image,
    {
      ...image,
      id: "synthetic-map",
      kind: "map",
      caption: "Test map view",
      annotations: [
        {
          id: "a",
          x: 45,
          y: 38,
          label: "Follow the marked path to the upper platform.",
        },
      ],
    },
  ]);
  const platform = page.getByText("Synthetic desktop fixture", { exact: false }).first();
  await turnTo(page, platform);
  await expect(platform).toBeVisible();
  const open = page.getByRole("button", {
    name: "Enlarge screenshot: Synthetic path fixture",
  });
  // Rewind because the platform caption may be on the following notes page.
  const previous = page.locator(".kh1-leaf-right").getByRole("button", { name: "Previous notes page" });
  while (await previous.isEnabled()) await previous.click();
  await turnTo(page, open);
  await open.click();
  const modal = page.getByRole("dialog", {
    name: "Enlarged screenshot: Synthetic path fixture",
  });
  await expect(modal).toBeVisible();
  await expect(
    modal.getByRole("button", { name: "Close image" }),
  ).toBeFocused();
  await modal.getByRole("slider", { name: "Image zoom" }).fill("2");
  await expect(modal.getByText("200%", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(open).toBeFocused();
  const annotation = page.getByText("Follow the marked path to the upper platform.");
  await turnTo(page, annotation);
  await expect(annotation).toBeVisible();
  const width = await page.evaluate(() => ({
    viewport: innerWidth,
    actual: document.documentElement.scrollWidth,
  }));
  expect(width.actual).toBeLessThanOrEqual(width.viewport + 1);
  await page.screenshot({
    path: test.info().outputPath("media.png"),
    fullPage: true,
  });
});
test("unavailable optional image keeps location directions readable", async ({
  page,
}) => {
  await page.route("**/missing-fixture.png", (route) => route.abort());
  const entry = await fixture(page, [{ ...image, src: "missing-fixture.png" }]);
  const fallback = page.getByText(/Image unavailable. If you’re offline/);
  // Visit the gallery to trigger the lazy image request, then inspect fallback.
  await turnTo(page, page.getByRole("region", { name: "Location images and maps" }));
  await expect(fallback).toBeVisible();
  const directions = page.getByText(entry.instructions, { exact: true });
  const previous = page.locator(".kh1-leaf-right").getByRole("button", { name: "Previous notes page" });
  while (await previous.isEnabled()) await previous.click();
  await turnTo(page, directions);
  await expect(directions).toBeVisible();
});
