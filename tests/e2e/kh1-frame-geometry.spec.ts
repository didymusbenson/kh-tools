import { expect, test, type Locator } from '@playwright/test';

test.use({ serviceWorkers: 'block' });

async function containedControl(control: Locator, frame: Locator) {
  await expect(control).toBeVisible();
  const bounds = (await control.boundingBox())!;
  const outer = (await frame.boundingBox())!;
  expect(bounds.x).toBeGreaterThanOrEqual(outer.x - 1);
  expect(bounds.y).toBeGreaterThanOrEqual(outer.y - 1);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(outer.x + outer.width + 1);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(outer.y + outer.height + 1);
  expect(await control.evaluate(element => {
    const rect = element.getBoundingClientRect();
    return element.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
  })).toBe(true);
}

for (const viewport of [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 640, height: 360 },
  { width: 651, height: 390 },
  { width: 844, height: 390 },
  { width: 1000, height: 600 },
  { width: 1440, height: 900 },
]) {
  test(`KH1 native frame contains its controls at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    await page.setViewportSize(viewport);
    for (const route of ['contents', 'gummi/parts', 'gummi/parts?entry=kh1fm-gummi-part-cure-g', 'worlds/End%20of%20the%20World', 'synthesis/plan']) {
      await page.goto(`./#/kh1fm/${route}`);
      const header = page.locator('.kh1-heading');
      const footer = page.locator('.kh1-bottom');
      const book = page.locator('.kh1-spread');
      await expect(header).toBeVisible();
      await expect(book).toBeVisible();
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      });
      await page.screenshot({path:testInfo.outputPath(`kh1-frame-${route.replace(/[^a-zA-Z0-9-]/g, '-')}.png`)});
      for (const control of await page.locator('.kh1-heading-menu a,.kh1-utilities>a,.kh1-utilities .jiminy-bubble').all()) {
        if(await control.isVisible())await containedControl(control, header);
      }
      for (const control of await footer.locator(':scope>a,.journal-tools-toggle').all()) {
        await containedControl(control, footer);
      }
      const headerBounds = (await header.boundingBox())!;
      const bookBounds = (await book.boundingBox())!;
      const footerBounds = (await footer.boundingBox())!;
      expect(headerBounds.y + headerBounds.height).toBeLessThanOrEqual(bookBounds.y + 1);
      expect(bookBounds.y + bookBounds.height).toBeLessThanOrEqual(footerBounds.y + 1);
      expect(footerBounds.y + footerBounds.height).toBeLessThanOrEqual(viewport.height + 1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);

      if(viewport.width<=1000&&viewport.height<=500){
        expect(headerBounds.height).toBeLessThanOrEqual(60);
        expect(footerBounds.height).toBeLessThanOrEqual(32);
        await expect(page.locator('.kh1-utilities > a').first()).toBeHidden();
        if(route==='gummi/parts'&&viewport.width===844)expect(await page.locator('.kh1-index a[data-record-id]').count()).toBeGreaterThanOrEqual(3);
        if(route==='contents'){
          const tools=footer.getByRole('button',{name:'Tools',exact:true});
          await tools.click();
          const utilities=page.locator('.kh1-compact-tools');
          await expect(utilities.getByRole('link',{name:'Search',exact:true})).toBeVisible();
          await expect(utilities.getByRole('link',{name:'Save & Settings',exact:true})).toBeVisible();
          await utilities.getByRole('button',{name:'Ask Jiminy',exact:true}).click();
          await expect(page.locator('.jiminy-dialog')).toBeVisible();
          await page.getByRole('button',{name:'Close Data Jiminy',exact:true}).click();
          await expect(tools).toBeFocused();
        }
      }
      if (viewport.width <= 650 && viewport.height > 500) {
        for (const control of await page.locator('.kh1-utilities>a,.kh1-utilities .jiminy-bubble').all()) {
          expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(44);
        }
        expect(headerBounds.height).toBeLessThanOrEqual(104);
      } else if (viewport.width <= 1000 && viewport.height <= 650) {
        // The compact frame is one row, not two rows overflowing a fixed 88px allocation.
        expect(headerBounds.height).toBeLessThanOrEqual(88);
        expect(await header.evaluate(element => getComputedStyle(element).gridTemplateRows.trim().split(/\s+/).length)).toBe(1);
      } else if (viewport.width === 1440) {
        expect(headerBounds.height).toBe(106);
        expect(footerBounds.height).toBe(44);
      }
      if (route !== 'synthesis/plan'&&!route.includes('?entry=')) await expect(page.locator('.kh1-leaf-picker')).toHaveCount(0);
      if (route === 'worlds/End%20of%20the%20World' && viewport.width <= 650) {
        const title = header.locator('h1');
        await expect(title).toHaveText('End of the World');
        expect(await title.evaluate(element => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1)).toBe(true);
      }
    }
  });
}

test('KH1 section marker is drawn without adding a Roman numeral to its title', async ({ page }) => {
  await page.goto('./#/kh1fm/gummi/parts');
  const heading = page.locator('.kh1-heading h1');
  await expect(heading).toHaveText('Gummi Ship · Parts');
  expect(await heading.evaluate(element => {
    const marker = getComputedStyle(element, '::before');
    return marker.content === '""' && marker.borderLeftStyle === 'solid' && marker.borderRightStyle === 'solid' &&
      parseFloat(marker.borderLeftWidth) === 2 && parseFloat(marker.borderRightWidth) === 2 && parseFloat(marker.height) > 10;
  })).toBe(true);
});
