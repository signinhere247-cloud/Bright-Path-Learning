import test from 'node:test';
import assert from 'node:assert/strict';
import {achievementProgress} from '../src/achievementProgress.js';
import {achievementGallery} from '../src/achievementGallery.js';
test('achievement progress is bounded and accessible',()=>{
 assert.deepEqual(achievementProgress({current:3,goal:5}),{value:3,max:5,label:'3 of 5 completed'});
 assert.equal(achievementProgress({current:9,goal:5}).value,5);
 assert.equal(achievementProgress({current:-2,goal:5}).value,0);
 assert.equal(achievementProgress({current:1,goal:0}),null);
});
test('gallery exposes real targets for locked explorer and challenge badges',()=>{
 const gallery=achievementGallery({completed:{}},['Maths'],'2026-11-13');
 assert.equal(gallery.groups[0].items[0].goal,1);
 assert.equal(gallery.groups[1].items[0].current,0);
});
