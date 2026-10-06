import { expect, type Locator, type Page } from "@playwright/test";

/** Native notes are clipped columns: DOM visibility alone does not mean readable. */
export async function revealJournalNote(page: Page, target: Locator) {
  await expect(target).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
  const notes = page.locator(".kh1-leaf-right .kh1-note-pages");
  const pagination = notes.getByRole("navigation", { name: "Notes pages", exact: true });
  while (true) {
    const readable = await target.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const window = element.closest(".kh1-note-window")!.getBoundingClientRect();
      return bounds.left >= window.left - 1 && bounds.right <= window.right + 1
        && bounds.top >= window.top - 1 && bounds.bottom <= window.bottom + 1;
    });
    if (readable) {
      await expect(target).toBeInViewport({ ratio: 1 });
      return;
    }
    const next = pagination.getByRole("button", { name: "Next notes page", exact: true });
    await expect(next, "The requested note must be reachable through the native page controls.").toBeEnabled();
    const before = await pagination.innerText();
    await next.click();
    await expect(pagination).not.toHaveText(before);
  }
}
