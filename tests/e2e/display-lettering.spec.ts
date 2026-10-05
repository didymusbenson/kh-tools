import { test, expect } from '@playwright/test';

const banners = [
  { route: 'kh1fm/contents', selector: '.kh1-heading-menu > span', text: 'MENU' },
  { route: 'bbsfm/contents?character=Terra', selector: '.bbs-display-banner', text: 'REPORTS' },
  { route: 'bbsfm/melding?character=Aqua', selector: '.bbs-display-banner', text: 'MENU' },
  { route: 'dddhd/contents', selector: '.ddd-wordmark', text: 'REPORTS' },
];

for (const size of [{ width:1440,height:900 }, { width:768,height:1024 }, { width:390,height:844 }, { width:320,height:568 }, { width:844,height:390 }, { width:640,height:360 }]) {
  test(`reference-matched banners load without clipping at ${size.width}x${size.height}`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize(size);
    for (const banner of banners) {
      await page.goto(`./#/${banner.route}`);
      const label = page.locator(banner.selector);
      await expect(label).toHaveText(banner.text);
      await page.evaluate(() => document.fonts.ready);
      await expect(label).toHaveCSS('font-family', /KHDisplay/);
      await expect(label).toHaveCSS('font-style', 'normal');
      await expect(label).toHaveCSS('font-weight', '400');
      expect(await page.evaluate(() => Array.from(document.fonts).some(face => face.family === 'KHDisplay' && face.status === 'loaded'))).toBe(true);
      expect(await label.evaluate(el => {
        const range = document.createRange(); range.selectNodeContents(el);
        const r = range.getBoundingClientRect();
        return r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight;
      })).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}

test('display lettering stays out of body copy and unsupported headings', async ({ page }) => {
  const unchanged = [
    ['kh1fm/contents', '.kh1-index', 'KH1Hand'],
    ['bbsfm/contents?character=Terra', '.bbs-portrait h2', 'Georgia'],
    ['bbsfm/home', '.bbs-header h1', 'BbsMenu'],
    ['bbsfm/final', '.bbs-header h1', 'BbsMenu'],
    ['recom/contents', '.com-wordmark', 'CoMMenu'],
    ['kh2fm/contents', '.kh2-native', 'KH2Menu'],
  ];
  for (const [route, selector, family] of unchanged) {
    await page.goto(`./#/${route}`);
    await expect(page.locator(selector)).toHaveCSS('font-family', new RegExp(family));
    await expect(page.locator(selector)).not.toHaveCSS('font-family', /KHDisplay/);
  }
  await page.goto('./#/dddhd/contents');
  await expect(page.locator('.ddd-wordmark')).toHaveCSS('transform', 'none');
  await expect(page.locator('.ddd-wordmark')).toHaveCSS('-webkit-text-stroke-width', '0px');
});

test('self-hosted display face is available after offline reload', async ({ page, context }) => {
  test.setTimeout(90_000);
  await page.goto('./#/dddhd/contents');
  await expect(page.locator('.ddd-wordmark')).toBeVisible();
  await page.evaluate(async () => { await document.fonts.ready; await navigator.serviceWorker.ready; });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('.ddd-wordmark')).toHaveText('REPORTS');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => Array.from(document.fonts).some(face => face.family === 'KHDisplay' && face.status === 'loaded'))).toBe(true);
  await expect(page.locator('.ddd-wordmark')).toHaveCSS('font-family', /KHDisplay/);
  await context.setOffline(false);
});

test('a failed font request leaves display labels readable and navigation usable', async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.route('**/KHGummi*.woff2', route => route.abort());
  await page.goto(test.info().project.use.baseURL + '#/dddhd/contents');
  await expect(page.locator('.ddd-wordmark')).toHaveText('REPORTS');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => Array.from(document.fonts).some(face => face.family === 'KHDisplay' && face.status === 'loaded'))).toBe(false);
  await page.locator('.ddd-root-index a').first().click();
  await expect(page.locator('.ddd-wordmark')).toBeVisible();
  await context.close();
});
