import test from 'node:test';
import assert from 'node:assert/strict';
import {learningAdventureHub} from '../src/learningAdventureHub.js';
test('hub combines current explorer learning, challenge, goal and achievement information',()=>{
 const save={completed:{},coins:12};
 const hub=learningAdventureHub(save,['Maths'],'2026-11-13');
 assert.equal(hub.completed,0);
 assert.equal(hub.goal,null);
 assert.ok(hub.challenge.goal>=1);
 assert.ok(hub.achievements.total>=1);
 assert.equal(save.coins,12);
});
test('hub does not share another child’s saved progress',()=>{
 const first=learningAdventureHub({completed:{},goalKeepsakes:['Maths:1']},['Maths'],'2026-11-13');
 const second=learningAdventureHub({completed:{}},['Maths'],'2026-11-13');
 assert.ok(first.achievements.earned>second.achievements.earned);
});
