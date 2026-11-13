import test from 'node:test';
import assert from 'node:assert/strict';
import {learningAdventureHub} from '../src/learningAdventureHub.js';
import {learningHubSuggestions} from '../src/learningHubSuggestions.js';
import {learningHubHighlights} from '../src/learningHubHighlights.js';
import {learningHubCelebrations} from '../src/learningHubCelebrations.js';
import {recordDailySubject} from '../src/dailyLearningChallenges.js';
import {chooseLearningGoal} from '../src/learningGoals.js';

const subjects=['Maths','English'];
const day='2026-11-13';

test('hub snapshots do not mutate explorer saves or currency',()=>{
 const save={completed:{},coins:71,learningDays:['2026-11-12'],goalKeepsakes:['Maths:1']};
 const before=JSON.stringify(save);
 const hub=learningAdventureHub(save,subjects,day);
 assert.equal(hub.challenge.count,0);
 assert.equal(hub.achievements.total>=hub.achievements.earned,true);
 learningHubSuggestions(save,subjects,day);
 learningHubHighlights(save,subjects,day);
 learningHubCelebrations(save,subjects);
 assert.equal(JSON.stringify(save),before);
});
test('completed daily challenge is not suggested again',()=>{
 let save={completed:{}};
 save=recordDailySubject(save,day,'Maths');
 assert.equal(learningAdventureHub(save,subjects,day).challenge.complete,false);
 assert.ok(learningHubSuggestions(save,subjects,day).some(item=>item.id==='daily-challenge'));
 save=recordDailySubject(save,day,'English');
 assert.equal(learningAdventureHub(save,subjects,day).challenge.complete,true);
 assert.ok(!learningHubSuggestions(save,subjects,day).some(item=>item.id==='daily-challenge'));
});
test('daily challenge state resets for a different day without removing past keepsakes',()=>{
 let save=recordDailySubject({completed:{}},day,'Maths');
 save=recordDailySubject(save,day,'English');
 assert.equal(learningAdventureHub(save,subjects,'2026-11-14').challenge.count,0);
 assert.ok(learningHubHighlights(save,subjects,'2026-11-14').some(item=>item.id==='challenges'));
});
test('active personal learning goal stays within its own child profile',()=>{
 const first=chooseLearningGoal({completed:{},coins:5},subjects,'Maths',3);
 const second={completed:{},coins:5};
 assert.equal(learningAdventureHub(first,subjects,day).goal.subject,'Maths');
 assert.equal(learningAdventureHub(second,subjects,day).goal,null);
 assert.ok(learningHubSuggestions(first,subjects,day).some(item=>item.id==='active-goal'));
 assert.ok(!learningHubSuggestions(second,subjects,day).some(item=>item.id==='active-goal'));
});
test('milestone celebrations are replayable, stable and do not award coins',()=>{
 const save={completed:{},coins:44,learningDays:['2026-11-13'],dailySubjects:{[day]:subjects}};
 const before=JSON.stringify(save);
 const a=learningHubCelebrations(save,subjects);
 assert.ok(a.some(item=>item.id==='days:1'));
 assert.ok(a.some(item=>item.id==='challenges:1'));
 assert.deepEqual(learningHubCelebrations(save,subjects),a);
 assert.equal(JSON.stringify(save),before);
});
