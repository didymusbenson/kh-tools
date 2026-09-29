import { test, expect } from '@playwright/test';
test('BBS character previews, pills, canonical chest checks and reload',async({page,isMobile})=>{
 await page.goto('./#/bbsfm/home');
 if(!isMobile){await page.getByRole('link',{name:'Ventus',exact:true}).hover();await expect(page.getByAltText('Ventus character preview')).toBeVisible();await page.getByRole('link',{name:'Terra',exact:true}).focus();await expect(page.getByAltText('Terra character preview')).toBeVisible();}
 const shared=page.getByRole('navigation',{name:'Shared guides',exact:true});await expect(shared.getByRole('link').first()).toHaveText('Command Melding');
 await page.getByRole('link',{name:'Aqua',exact:true}).click();
 await expect(page.getByRole('button',{name:'Aqua',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.goto('./#/bbsfm/melding?character=Aqua&item=Fira');
 const check=page.locator('.bbs-chest-source input').first();await expect(check).toBeVisible();await check.check();
 await page.locator('.bbs-chest-source .bbs-link').first().click();await expect(page.locator('.bbs-detail-leaf .bbs-record-check input')).toBeChecked();
 await page.reload();await expect(page.locator('.bbs-detail-leaf .bbs-record-check input')).toBeChecked();
 await page.getByRole('button',{name:'Terra',exact:true}).click();await expect(page.locator('.bbs-record-list input:checked')).toHaveCount(0);
});
test('BBS abilities reverse lookup, crystal source modal and independent plans',async({page})=>{
 await page.goto('./#/bbsfm/melding?character=Aqua&tab=abilities&item=Second%20Chance');
 await expect(page.locator('.bbs-target-description')).toContainText('Second Chance');await expect(page.locator('.bbs-recipe').first()).toContainText('Pulsing Crystal');
 await page.locator('.bbs-recipe .bbs-target-ability button').first().click();await expect(page.getByRole('dialog')).toContainText('Wild Bruiser');await expect(page.getByRole('dialog')).toContainText('Neverland');
 await page.getByRole('button',{name:'Close dialog'}).click();await expect(page.getByRole('dialog')).toHaveCount(0);
 await page.getByRole('button',{name:'Plan commands',exact:true}).first().click();await expect(page.getByRole('status').filter({hasText:'Ingredients added'})).toBeVisible();
 await page.getByRole('link',{name:'Farming plan ›',exact:true}).click();await expect(page.locator('.bbs-record-row').first()).toBeVisible();
 await page.getByRole('button',{name:'Terra',exact:true}).click();await expect(page.getByText('Your farming plan is empty for this character.')).toBeVisible();
 await page.goto('./#/bbsfm/melding?character=Aqua&tab=crystals&item=Fleeting%20Crystal');await page.getByRole('button',{name:'Fleeting Crystal',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('Sonic Blaster');await expect(page.getByRole('dialog')).toContainText('Deep Space');await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('BBS coded finisher chart shares checks and keeps episode collections separate',async({page,isMobile})=>{
 await page.goto('./#/bbsfm/finishers?character=Aqua&entry=bbsfm%3Aaqua%3Afinish%3Amagic-pulse-1');
 const detail=page.locator('.bbs-detail-leaf');await expect(detail).toContainText('2,000 Command Points');await detail.getByRole('checkbox').check();
 await page.getByRole('button',{name:'View chart ↗'}).click();const dialog=page.getByRole('dialog');await expect(dialog.locator('svg')).toBeVisible();await expect(dialog.getByRole('button',{name:/^Magic Pulse 1, acquired/})).toBeVisible();
 await dialog.getByRole('button',{name:/^Surprise! 1/}).click();await expect(detail).toContainText('Gold Rush');await expect(detail).toContainText('1,400 munny');
 await page.goto('./#/bbsfm/finishers?character=Ventus&entry=bbsfm%3Aventus%3Afinish%3Aair-flair-1');await expect(detail.getByRole('checkbox')).not.toBeChecked();
 await page.goto('./#/bbsfm/final');await page.getByRole('link',{name:/Secret Episode Realm of Darkness/}).click();
 await expect(page.locator('.bbs-collection-count')).toContainText('10');
 if(isMobile)await page.getByRole('button',{name:'Details',exact:true}).click();
 await page.goto('./#/bbsfm/keyblades?character=Aqua');await expect(page.locator('.bbs-record-list')).not.toContainText("Master's Defender");
 await expect(page.locator('body')).toHaveJSProperty('scrollWidth',await page.evaluate(()=>document.documentElement.clientWidth));
});
test('BBS calculator respects command levels and leaves stock unchanged',async({page})=>{
 await page.goto('./#/bbsfm/melding?character=Aqua&item=Fire');
 await page.getByRole('checkbox',{name:'Inventory counts',exact:true}).check();
 const stock=page.getByRole('spinbutton',{name:'Owned Fire',exact:true});
 await stock.fill('7');await stock.press('Tab');await expect(page.locator('.bbs-quantity-status')).toHaveText('Saved');await page.reload();await expect(stock).toHaveValue('7');
 await page.goto('./#/bbsfm/melding?character=Aqua&mode=calculator');
 await page.getByRole('spinbutton',{name:'Slot 1 level'}).fill('1');await expect(page.locator('.bbs-new-command')).toContainText('No documented recipe');
 await page.getByRole('spinbutton',{name:'Slot 1 level'}).fill('3');await expect(page.locator('.bbs-new-command')).toContainText('Fira');await expect(page.locator('.bbs-new-command')).toContainText('100%');await expect(page.locator('.bbs-new-command')).toContainText('Magic Haste');
 await page.getByRole('button',{name:'Add ingredients to plan',exact:true}).click();
 await page.goto('./#/bbsfm/melding?character=Aqua&item=Fire');await expect(stock).toHaveValue('7');
 await page.getByRole('checkbox',{name:'Inventory counts',exact:true}).uncheck();await page.reload();
 await page.getByRole('checkbox',{name:'Inventory counts',exact:true}).check();await expect(stock).toHaveValue('7');
});

test('BBS character catalogs and saved collections reopen offline',async({page,context})=>{
 await page.goto('./#/bbsfm/melding?character=Terra');
 await expect(page.locator('.bbs-command-list').getByRole('button',{name:/Ars Arcanum/})).toHaveCount(0);
 await page.getByRole('button',{name:'Ventus',exact:true}).click();
 await expect(page.locator('.bbs-command-list').getByRole('button',{name:/Ars Arcanum/})).toBeVisible();
 await page.goto('./#/bbsfm/finishers?character=Ventus&entry=bbsfm%3Aventus%3Afinish%3Aair-flair-1');
 const check=page.locator('.bbs-detail-leaf').getByRole('checkbox');await check.check();
 await page.evaluate(async()=>{await navigator.serviceWorker.ready});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
 await context.setOffline(true);await page.reload();await expect(check).toBeChecked();
 await page.goto('./#/bbsfm/melding?character=Ventus&tab=abilities&item=Second%20Chance');await expect(page.locator('.bbs-recipe').first()).toContainText('Pulsing Crystal');
 await context.setOffline(false);
});
