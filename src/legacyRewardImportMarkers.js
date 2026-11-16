// Step 101: read-only legacy reward policy and import idempotency plan.
// This module cannot credit coins, mark imports complete, or write to a database.
import {validateSave} from './backup.js';
export const LEGACY_REWARD_POLICY=Object.freeze({firstPassCoins:25,repeatPassCoins:5,passThreshold:0.7});
const validProfile=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{8,80}$/.test(x);
const validParent=x=>typeof x==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);
export function legacyImportMarker({parentId,profileKey}={}){
 if(!validParent(parentId)||!validProfile(profileKey))throw new Error('Invalid family ownership identifiers.');
 return JSON.stringify(['legacy-save-baseline-v1',parentId.toLowerCase(),profileKey]);
}
export function previewLegacyImport({parentId,profileKey,save,existingImportMarkers=[]}={}){
 const marker=legacyImportMarker({parentId,profileKey});
 if(!Array.isArray(existingImportMarkers)||existingImportMarkers.some(x=>typeof x!=='string'))throw new Error('Invalid import marker ledger.');
 const validated=validateSave(save);
 const alreadyImported=existingImportMarkers.includes(marker);
 return {
  mode:'preview-only',marker,alreadyImported,
  action:alreadyImported?'skip-existing-import':'requires-server-side-transaction',
  baselineCoins:validated.coins,
  completedKeys:Object.keys(validated.completed).filter(k=>validated.completed[k]===true).sort(),
  coinsToAward:0,
  rewardPolicy:LEGACY_REWARD_POLICY,
  requiresParentOwnershipVerification:true
 };
}
export function checkLegacyPolicyAlignment({firstPassCoins,repeatPassCoins,passThreshold}={}){
 const mismatches=[];
 if(firstPassCoins!==LEGACY_REWARD_POLICY.firstPassCoins)mismatches.push('first-pass');
 if(repeatPassCoins!==LEGACY_REWARD_POLICY.repeatPassCoins)mismatches.push('repeat-pass');
 if(passThreshold!==LEGACY_REWARD_POLICY.passThreshold)mismatches.push('pass-threshold');
 return {aligned:mismatches.length===0,mismatches};
}
