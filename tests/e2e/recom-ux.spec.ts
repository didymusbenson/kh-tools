import {test,expect} from '@playwright/test';
const com = (page:string) => `./#/recom/${page}`;
test('home order and campaign-specific report roots',async({page})=>{
 await page.goto('./#/');
 const choices=page.getByRole('navigation',{name:'Choose a game'}).getByRole('button');
 const names=await choices.allTextContents();
 expect(names[0]).toContain('Kingdom Hearts');expect(names[1]).toContain('Re:Chain of Memories');expect(names[2]).toContain('Kingdom Hearts II');
 await page.getByRole('button',{name:'Re:Chain of Memories HD 1.5 ReMIX, open journal',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Journal',exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:/Mini-games 0/})).toBeVisible();
 await page.getByRole('link',{name:'Riku · Reverse/Rebirth'}).click();
 await expect(page.getByRole('heading',{name:'D-Report',exact:true}).first()).toBeVisible();
 await expect(page.getByRole('link',{name:'Moogle Shop',exact:true})).toHaveCount(0);
 await expect(page.getByRole('link',{name:'Review Decks',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`test-results/${test.info().project.name}-recom-riku.png`});
});
test('card discovery persists through filtered collection and stays in its campaign',async({page})=>{
 await page.goto(com('collection?campaign=sora'));
 const total=await page.getByTestId('com-card-progress').innerText();
 await page.getByRole('searchbox',{name:'Find an entry'}).fill('Shadow');
 await page.getByRole('button',{name:'Find',exact:true}).click();
 await expect(page.getByTestId('com-card-progress')).toHaveText(total);
 await page.getByRole('link',{name:'Read Shadow',exact:true}).click();
 const check=page.getByRole('checkbox',{name:'Complete Shadow (Sora)',exact:true});
 await expect(check).toBeEnabled();await check.check();await expect(page.locator(".com-save")).toHaveText("Record saved.");await page.reload();await expect(check).toBeChecked();
 await page.getByRole('link',{name:'‹ Card Collection',exact:true}).click();
 await expect(page.getByRole('searchbox')).toHaveValue('Shadow');
 await expect(page.getByTestId('com-card-progress')).toHaveText(total.replace(/^0/,'1'));
 await page.goto(com('cards?campaign=riku&family=enemy&entry=recom-riku-enemy-shadow'));
 await expect(page.getByRole('checkbox',{name:'Complete Shadow (Riku)',exact:true})).not.toBeChecked();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('records, sources and Riku presets work on narrow and wide screens',async({page})=>{
 await page.goto(com('minigames?campaign=sora'));
 await page.getByRole('link',{name:/Balloon Glider/}).click();
 await page.getByRole('textbox',{name:'Your result in points'}).fill('520');
 await page.getByRole('button',{name:'Save result'}).click();
 await expect(page.getByText('Record saved.',{exact:true})).toBeVisible();await page.reload();
 await expect(page.getByRole('textbox',{name:'Your result in points'})).toHaveValue('520');
 await expect(page.getByRole('checkbox')).not.toBeChecked();
 await page.goto(com('cards?campaign=sora&family=attack&entry=recom-sora-card-attack-midnight-roar'));
 await expect(page.getByRole('heading',{name:'Midnight Roar',exact:true}).last()).toBeVisible();
 await page.getByRole('link',{name:/Neverland · Room of Rewards/}).click();
 await expect(page.getByRole('checkbox',{name:'Complete Midnight Roar (Sora)'})).toBeVisible();
 await page.goto(com('decks?campaign=riku'));
 await page.getByRole('link',{name:/Traverse Town/}).click();
 await expect(page.getByRole('heading',{name:'World preset · source order'})).toBeVisible();
 await expect(page.getByRole('checkbox')).toHaveCount(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`test-results/${test.info().project.name}-recom-deck.png`});
});
test('invalid entries recover, filters have an empty state, and saves expose backups',async({page})=>{
 await page.goto(com('cards?campaign=riku&entry=bad-id'));
 await expect(page.getByRole('heading',{name:'Entry not found in this campaign'})).toBeVisible();
 await page.goto(com('search?campaign=sora&q=zzzznonexistent'));
 await expect(page.getByRole('heading',{name:'No matching entries'})).toBeVisible();
 await page.getByRole('link',{name:'Save & Settings'}).click();
 await expect(page.getByRole('button',{name:'Export backup'})).toBeEnabled();
 await expect(page.getByText(/Card coverage is partial/)).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('collection filters remain usable and the journal reopens offline',async({page,context})=>{
 await page.goto(com('collection?campaign=sora'));
 await expect(page.getByRole('link',{name:'Read Kingdom Key',exact:true})).toBeVisible();
 for(const label of ['Card type','Show']){
  const box=await page.getByRole('combobox',{name:label,exact:true}).boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(90);expect(box!.height).toBeGreaterThanOrEqual(39);
 }
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 // The prompt-based service worker controls a subsequent visit, not its installing page.
 await page.reload();
 await expect.poll(()=>page.evaluate(()=>!!navigator.serviceWorker.controller)).toBe(true);
 await context.setOffline(true);
 await page.reload();
 await expect(page.getByRole('link',{name:'Read Kingdom Key',exact:true})).toBeVisible();
 await page.getByRole('link',{name:'Riku · Reverse/Rebirth'}).click();
 await expect(page.getByRole('heading',{name:'D-Report',exact:true}).first()).toBeVisible();
 await context.setOffline(false);
});
