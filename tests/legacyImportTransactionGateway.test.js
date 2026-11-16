import test from 'node:test';
import assert from 'node:assert/strict';
import {createLegacyImportTransactionGateway} from '../src/legacyImportTransactionGateway.js';
const parentId='11111111-2222-3333-4444-555555555555',profileKey='explorer_1';
const save={coins:240,completed:{'Maths:Fractions':true},profile:'Explorer',avatar:'#f7ad65',outfit:'#7b5ee8',pet:null,inventory:['bed'],placed:[]};
test('imports verified baseline once and never grants coins',async()=>{
 const markers=new Set();const calls=[];
 const gateway=createLegacyImportTransactionGateway({authorize:async(ctx,id)=>ctx.parentId===id,loadVerifiedSnapshot:async()=>({parentId,profileKey,save}),storage:{insertBaselineOnce:async(payload)=>{calls.push(payload);if(markers.has(payload.marker))return {duplicate:true};markers.add(payload.marker);return {inserted:true};}}});
 const context={parentId};const input={context,parentId,profileKey};
 assert.equal((await gateway.importOnce(input)).status,'baseline-imported');
 assert.equal((await gateway.importOnce(input)).status,'already-imported');
 assert.equal(calls[0].baselineCoins,240);assert.equal(calls[0].coinsToAward,0);assert.equal(markers.size,1);
});
test('rejects unauthorized parents and mismatched verified snapshots',async()=>{
 let wrote=false;
 const gateway=createLegacyImportTransactionGateway({authorize:async()=>false,loadVerifiedSnapshot:async()=>({parentId,profileKey,save}),storage:{insertBaselineOnce:async()=>{wrote=true;return {inserted:true};}}});
 await assert.rejects(gateway.importOnce({context:{},parentId,profileKey}),/Access denied/);assert.equal(wrote,false);
 const mismatch=createLegacyImportTransactionGateway({authorize:async()=>true,loadVerifiedSnapshot:async()=>({parentId,profileKey:'explorer_2',save}),storage:{insertBaselineOnce:async()=>{wrote=true;return {inserted:true};}}});
 await assert.rejects(mismatch.importOnce({context:{},parentId,profileKey}),/snapshot mismatch/);assert.equal(wrote,false);
});
test('requires trusted dependencies',()=>assert.throws(()=>createLegacyImportTransactionGateway({}),/Trusted import/));
