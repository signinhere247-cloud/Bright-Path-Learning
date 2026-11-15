import test from 'node:test';import assert from 'node:assert/strict';
import policy from '../curriculum/eyfs-observation-access-policy.json' with {type:'json'};
import {createEyfsObservationStore} from '../src/eyfsObservationStoreContract.js';
test('access policy specifies all operations and ten denied attack cases',()=>{
 assert.equal(policy.status,'policy-design-only');
 assert.deepEqual(policy.operations,['create','list','read','update','delete','export']);
 assert.equal(policy.adversarialCases.length,10);
 assert.equal(new Set(policy.adversarialCases.map(c=>c.id)).size,10);
 assert.ok(policy.adversarialCases.every(c=>c.expected==='deny'));
 assert.ok(policy.principles.some(p=>p.includes('verified server session')));
 assert.ok(policy.principles.some(p=>p.includes('row-level security')));
});
test('test-only contract denies sibling and household record mutation',()=>{
 const store=createEyfsObservationStore();
 const parent={householdId:'a',childIds:['one','two']};
 const other={householdId:'b',childIds:['three']};
 const note={activityId:'ACT-EYFS-P1-01',status:'noted',note:'Child pointed to the object.'};
 const row=store.add(parent,'a','one',note);
 assert.throws(()=>store.update(parent,'a','two',row.id,note),/not found/);
 assert.throws(()=>store.remove(parent,'a','two',row.id),/not found/);
 assert.throws(()=>store.update(other,'a','one',row.id,note),/Access denied/);
 assert.throws(()=>store.remove(other,'a','one',row.id),/Access denied/);
 assert.equal(store.list(parent,'a','one').length,1);
});
