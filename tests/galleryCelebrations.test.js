import test from 'node:test';
import assert from 'node:assert/strict';
import {galleryCelebration} from '../src/galleryCelebrations.js';
import {achievementGallery} from '../src/achievementGallery.js';
test('earned achievements can be celebrated without mutating the save',()=>{
 const save={completed:{'Maths:Addition':true},coins:40};
 const gallery=achievementGallery(save,['Maths'],'2026-11-13');
 const badge=gallery.groups[0].items.find(item=>item.earned);
 const result=galleryCelebration(badge);
 assert.match(result.title,/First Steps/);
 assert.equal(save.coins,40);
});
test('locked achievements cannot be celebrated',()=>{
 assert.equal(galleryCelebration({title:'Locked',earned:false}),null);
 assert.equal(galleryCelebration(null),null);
});
