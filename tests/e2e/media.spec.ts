import { test, expect } from "@playwright/test";
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
    page.getByRole("heading", { name: entry.name, exact: true }),
  ).toBeVisible();
  return entry;
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
  await expect(page.locator(".entry-detail-main")).toContainText(
    entry.instructions,
  );
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
  await expect(
    page.getByText("Synthetic desktop fixture", { exact: false }).first(),
  ).toBeVisible();
  const open = page.getByRole("button", {
    name: "Enlarge screenshot: Synthetic path fixture",
  });
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
  await expect(
    page.getByText("Follow the marked path to the upper platform."),
  ).toBeVisible();
  const width = await page.evaluate(() => ({
    viewport: innerWidth,
    actual: document.documentElement.scrollWidth,
  }));
  expect(width.actual).toBeLessThanOrEqual(width.viewport + 1);
  await page.screenshot({
    path: `test-results/${test.info().project.name}-media.png`,
    fullPage: true,
  });
});
test("unavailable optional image keeps location directions readable", async ({
  page,
}) => {
  await page.route("**/missing-fixture.png", (route) => route.abort());
  const entry = await fixture(page, [{ ...image, src: "missing-fixture.png" }]);
  await expect(
    page.getByText(/Image unavailable. If you’re offline/),
  ).toBeVisible();
  await expect(page.locator(".entry-detail-main")).toContainText(
    entry.instructions,
  );
});
