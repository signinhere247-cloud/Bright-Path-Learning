import test from 'node:test';import assert from 'node:assert/strict';import {eyfsPlayActivities,getEyfsPlayActivity} from '../src/eyfsPlayActivities.js';
test('twenty-eight EYFS play activities across all seven learning areas are implemented with usable guidance',()=>{
 assert.equal(eyfsPlayActivities.length,28);
 assert.deepEqual(eyfsPlayActivities.map(a=>a.id),['ACT-EYFS-P1-01','ACT-EYFS-P1-02','ACT-EYFS-P1-03','ACT-EYFS-P1-04','ACT-EYFS-P2-01','ACT-EYFS-P2-02','ACT-EYFS-P2-03','ACT-EYFS-P2-04','ACT-EYFS-P3-01','ACT-EYFS-P3-02','ACT-EYFS-P3-03','ACT-EYFS-P3-04','ACT-EYFS-P4-01','ACT-EYFS-P4-02','ACT-EYFS-P4-03','ACT-EYFS-P4-04','ACT-EYFS-P5-01','ACT-EYFS-P5-02','ACT-EYFS-P5-03','ACT-EYFS-P5-04','ACT-EYFS-P6-01','ACT-EYFS-P6-02','ACT-EYFS-P6-03','ACT-EYFS-P6-04','ACT-EYFS-P7-01','ACT-EYFS-P7-02','ACT-EYFS-P7-03','ACT-EYFS-P7-04']);
 for(const a of eyfsPlayActivities){assert.equal(a.steps.length,4);assert.ok(a.materials&&a.alternatives&&a.safety&&a.adultPrompt);assert.equal(getEyfsPlayActivity(a.id),a);}
 assert.equal(getEyfsPlayActivity('unknown'),null);
});
test('activities do not require child uploads or quiz scores',()=>{
 for(const a of eyfsPlayActivities)assert.ok(!('score' in a)&&!('upload' in a));
});

test('activity guides span all seven EYFS learning areas',()=>{
 assert.equal(new Set(eyfsPlayActivities.map(a=>a.area)).size,7);
 assert.equal(new Set(eyfsPlayActivities.map(a=>a.strandId)).size,28);
});
