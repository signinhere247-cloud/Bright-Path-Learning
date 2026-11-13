import test from 'node:test';
import assert from 'node:assert/strict';
import {learningHubSuggestions} from '../src/learningHubSuggestions.js';
import {chooseLearningGoal} from '../src/learningGoals.js';
import {recordDailySubject} from '../src/dailyLearningChallenges.js';
import {learningAdventureHub} from '../src/learningAdventureHub.js';

const subjects=['Maths','English'],day='2026-11-13';
test('an active goal does not repeat as a generic explore card',()=>{
 const save=chooseLearningGoal({completed:{}},subjects,'Maths',3);
 const ideas=learningHubSuggestions(save,subjects,day);
 assert.ok(ideas.some(x=>x.id==='active-goal'&&x.subject==='Maths'));
 assert.ok(!ideas.some(x=>x.id==='explore:Maths'));
 assert.ok(ideas.length<=3);
});
test('other subjects remain available when a goal is active',()=>{
 const save=chooseLearningGoal({completed:{}},subjects,'Maths',3);
 const ideas=learningHubSuggestions(save,subjects,day);
 assert.ok(ideas.some(x=>x.id==='explore:English'));
});
test('a completed challenge remains completed on hub revisit without re-suggesting it',()=>{
 let save=recordDailySubject({completed:{}},day,'Maths');
 save=recordDailySubject(save,day,'English');
 for(let i=0;i<2;i++){
  assert.equal(learningAdventureHub(save,subjects,day).challenge.complete,true);
  assert.ok(!learningHubSuggestions(save,subjects,day).some(x=>x.id==='daily-challenge'));
 }
});
test('hub suggestions do not mutate saved progress or BrightCoins',()=>{
 const save=chooseLearningGoal({completed:{},coins:100},subjects,'Maths',3);
 const before=JSON.stringify(save);
 learningHubSuggestions(save,subjects,day);
 assert.equal(JSON.stringify(save),before);
});
