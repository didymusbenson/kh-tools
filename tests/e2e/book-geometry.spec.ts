import {test,expect,type Page} from '@playwright/test';
test.use({serviceWorkers:'block'});
async function open(page:Page,route:string,selector:string){
 await page.goto(`./#/${route}`);await expect(page.locator(selector)).toBeVisible();await page.evaluate(()=>document.fonts.ready);
}
async function equalLeaves(page:Page,book:string,left:string,right:string,binding:string){
 await expect.poll(()=>page.evaluate(({book,left,right,binding})=>{
  const b=document.querySelector(book)!.getBoundingClientRect(),l=document.querySelector(left)!.getBoundingClientRect(),r=document.querySelector(right)!.getBoundingClientRect(),s=document.querySelector(binding)!.getBoundingClientRect();
  return Math.max(Math.abs(l.width-r.width),Math.abs(s.x+s.width/2-(b.x+b.width/2)),Math.abs(l.right-r.left));
 },{book,left,right,binding})).toBeLessThan(1);
}
for(const width of [768,1440,2048]){
 test(`equal center-bound leaves stay fixed with populated and empty content at ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});
  let frame;
  for(const route of ['ansem-reports','worlds','search','search?q=zzzzzznomatch','synthesis','synthesis/plan']){
   await open(page,'kh1fm/'+route,'.kh1-spread');
   await equalLeaves(page,'.kh1-spread','.kh1-leaf-left','.kh1-leaf-right','.kh1-spiral');
   const current=await page.locator('.kh1-spread').boundingBox();if(frame)expect(current).toEqual(frame);else frame=current;
  }
  await open(page,'kh1fm/treasures','.treasure-layout');
  await equalLeaves(page,'.kh1-spread','.treasure-overview','.treasure-intro','.kh1-spiral');
  await open(page,'kh1fm/treasures?world=Traverse%20Town','.treasure-layout');
  await equalLeaves(page,'.kh1-spread','.treasure-grid-leaf','.treasure-notes','.kh1-spiral');
  for(const route of ['contents','worlds','search','search?q=zzzzzznomatch','workshop/recipes','workshop/plan']){
   await open(page,'kh2fm/'+route,'.kh2-book');
   await equalLeaves(page,'.kh2-book','.kh2-left','.kh2-right','.kh2-rings');
  }
 });
}
test('KH1 closed cover occupies exactly the right leaf and opens without moving its hinge',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await open(page,'kh1fm/contents','.kh1-spread');
 const stage=(await page.locator('.kh1-spread').boundingBox())!,cover=(await page.locator('.kh1-leaf-right').boundingBox())!,rings=(await page.locator('.kh1-spiral').boundingBox())!;
 expect(Math.abs(cover.width-stage.width/2)).toBeLessThan(1);expect(Math.abs(cover.x-stage.x-stage.width/2)).toBeLessThan(1);
 expect(await page.locator('.kh1-index-art').evaluate(e=>getComputedStyle(e).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
 await page.getByRole('link',{name:'Ansem’s Report',exact:false}).click();await equalLeaves(page,'.kh1-spread','.kh1-leaf-left','.kh1-leaf-right','.kh1-spiral');
 expect(await page.locator('.kh1-spiral').boundingBox()).toEqual(rings);expect(await page.locator('.kh1-spread').boundingBox()).toEqual(stage);
});
const covers=[
 {closed:'kh2fm/worlds/Port%20Royal',open:'kh2fm/contents',book:'.kh2-book'},
 {closed:'recom/contents',open:'recom/cards',book:'.com-book'},
 {closed:'bbsfm/contents?character=Terra',open:'bbsfm/worlds?character=Terra',book:'.bbs-contents-book',openBook:'.bbs-paper'},
 {closed:'dddhd/contents',open:'dddhd/worlds',book:'.ddd-book'},
];
for(const viewport of [{width:1101,height:700},{width:1440,height:900},{width:2048,height:1152},{width:390,height:844},{width:320,height:568},{width:844,height:390}]){
 test(`closed covers retain art/menu and responsive geometry at ${viewport.width}×${viewport.height}`,async({page})=>{
  await page.setViewportSize(viewport);
  for(const screen of covers){
   await open(page,screen.closed,screen.book);const closed=(await page.locator(screen.book).boundingBox())!;
   expect(closed.height).toBeGreaterThan(60);
   await expect.poll(()=>page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-innerWidth))).toBe(0);
   const overflow=await page.locator(screen.book).evaluate(book=>{
    const bounds=book.getBoundingClientRect();return [...book.querySelectorAll('a:has(span), .ddd-index-row>a')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&(r.right>bounds.right+1||r.left<bounds.left-1);}).map(e=>e.textContent);
   });expect(overflow).toEqual([]);
   await open(page,screen.open,screen.openBook||screen.book);const opened=(await page.locator(screen.openBook||screen.book).boundingBox())!;
   if(viewport.width>=1100)expect(Math.abs(closed.width-opened.width/2)).toBeLessThan(1);
  }
 });
}
test('single leaves keep a left edge binding and no offstage phantom page',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 for(const [route,book,rings] of [['kh1fm/progress','.kh1-spread','.kh1-spiral'],['recom/cards','.com-book','.com-rings'],['dddhd/worlds','.ddd-book','.ddd-rings'],['bbsfm/worlds?character=Terra','.bbs-paper','.bbs-binder']]){
  await open(page,route,book);const b=(await page.locator(book).boundingBox())!,s=(await page.locator(rings).boundingBox())!;expect(Math.abs(s.x+s.width/2-b.x)).toBeLessThan(16);
 }
 expect(await page.locator('.bbs-paper').count()).toBe(1);
 await open(page,'dddhd/worlds','.ddd-book');expect(await page.locator('.ddd-book').evaluate(e=>getComputedStyle(e,'::before').content)).toBe('none');
});
test('long world name remains inside a closed cover title at a short wide breakpoint',async({page})=>{
 await page.setViewportSize({width:1101,height:390});
 await open(page,'kh2fm/worlds/The%20World%20That%20Never%20Was','.kh2-cover');
 const title=(await page.locator('.kh2-world-title').boundingBox())!,name=(await page.locator('.kh2-world-title h2').boundingBox())!;
 expect(name.y).toBeGreaterThanOrEqual(title.y);expect(name.y+name.height).toBeLessThanOrEqual(title.y+title.height);
});
