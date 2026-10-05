import { test, expect, type Locator, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

// These checks deliberately describe the game screen rather than the retired
// outer website chrome. A fresh context avoids a cached previous CSS release.
test.use({ serviceWorkers: 'block' });

type Screen = {
  game: string;
  route: string;
  root: string;
  volume?: string;
  book: string;
  footer?: string;
  save?: string;
};
const nativeScreens: Screen[] = [
  { game: 'kh1fm', route: 'contents', root: '.kh1-native', volume: '.kh1-volume', book: '.kh1-spread', footer: '.kh1-bottom', save: '.kh1-save-line' },
  { game: 'kh2fm', route: 'contents', root: '.kh2-native', volume: '.kh2-volume', book: '.kh2-book', footer: '.kh2-footer', save: '.kh2-save' },
  { game: 'recom', route: 'contents', root: '.com-native', volume: '.com-volume', book: '.com-book', footer: '.com-footer', save: '.com-save' },
  { game: 'bbsfm', route: 'contents?character=Terra', root: '.bbs-native', volume: '.bbs-volume', book: '.bbs-contents-book', footer: '.bbs-footer', save: '.bbs-save-status' },
  { game: 'dddhd', route: 'contents', root: '.ddd-native', volume: '.ddd-volume', book: '.ddd-book', footer: '.ddd-footer', save: '.ddd-save' },
];
const digitalScreens: Screen[] = ['kh3', 'kh02'].map(game => ({
  game, route: 'treasures', root: '.digital-treasure', book: '.digital-stage', footer: '.digital-footer',
}));
const genericScreens: Screen[] = ['kh3', 'kh02'].map(game => ({
  game, route: 'worlds', root: '.journal-app.multi-guide', volume: '.journal-shell', book: '.journal-page-wrap',
}));
const bbsHome: Screen = { ...nativeScreens[3], route: 'home', book: '.bbs-home' };
const viewportCases = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'phone', width: 390, height: 844 },
  { name: 'narrow phone', width: 320, height: 568 },
  { name: 'phone landscape', width: 844, height: 390 },
  { name: 'short landscape', width: 640, height: 360 },
];
const gameRoute = (screen: Screen) => `./#/${screen.game}/${screen.route}`;
const tools = (page: Page) => page.getByRole('button', { name: 'Tools', exact: true });
const panel = (page: Page) => page.locator('.journal-tools-panel');

async function ready(page: Page, screen: Screen) {
  await expect(page.locator(screen.book)).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function insideViewport(locator: Locator) {
  await expect(locator).toBeVisible();
  await expect.poll(() => locator.evaluate(el => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.left >= -1 && r.top >= -1 &&
      r.right <= innerWidth + 1 && r.bottom <= innerHeight + 1;
  })).toBe(true);
}

async function fullScreen(page: Page, screen: Screen) {
  await ready(page, screen);
  for (const selector of [screen.root, screen.volume].filter((s): s is string => !!s)) {
    await expect.poll(() => page.locator(selector).evaluate(el => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) };
    }), { message: `${screen.game}/${screen.route}: ${selector} fills the viewport` }).toEqual({
      x: 0, y: 0, ...page.viewportSize()!,
    });
  }
  await insideViewport(page.locator(screen.book));
  expect((await page.locator(screen.book).boundingBox())!.height).toBeGreaterThan(60);
  await expect.poll(() => page.evaluate(() => ({
    horizontal: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    vertical: Math.max(0, document.documentElement.scrollHeight - innerHeight),
  }))).toEqual({ horizontal: 0, vertical: 0 });
  if (screen.footer) {
    const footer = page.locator(screen.footer);
    await insideViewport(footer);
    const bookBounds = (await page.locator(screen.book).boundingBox())!;
    expect(bookBounds.y + bookBounds.height).toBeLessThanOrEqual((await footer.boundingBox())!.y + 1);
    await expect(footer.getByRole('button', { name: 'Tools', exact: true })).toBeVisible();
    await expect(tools(page)).toHaveAttribute('aria-expanded', 'false');
    await insideViewport(tools(page));
    expect(await tools(page).evaluate(el => {
      const r = el.getBoundingClientRect();
      return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
    })).toBe(true);
    if (screen.volume) {
      await expect(page.locator(`${screen.volume} > ${screen.footer}`)).toHaveCount(1);
      await expect(page.locator(`${screen.root} > .journal-utility-bar`)).toHaveCount(0);
    }
  }
  if (screen.save) {
    await expect(page.locator(`${screen.footer} > ${screen.save}`)).toHaveCount(1);
    await expect(page.locator(`${screen.volume} > ${screen.save}`)).toHaveCount(0);
    const footerBounds=(await page.locator(screen.footer!).boundingBox())!;
    expect(Math.abs(footerBounds.y+footerBounds.height-page.viewportSize()!.height)).toBeLessThanOrEqual(1);

    if (await page.getByTestId('treasure-board').count()) {
      // Treasure boards own the live save feedback; their duplicate footer line
      // is intentionally hidden so it does not consume reading space.
      await expect(page.locator(screen.save)).toBeHidden();
      await insideViewport(page.locator('.treasure-save:visible').first());
    } else await insideViewport(page.locator(screen.save));
  }
}

// Both Playwright projects run this same explicit size matrix, exercising the
// touch/mobile browser context as well as desktop at identical CSS viewports.
for (const viewport of viewportCases) {
  test(`${viewport.name}: all game screens use the viewport and keep their reading panel inside`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize(viewport);
    for (const screen of [...nativeScreens, bbsHome, ...digitalScreens, ...genericScreens]) {
      await test.step(`${screen.game}/${screen.route}`, async () => {
        await page.goto(gameRoute(screen));
        await fullScreen(page, screen);
        if (screen.footer) {
          await tools(page).click();
          await insideViewport(panel(page));
          await page.keyboard.press('Escape');
          await expect(tools(page)).toBeFocused();
        } else {
          await expect(page.locator('.journal-page > .journal-topbar')).toHaveCount(1);
          await expect(page.locator('.multi-guide > .journal-topbar')).toHaveCount(0);
          const reading = (await page.locator(screen.book).boundingBox())!;
          expect(Math.round(reading.y)).toBe(0);
          expect(Math.round(reading.x + reading.width)).toBe(viewport.width);
          expect(Math.round(reading.y + reading.height)).toBe(viewport.height);
          expect(await page.locator(screen.book).evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
          if (viewport.width > 930) await insideViewport(page.locator('.journal-sidebar'));
        }
      });
    }
  });
}

for (const screen of [...nativeScreens, ...digitalScreens]) {
  test(`${screen.game}: inset Tools supports keyboard dismissal, Search, Save and home/back`, async ({ page }) => {
    await page.goto(gameRoute(screen));
    await fullScreen(page, screen);
    const original = new URL(page.url()).hash;
    await tools(page).focus();
    await page.keyboard.press('Enter');
    await expect(tools(page)).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(panel(page).getByRole('link', { name: '‹ Ars Arcanum home', exact: true })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(panel(page)).toHaveCount(0);
    await expect(tools(page)).toBeFocused();

    for (const [name, destination] of [['Search', 'search'], ['Save & Settings', 'progress']]) {
      // KH1 already has native header tools and its footer menu provides Home.
      if (screen.game !== 'kh1fm') await tools(page).click();
      const host = screen.game === 'kh1fm' ? page.locator('.kh1-heading') : panel(page);
      await host.getByRole('link', { name, exact: true }).click();
      await expect.poll(() => new URL(page.url()).hash.split('?')[0]).toBe(`#/${screen.game}/${destination}`);
      await expect(panel(page)).toHaveCount(0);
      await page.goBack();
      await expect.poll(() => new URL(page.url()).hash).toBe(original);
      await fullScreen(page, screen);
    }
    await tools(page).click();
    await panel(page).getByRole('link', { name: '‹ Ars Arcanum home', exact: true }).click();
    await expect(page.getByRole('navigation', { name: 'Choose a game' })).toBeVisible();
    await page.goBack();
    await expect.poll(() => new URL(page.url()).hash).toBe(original);
    await fullScreen(page, screen);
  });
}

test('DDD character filter and CoM companion links remain available in Tools', async ({ page }) => {
  await page.goto('./#/dddhd/contents');
  await tools(page).click();
  const character = panel(page).getByRole('combobox', { name: 'Filter by character', exact: true });
  await character.selectOption('Riku');
  await expect.poll(() => new URLSearchParams(new URL(page.url()).hash.split('?')[1]).get('character')).toBe('Riku');
  await page.keyboard.press('Escape');
  await tools(page).click();
  await expect(character).toHaveValue('Riku');
  await page.keyboard.press('Escape');

  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./#/recom/rewards?campaign=sora&world=Traverse%20Town');
  await expect(page.getByTestId('treasure-board')).toBeVisible();
  await tools(page).click();
  const companion = panel(page).getByRole('navigation', { name: 'Companion tools', exact: true });
  for (const name of ['Worlds & Rewards', 'Sleights', 'Moogle Shop', 'Achievements']) {
    const link = companion.getByRole('link', { name, exact: true });
    await expect(link).toBeVisible();
    await link.scrollIntoViewIfNeeded();
    await insideViewport(link);
  }
  const first = companion.getByRole('link').first();
  const target = await first.getAttribute('href');
  expect(target).toMatch(/^#\/recom\//);
  await first.click();
  await expect.poll(() => new URL(page.url()).hash).toBe(target);
  await expect(panel(page)).toHaveCount(0);
  await fullScreen(page, { ...nativeScreens[2], route: target!.split('/recom/')[1] });
});

type TreasureRecord = { id: string; included: boolean };
for (const game of ['kh1fm', 'kh2fm', 'recom', 'bbsfm', 'dddhd', 'kh3', 'kh02']) {
  test(`${game}: treasure save survives reload without changing the full-screen frame`, async ({ page }) => {
    const data = JSON.parse(readFileSync(`src/games/treasure-data/${game}.json`, 'utf8')) as { records: TreasureRecord[] };
    const entry = data.records.find(record => record.included)!;
    const baseScreen = [...nativeScreens, ...digitalScreens].find(screen => screen.game === game)!;
    const screen = { ...baseScreen, route: `${game === 'recom' ? 'rewards' : 'treasures'}?${new URLSearchParams({ entry: entry.id, view: 'grid' })}` };
    if (game === 'bbsfm') screen.book = '.bbs-paper';
    await page.goto(gameRoute(screen));
    await expect(page.getByTestId('treasure-board')).toBeVisible();
    await fullScreen(page, screen);
    const check = page.locator('.treasure-check:visible input').first();
    await expect(check).toBeEnabled();
    await expect(check).not.toBeChecked();
    const before = await page.locator(screen.volume || screen.root).boundingBox();
    // Confirmed writes update the controlled checkbox after IndexedDB commits.
    await check.click();
    await expect(page.locator('.treasure-save:visible').first()).toContainText('Marked collected.');
    await expect(check).toBeChecked();
    expect(await page.locator(screen.volume || screen.root).boundingBox()).toEqual(before);
    await page.reload();
    await expect(check).toBeChecked();
    await expect(page.locator('[data-treasure-id][aria-pressed="true"]:visible')).toHaveAttribute('data-treasure-id', entry.id);
    await fullScreen(page, screen);
  });
}

test('update and save-error notices overlay the game without resizing the volume, book or footer', async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const screen of [...nativeScreens, ...digitalScreens]) {
    await page.goto(gameRoute(screen));
    await fullScreen(page, screen);
    const selectors = [screen.volume || screen.root, screen.book, screen.footer!];
    const before = await Promise.all(selectors.map(selector => page.locator(selector).boundingBox()));
    // The real update notice is normally gated by a waiting service worker.
    // Use its production class, contents and parent to isolate layout behavior.
    await page.locator(screen.volume || screen.root).evaluate(host => {
      const notice = document.createElement('div');
      notice.className = 'save-alert app-update-notice';
      notice.setAttribute('role', 'status');
      const text = document.createElement('p');
      text.textContent = 'A new journal version is ready.';
      const button = document.createElement('button');
      button.textContent = 'Load available update';
      notice.append(text, button);
      const stack = host.querySelector('.journal-notices');
      if (stack) {
        const error = document.createElement('div');
        const prefix = host.className.split('-volume')[0];
        error.className = prefix === 'kh1' ? 'kh1-save-error' : `${prefix}-error`;
        error.setAttribute('role', 'alert');
        error.textContent = 'Saved progress needs attention. Your record remains on this device. ';
        const retry = document.createElement('button');
        retry.textContent = 'Retry saved progress';
        error.append(retry);
        stack.append(notice, error);
      } else host.querySelector('header')!.insertAdjacentElement('afterend', notice);
    });
    await insideViewport(page.locator('.app-update-notice'));
    if (screen.volume) {
      const stack = page.locator('.journal-notices');
      await insideViewport(stack);
      expect(await stack.evaluate(el => getComputedStyle(el).position)).toBe('absolute');
      const updateBounds = (await stack.locator('.app-update-notice').boundingBox())!;
      const errorBounds = (await stack.getByRole('alert').boundingBox())!;
      expect(errorBounds.y).toBeGreaterThanOrEqual(updateBounds.y + updateBounds.height);
      expect((await stack.boundingBox())!.height).toBeLessThanOrEqual(page.viewportSize()!.height / 2);
      await stack.getByRole('button', { name: 'Retry saved progress', exact: true }).click();
    } else expect(await page.locator('.app-update-notice').evaluate(el => getComputedStyle(el).position)).toBe('absolute');
    expect(await Promise.all(selectors.map(selector => page.locator(selector).boundingBox()))).toEqual(before);
    await fullScreen(page, screen);
  }
});

test('short-landscape BBS home and contents can scroll every last control into the reading stage', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 360 });
  async function followVisibleLink(link: Locator) {
    const target = await link.getAttribute('href');
    await link.scrollIntoViewIfNeeded();
    await expect.poll(() => link.evaluate(el => {
      const r = el.getBoundingClientRect();
      const stage = el.closest('.bbs-main')!.getBoundingClientRect();
      return r.top >= stage.top - 1 && r.bottom <= stage.bottom + 1 &&
        r.left >= stage.left - 1 && r.right <= stage.right + 1 &&
        el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
    }), { message: 'The full link and its click target must be inside the BBS reading stage' }).toBe(true);
    await link.click();
    await expect.poll(() => new URL(page.url()).hash).toBe(target);
    await expect(page.locator('.bbs-volume')).toBeVisible();
  }
  for (const name of ['Mirage Arena', 'Unversed Missions', 'Achievements']) {
    await page.goto('./#/bbsfm/home');
    await ready(page, bbsHome);
    await followVisibleLink(page.getByRole('navigation', { name: 'Shared guides' }).getByRole('link', { name, exact: true }));
  }
  await page.goto('./#/bbsfm/contents?character=Terra');
  await ready(page, nativeScreens[3]);
  await followVisibleLink(page.locator('.bbs-contents-list').getByRole('link').last());
  await expect(page).toHaveURL(/\/bbsfm\/bestiary\?/);
});

// A measurement rerender must neither cancel initial route focus nor steal an
// editor's focus later when the viewport's capacity changes.
test('DDD farming navigation focuses its stage and resizing preserves editor focus', async ({ page }) => {
  await page.setViewportSize({width:390,height:664});
  await page.goto('./#/dddhd/workshop/plan');
  await expect(page.locator('#ddd-reading')).toBeFocused();
  const field=page.getByRole('searchbox',{name:'Find a planned material',exact:true});
  await field.focus();
  await page.setViewportSize({width:390,height:844});
  await expect(field).toBeFocused();
});

test('KH1 save feedback shares navigation and Undo remains reachable in Tools', async ({ page }) => {
  await page.setViewportSize({width:320,height:568});
  await page.goto('./#/kh1fm/ansem-reports');
  const check=page.getByRole('checkbox',{name:'Acquired: Ansem’s Report 1',exact:true});
  await expect(check).toBeEnabled(); await check.click(); await expect(check).toBeChecked();
  const status=page.locator('.kh1-bottom .kh1-save-line');
  await expect(status).toBeVisible();
  await expect(page.locator('.kh1-volume > .kh1-save-line')).toHaveCount(0);
  await tools(page).click();
  await panel(page).getByRole('button',{name:'Undo',exact:true}).click();
  await expect(check).not.toBeChecked();
  await expect(status).toContainText('Last change undone.');
  await expect(tools(page)).toBeFocused();
  await expect(tools(page)).toHaveAttribute('aria-expanded','false');
});
