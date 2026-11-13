import test from 'node:test';
import assert from 'node:assert/strict';
import {readFamily,writeFamily,addExplorer,selectExplorer,FAMILY_KEY} from '../src/familyProfiles.js';
import {SYNC_KEY,linkCloudProfile,readSyncLinks} from '../src/cloudSync.js';
import {importExplorerBackup,inspectImportRecovery,restoreImportRecovery,clearImportRecovery,IMPORT_RECOVERY_KEY} from '../src/familyBackupRestore.js';
const storage=(failKey)=>{const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>{if(k===failKey)throw Error('quota');m.set(k,String(v))},removeItem:k=>m.delete(k)}};
test('import replaces only active explorer and preserves whole-family recovery',()=>{const s=storage();let f=readFamily(s);f=addExplorer(f,'Other',8,'explorer_222');writeFamily(s,f);const original=JSON.stringify(f);const imported={save:{...f.profiles[0].save,profile:'Imported',coins:987},age:12};const next=importExplorerBackup(s,f,imported);assert.equal(next.profiles[1].save.coins,987);assert.equal(next.profiles[0].save.profile,f.profiles[0].save.profile);assert.equal(JSON.stringify(inspectImportRecovery(s).family),original);assert.equal(readFamily(s).profiles[1].save.profile,'Imported');assert.equal(s.getItem('brightpath3d-save'),JSON.stringify(next.profiles[1].save));});
test('previous import recovery cannot be overwritten',()=>{const s=storage();const f=readFamily(s);importExplorerBackup(s,f,{save:f.profiles[0].save,age:9});const previous=s.getItem(IMPORT_RECOVERY_KEY);assert.throws(()=>importExplorerBackup(s,f,{save:f.profiles[0].save,age:9}),/previous import recovery/);assert.equal(s.getItem(IMPORT_RECOVERY_KEY),previous)});
test('failed family write preserves original and recovery snapshot',()=>{const s=storage(FAMILY_KEY);const f=readFamily(s);assert.throws(()=>importExplorerBackup(s,f,{save:f.profiles[0].save,age:10}),/recovery copy has been retained/);assert.ok(inspectImportRecovery(s));assert.equal(s.getItem(FAMILY_KEY),null)});
test('invalid backup leaves all storage untouched',()=>{const s=storage();const f=readFamily(s);assert.throws(()=>importExplorerBackup(s,f,{save:{coins:-1},age:9}));assert.equal(s.getItem(IMPORT_RECOVERY_KEY),null)});
test('recovery restores original family and can be cleared after inspection',()=>{const s=storage();const f=readFamily(s);importExplorerBackup(s,f,{save:{...f.profiles[0].save,coins:700},age:11});restoreImportRecovery(s);assert.equal(readFamily(s).profiles[0].save.coins,100);assert.equal(inspectImportRecovery(s),null);importExplorerBackup(s,f,{save:f.profiles[0].save,age:9});clearImportRecovery(s);assert.equal(inspectImportRecovery(s),null)});

test('import unlinks only the overwritten explorer from cloud sync',()=>{
 const s=storage();let f=readFamily(s);f=addExplorer(f,'Sibling',8,'explorer_sibling');f=selectExplorer(f,'explorer_1');writeFamily(s,f);
 linkCloudProfile(s,f.activeId,4);linkCloudProfile(s,'explorer_sibling',9);
 importExplorerBackup(s,f,{save:{...f.profiles.find(p=>p.id===f.activeId).save,coins:333},age:9});
 assert.equal(readSyncLinks(s)[f.activeId],undefined);
 assert.equal(readSyncLinks(s).explorer_sibling,9);
});
test('failed import restores previous cloud sync links',()=>{
 const s=storage(FAMILY_KEY);const f=readFamily(s);linkCloudProfile(s,f.activeId,3);
 const before=s.getItem(SYNC_KEY);
 assert.throws(()=>importExplorerBackup(s,f,{save:f.profiles[0].save,age:9}));
 assert.equal(s.getItem(SYNC_KEY),before);
});
test('import recovery restores original sync revisions alongside original family',()=>{
 const s=storage(),f=readFamily(s);linkCloudProfile(s,f.activeId,8);linkCloudProfile(s,'explorer_other',5);
 importExplorerBackup(s,f,{save:{...f.profiles[0].save,coins:800},age:9});
 linkCloudProfile(s,f.activeId,19);restoreImportRecovery(s);
 assert.deepEqual(readSyncLinks(s),{[f.activeId]:8,explorer_other:5});
});
test('legacy import recovery without link metadata clears stale cloud links',()=>{
 const s=storage(),f=readFamily(s);importExplorerBackup(s,f,{save:f.profiles[0].save,age:9});
 s.removeItem('brightpath-family-import-sync-links-v1');linkCloudProfile(s,f.activeId,12);
 restoreImportRecovery(s);assert.deepEqual(readSyncLinks(s),{});
});
