import test from 'node:test';
import assert from 'node:assert/strict';
import {achievementCollectionSummary} from '../src/achievementCollectionSummary.js';
test('collection totals reflect earned and remaining achievements by category',()=>{
 const gallery={groups:[{id:'explorer',title:'Adventure milestones',items:[{earned:true},{earned:false}]},{id:'goal',title:'Personal goal stars',items:[{earned:true}]}]};
 const summary=achievementCollectionSummary(gallery);
 assert.deepEqual([summary.earned,summary.total,summary.remaining],[2,3,1]);
 assert.deepEqual([summary.categories[0].earned,summary.categories[0].remaining],[1,1]);
});
test('empty personal goal collection is supported',()=>{
 const summary=achievementCollectionSummary({groups:[{id:'goal',title:'Personal goal stars',items:[]}]});
 assert.equal(summary.total,0);
 assert.equal(summary.categories[0].earned,0);
});
