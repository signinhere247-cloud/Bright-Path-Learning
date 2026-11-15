import test from 'node:test';import assert from 'node:assert/strict';import {createEyfsObservation,validateEyfsObservation,EYFS_OBSERVATION_STATUSES} from '../src/eyfsObservations.js';
test('EYFS observation helper creates a non-certified descriptive note',()=>{
 const r=createEyfsObservation({activityId:'ACT-EYFS-P1-01',status:'noted',note:'  Took turns pointing at a familiar object.  '});
 assert.equal(r.note,'Took turns pointing at a familiar object.');
 assert.equal(r.elgVerified,false);
 assert.equal(r.reviewRequired,true);
 assert.equal(Object.isFrozen(r),true);
 assert.equal(EYFS_OBSERVATION_STATUSES.length,3);
});
test('rejects unknown activities, invalid notes, child IDs, media and mastery claims',()=>{
 for(const input of [
 {activityId:'unknown',status:'noted',note:'Observed gesture'},
 {activityId:'ACT-EYFS-P1-01',status:'mastered',note:'Observed gesture'},
 {activityId:'ACT-EYFS-P1-01',status:'noted',note:'x'},
 {activityId:'ACT-EYFS-P1-01',status:'noted',note:'Observed gesture',childId:'123'},
 {activityId:'ACT-EYFS-P1-01',status:'noted',note:'Observed gesture',photo:'file'},
 {activityId:'ACT-EYFS-P1-01',status:'noted',note:'Observed gesture',elgAchieved:true}
 ])assert.equal(validateEyfsObservation(input).valid,false);
});
