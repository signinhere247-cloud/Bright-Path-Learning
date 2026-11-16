import test from 'node:test';
import assert from 'node:assert/strict';
import {previewLegacyLearningMigration,planLegacyMigrationBatch} from '../src/legacyLearningMigrationPlan.js';
const parentId='11111111-2222-3333-4444-555555555555',profileKey='explorer_1';
const save=()=>({coins:135,completed:{'Maths:Fractions':true,'English:Spelling':true},profile:'Explorer',avatar:'#f7ad65',outfit:'#7b5ee8',pet:null,petMood:75,inventory:['bed'],placed:[],sound:false});
test('migration preview retains original balance and completed keys without modifying save',()=>{
 const original=save();const preview=previewLegacyLearningMigration({parentId,profileKey,save:original});
 assert.equal(preview.mode,'preview-only');assert.equal(preview.legacyBalance,135);assert.equal(preview.completedLessonCount,2);
 assert.deepEqual(preview.legacyCompletedLessonKeys,['English:Spelling','Maths:Fractions']);
 assert.equal(preview.suggestedBaseline.balance,135);assert.equal(preview.rewardLedgerPolicy,'do-not-backfill-coin-grants');assert.equal(original.coins,135);
});
test('rejects missing family owner and invalid saves',()=>{
 assert.throws(()=>previewLegacyLearningMigration({parentId:'not-uuid',profileKey,save:save()}),/ownership/);
 assert.throws(()=>previewLegacyLearningMigration({parentId,profileKey,save:{...save(),coins:-1}}),/BrightCoins/);
});
test('family batch is preview only and disallows duplicate profiles',()=>{
 const row={parentId,profileKey,save:save()};const result=planLegacyMigrationBatch([row]);assert.equal(result.willWrite,false);assert.equal(result.profileCount,1);
 assert.throws(()=>planLegacyMigrationBatch([row,row]),/Duplicate/);
});
