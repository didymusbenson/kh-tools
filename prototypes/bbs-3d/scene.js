import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export async function createScene(mount,metrics){
 const start=performance.now(),renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;mount.append(renderer.domElement);
 const scene=new THREE.Scene(),group=new THREE.Group();scene.add(group);
 const camera=new THREE.PerspectiveCamera(35,1,.1,40),loader=new GLTFLoader(),names=['terra','ventus','aqua'],angles={terra:0,ventus:Math.PI*2/3,aqua:-Math.PI*2/3};
 const results=await Promise.allSettled(['station',...names].map(name=>loader.loadAsync(`./models/${name}.glb`)));
 function release(object){object.traverse(o=>{if(o.isMesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material]){m.map?.dispose();m.dispose()}}})}
 const failed=results.find(r=>r.status==='rejected');if(failed){results.filter(r=>r.status==='fulfilled').forEach(r=>release(r.value.scene));renderer.dispose();renderer.domElement.remove();throw failed.reason}
 const loaded=results.map(r=>r.value);
 loaded.forEach((g,index)=>{const model=g.scene;model.traverse(o=>{if(o.isMesh){o.frustumCulled=true;o.material.side=THREE.DoubleSide}});if(!index)model.rotation.y=Math.PI*2/3;if(index){const name=names[index-1],a=angles[name];model.position.set(Math.sin(a)*1.85,0,Math.cos(a)*1.85);model.rotation.y=a;}group.add(model)});
 let enabled=true,inView=true,frame=0,from=0,target=0,began=0,animating=false,totalFrames=0,lastTime=0,intervals=[],renderTimes=[],lastSummary='';
 const assetBytes=loaded.reduce((sum,g)=>sum+g.parser.json.buffers.reduce((n,b)=>n+b.byteLength,0),0);
 function report(){const sorted=[...intervals].sort((a,b)=>a-b),times=[...renderTimes].sort((a,b)=>a-b);const summary=JSON.stringify({state:!enabled?'stills':document.hidden?'hidden':!inView?'offscreen':animating?'transitioning':'settled (no render loop)',triangles:renderer.info.render.triangles,drawCalls:renderer.info.render.calls,loadedTextures:renderer.info.memory.textures,loadedGeometries:renderer.info.memory.geometries,devicePixelRatio:renderer.getPixelRatio(),canvas:[renderer.domElement.width,renderer.domElement.height],firstReadyMs:Math.round(readyMs),renderedFrames:totalFrames,transitionSamples:intervals.length,medianFrameIntervalMs:sorted.length?+sorted[Math.floor(sorted.length*.5)].toFixed(2):null,p95FrameIntervalMs:sorted.length?+sorted[Math.floor(sorted.length*.95)].toFixed(2):null,p95CpuRenderMs:times.length?+times[Math.floor(times.length*.95)].toFixed(2):null,embeddedBufferBytes:assetBytes},null,2);if(summary!==lastSummary){metrics.textContent=summary;lastSummary=summary}}
 function tick(now){frame=0;if(!enabled||!inView||document.hidden){report();return}if(animating){const t=Math.min(1,(now-began)/700),ease=t*t*(3-2*t);group.rotation.y=from+(target-from)*ease;if(lastTime){intervals.push(now-lastTime);if(intervals.length>600)intervals.shift()}lastTime=now;if(t>=1){animating=false;lastTime=0}}
 const t=performance.now();renderer.render(scene,camera);renderTimes.push(performance.now()-t);if(renderTimes.length>600)renderTimes.shift();totalFrames++;report();if(animating)frame=requestAnimationFrame(tick)}
 function invalidate(){if(!frame&&enabled&&inView&&!document.hidden)frame=requestAnimationFrame(tick)}
 function stop(){if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;report()}
 function resize(){const w=mount.clientWidth,h=mount.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.set(0,h>w?2.2:2.3,h>w?6.8:6.7);camera.lookAt(0,.9,.9);camera.updateProjectionMatrix();invalidate()}
 const readyMs=performance.now()-start;
 new ResizeObserver(resize).observe(mount);new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)invalidate();else stop()}).observe(mount);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else invalidate()});renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();enabled=false;stop();document.querySelector('#stage').classList.remove('loaded');document.querySelector('#status').textContent='3D paused after the graphics context was lost. Character stills remain available.'});
 resize();return{select(name,motion=true){from=group.rotation.y;target=-angles[name];target=from+Math.atan2(Math.sin(target-from),Math.cos(target-from));began=performance.now();animating=motion&&Math.abs(target-from)>.001;if(!animating)group.rotation.y=target;lastTime=0;report();invalidate()},setEnabled(value){enabled=value;report();if(enabled)invalidate();else stop()}};
}
