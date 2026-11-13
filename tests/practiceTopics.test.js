import test from 'node:test';
import assert from 'node:assert/strict';
import {recordPracticeNeed,practiceTopics} from '../src/practiceTopics.js';
test('practice needs are tracked per save and ranked',()=>{
 const original={practiceNeeds:{}};
 const a=recordPracticeNeed(original,'Maths','Addition',true);
 const b=recordPracticeNeed(a,'Maths','Addition',true);
 assert.equal(practiceTopics(b,'Maths')[0].count,2);
 assert.deepEqual(practiceTopics(original,'Maths'),[]);
 assert.deepEqual(practiceTopics(b,'English'),[]);
});
test('a successful attempt reduces practice priority',()=>{
 const a=recordPracticeNeed({practiceNeeds:{}},'Maths','Addition',true);
 const b=recordPracticeNeed(a,'Maths','Addition',false);
 assert.deepEqual(practiceTopics(b,'Maths'),[]);
});
