import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {worldLearningRoutes} from '../src/worldLearningRoutes.js';
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('cottage and village routes use known destinations',()=>{
 for(const context of ['home','village']){
  const routes=worldLearningRoutes(context);
  assert.deepEqual(routes.map(x=>x.id),['academy','hub','daily']);
  assert.ok(routes.every(x=>['subjects','hub','quests'].includes(x.destination)));
 }
});
test('route definitions are independent of saved child state',()=>{
 const first=worldLearningRoutes('home'),second=worldLearningRoutes('home');
 assert.deepEqual(first,second);
 assert.ok(first.every(x=>typeof x.label==='string'&&x.label.length>0));
});
test('home and village menus expose working learning shortcuts',()=>{
 for(const id of ['homeLearningRoutes','villageLearningRoutes'])assert.ok(main.includes('id="'+id+'"'));
 assert.ok(main.includes("renderWorldLearningRoutes($('#homeLearningRoutes'),'home')"));
 assert.ok(main.includes("renderWorldLearningRoutes($('#villageLearningRoutes'),'village')"));
 for(const fn of ['showSubjects','showLearningAdventureHub','showDailyQuests'])assert.ok(main.includes(fn+'()'));
});
