import test from 'node:test';
import assert from 'node:assert/strict';
import {preserveBeforeCloudRestore,inspectCloudRecovery,restoreCloudRecovery,clearCloudRecovery} from '../src/cloudRecovery.js';
import {readFamily,writeFamily} from '../src/familyProfiles.js';
const storage=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)}};
test('preserves family before overwrite and restores it',()=>{const s=storage(),f=readFamily(s);writeFamily(s,f);preserveBeforeCloudRestore(s,f);const changed=structuredClone(f);changed.profiles[0].save.coins=900;writeFamily(s,changed);assert.equal(inspectCloudRecovery(s).profiles.length,1);restoreCloudRecovery(s);assert.equal(readFamily(s).profiles[0].save.coins,f.profiles[0].save.coins);assert.equal(inspectCloudRecovery(s),null)});
test('will not overwrite earlier recovery snapshot',()=>{const s=storage(),f=readFamily(s);preserveBeforeCloudRestore(s,f);assert.throws(()=>preserveBeforeCloudRestore(s,f),/already exists/)});
test('damaged recovery snapshot cannot be restored or discarded',()=>{const s=storage();s.setItem('brightpath-cloud-restore-recovery-v1','bad');assert.throws(()=>inspectCloudRecovery(s),/damaged/);assert.throws(()=>clearCloudRecovery(s),/damaged/)});
test('explicit clear removes valid recovery copy',()=>{const s=storage();preserveBeforeCloudRestore(s,readFamily(s));clearCloudRecovery(s);assert.equal(inspectCloudRecovery(s),null)});
test('storage error prevents cloud restore',()=>{const s={getItem:()=>null,setItem:()=>{throw Error('full')}};assert.throws(()=>preserveBeforeCloudRestore(s,readFamily(s)),/cancelled/)});

import {applyCloudRestore} from '../src/cloudRecovery.js';
import {linkCloudProfile,readSyncLinks} from '../src/cloudSync.js';
test('restoring cloud progress unlinks only the replaced explorer from future uploads',()=>{
 const s=storage(),f=readFamily(s);writeFamily(s,f);linkCloudProfile(s,'explorer_1',7);linkCloudProfile(s,'explorer_2',3);
 const next=structuredClone(f);next.profiles[0].save.coins=321;
 applyCloudRestore(s,f,next,'explorer_1');
 assert.equal(readFamily(s).profiles[0].save.coins,321);
 assert.equal(readSyncLinks(s).explorer_1,undefined);
 assert.equal(readSyncLinks(s).explorer_2,3);
 assert.equal(inspectCloudRecovery(s).family.profiles[0].save.coins,100);
});
test('a preexisting recovery snapshot blocks restore without changing sync links',()=>{
 const s=storage(),f=readFamily(s);writeFamily(s,f);linkCloudProfile(s,'explorer_1',2);
 preserveBeforeCloudRestore(s,f);
 assert.throws(()=>applyCloudRestore(s,f,f,'explorer_1'),/already exists/);
 assert.equal(readSyncLinks(s).explorer_1,2);
});
test('cloud recovery restores the original family sync links, not links from restored progress',()=>{
 const s=storage(),f=readFamily(s);writeFamily(s,f);linkCloudProfile(s,'explorer_1',6);linkCloudProfile(s,'explorer_other',4);
 const next=structuredClone(f);next.profiles[0].save.coins=400;
 applyCloudRestore(s,f,next,'explorer_1');linkCloudProfile(s,'explorer_1',22);
 restoreCloudRecovery(s);
 assert.deepEqual(readSyncLinks(s),{explorer_1:6,explorer_other:4});
});
test('legacy cloud recovery without saved links restores safely unlinked',()=>{
 const s=storage(),f=readFamily(s);preserveBeforeCloudRestore(s,f);
 s.removeItem('brightpath-cloud-restore-sync-links-v1');linkCloudProfile(s,'explorer_1',9);
 restoreCloudRecovery(s);assert.deepEqual(readSyncLinks(s),{});
});
