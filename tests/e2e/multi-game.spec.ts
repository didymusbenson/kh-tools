import { test, expect } from "@playwright/test";
const guides = [
  ["kh2fm", "treasures"],
  // BBS uses its character book UI; equivalent persistence/fit coverage is in bbs-ux.spec.ts.
  ["dddhd", "treasures"],
  ["kh02", "treasures"],
  ["kh3", "treasures"],
];
for (const [game, category] of guides)
  test(`${game} collections persist and fit`, async ({ page }) => {
    await page.goto(`./#/${game}/${category}`);
    await expect(page.getByRole("main")).toBeVisible();
    if(['dddhd','kh02','kh3'].includes(game)){
      if(game==='kh3')await page.getByTestId('treasure-grouped-overview').locator('.treasure-group-row button').first().click();
      else await page.locator('.treasure-worlds > a').first().click();
      await expect(page.getByTestId('treasure-board')).toBeVisible();
      const selected=page.locator('[data-treasure-id][aria-pressed=true]');
      const id=await selected.getAttribute('data-treasure-id');expect(id).toBeTruthy();
      const check=page.locator('.treasure-preview:visible .treasure-check input');
      const label=await check.getAttribute('aria-label');
      await expect(check).toBeEnabled();await check.click();
      await expect(page.locator('.treasure-save:visible').first()).toContainText('Marked collected.');await expect(check).toBeChecked();
      await page.locator('.treasure-preview:visible').getByRole('link',{name:'Notes ›',exact:true}).click();
      await expect(page.locator('.treasure-notes:visible')).toBeVisible();
      await page.reload();
      await expect(page.locator('.treasure-notes:visible').getByRole('checkbox',{name:label!,exact:true})).toBeChecked();
      await expect(selected).toHaveAttribute('data-treasure-id',id!);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      if(game!=='dddhd')expect(await page.locator('.digital-stage').evaluate(el=>parseFloat(getComputedStyle(el).paddingBottom))).toBeLessThan(50);
      await page.screenshot({path:`test-results/${test.info().project.name}-${game}-guide.png`});
      if(game!=='dddhd')await expect(page.locator('.jiminy-launcher')).toHaveCount(0);
      return;
    }
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
    page.getByText("Your farming plan is empty for this character.", { exact: true }),
  ).toBeVisible();
});
test("character filters and alias checks share the right records", async ({
  page,
}) => {
  await page.goto("./#/bbsfm/treasures");
  await page
    .getByRole("button", { name: "Terra", exact:true })
    .click();
  await expect(page.locator(".bbs-record-row")).not.toHaveCount(0);
  for (const label of await page
    .locator(".bbs-record-row input")
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
 await expect(page.getByRole('heading',{name:'Dream Eaters',exact:true})).toBeVisible();
 await page.reload();
 await expect(page.locator('.ddd-index-row').first()).toBeVisible();
 await context.setOffline(false);
});
