// Step 100: read-only migration planning for existing explorer save_data.
// No database calls, balance updates, reward grants or local save mutations.
import {validateSave} from './backup.js';
const validProfile=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{8,80}$/.test(x);
const validParent=x=>typeof x==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);
export function previewLegacyLearningMigration({parentId,profileKey,save}={}){
 if(!validParent(parentId)||!validProfile(profileKey))throw new Error('Invalid family ownership identifiers.');
 const validated=validateSave(save);
 const completedLessonKeys=Object.keys(validated.completed).filter(k=>validated.completed[k]===true).sort();
 return {
  mode:'preview-only',parentId,profileKey,
  legacyBalance:validated.coins,
  legacyCompletedLessonKeys:completedLessonKeys,
  completedLessonCount:completedLessonKeys.length,
  suggestedBaseline:{parentId,profileKey,balance:validated.coins},
  rewardLedgerPolicy:'do-not-backfill-coin-grants',
  migrationRequired:true,
  warnings:[
   'Existing completed keys use subject:topic, not the new lesson IDs; an approved mapping is required.',
   'Existing coins already include historical earnings and spending; do not add completion coins again.',
   'Legacy settleLesson awards 25 coins on first pass and 5 on repeats; new 10-coin draft policy must not replace existing behaviour without approval.',
   'No attempt-level answers or verified completion evidence can be reconstructed from completed flags.'
  ]
 };
}
export function planLegacyMigrationBatch(rows=[]){
 if(!Array.isArray(rows)||rows.length>8)throw new Error('Invalid family profile batch.');
 const seen=new Set();
 const previews=rows.map(row=>{
  const preview=previewLegacyLearningMigration(row);
  const key=JSON.stringify([preview.parentId,preview.profileKey]);
  if(seen.has(key))throw new Error('Duplicate family profile.');
  seen.add(key);return preview;
 });
 return {mode:'preview-only',profiles:previews,profileCount:previews.length,willWrite:false};
}
