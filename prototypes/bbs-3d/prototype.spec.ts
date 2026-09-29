import { mkdir, writeFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
const stats=async(page:any)=>JSON.parse(await page.locator('#metrics').textContent());
test('rotation previews independently, settles, and stills stop rendering',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('#stage')).toHaveClass('loaded');await expect(page.locator('#metrics')).toContainText('triangles');
 await expect.poll(async()=> (await stats(page)).triangles).toBe(8320);
 await page.getByRole('button',{name:'AQUA',exact:true}).click();await expect(page.getByRole('link',{name:'Open Aqua’s Reports ›'})).toHaveAttribute('href',/character=Aqua$/);
 await expect.poll(async()=> (await stats(page)).state).toBe('settled (no render loop)');
 const end=await stats(page);await page.waitForTimeout(900);expect((await stats(page)).renderedFrames).toBe(end.renderedFrames);
 await page.getByRole('button',{name:'VENTUS',exact:true}).focus();await expect(page.getByRole('button',{name:'VENTUS',exact:true})).toHaveAttribute('aria-pressed','true');await expect.poll(async()=> (await stats(page)).state).toBe('settled (no render loop)');
 await page.getByRole('button',{name:'Use still images'}).click();await expect(page.locator('#stage')).not.toHaveClass('loaded');const frozen=(await stats(page)).renderedFrames;await page.getByRole('button',{name:'TERRA',exact:true}).click();await page.waitForTimeout(900);expect((await stats(page)).renderedFrames).toBe(frozen);
 await page.getByRole('button',{name:'Try 3D scene'}).click();await expect(page.locator('#stage')).toHaveClass('loaded');await expect.poll(async()=> (await stats(page)).state).toBe('settled (no render loop)');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(await page.evaluate(()=>Object.keys(localStorage))).toEqual([]);expect(errors).toEqual([]);
 await mkdir('prototypes/bbs-3d/validation',{recursive:true});await writeFile(`prototypes/bbs-3d/validation/${info.project.name}.json`,JSON.stringify(await stats(page),null,2));
 await info.attach('performance.json',{body:JSON.stringify(await stats(page),null,2),contentType:'application/json'});
});
test('reduced motion starts with stills and makes no model or renderer requests',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});const requests:string[]=[];page.on('request',r=>requests.push(r.url()));await page.goto('/');await expect(page.getByRole('button',{name:'Try 3D scene'})).toBeVisible();await expect(page.locator('#stage')).not.toHaveClass('loaded');expect(requests.some(url=>url.endsWith('.glb')||url.endsWith('/scene.js'))).toBe(false);await expect(page.getByLabel('Rotate between characters')).not.toBeChecked();await page.getByRole('button',{name:'AQUA',exact:true}).click();await expect(page.locator('#fallback')).toHaveAttribute('src','/assets/bbs-journal/aqua-stage.jpg');
});
test('asset failure leaves working character navigation and a visible fallback',async({page})=>{
 await page.route('**/models/aqua.glb',r=>r.abort());await page.goto('/');await expect(page.getByRole('status')).toContainText('3D could not load');await expect(page.locator('#stage')).not.toHaveClass('loaded');await page.getByRole('button',{name:'AQUA',exact:true}).click();await expect(page.getByRole('link',{name:'Open Aqua’s Reports ›'})).toBeVisible();await expect(page.locator('canvas')).toHaveCount(0);await page.unroute('**/models/aqua.glb');await page.getByRole('button',{name:'Try 3D scene'}).click();await expect(page.locator('#stage')).toHaveClass('loaded');await expect(page.locator('canvas')).toHaveCount(1);
});

test('WebGL unavailable still allows each character preview',async({page})=>{
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(...args:any[]){if(String(args[0]).includes('webgl'))return null;return original.apply(this,args as any)} as any});await page.goto('/');await expect(page.getByRole('status')).toContainText('3D could not load');await page.getByRole('button',{name:'VENTUS',exact:true}).click();await expect(page.locator('#fallback')).toHaveAttribute('src','/assets/bbs-journal/ventus-stage.jpg');await expect(page.getByRole('link',{name:'Open Ventus’s Reports ›'})).toBeVisible();
});
