import test from 'node:test';
import assert from 'node:assert/strict';
import {listCurriculumLessons,canLaunchCurriculumLesson} from '../src/curriculumNavigationCatalog.js';
test('draft catalog is restricted to educator review',()=>{
 assert.deepEqual(listCurriculumLessons(),[]);
 assert.deepEqual(listCurriculumLessons({year:5}),[]);
 const all=listCurriculumLessons({includeDrafts:true});
 assert.ok(all.length>=60);
 assert.equal(new Set(all.map(x=>x.id)).size,all.length);
 for(const l of all){assert.ok([5,6].includes(l.year));assert.equal(l.subject,'Maths');assert.equal(l.published,false);assert.equal(l.reviewStatus,'educator-review-required');assert.equal(l.questionCount,5);assert.equal(canLaunchCurriculumLesson(l.id),false);}
 assert.ok(listCurriculumLessons({year:5,includeDrafts:true}).every(x=>x.year===5));
 assert.ok(listCurriculumLessons({year:6,includeDrafts:true}).every(x=>x.year===6));
 assert.deepEqual(listCurriculumLessons({subject:'English',includeDrafts:true}),[]);
 assert.throws(()=>listCurriculumLessons({year:4,includeDrafts:true}),/Supported years/);
 all[0].title='changed';assert.notEqual(listCurriculumLessons({includeDrafts:true})[0].title,'changed');
});
