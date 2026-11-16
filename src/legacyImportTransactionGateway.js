// Step 102: server-side legacy import transaction contract; no actual database adapter.
// A trusted implementation must atomically insert the unique import marker and baseline.
import {validateSave} from './backup.js';
const profileOk=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{8,80}$/.test(x);
const parentOk=x=>typeof x==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);
export function createLegacyImportTransactionGateway({authorize,loadVerifiedSnapshot,storage}={}){
 if(typeof authorize!=='function'||typeof loadVerifiedSnapshot!=='function'||typeof storage?.insertBaselineOnce!=='function')throw new Error('Trusted import dependencies required.');
 return {async importOnce({context,parentId,profileKey}={}){
  if(!parentOk(parentId)||!profileOk(profileKey))throw new Error('Invalid ownership identifiers.');
  if(!context||await authorize(context,parentId,profileKey)!==true)throw new Error('Access denied.');
  // Never accept a browser-supplied save or coin balance.
  const verified=await loadVerifiedSnapshot({context,parentId,profileKey});
  if(!verified||verified.parentId!==parentId||verified.profileKey!==profileKey)throw new Error('Verified snapshot mismatch.');
  const save=validateSave(verified.save);
  const marker=JSON.stringify(['legacy-save-baseline-v1',parentId.toLowerCase(),profileKey]);
  const result=await storage.insertBaselineOnce({
   parentId,profileKey,marker,baselineCoins:save.coins,
   completedKeys:Object.keys(save.completed).filter(k=>save.completed[k]===true).sort(),
   coinsToAward:0
  });
  if(result?.inserted===true)return {status:'baseline-imported',marker,coinsAwarded:0};
  if(result?.duplicate===true)return {status:'already-imported',marker,coinsAwarded:0};
  throw new Error('Import transaction failed; do not retry without checking the database.');
 }};
}
