import { test, expect } from "@playwright/test";
test("BBS campaign applies to hubs, collectibles and reload", async ({
  page,
}) => {
  await page.goto("./#/bbsfm/worlds");
  const campaign = page.getByRole("combobox", {
    name: "Campaign",
    exact: true,
  });
  await expect(campaign).toHaveValue("Terra");
  await campaign.selectOption("Ventus");
  await page.getByRole("link", { name: /Land of Departure/ }).click();
  const treasures = page
    .locator(".guide-world-links a")
    .filter({ hasText: "Treasures" });
  const count = await treasures.locator("span").textContent();
  await treasures.click();
  await expect(page.locator(".guide-title>span")).toHaveText(count!);
  for (const label of await page
    .locator(".guide-check input")
    .evaluateAll((a) => a.map((e) => e.getAttribute("aria-label"))))
    expect(label).toContain("Ventus");
  await page.reload();
  await expect(campaign).toHaveValue("Ventus");
  await campaign.selectOption("Aqua · Secret Episode");
  await page.goto("./#/bbsfm/keyblades");
  await expect(
    page.getByText("Master's Defender", { exact: true }).first(),
  ).toBeVisible();
});
test("BBS separates melding from ice cream and searches abilities", async ({
  page,
}) => {
  await page.goto("./#/bbsfm/workshop/recipes");
  await expect(page.getByRole("combobox", { name: "Recipe type" })).toHaveValue(
    "Command melding",
  );
  await page
    .getByRole("textbox", { name: "Find a recipe" })
    .fill("Leaf Bracer");
  await expect(page.locator(".bbs-meld-inputs").first()).toBeVisible();
  await expect(page.locator(".bbs-meld-outcomes").first()).toContainText("%");
  await page.getByRole("textbox", { name: "Find a recipe" }).fill("");
  await page
    .getByRole("combobox", { name: "Recipe type" })
    .selectOption("Ice cream");
  await expect(page.locator(".guide-row")).toHaveCount(8);
  await page
    .getByRole("button", { name: "Add to farming plan", exact: true })
    .first()
    .click();
  await page.getByRole("link", { name: "Farming Plan", exact: true }).click();
  await expect(page.locator(".guide-row").first()).toBeVisible();
  await page
    .getByRole("combobox", { name: "Campaign", exact: true })
    .selectOption("Aqua");
  await expect(
    page.getByText("Your farming plan is empty.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Campaign", exact: true })
    .selectOption("Terra");
  await expect(page.locator(".guide-row").first()).toBeVisible();
});
