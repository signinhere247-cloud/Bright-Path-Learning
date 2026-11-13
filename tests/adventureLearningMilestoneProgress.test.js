import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DISCOVERIES} from '../src/villageActivities.js';
import {adventureLearningMilestoneProgress} from '../src/adventureLearningMilestoneProgress.js';
const day='2026-11-13',subjects=['Maths','Science','Geography'];
const save=(discoveries,lessons)=>({discoveries:Object.fromEntries(DISCOVERIES.slice(0,discoveries).map(d=>[d.id,day])),completed:Object.fromEntries(Array.from({length:lessons},(_,i)=>['Science:Topic '+i,true]))});
test('next milestone starts at first cross-activity goal',()=>{
 const result=adventureLearningMilestoneProgress(save(0,0),subjects,day);
 assert.equal(result.title,'Curious Explorer');
 assert.equal(result.discoveries,0);
 assert.equal(result.lessonsTarget,1);
});
test('progress moves through all three milestones without mutating saves',()=>{
 const child=save(2,3),snapshot=JSON.stringify(child);
 const middle=adventureLearningMilestoneProgress(child,subjects,day);
 assert.equal(middle.title,'Growing Adventurer');
 assert.equal(middle.discoveries,2);
 assert.equal(middle.lessons,3);
 assert.equal(JSON.stringify(child),snapshot);
 const final=adventureLearningMilestoneProgress(save(4,8),subjects,day);
 assert.equal(final.title,'Village Learning Champion');
 assert.equal(final.discoveriesTarget,DISCOVERIES.length);
 assert.equal(adventureLearningMilestoneProgress(save(6,10),subjects,day).complete,true);
});
test('tracker renders accessible native progress elements and child-specific state',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const journal=main.slice(main.indexOf('function showVillageJournal()'),main.indexOf('function showDiscoveryMenu()'));
 assert.ok(journal.includes('adventureLearningMilestoneProgress(state,subjects,day)'));
 assert.ok(journal.includes("document.createElement('progress')"));
 assert.ok(journal.includes("meter.setAttribute('aria-label'"));
});
