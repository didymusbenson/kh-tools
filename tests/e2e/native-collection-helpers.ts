import { expect, type Page } from "@playwright/test";

export const kh1Record = (page: Page, id: string) =>
  page.locator(`.kh1-index a[data-record-id="${id}"]`);
export const kh1Row = (page: Page, id: string) =>
  page.locator(`.kh1-index-row:has(a[data-record-id="${id}"])`);

export async function showKh1Overview(page: Page) {
  const overview = page.getByRole("button", { name: "Overview", exact: true });
  if (await overview.isVisible()) await overview.click();
  await expect(page.getByRole("checkbox", { name: "Acquired", exact: true })).toBeVisible();
}

export async function showKh1Notes(page: Page) {
  const notes = page.getByRole("button", { name: "Notes", exact: true });
  if (await notes.isVisible()) await notes.click();
  await expect(page.locator(".entry-details-content")).toBeVisible();
}

/** Visit every native index page and require the complete, exact set of reachable records. */
export async function expectKh1Records(
  page: Page,
  expectedIds: string[],
  checkPage?: () => Promise<void>,
) {
  const ids: string[] = [];
  const visited = new Set<string>();
  const records = page.locator(".kh1-index a[data-record-id]");
  while (true) {
    await expect(records.first()).toBeVisible();
    // Native page capacity is measured after fonts/layout, rather than fixed in the test.
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    });
    expect(visited.has(page.url()), "index pagination must not loop").toBe(false);
    visited.add(page.url());
    const current = await records.evaluateAll(nodes => nodes.map(node => node.getAttribute("data-record-id")!));
    ids.push(...current);
    // A later wrapped title can reduce responsive capacity and overlap an earlier page.
    // Still require every expected ID and reject foreign records or looping navigation.
    expect(expectedIds).toEqual(expect.arrayContaining(current));
    expect(visited.size).toBeLessThanOrEqual(expectedIds.length);
    if (checkPage) await checkPage();
    const next = page.getByRole("link", { name: "Next index page", exact: true });
    if (await next.count() === 0) break;
    await next.click();
    await expect(records.first()).not.toHaveAttribute("data-record-id", current[0]);
  }
  expect([...new Set(ids)].sort()).toEqual([...expectedIds].sort());
  return [...new Set(ids)];
}
