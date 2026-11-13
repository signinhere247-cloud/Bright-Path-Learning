import test from 'node:test';
import assert from 'node:assert/strict';
import {learningHubCelebrations} from '../src/learningHubCelebrations.js';
test('a new explorer has no earned milestone celebrations',()=>{
 assert.deepEqual(learningHubCelebrations({completed:{}},['Maths']),[]);
});
test('earned milestones can be revisited without changing save or currency',()=>{
 const save={completed:{},coins:22,learningDays:['2026-11-11','2026-11-12','2026-11-13'],dailySubjects:{'2026-11-12':['Maths','English']},goalKeepsakes:['Maths:1']};
 const before=JSON.stringify(save);
 const milestones=learningHubCelebrations(save,['Maths','English']);
 assert.ok(milestones.some(m=>m.id==='days:3'));
 assert.ok(milestones.some(m=>m.id==='challenges:1'));
 assert.ok(milestones.some(m=>m.id==='goals:1'));
 assert.deepEqual(learningHubCelebrations(save,['Maths','English']),milestones);
 assert.equal(JSON.stringify(save),before);
});
