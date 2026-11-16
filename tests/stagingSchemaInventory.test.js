import test from 'node:test';
import assert from 'node:assert/strict';
import {assessStagingSchema} from '../src/stagingSchemaInventory.js';
const projectId='kvsmoxyemuimmlivcevn';
const tables=[{name:'public.family_snapshots',rls_enabled:true,columns:['parent_id','profile_key','save_data','revision'].map(name=>({name})),primary_keys:['parent_id','profile_key']}];
test('recognises expected testing project and read-only family schema',()=>{
 const result=assessStagingSchema({projectId,tables});assert.equal(result.familySchemaReady,true);assert.equal(result.legacyImportLedgerPresent,false);assert.equal(result.safeToRunWrites,false);
});
test('fails closed for wrong project, missing RLS and missing ownership keys',()=>{
 assert.throws(()=>assessStagingSchema({projectId:'other',tables}),/Unexpected/);
 assert.throws(()=>assessStagingSchema({projectId,tables:[{...tables[0],rls_enabled:false}]}),/RLS/);
 assert.throws(()=>assessStagingSchema({projectId,tables:[{...tables[0],primary_keys:['profile_key']}]}),/composite/);
});
