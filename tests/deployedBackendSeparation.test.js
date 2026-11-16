import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyDeployedBackendSeparation} from '../src/deployedBackendSeparation.js';
const testing={evidenceType:'deployed-build-asset',buildSha:'abcdef123',supabaseUrl:'https://kvsmoxyemuimmlivcevn.supabase.co'};
const main={evidenceType:'deployed-build-asset',buildSha:'abcdef123',supabaseUrl:'https://aaaaaaaaaaaaaaaaaaaa.supabase.co'};
test('separate deployed build refs can establish separation without allowing writes',()=>{
 const r=verifyDeployedBackendSeparation({main,testing});assert.equal(r.isolated,true);assert.equal(r.stagingWritesPermitted,false);
});
test('rejects same backend, unverified and incorrect testing backend',()=>{
 assert.ok(verifyDeployedBackendSeparation({main:testing,testing}).reasons.includes('shared-backend-detected'));
 assert.ok(verifyDeployedBackendSeparation({main:{...main,evidenceType:'service-config'},testing}).reasons.includes('main-deployed-backend-unverified'));
 assert.ok(verifyDeployedBackendSeparation({main,testing:{...testing,supabaseUrl:main.supabaseUrl}}).reasons.includes('testing-project-mismatch'));
});
