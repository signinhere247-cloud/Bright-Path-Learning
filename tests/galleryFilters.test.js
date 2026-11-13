import test from 'node:test';
import assert from 'node:assert/strict';
import {filterAchievementGallery} from '../src/galleryFilters.js';
const gallery={groups:[{id:'a',items:[{id:'one',earned:true},{id:'two',earned:false}]},{id:'b',items:[]}]};
test('gallery filters preserve groups and select matching achievements',()=>{
 assert.equal(filterAchievementGallery(gallery,'all').visible,2);
 assert.deepEqual(filterAchievementGallery(gallery,'earned').groups[0].items.map(i=>i.id),['one']);
 assert.deepEqual(filterAchievementGallery(gallery,'upcoming').groups[0].items.map(i=>i.id),['two']);
 assert.equal(gallery.groups[0].items.length,2);
});
test('invalid filters are rejected',()=>assert.throws(()=>filterAchievementGallery(gallery,'missing')));
