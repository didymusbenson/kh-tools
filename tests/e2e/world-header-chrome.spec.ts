import { test, expect } from '@playwright/test';

test.use({ serviceWorkers: 'block' });

const worldRoutes = [
  ['kh1fm', 'worlds/Traverse%20Town'],
  ['kh2fm', 'worlds/The%20World%20That%20Never%20Was'],
  ['bbsfm', 'worlds/Enchanted%20Dominion'],
  ['dddhd', 'worlds/Country%20of%20the%20Musketeers'],
  ['recom', 'worlds'],
  ['kh3', 'treasures'],
  ['kh02', 'treasures'],
] as const;

for (const [game, route] of worldRoutes) {
  test(`${game} tools reserve their hit area inside the journal footer`, async ({ page }) => {
    await page.setViewportSize({width:page.viewportSize()!.width,height:844});
    await page.goto(`./#/${game}/${route}`);
    const bar = page.locator('.journal-utility-bar');
    await expect(bar).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await bar.getByRole('button', {name:'Tools',exact:true}).click();
    const panel=bar.locator('.journal-tools-panel');
    await expect(panel).toBeVisible();
    for (const link of await panel.getByRole('link').all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await expect(bar.getByRole('link', {name:'‹ Ars Arcanum home',exact:true})).toHaveAttribute('href', '#/');
  });
}

test('long world plaques keep the whole title and native context on narrow phones', async ({ page }) => {
  await page.setViewportSize({width:320,height:740});
  for (const [route, selector, title] of [
    ['kh1fm/worlds/End%20of%20the%20World', '.kh1-heading h1', 'End of the World'],
    ['kh2fm/worlds/The%20World%20That%20Never%20Was', '.kh2-header h1', 'The World That Never Was'],
    ['dddhd/worlds/Country%20of%20the%20Musketeers', '.ddd-ribbons h1', 'Country of the Musketeers'],
  ]) {
    await page.goto(`./#/${route}`);
    const heading=page.locator(selector);
    await expect(heading).toHaveText(title);
    expect(await heading.evaluate(el => el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1)).toBe(true);
    expect(await heading.evaluate(el => getComputedStyle(el).whiteSpace)).not.toBe('nowrap');
  }
});

test('companion world directory labels reference-only destinations honestly', async ({ page }) => {
  await page.goto('./#/kh02/worlds');
  const worlds=page.getByRole('navigation', {name:'Worlds',exact:true});
  await expect(worlds).toBeVisible();
  await expect(worlds).not.toContainText('0/0');
  await expect(worlds).toContainText('View guide');
  await worlds.getByRole('link').first().click();
  await expect(page.locator('.guide-back-worlds')).toBeVisible();
  await page.locator('.guide-back-worlds').click();
  await expect(worlds).toBeVisible();
  await page.goBack();
  await expect(page.locator('.guide-back-worlds')).toBeVisible();
});

test('mobile chapter drawer exposes tools immediately and restores keyboard focus', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('./#/kh3/worlds');
  const trigger=page.getByRole('button',{name:'Toggle journal navigation'});
  await trigger.click();
  const sidebar=page.locator('#guide-navigation');
  const search=sidebar.getByRole('link',{name:'Search this journal'});
  await expect(search).toBeFocused();
  expect((await search.boundingBox())!.y).toBeLessThan(350);
  await page.keyboard.press('Shift+Tab');
  await expect(sidebar.getByRole('link').last()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(search).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded','false');
  await trigger.click();
  await sidebar.getByRole('link',{name:'Worlds',exact:true}).click();
  await expect(trigger).toHaveAttribute('aria-expanded','false');
  await expect(page.locator('#guide-main')).toBeFocused();
  await page.setViewportSize({width:768,height:1024});
  await trigger.click();
  await page.setViewportSize({width:1000,height:900});
  await expect(page.locator('button[aria-controls=guide-navigation]')).toHaveAttribute('aria-expanded','false');
});

test('digital treasure skip link lands on the reading panel', async ({ page }) => {
  await page.goto('./#/kh02/treasures');
  const skip=page.getByRole('link',{name:'Skip to journal content'});
  await expect(skip).toBeAttached();
  await skip.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#digital-main')).toBeFocused();
});


test('short world headers never cover their own navigation', async ({ page }) => {
  for (const [game, route, selector] of [
    ['kh2fm', 'worlds/The%20World%20That%20Never%20Was', '.kh2-header-controls a'],
    ['dddhd', 'worlds/Country%20of%20the%20Musketeers', '.ddd-wordmark,.ddd-compact-reports,.ddd-ribbons a'],
  ]) {
    for (const viewport of [{width:320,height:640},{width:640,height:500},{width:844,height:390}]) {
      await page.setViewportSize(viewport);
      await page.goto(`./#/${game}/${route}`);
      await expect(page.locator('.journal-utility-bar')).toBeVisible();
      await page.evaluate(()=>document.fonts.ready);
      const covered=await page.locator(selector).evaluateAll(links=>links.filter(link=>{
        const r=link.getBoundingClientRect();
        return r.height>0 && !link.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));
      }).map(link=>link.textContent));
      expect(covered).toEqual([]);
      const plaque = page.locator(game === 'kh2fm' ? '.kh2-header-controls a' : '.ddd-ribbons a').first();
      await page.keyboard.press('Tab');
      await plaque.focus();
      await expect(plaque).toBeFocused();
      expect(await plaque.evaluate(el => getComputedStyle(el).textDecorationLine)).toContain('underline');
      if(game==='dddhd') { await page.getByRole('button',{name:'Tools',exact:true}).click(); await expect(page.locator('.journal-tools-panel').getByRole('link',{name:'Reports contents',exact:true})).toBeVisible(); }
    }
  }
});
