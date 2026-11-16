import test from 'node:test';
import assert from 'node:assert/strict';
import {extractSupabaseProjectRef,makeBackendEvidence,compareBackendEvidence} from '../src/deploymentBackendEvidence.js';
test('extracts only a project reference from valid Supabase URL',()=>{
 assert.equal(extractSupabaseProjectRef('https://kvsmoxyemuimmlivcevn.supabase.co/'),'kvsmoxyemuimmlivcevn');
 assert.equal(extractSupabaseProjectRef('https://evil.example/'),null);
 assert.equal(extractSupabaseProjectRef('http://kvsmoxyemuimmlivcevn.supabase.co/'),null);
});
test('test evidence contains no credentials and production build cannot emit it',()=>{
 const e=makeBackendEvidence({service:'brightpath-cloud-auth-testing',environment:'testing',url:'https://kvsmoxyemuimmlivcevn.supabase.co/',commit:'abcdef123'});
 assert.deepEqual(Object.keys(e).sort(),['commit','containsSecrets','environment','projectRef','service']);
 assert.throws(()=>makeBackendEvidence({service:'Bright-Path-Learning',environment:'production',url:'https://kvsmoxyemuimmlivcevn.supabase.co/',commit:'abcdef123'}),/Only isolated/);
});
test('comparison fails closed on shared backend and never authorises writes',()=>{
 const testing={service:'brightpath-cloud-auth-testing',projectRef:'kvsmoxyemuimmlivcevn',commit:'abc1234'};
 assert.equal(compareBackendEvidence({testing,main:{service:'Bright-Path-Learning',projectRef:'kvsmoxyemuimmlivcevn',commit:'abc1234'}}).verified,false);
 assert.deepEqual(compareBackendEvidence({testing,main:{service:'Bright-Path-Learning',projectRef:'aaaaaaaaaaaaaaaaaaaa',commit:'abc1234'}}),{verified:true,reason:null,allowsDatabaseWrites:false});
});
