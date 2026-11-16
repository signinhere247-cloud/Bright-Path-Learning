import test from 'node:test';
import assert from 'node:assert/strict';
import {findSupabaseProjectRefs,classifyDeployedRefs} from '../src/deployedAssetRefScan.js';
test('extracts only project refs and never echoes source secrets',()=>{
 const s='const u="https://kvsmoxyemuimmlivcevn.supabase.co";const key="sensitive-key"';
 assert.deepEqual(findSupabaseProjectRefs([s]),['kvsmoxyemuimmlivcevn']);
 assert.equal(JSON.stringify(classifyDeployedRefs({mainAssets:[s],testingAssets:[s]})).includes('sensitive-key'),false);
});
test('flags identical project refs as unsafe',()=>{
 const s='https://kvsmoxyemuimmlivcevn.supabase.co/';
 assert.ok(classifyDeployedRefs({mainAssets:[s],testingAssets:[s]}).reasons.includes('shared-supabase-ref'));
});
test('distinct refs are not sufficient to approve writes or provenance',()=>{
 const r=classifyDeployedRefs({mainAssets:['https://aaaaaaaaaaaaaaaaaaaa.supabase.co/'],testingAssets:['https://kvsmoxyemuimmlivcevn.supabase.co/']});
 assert.equal(r.distinctRefs,true);assert.equal(r.provesDeployedProvenance,false);assert.equal(r.allowsWrites,false);
});
test('no refs is an unknown state, not evidence of no database',()=>{
 const r=classifyDeployedRefs({mainAssets:['no URL'],testingAssets:['no URL']});assert.equal(r.distinctRefs,false);
});
