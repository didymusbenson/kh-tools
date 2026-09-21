import { test, expect } from "@playwright/test";
const guides = [
  ["kh2fm", "treasures"],
  ["bbsfm", "treasures"],
  ["dddhd", "treasures"],
  ["kh02", "treasures"],
  ["kh3", "treasures"],
];
for (const [game, category] of guides)
  test(`${game} collections persist and fit`, async ({ page }) => {
    await page.goto(`./#/${game}/${category}`);
    await expect(page.getByRole("main")).toBeVisible();
    const check = page.locator(".guide-check input").first();
    await expect(check).toBeEnabled();
    const rowId = await page.locator(".guide-row").first().getAttribute("id");
    await check.check();
    await expect(check).toBeChecked();
    await page.locator(".guide-expand").first().click();
    await expect(page.locator(".guide-details").first()).toBeVisible();
    await page.reload();
    await expect(
      page.locator(`[id="${rowId}"] input[type=checkbox]`),
    ).toBeChecked();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(await page.locator(".multi-guide").evaluate(el => parseFloat(getComputedStyle(el).paddingBottom))).toBeLessThan(50);
    await page.screenshot({
      path: `test-results/${test.info().project.name}-${game}-guide.png`,
    });
    await expect(page.locator(".jiminy-launcher")).toHaveCount(0);
  });
test("workshop uses material targets, inline sources and isolated games", async ({
  page,
}) => {
  await page.goto("./#/kh2fm/workshop/recipes");
  const add = page
    .getByRole("button", { name: "Add to farming plan", exact: true })
    .first();
  await expect(add).toBeEnabled();
  await add.click();
  await add.click();
  await page.getByRole("link", { name: "Farming Plan", exact: true }).click();
  await expect(
    page.locator('input[aria-label^="Target "]').first(),
  ).toBeVisible();
  const target = page.locator('input[aria-label^="Target "]').first(),
    owned = page.locator('input[aria-label^="Owned "]').first();
  const n = Number(await target.inputValue());
  expect(n).toBeGreaterThan(1);
  await owned.fill("1");
  await expect(owned).toHaveValue("1");
  await page
    .getByRole("button", { name: "More info", exact: true })
    .first()
    .click();
  await expect(page.locator(".guide-details").first()).toBeVisible();
  await page.reload();
  await expect(page.locator('input[aria-label^="Owned "]').first()).toHaveValue(
    "1",
  );
  await page.goto("./#/bbsfm/workshop/plan");
  await expect(
    page.getByText("Your farming plan is empty.", { exact: false }),
  ).toBeVisible();
});
test("character filters and alias checks share the right records", async ({
  page,
}) => {
  await page.goto("./#/bbsfm/treasures");
  await page
    .getByRole("combobox", { name: "Filter by character" })
    .selectOption("Terra");
  await expect(page.locator(".guide-row")).not.toHaveCount(0);
  for (const label of await page
    .locator(".guide-check input")
    .evaluateAll((inputs) =>
      inputs.map((input) => input.getAttribute("aria-label")),
    ))
    expect(label).toContain("Terra");
  await page.goto("./#/kh2fm/pages");
  const check = page.locator(".guide-check input").first();
  await expect(check).toBeEnabled();
  const label = await check.getAttribute("aria-label");
  await check.check();
  await page.goto("./#/kh2fm/treasures");
  await expect(
    page.getByRole("checkbox", { name: label!, exact: true }),
  ).toBeChecked();
});

test('new journals can reopen cached content offline',async({page,context})=>{
 await page.goto('./#/kh02/worlds');
 await page.evaluate(async()=>{await navigator.serviceWorker.ready});
 await page.reload();
 await expect(page.getByRole('heading',{name:'Worlds',exact:true})).toBeVisible();
 await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
 await context.setOffline(true);
 await page.goto('./#/dddhd/spirits');
 await expect(page.getByRole('heading',{name:'Spirits',exact:true})).toBeVisible();
 await page.reload();
 await expect(page.locator('.guide-row').first()).toBeVisible();
 await context.setOffline(false);
});
