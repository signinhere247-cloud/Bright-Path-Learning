import test from 'node:test';
import assert from 'node:assert/strict';
import {adventureOverview} from '../src/adventureOverview.js';
test('overview combines learning, discovery and pet progress',()=>{
 const save={coins:45,completed:{'Maths:Counting':true},discoveries:{pond:'2026-11-13'},pet:'dog'};
 const overview=adventureOverview(save,['Maths'],'2026-11-13');
 assert.equal(overview.lessons,1);
 assert.equal(overview.discovered,1);
 assert.equal(overview.keepsakes,1);
 assert.equal(overview.pet,'dog');
 assert.equal(overview.coins,45);
});
test('empty explorer has independent zero progress',()=>{
 const overview=adventureOverview({completed:{},coins:0},['Maths'],'2026-11-13');
 assert.equal(overview.lessons,0);
 assert.equal(overview.discovered,0);
 assert.equal(overview.pet,null);
});
