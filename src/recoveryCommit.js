import {FAMILY_KEY,writeFamily} from './familyProfiles.js';
import {SAVE_KEY,AGE_KEY} from './backup.js';
import {SYNC_KEY} from './cloudSync.js';

/** Restore a family and its sync links as one best-effort localStorage transaction.
 * Keep the independent recovery snapshot until all required writes succeed.
 */
export function commitRecoveredFamily(storage,family,links){
 const keys=[FAMILY_KEY,SAVE_KEY,AGE_KEY,SYNC_KEY];
 const before=new Map(keys.map(key=>[key,storage.getItem(key)]));
 try{
  // Disable stale sync links before exposing restored family progress.
  storage.setItem(SYNC_KEY,JSON.stringify({}));
  writeFamily(storage,family);
  storage.setItem(SYNC_KEY,JSON.stringify(links));
 }catch(error){
  let rollbackFailed=false;
  for(const [key,value] of before){
   try{if(value===null)storage.removeItem(key);else storage.setItem(key,value)}catch{rollbackFailed=true;}
  }
  throw Error(rollbackFailed
   ? 'Recovery could not finish and storage rollback was incomplete. Keep the recovery copy and do not sync until storage is repaired.'
   : `Recovery could not finish. Previous progress was restored; the recovery copy remains available. ${error.message}`);
 }
 return family;
}
