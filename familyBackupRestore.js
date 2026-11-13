import {commitRecoveredFamily} from './recoveryCommit.js';
import {validateSave} from './backup.js';
import {readFamily,updateActive,writeFamily,FAMILY_KEY} from './familyProfiles.js';
import {SYNC_KEY,readSyncLinks} from './cloudSync.js';

export const IMPORT_RECOVERY_KEY='brightpath-family-import-recovery-v1';
export const IMPORT_RECOVERY_LINKS='brightpath-family-import-sync-links-v1';

/** Import into the active family explorer in one validated family write.
 * A separate recovery snapshot is retained until the parent explicitly clears it.
 */
export function importExplorerBackup(storage,family,backup){
 if(storage.getItem(IMPORT_RECOVERY_KEY)!==null)throw Error('A previous import recovery copy exists. Review or clear it before importing again.');
 const safe=validateSave(backup?.save);
 const next=updateActive(family,safe,backup?.age);
 // Validate the entire family before saving a recovery copy.
 const previous=JSON.stringify(family);
 const previousLinks=storage.getItem(SYNC_KEY);
 const links=readSyncLinks(storage);
 delete links[family.activeId];
 readFamily({getItem:key=>key===FAMILY_KEY?previous:null});
 try{
  storage.setItem(IMPORT_RECOVERY_LINKS,JSON.stringify(readSyncLinks(storage)));
  storage.setItem(IMPORT_RECOVERY_KEY,previous);
 }catch{try{storage.removeItem(IMPORT_RECOVERY_LINKS)}catch{};throw Error('Could not preserve existing family progress. Import cancelled.');}
 try{
  // Imported progress must not inherit the replaced explorer's cloud revision.
  storage.setItem(SYNC_KEY,JSON.stringify(links));
  writeFamily(storage,next);
 }catch(err){
  try{if(previousLinks===null)storage.removeItem(SYNC_KEY);else storage.setItem(SYNC_KEY,previousLinks)}catch{}
  throw Error(`${err.message} Your import recovery copy has been retained.`);
 }
 return next;
}
export function inspectImportRecovery(storage){
 const raw=storage.getItem(IMPORT_RECOVERY_KEY);
 if(raw===null)return null;
 try{const family=readFamily({getItem:key=>key===FAMILY_KEY?raw:null});return {family,profiles:family.profiles.map(p=>({id:p.id,name:p.save.profile,age:p.age}))}}catch{throw Error('Import recovery data is damaged. Do not delete it.');}
}
export function restoreImportRecovery(storage){
 const recovery=inspectImportRecovery(storage);
 if(!recovery)throw Error('No import recovery copy exists.');
 const rawLinks=storage.getItem(IMPORT_RECOVERY_LINKS);
 const links=rawLinks===null?{}:readSyncLinks({getItem:key=>key===SYNC_KEY?rawLinks:null});
 commitRecoveredFamily(storage,recovery.family,links);
 try{storage.removeItem(IMPORT_RECOVERY_KEY);storage.removeItem(IMPORT_RECOVERY_LINKS)}catch{}
 return recovery.family;
}
export function clearImportRecovery(storage){
 if(!inspectImportRecovery(storage))throw Error('No import recovery copy exists.');
 storage.removeItem(IMPORT_RECOVERY_KEY);
 storage.removeItem(IMPORT_RECOVERY_LINKS);
}
