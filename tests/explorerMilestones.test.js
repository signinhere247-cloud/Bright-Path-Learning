import test from 'node:test';
import assert from 'node:assert/strict';
import {explorerMilestones} from '../src/explorerMilestones.js';
test('new explorers begin with locked milestones',()=>{
 const result=explorerMilestones({completed:{},pet:null},'2026-11-13');
 assert.equal(result.total,6);assert.equal(result.earned,0);
});
test('milestones reflect individual saved activities',()=>{
 const result=explorerMilestones({completed:{a:true,b:true,c:true,d:true,e:true},pet:'cat',discoveries:{pond:'2026-11-13',garden:'2026-11-13',weather:'2026-11-13'}},'2026-11-13');
 assert.equal(result.earned,5);
 assert.equal(result.milestones.find(m=>m.id==='village-master').earned,false);
});
