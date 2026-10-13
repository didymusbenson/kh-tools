import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
test.use({serviceWorkers:'block'});
const entries=JSON.parse(readFileSync('data/kh1fm/reference.json','utf8'));
for(const width of [undefined,320,844]) {
  test(`combat tables preserve readable stat cells and notes (${width||'project viewport'})`,async({page})=>{
    test.setTimeout(180_000);
    if(width)await page.setViewportSize({width,height:width===844?390:568});
    for(const slug of ['grand-ghost','shadow','gigas-shadow','darkball','pink-agaricus','rare-truffle','white-mushroom','black-fungus','invisible']){
      const entry=entries.find((e:{id:string})=>e.id===`kh1fm-enemy-${slug}`);
      await page.goto(`./#/kh1fm/entry/${entry.id}`);
      const notes=page.locator('.kh1-leaf-right .kh1-note-pages');
      await expect(notes).toBeVisible();await page.evaluate(()=>document.fonts.ready);
      const expected=Object.entries(entry.facts).filter(([key])=>/ (HP|Strength|Defense|MP recovery value|EXP|multiplier)$/.test(key));
      await expect(notes.locator('[data-stat-key]')).toHaveCount(expected.length);
      for(const [key,value] of expected){
        const actual=await notes.locator('[data-stat-key]').evaluateAll((cells,key)=>{
          const cell=cells.find(c=>c.getAttribute('data-stat-key')===key)!;
          return cell.tagName==='TR'?cell.querySelector('td')!.textContent:cell.textContent;
        },key);
        expect(actual,`${slug}: ${key}`).toBe(String(value));
      }
      const readable=new Set<string>();
      const proseLines = await notes.locator('.kh1-stat-condition-value').evaluateAll(elements => elements.flatMap(element => {
        const range=document.createRange();range.selectNodeContents(element);
        return [...range.getClientRects()].map((_,index)=>`${element.getAttribute('data-stat-key')}:line:${index}`);
      }));
      while(true){
        const headerless=await notes.evaluate(root=>{
          const window=root.querySelector('.kh1-note-window')!.getBoundingClientRect();
          const inside=(box:DOMRect)=>box.left>=window.left-1&&box.right<=window.right+1&&box.top>=window.top-1&&box.bottom<=window.bottom+1;
          return [...root.querySelectorAll('tbody tr')].filter(row=>inside(row.getBoundingClientRect())&&!inside(row.closest('table')!.querySelector('thead')!.getBoundingClientRect())).map(row=>row.textContent);
        });
        expect(headerless,`${slug}: visible table rows must retain their column headings`).toEqual([]);
        await page.waitForTimeout(40);
        for(const key of await notes.evaluate(root=>{
          const window=root.querySelector('.kh1-note-window')!.getBoundingClientRect();
          const cells = [...root.querySelectorAll('[data-stat-key]:not(.kh1-stat-condition-value)')].filter(cell=>{
            const box=cell.getBoundingClientRect();
            return box.left>=window.left-1&&box.right<=window.right+1&&box.top>=window.top-1&&box.bottom<=window.bottom+1;
          }).map(cell=>cell.getAttribute('data-stat-key')!);
          const lines = [...root.querySelectorAll('.kh1-stat-condition-value')].flatMap(element=>{
            const range=document.createRange();range.selectNodeContents(element);
            return [...range.getClientRects()].flatMap((box,index)=>box.left>=window.left-1&&box.right<=window.right+1&&box.top>=window.top-1&&box.bottom<=window.bottom+1?[`${element.getAttribute('data-stat-key')}:line:${index}`]:[]);
          });
          return [...cells,...lines];
        }))readable.add(key);
        const next=notes.getByRole('button',{name:'Next notes page'});
        if(await next.isDisabled())break;
        await next.click();
      }
      const proseKeys=await notes.locator('.kh1-stat-condition-value').evaluateAll(elements=>elements.map(e=>e.getAttribute('data-stat-key')));
      expect([...expected.map(([key])=>key).filter(key=>!proseKeys.includes(key)),...proseLines].filter(key=>!readable.has(key)),`${slug}: every stat must be reachable in full`).toEqual([]);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await notes.getByRole('button',{name:'Previous notes page'}).click();
      await expect(notes.getByRole('button',{name:'Next notes page'})).toBeEnabled();
    }
    await page.goto('./#/kh1fm/entry/kh1fm-boss-sephiroth');
    await expect(page.locator('.kh1-leaf-right .entry-details-content')).toContainText('Heartless Angel');
    await expect(page.locator('.kh1-enemy-stat-table')).toHaveCount(0);
  });
}
