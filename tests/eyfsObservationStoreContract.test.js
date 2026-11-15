import test from 'node:test';import assert from 'node:assert/strict';import {createEyfsObservationStore} from '../src/eyfsObservationStoreContract.js';
const a={householdId:'home-a',childIds:['child-a','child-b']},b={householdId:'home-b',childIds:['child-c']};
const note={activityId:'ACT-EYFS-P1-01',status:'noted',note:'Chose a picture and pointed.'};
test('observations are scoped to a parent household and individual child',()=>{
 const store=createEyfsObservationStore();
 const row=store.add(a,'home-a','child-a',note);
 assert.equal(store.list(a,'home-a','child-a').length,1);
 assert.equal(store.list(a,'home-a','child-b').length,0);
 assert.throws(()=>store.list(b,'home-a','child-a'),/Access denied/);
 assert.throws(()=>store.add(a,'home-b','child-c',note),/Access denied/);
 assert.throws(()=>store.update(a,'home-a','child-b',row.id,note),/not found/);
 assert.throws(()=>store.remove(b,'home-a','child-a',row.id),/Access denied/);
 const changed=store.update(a,'home-a','child-a',row.id,{...note,status:'developing'});
 assert.equal(changed.status,'developing');assert.equal(changed.elgVerified,false);
 assert.equal(store.remove(a,'home-a','child-a',row.id),true);
 assert.deepEqual(store.list(a,'home-a','child-a'),[]);
});
test('invalid observations and missing parent access are rejected',()=>{
 const store=createEyfsObservationStore();
 assert.throws(()=>store.add(null,'home-a','child-a',note),/Access denied/);
 assert.throws(()=>store.add(a,'home-a','child-a',{...note,elgAchieved:true}),/mastery/);
});
