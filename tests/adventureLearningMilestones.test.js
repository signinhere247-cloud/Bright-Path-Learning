import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DISCOVERIES} from '../src/villageActivities.js';
import {adventureLearningMilestones} from '../src/adventureLearningMilestones.js';
const day='2026-11-13',subjects=['Maths','Science','Geography','English'];
const completed=n=>Object.fromEntries(Array.from({length:n},(_,i)=>['Science:Topic '+i,true]));
const discoveries=n=>Object.fromEntries(DISCOVERIES.slice(0,n).map(d=>[d.id,day]));
test('combined milestones unlock at each cross-activity threshold',()=>{
 assert.equal(adventureLearningMilestones({completed:completed(0),discoveries:discoveries(6)},subjects,day).length,0);
 assert.equal(adventureLearningMilestones({completed:completed(1),discoveries:discoveries(1)},subjects,day).length,1);
 assert.equal(adventureLearningMilestones({completed:completed(5),discoveries:discoveries(3)},subjects,day).length,2);
 assert.equal(adventureLearningMilestones({completed:completed(10),discoveries:discoveries(6)},subjects,day).length,3);
});
test('milestones do not alter rewards or leak across children',()=>{
 const child={coins:35,completed:completed(10),discoveries:discoveries(6)};
 const snapshot=JSON.stringify(child);
 assert.equal(adventureLearningMilestones(child,subjects,day).length,3);
 assert.equal(JSON.stringify(child),snapshot);
 assert.equal(adventureLearningMilestones({coins:0,completed:{},discoveries:{}},subjects,day).length,0);
});
test('journal renders replayable accessible milestone buttons',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const journal=main.slice(main.indexOf('function showVillageJournal()'),main.indexOf('function showDiscoveryMenu()'));
 assert.ok(journal.includes('adventureLearningMilestones(state,subjects,day)'));
 assert.ok(journal.includes("button.setAttribute('aria-label','Celebrate '+milestone.title)"));
 assert.ok(journal.includes("$('#adventureLearningMilestoneMessage').textContent=milestone.message"));
 assert.ok(journal.includes('role="status" aria-live="polite"'));
});
