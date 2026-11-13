import test from 'node:test';
import assert from 'node:assert/strict';
import {buildParentReport} from '../src/parentReport.js';
const family={activeId:'child_one',profiles:[
 {id:'child_one',age:8,save:{profile:'Alex',coins:125,pet:'cat',completed:{'Maths:Addition':true,'Science:Space':true}}},
 {id:'child_two',age:13,save:{profile:'Sam',coins:100,pet:null,completed:{'English:Grammar':true,'Maths:Addition':false}}}
]};
test('separate subject counts, coins and badges per child',()=>{
 const [a,b]=buildParentReport(family,['Maths','English','Science']);
 assert.equal(a.completedLessons,2);assert.equal(a.subjects.Maths,1);assert.equal(a.coins,125);
 assert.equal(b.completedLessons,1);assert.equal(b.subjects.Maths,0);assert.equal(b.subjects.English,1);
 assert.equal(a.current,true);assert.equal(b.current,false);
});
test('report does not mutate original family',()=>{
 const before=structuredClone(family);const reports=buildParentReport(family,['Maths','English']);
 reports[0].subjects.Maths=99;reports[0].badges.push('fake');assert.deepEqual(family,before);
});
test('rejects invalid input',()=>assert.throws(()=>buildParentReport({profiles:null},['Maths'])));
