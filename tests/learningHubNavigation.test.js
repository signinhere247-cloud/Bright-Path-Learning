import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/style.css',import.meta.url),'utf8');
const start=main.indexOf('function showLearningAdventureHub(){');
const end=main.indexOf('function showAdventureOverview(){',start);
const hub=main.slice(start,end);
test('learning hub navigation links target existing headings',()=>{
 assert.ok(start>=0&&end>start);
 for(const id of ['hubSummaryHeading','hubHighlightsHeading','hubCelebrationsHeading','hubSuggestionsHeading','hubActivitiesHeading']){
  assert.ok(hub.includes('href="#'+id+'"'));
  assert.ok(hub.includes('id="'+id+'"'));
 }
 assert.ok(hub.includes('aria-label="Learning adventure sections"'));
});
test('learning hub activities remain actionable and return to progress',()=>{
 for(const id of ['hubLearn','hubChallenges','hubGoals','hubDashboard','hubAchievements','hubJourney','hubBack']){
  assert.ok(hub.includes('id="'+id+'"'));
  assert.ok(hub.includes("$('#"+id+"').onclick="));
 }
});
test('hub has mobile layouts and keyboard-visible focus',()=>{
 assert.match(css,/\.learning-hub-jump a:focus-visible/);
 assert.match(css,/@media\(max-width:480px\)/);
 assert.match(css,/@media\(max-width:340px\)/);
 assert.match(css,/min-height:44px/);
});
