import test from 'node:test';
import assert from 'node:assert/strict';
import {achievementRecommendations} from '../src/achievementRecommendations.js';
test('recommends nearest actionable milestones first',()=>{
 const gallery={groups:[{items:[
  {id:'explorer:five-lessons',title:'Learning Star',earned:false,current:4,goal:5},
  {id:'challenge:seven-challenges',title:'Rainbow Scholar',earned:false,current:1,goal:7},
  {id:'explorer:first-lesson',title:'First Steps',earned:true,current:1,goal:1}
 ]}]};
 const suggestions=achievementRecommendations(gallery);
 assert.deepEqual(suggestions.map(x=>x.badge.id),['explorer:five-lessons','challenge:seven-challenges']);
 assert.equal(suggestions[0].remaining,1);
});
test('ignores unknown and unmeasurable achievements',()=>{
 assert.deepEqual(achievementRecommendations({groups:[{items:[{id:'other',earned:false,current:0,goal:1}]}]}),[]);
});
