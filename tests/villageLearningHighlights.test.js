import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {villageLearningHighlights} from '../src/villageLearningHighlights.js';
const subjects=['Maths','English','Science','Geography'],day='2026-11-13';
test('highlights combine discoveries and completed lessons without modifying the save',()=>{
 const save={coins:20,discoveries:{pond:day,garden:'2026-11-12',numbers:day},completed:{'Science:Plants':true,'Maths:Multiplication':true}};
 const before=JSON.stringify(save);
 const result=villageLearningHighlights(save,subjects,day);
 assert.equal(result.discoveries,3);
 assert.equal(result.completedToday,2);
 assert.equal(result.lessons,2);
 assert.deepEqual(result.links.find(l=>l.subject==='Science'),{subject:'Science',discoveries:2,lessons:1});
 assert.deepEqual(result.links.find(l=>l.subject==='Maths'),{subject:'Maths',discoveries:1,lessons:1});
 assert.equal(JSON.stringify(save),before);
});
test('different children see only their own progress',()=>{
 const first=villageLearningHighlights({discoveries:{pond:day},completed:{'Science:Plants':true}},subjects,day);
 const second=villageLearningHighlights({discoveries:{},completed:{}},subjects,day);
 assert.equal(first.discoveries,1);
 assert.equal(second.discoveries,0);
 assert.equal(second.lessons,0);
 assert.deepEqual(second.links,[]);
});
test('village journal renders accessible highlights from active child save',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const journal=main.slice(main.indexOf('function showVillageJournal()'),main.indexOf('function showDiscoveryMenu()'));
 assert.ok(journal.includes('aria-labelledby="villageLearningHighlightsHeading"'));
 assert.ok(journal.includes('villageLearningHighlights(state,subjects,day)'));
 assert.ok(journal.includes('highlightContainer.append(summaryText)'));
});
