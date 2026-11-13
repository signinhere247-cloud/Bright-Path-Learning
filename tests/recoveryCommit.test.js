import test from 'node:test';
import assert from 'node:assert/strict';
import {readFamily,writeFamily,FAMILY_KEY} from '../src/familyProfiles.js';
import {SAVE_KEY,AGE_KEY} from '../src/backup.js';
import {SYNC_KEY,linkCloudProfile} from '../src/cloudSync.js';
import {preserveBeforeCloudRestore,restoreCloudRecovery,CLOUD_RESTORE_SNAPSHOT} from '../src/cloudRecovery.js';
import {importExplorerBackup,restoreImportRecovery,IMPORT_RECOVERY_KEY} from '../src/familyBackupRestore.js';
const makeStorage=()=>{
 const values=new Map();let failKey=null;
 return {getItem:k=>values.get(k)??null,setItem(k,v){if(k===failKey){failKey=null;throw Error('quota');}values.set(k,String(v));},removeItem:k=>values.delete(k),failOnce(k){failKey=k;}};
};
const snapshot=s=>Object.fromEntries([FAMILY_KEY,SAVE_KEY,AGE_KEY,SYNC_KEY].map(k=>[k,s.getItem(k)]));
for(const key of [FAMILY_KEY,SAVE_KEY,AGE_KEY,SYNC_KEY]){
 test(`cloud recovery rolls back when ${key} write fails`,()=>{
  const s=makeStorage(),f=readFamily(s);writeFamily(s,f);linkCloudProfile(s,f.activeId,3);
  preserveBeforeCloudRestore(s,f);
  const changed=structuredClone(f);changed.profiles[0].save.coins=888;writeFamily(s,changed);linkCloudProfile(s,f.activeId,5);
  const before=snapshot(s);s.failOnce(key);
  assert.throws(()=>restoreCloudRecovery(s),/Recovery could not finish/);
  assert.deepEqual(snapshot(s),before);
  assert.ok(s.getItem(CLOUD_RESTORE_SNAPSHOT));
  restoreCloudRecovery(s);assert.equal(readFamily(s).profiles[0].save.coins,100);
 });
 test(`import recovery rolls back when ${key} write fails`,()=>{
  const s=makeStorage(),f=readFamily(s);writeFamily(s,f);linkCloudProfile(s,f.activeId,3);
  importExplorerBackup(s,f,{save:{...f.profiles[0].save,coins:555},age:9});linkCloudProfile(s,f.activeId,5);
  const before=snapshot(s);s.failOnce(key);
  assert.throws(()=>restoreImportRecovery(s),/Recovery could not finish/);
  assert.deepEqual(snapshot(s),before);
  assert.ok(s.getItem(IMPORT_RECOVERY_KEY));
  restoreImportRecovery(s);assert.equal(readFamily(s).profiles[0].save.coins,100);
 });
}
