import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DISCOVERIES} from '../src/villageActivities.js';
import {discoveryLearningLink,DISCOVERY_LEARNING_LINKS} from '../src/discoveryLearningLinks.js';
const subjects=['Maths','English','Science','History','Geography','Computing'];
test('every village discovery connects to an available academy subject',()=>{
 for(const discovery of DISCOVERIES){
  const link=discoveryLearningLink(discovery.id,subjects);
  assert.ok(link,discovery.id);
  assert.ok(subjects.includes(link.subject));
  assert.ok(link.label.includes(link.subject));
 }
 assert.equal(DISCOVERY_LEARNING_LINKS.numbers,'Maths');
 assert.equal(DISCOVERY_LEARNING_LINKS.weather,'Geography');
});
test('unavailable subjects and unknown discoveries never create broken links',()=>{
 assert.equal(discoveryLearningLink('pond',['Maths']),null);
 assert.equal(discoveryLearningLink('unknown',subjects),null);
 assert.equal(discoveryLearningLink('pond',null),null);
});
test('journal links require a previously explored discovery and questions require correct answers',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const journal=main.slice(main.indexOf('function showVillageJournal()'),main.indexOf('function showDiscoveryMenu()'));
 const question=main.slice(main.indexOf('function showDiscovery(activity)'),main.indexOf('function interact(b)'));
 assert.ok(journal.includes('if(entry.visited){const link=discoveryLearningLink'));
 assert.ok(journal.includes('button.onclick=()=>showLessons(link.subject)'));
 assert.ok(question.includes('if(result.correct){'));
 assert.ok(question.includes('discoveryLearningLink(activity.id,subjects)'));
 assert.ok(question.includes("$('#discoveryLearningNext').replaceChildren(button)"));
});
