import test from 'node:test';
import assert from 'node:assert/strict';
import {achievementGallery} from '../src/achievementGallery.js';
test('gallery groups achievements and shows locked milestones for a new explorer',()=>{
 const gallery=achievementGallery({completed:{}},['Maths'],'2026-11-13');
 assert.deepEqual(gallery.groups.map(g=>g.id),['explorer','challenge','goal']);
 assert.equal(gallery.groups[2].items.length,0);
 assert.ok(gallery.groups[0].items.some(b=>!b.earned));
});
test('gallery includes saved personal goal stars without changing currency',()=>{
 const save={completed:{'Maths:Addition':true},goalKeepsakes:['Maths:1'],coins:35};
 const gallery=achievementGallery(save,['Maths'],'2026-11-13');
 assert.equal(gallery.groups[2].items.length,1);
 assert.equal(gallery.groups[2].items[0].earned,true);
 assert.equal(save.coins,35);
});
