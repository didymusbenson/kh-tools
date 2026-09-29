import { build } from 'esbuild';
import { gzipSync } from 'node:zlib';
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
const out=new URL('./preview/',import.meta.url);
await mkdir(out,{recursive:true});
for(const name of ['index.html','style.css','shell.js'])await copyFile(new URL(name,import.meta.url),new URL(name,out));
await build({entryPoints:[new URL('scene.js',import.meta.url).pathname],outfile:new URL('scene.js',out).pathname,bundle:true,format:'esm',minify:true,target:['es2022'],legalComments:'eof'});
await mkdir(new URL('assets/bbs-journal/',out),{recursive:true});
for(const character of ['terra','ventus','aqua'])for(const variant of ['portrait','stage'])await copyFile(new URL(`../../public/assets/bbs-journal/${character}-${variant}.jpg`,import.meta.url),new URL(`assets/bbs-journal/${character}-${variant}.jpg`,out));
await mkdir(new URL('assets/kh1-journal/',out),{recursive:true});
for(const name of ['chakra.ttf','ChakraPetch-OFL.txt'])await copyFile(new URL(`../../public/assets/kh1-journal/${name}`,import.meta.url),new URL(`assets/kh1-journal/${name}`,out));
await copyFile(new URL('node_modules/three/LICENSE',import.meta.url),new URL('THREE-LICENSE.txt',out));

const files=['models/station.glb','models/terra.glb','models/ventus.glb','models/aqua.glb','scene.js','shell.js','style.css','index.html'];
const sizes=await Promise.all(files.map(async name=>{const bytes=await readFile(new URL(name,out));return{name,bytes:bytes.byteLength,gzipBytes:gzipSync(bytes).byteLength}}));
await writeFile(new URL('payload-metrics.json',out),JSON.stringify({files:sizes,totalBytes:sizes.reduce((n,f)=>n+f.bytes,0),totalGzipBytes:sizes.reduce((n,f)=>n+f.gzipBytes,0)},null,2));
