import test from 'node:test';
import assert from 'node:assert/strict';
import {achievementSpotlight} from '../src/achievementSpotlight.js';
test('spotlight selects the closest actionable unfinished achievement',()=>{
 const gallery={groups:[{items:[
  {id:'challenge:seven-challenges',title:'Rainbow Scholar',emoji:'🌈',earned:false,current:1,goal:7},
  {id:'explorer:five-lessons',title:'Learning Star',emoji:'🌟',earned:false,current:4,goal:5}
 ]}]};
 const featured=achievementSpotlight(gallery);
 assert.equal(featured.id,'explorer:five-lessons');
 assert.equal(featured.remaining,1);
 assert.equal(featured.next.destination,'learn');
});
test('no spotlight is shown when nothing actionable remains',()=>{
 assert.equal(achievementSpotlight({groups:[{items:[{id:'explorer:first-lesson',earned:true,current:1,goal:1}]}]}),null);
});
