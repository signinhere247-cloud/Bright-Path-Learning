import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyRenderDeployProvenance} from '../src/renderDeployProvenance.js';
const main={serviceId:'srv-dbrercbm8hqs73cr73sg',branch:'main',status:'live',commit:'344c82a2aa40086c613b025b2fb74224a5df9d37'};
const testing={serviceId:'srv-dbsc47d6e07s739ebvig',branch:'cloud-auth-testing',status:'live',commit:'e5a9f054a5cc5d225e36fddc660a0c12416feb79'};
test('accepts two distinct live deployment identities without claiming backend isolation',()=>{
 const r=verifyRenderDeployProvenance({main,testing});assert.equal(r.provenanceVerified,true);assert.equal(r.backendIsolationVerified,false);assert.equal(r.allowsDatabaseWrites,false);
});
test('rejects stale testing deployment and service swap',()=>{
 assert.ok(verifyRenderDeployProvenance({main,testing:{...testing,status:'deactivated'}}).findings.includes('testing-deploy-unverified'));
 assert.ok(verifyRenderDeployProvenance({main,testing:{...testing,serviceId:main.serviceId}}).findings.includes('testing-service-mismatch'));
});
