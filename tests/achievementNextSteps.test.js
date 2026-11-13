import test from 'node:test';
import assert from 'node:assert/strict';
import {achievementNextStep} from '../src/achievementNextSteps.js';
test('locked lesson milestones point to the learning academy',()=>{
 const step=achievementNextStep({id:'explorer:first-lesson',earned:false});
 assert.equal(step.destination,'learn');
 assert.match(step.description,/first academy lesson/);
});
test('locked challenge badges point to daily challenges',()=>{
 assert.equal(achievementNextStep({id:'challenge:seven-challenges',earned:false}).destination,'challenges');
});
test('earned and unknown achievements do not show invented next steps',()=>{
 assert.equal(achievementNextStep({id:'explorer:first-lesson',earned:true}),null);
 assert.equal(achievementNextStep({id:'unknown',earned:false}),null);
});
