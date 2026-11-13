import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {villageLearningSuggestion} from '../src/villageLearningSuggestion.js';
const subjects=['Maths','English','Science','History','Geography','Computing'];
test('new explorer receives first subject lesson suggestion',()=>{
 const suggestion=villageLearningSuggestion({completed:{}},'pond',subjects);
 assert.equal(suggestion.subject,'Science');
 assert.equal(suggestion.kind,'explore');
 assert.match(suggestion.title,/first Science lesson/);
});
test('completed lessons change suggestion for only the active child',()=>{
 const first={completed:{'Science:Plants':true}};
 const second={completed:{}};
 const before=JSON.stringify(first);
 assert.match(villageLearningSuggestion(first,'garden',subjects).title,/Explore more Science/);
 assert.match(villageLearningSuggestion(second,'garden',subjects).title,/first Science lesson/);
 assert.equal(JSON.stringify(first),before);
});
test('unsupported discoveries and subjects do not offer links',()=>{
 assert.equal(villageLearningSuggestion({completed:{}},'missing',subjects),null);
 assert.equal(villageLearningSuggestion({completed:{}},'numbers',['Science']),null);
});
test('journal and discovery feedback display personal suggestions without forced navigation',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const journal=main.slice(main.indexOf('function showVillageJournal()'),main.indexOf('function showDiscoveryMenu()'));
 const discovery=main.slice(main.indexOf('function showDiscovery(activity)'),main.indexOf('function interact(b)'));
 assert.ok(journal.includes('if(entry.visited){const suggestion=villageLearningSuggestion'));
 assert.ok(discovery.includes('if(result.correct){'));
 assert.ok(discovery.includes('villageLearningSuggestion(state,activity.id,subjects)'));
 assert.ok(discovery.includes("$('#discoveryLearningNext').replaceChildren(detail,button)"));
 assert.ok(discovery.includes('button.onclick=()=>showLessons(suggestion.subject)'));
});
