import {commitRecoveredFamily} from './recoveryCommit.js';
import {readFamily,writeFamily} from './familyProfiles.js';
import {SYNC_KEY,readSyncLinks} from './cloudSync.js';

export const CLOUD_RESTORE_SNAPSHOT='brightpath-cloud-restore-recovery-v1';
export const CLOUD_RECOVERY_LINKS='brightpath-cloud-restore-sync-links-v1';
/** Preserve the whole family before a destructive cloud restore. Never overwrite a prior snapshot. */
export function preserveBeforeCloudRestore(storage,family){
 const current=storage.getItem(CLOUD_RESTORE_SNAPSHOT);
 if(current!==null)throw Error('An earlier cloud-restore recovery copy already exists. Restore or clear it before replacing more progress.');
 const serialized=JSON.stringify(family);
 // Check structure before storing; invalid data must not become a recovery copy.
 const probe=new Map([['brightpath-family-v1',serialized]]);
 readFamily({getItem:key=>probe.get(key)??null});
 try{
  storage.setItem(CLOUD_RECOVERY_LINKS,JSON.stringify(readSyncLinks(storage)));
  storage.setItem(CLOUD_RESTORE_SNAPSHOT,serialized);
 }catch{try{storage.removeItem(CLOUD_RECOVERY_LINKS)}catch{};throw Error('Cannot preserve a recovery copy. Cloud restoration was cancelled.');}
 return true;
}
export function inspectCloudRecovery(storage){
 const raw=storage.getItem(CLOUD_RESTORE_SNAPSHOT);
 if(raw===null)return null;
 let family;try{family=JSON.parse(raw);const probe=new Map([['brightpath-family-v1',raw]]);readFamily({getItem:key=>probe.get(key)??null});}catch{throw Error('The saved recovery copy is damaged. Do not delete it.');}
 return {profiles:family.profiles.map(p=>({id:p.id,name:p.save.profile,age:p.age})),family};
}
export function restoreCloudRecovery(storage){
 const snapshot=inspectCloudRecovery(storage);
 if(!snapshot)throw Error('No cloud-restore recovery copy exists.');
 // Clear current links before replacing the family. Old snapshots without link metadata
 // are intentionally restored unlinked, rather than inheriting unrelated revisions.
 const rawLinks=storage.getItem(CLOUD_RECOVERY_LINKS);
 const links=rawLinks===null?{}:readSyncLinks({getItem:key=>key===SYNC_KEY?rawLinks:null});
 commitRecoveredFamily(storage,snapshot.family,links);
 // Retain the recovery snapshot if any of the required writes failed.
 try{storage.removeItem(CLOUD_RESTORE_SNAPSHOT);storage.removeItem(CLOUD_RECOVERY_LINKS)}catch{}
 return snapshot.family;
}
export function clearCloudRecovery(storage){
 if(!inspectCloudRecovery(storage))throw Error('No recovery copy exists.');
 storage.removeItem(CLOUD_RESTORE_SNAPSHOT);
 storage.removeItem(CLOUD_RECOVERY_LINKS);
}

/** Commit a cloud restore without leaving a stale sync link attached to replaced progress.
 * A restored explorer must be deliberately re-linked before any future cloud upload.
 */
export function applyCloudRestore(storage,currentFamily,nextFamily,targetId){
 if(!currentFamily?.profiles?.some(p=>p.id===targetId)||!nextFamily?.profiles?.some(p=>p.id===targetId))throw Error('Restore target is missing.');
 const oldLinks=storage.getItem(SYNC_KEY);
 const links=readSyncLinks(storage);
 delete links[targetId];
 preserveBeforeCloudRestore(storage,currentFamily);
 try{
  storage.setItem(SYNC_KEY,JSON.stringify(links));
  writeFamily(storage,nextFamily);
 }catch(error){
  try{if(oldLinks===null)storage.removeItem(SYNC_KEY);else storage.setItem(SYNC_KEY,oldLinks)}catch{}
  throw error;
 }
 return nextFamily;
}
