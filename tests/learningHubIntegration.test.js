import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {learningAdventureHub} from '../src/learningAdventureHub.js';
import {learningHubSuggestions} from '../src/learningHubSuggestions.js';
import {learningHubHighlights} from '../src/learningHubHighlights.js';
import {learningHubCelebrations} from '../src/learningHubCelebrations.js';
import {recordDailySubject} from '../src/dailyLearningChallenges.js';
import {chooseLearningGoal} from '../src/learningGoals.js';
import {recordLearningDay} from '../src/learningStreaks.js';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const section=(start,end)=>{const i=main.indexOf('function '+start+'(');const j=main.indexOf('function '+end+'(',i);assert.ok(i>=0&&j>i,start+' should precede '+end);return main.slice(i,j)};
const hubUI=section('showLearningAdventureHub','showAdventureOverview');
const overviewUI=section('showAdventureOverview','showLearningGoals');
const subjects=['Maths','English'],day='2026-11-13';

test('adventure overview opens hub and hub routes to existing learning screens',()=>{
 assert.match(overviewUI,/id="overviewLearningHub"/);
 assert.match(overviewUI,/\$\('#overviewLearningHub'\)\.onclick=showLearningAdventureHub/);
 for(const [id,fn] of Object.entries({hubLearn:'showSubjects',hubChallenges:'showDailyQuests',hubGoals:'showLearningGoals',hubDashboard:'showLearningDashboard',hubAchievements:'showAchievementGallery',hubJourney:'showLearningJourney',hubBack:'showAdventureOverview'})){
  assert.ok(main.includes('function '+fn+'('),fn+' exists');
  assert.ok(hubUI.includes("$('#"+id+"').onclick="+fn),id+' is wired');
 }
});
test('lesson completion records learning, challenge and goal progress before save',()=>{
 const lesson=section('showQuestion','showAdventureOverview');
 for(const fragment of ['completeLessonAttempt(state','recordLearningDay(','recordPracticeNeed(','recordDailySubject(','recogniseLearningGoal(','try{save()}']){
  assert.ok(lesson.includes(fragment),fragment+' is part of lesson settlement');
 }
 assert.ok(lesson.includes('if(result.passed)state=recordDailySubject'));
 assert.ok(lesson.includes('state=previous;throw err'));
});
test('a child’s completed daily challenge appears in hub and disappears from suggestions',()=>{
 let save={completed:{},coins:13};
 save=recordDailySubject(save,day,'Maths');
 save=recordDailySubject(save,day,'English');
 const hub=learningAdventureHub(save,subjects,day);
 assert.equal(hub.challenge.complete,true);
 assert.equal(hub.challenge.count,2);
 assert.ok(!learningHubSuggestions(save,subjects,day).some(x=>x.id==='daily-challenge'));
 assert.ok(learningHubHighlights(save,subjects,day).some(x=>x.id==='challenges'));
 assert.ok(learningHubCelebrations(save,subjects).some(x=>x.id==='challenges:1'));
 assert.equal(save.coins,13);
});
test('switching child saves changes goal, challenge and highlights independently',()=>{
 let first=chooseLearningGoal({completed:{},coins:8},subjects,'Maths',3);
 first=recordDailySubject(first,day,'Maths');
 first=recordLearningDay(first,day);
 const second={completed:{},coins:31};
 const a=learningAdventureHub(first,subjects,day),b=learningAdventureHub(second,subjects,day);
 assert.equal(a.goal.subject,'Maths');
 assert.equal(b.goal,null);
 assert.equal(a.challenge.count,1);
 assert.equal(b.challenge.count,0);
 assert.ok(learningHubHighlights(first,subjects,day).some(x=>x.id==='learning-days'));
 assert.ok(!learningHubHighlights(second,subjects,day).some(x=>x.id==='learning-days'));
 assert.equal(second.coins,31);
});
test('hub sections and personalised actions have accessible targets',()=>{
 for(const id of ['hubSummaryHeading','hubHighlightsHeading','hubCelebrationsHeading','hubSuggestionsHeading','hubActivitiesHeading']){
  assert.ok(hubUI.includes('href="#'+id+'"'));
  assert.ok(hubUI.includes('id="'+id+'"'));
 }
 assert.ok(hubUI.includes("action.setAttribute('aria-label'"));
 assert.ok(hubUI.includes("button.setAttribute('aria-label'"));
 assert.ok(hubUI.includes('role="status"'));
});
