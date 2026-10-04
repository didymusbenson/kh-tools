import 'fake-indexeddb/auto';
import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {createPlayerStore,type PlayerStore} from '../src/state/playerStore';
import type {GameData,GuideEntry} from '../src/domain/types';
const entry=(id:string,acquisitionId?:string):GuideEntry=>({id,game:'kh1fm',category:'treasure',name:id,summary:'',instructions:'',tags:[],relatedIds:[],sources:[],verification:'source-backed',checkable:true,collectible:true,facts:acquisitionId?{acquisitionId}:undefined});
const data:GameData={schemaVersion:1,game:'kh1fm',version:'test',entries:[entry('chest','shared'),entry('alias','shared'),entry('other')],recipes:[],coverage:[]};
const stores:PlayerStore[]=[];
async function open(){const store=createPlayerStore(data);stores.push(store);await vi.waitFor(()=>expect(store.getSnapshot().ready).toBe(true));return store;}
beforeEach(async()=>{await new Promise<void>((resolve,reject)=>{const request=indexedDB.deleteDatabase('ars-arcanum-player');request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error);});});
afterEach(()=>{stores.splice(0).forEach(store=>store.dispose());vi.restoreAllMocks();});
describe('truthful treasure save acknowledgments',()=>{
 it('rejects a failed transaction, keeps saved values and allows a real retry',async()=>{
  const store=await open();
  const put=vi.spyOn(IDBObjectStore.prototype,'put').mockImplementationOnce(()=>{throw new DOMException('Storage is full','QuotaExceededError');});
  await expect(store.setCheckConfirmed('chest',true)).rejects.toThrow('Storage is full');
  expect(store.getSnapshot().state.checks.chest).not.toBe(true);
  expect((await open()).getSnapshot().state.checks.chest).not.toBe(true);
  expect(store.getSnapshot().status).toBe('error');
  put.mockRestore();
  await expect(store.setCheckConfirmed('chest',true)).resolves.toBeUndefined();
  expect(store.getSnapshot().status).toBe('saved');
  expect((await open()).getSnapshot().state.checks).toMatchObject({chest:true,alias:true});
 });
 it('guards Undo against latest stored values without overwriting unrelated checks',async()=>{
  const a=await open(),b=await open();
  await a.setCheckConfirmed('chest',true);await b.setCheckConfirmed('other',true);
  await a.setCheckConfirmed('chest',false,true);
  expect((await open()).getSnapshot().state.checks).toMatchObject({chest:false,alias:false,other:true});
  await a.setCheckConfirmed('chest',true);await b.setCheckConfirmed('chest',false);
  await expect(a.setCheckConfirmed('chest',false,true)).rejects.toThrow('Undo was not applied');
  expect((await open()).getSnapshot().state.checks).toMatchObject({chest:false,alias:false,other:true});
 });
 it('rejects unsupported IDs instead of reporting a save',async()=>{
  await expect((await open()).setCheckConfirmed('invented',true)).rejects.toThrow('cannot be checked');
 });
});
