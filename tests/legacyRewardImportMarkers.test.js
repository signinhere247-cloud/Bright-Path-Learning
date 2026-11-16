import test from 'node:test';
import assert from 'node:assert/strict';
import {legacyImportMarker,previewLegacyImport,checkLegacyPolicyAlignment,LEGACY_REWARD_POLICY} from '../src/legacyRewardImportMarkers.js';
import {readFileSync} from 'node:fs';
const parentId='11111111-2222-3333-4444-555555555555',profileKey='explorer_1';
const save={coins:200,completed:{'Maths:Addition':true},profile:'Explorer',avatar:'#f7ad65',outfit:'#7b5ee8',pet:null,inventory:['bed'],placed:[]};
test('legacy reward policy matches existing settlement code',()=>{
 const code=readFileSync(new URL('../src/lessonProgress.js',import.meta.url),'utf8');
 assert.match(code,/first\?25:5/);assert.match(code,/>=0\.7/);
 assert.deepEqual(LEGACY_REWARD_POLICY,{firstPassCoins:25,repeatPassCoins:5,passThreshold:0.7});
 assert.equal(checkLegacyPolicyAlignment({firstPassCoins:10,repeatPassCoins:0,passThreshold:0.7}).aligned,false);
 assert.equal(checkLegacyPolicyAlignment(LEGACY_REWARD_POLICY).aligned,true);
});
test('migration import marker is stable and existing marker skips import without coins',()=>{
 const marker=legacyImportMarker({parentId,profileKey});
 const initial=previewLegacyImport({parentId,profileKey,save});
 assert.equal(initial.action,'requires-server-side-transaction');assert.equal(initial.baselineCoins,200);assert.equal(initial.coinsToAward,0);
 const repeat=previewLegacyImport({parentId,profileKey,save,existingImportMarkers:[marker]});
 assert.equal(repeat.action,'skip-existing-import');assert.equal(repeat.coinsToAward,0);
 assert.equal(save.coins,200);
});
test('different child has different import marker and invalid owners are rejected',()=>{
 assert.notEqual(legacyImportMarker({parentId,profileKey}),legacyImportMarker({parentId,profileKey:'explorer_2'}));
 assert.throws(()=>legacyImportMarker({parentId:'invalid',profileKey}),/ownership/);
});
