import test from 'node:test';
import assert from 'node:assert/strict';
import {learningHubSuggestions} from '../src/learningHubSuggestions.js';
test('hub suggestions stay optional and actionable for a new explorer',()=>{
 const ideas=learningHubSuggestions({completed:{}},['Maths','English'],'2026-11-13');
 assert.ok(ideas.length>0&&ideas.length<=3);
 assert.ok(ideas.every(i=>['learn','challenges','goals'].includes(i.destination)));
});
test('practice needs are prioritised using only the current explorer save',()=>{
 const withPractice=learningHubSuggestions({completed:{},practiceNeeds:{'Maths:Addition':3}},['Maths','English'],'2026-11-13');
 const withoutPractice=learningHubSuggestions({completed:{}},['Maths','English'],'2026-11-13');
 assert.ok(withPractice.some(i=>i.title.includes('Addition')));
 assert.ok(withoutPractice.every(i=>!i.title.includes('Addition')));
});
