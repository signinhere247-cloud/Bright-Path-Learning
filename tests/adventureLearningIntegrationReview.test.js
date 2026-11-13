import test from 'node:test';
import assert from 'node:assert/strict';
import {adventureLearningTargets} from '../src/adventureLearningTargets.js';
import {adventureLearningMilestones} from '../src/adventureLearningMilestones.js';
import {adventureLearningMilestoneProgress} from '../src/adventureLearningMilestoneProgress.js';
import {DISCOVERIES} from '../src/villageActivities.js';
const subjects=['Science','Maths','Geography'],day='2026-11-13';
const save=(d,l)=>({coins:55,discoveries:Object.fromEntries(DISCOVERIES.slice(0,d).map(x=>[x.id,day])),completed:Object.fromEntries(Array.from({length:l},(_,i)=>['Science:Lesson '+i,true]))});
test('shared targets match existing three milestones',()=>{
 const targets=adventureLearningTargets(DISCOVERIES.length);
 assert.deepEqual(targets.map(t=>[t.discoveries,t.lessons]),[[1,1],[3,5],[6,10]]);
 assert.deepEqual(adventureLearningTargets(0),[]);
});
test('progress always points to first locked celebration across boundary cases',()=>{
 for(let d=0;d<=6;d++)for(let l=0;l<=11;l++){
  const child=save(d,l),snapshot=JSON.stringify(child);
  const earned=adventureLearningMilestones(child,subjects,day);
  const tracker=adventureLearningMilestoneProgress(child,subjects,day);
  const locked=adventureLearningTargets(DISCOVERIES.length).filter(t=>!earned.some(m=>m.id===t.id));
  assert.equal(tracker.complete,locked.length===0,`discoveries=${d}, lessons=${l}`);
  if(locked.length)assert.equal(tracker.id,locked[0].id);
  assert.equal(JSON.stringify(child),snapshot);
 }
});
test('one child reaching milestones does not change another child progress',()=>{
 assert.equal(adventureLearningMilestoneProgress(save(6,10),subjects,day).complete,true);
 assert.equal(adventureLearningMilestoneProgress(save(0,0),subjects,day).title,'Curious Explorer');
});
