import test from 'node:test';
import assert from 'node:assert/strict';
import {createTestingBuildReport} from '../src/testingBuildReport.js';
const valid={BRIGHTPATH_BUILD_REPORT:'enabled',BRIGHTPATH_RENDER_SERVICE:'brightpath-cloud-auth-testing',BRIGHTPATH_ENVIRONMENT:'testing',VITE_SUPABASE_URL:'https://kvsmoxyemuimmlivcevn.supabase.co',RENDER_GIT_COMMIT:'a'.repeat(40)};
test('returns only non-secret testing project and deployment provenance',()=>{
 const report=createTestingBuildReport({...valid,VITE_SUPABASE_PUBLISHABLE_KEY:'secret-example'});
 assert.deepEqual(Object.keys(report).sort(),['commit','environment','projectRef','schemaVersion','service']);
 assert.equal(JSON.stringify(report).includes('secret-example'),false);
});
test('fails closed for production, disabled report, wrong backend and incomplete SHA',()=>{
 for(const changes of [{BRIGHTPATH_BUILD_REPORT:'off'},{BRIGHTPATH_RENDER_SERVICE:'Bright-Path-Learning'},{BRIGHTPATH_ENVIRONMENT:'production'},{VITE_SUPABASE_URL:'https://aaaaaaaaaaaaaaaaaaaa.supabase.co'},{RENDER_GIT_COMMIT:'abc'}]){
  assert.throws(()=>createTestingBuildReport({...valid,...changes}));
 }
});
