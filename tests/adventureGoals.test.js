import test from 'node:test';
import assert from 'node:assert/strict';
import {personalisedAdventureGoals} from '../src/adventureGoals.js';
test('new explorers receive first-lesson and village suggestions',()=>{
 const goals=personalisedAdventureGoals({coins:0,completed:{}},['Maths'],'2026-11-13');
 assert.ok(goals.some(g=>g.id==='start-learning'));
 assert.ok(goals.some(g=>g.id==='explore-village'));
 assert.ok(goals.some(g=>g.id==='pet-friend'));
});
test('adopted pets produce care suggestions rather than adoption suggestions',()=>{
 const goals=personalisedAdventureGoals({coins:0,completed:{'Maths:Numbers':true},pet:'cat'},['Maths'],'2026-11-13');
 assert.ok(goals.some(g=>g.id==='pet-care'));
 assert.ok(!goals.some(g=>g.id==='pet-friend'));
});
test('goals remain small and optional',()=>{
 const goals=personalisedAdventureGoals({},['Maths'],'2026-11-13');
 assert.ok(goals.length<=4);
});
