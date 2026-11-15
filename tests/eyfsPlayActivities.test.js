import test from 'node:test';import assert from 'node:assert/strict';import {eyfsPlayActivities,getEyfsPlayActivity} from '../src/eyfsPlayActivities.js';
test('first two EYFS communication play activities are implemented with usable guidance',()=>{
 assert.equal(eyfsPlayActivities.length,2);
 assert.deepEqual(eyfsPlayActivities.map(a=>a.id),['ACT-EYFS-P1-01','ACT-EYFS-P1-02']);
 for(const a of eyfsPlayActivities){assert.equal(a.steps.length,4);assert.ok(a.materials&&a.alternatives&&a.safety&&a.adultPrompt);assert.equal(getEyfsPlayActivity(a.id),a);}
 assert.equal(getEyfsPlayActivity('unknown'),null);
});
test('activities do not require child uploads or quiz scores',()=>{
 for(const a of eyfsPlayActivities)assert.ok(!('score' in a)&&!('upload' in a));
});
