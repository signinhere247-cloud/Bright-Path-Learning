import test from 'node:test';
import assert from 'node:assert/strict';
import {expandedFacts,expandedFactQuestions} from '../src/expandedFacts.js';
import {questionSet} from '../src/curriculum.js';
test('all sixteen non-maths topics have four age bands with two questions each',()=>{
  assert.equal(Object.keys(expandedFacts).length,16);
  for(const [topic,levels] of Object.entries(expandedFacts)){
    assert.equal(levels.length,4,topic);
    for(const level of levels)assert.equal(level.length,2,topic);
  }
});
test('all questions have valid distinct options and meaningful explanations',()=>{
  for(const topic of Object.keys(expandedFacts))for(const age of [4,8,12,16]){
    const qs=expandedFactQuestions(topic,age);
    assert.ok(qs.length>=2,topic);
    for(const q of qs){assert.equal(new Set(q.options).size,3);assert.ok(q.options.includes(q.answer));assert.ok(q.explanation.length>15);}
  }
});
test('older children do not receive early-only questions',()=>{
  const young=expandedFactQuestions('Spelling',4);
  const older=expandedFactQuestions('Spelling',16);
  assert.ok(young.some(q=>q.answer==='cat'));
  assert.ok(!older.some(q=>q.answer==='cat'));
  assert.ok(older.some(q=>q.answer==='entrepreneur'));
});
test('primary lessons include original questions without repeating them',()=>{
  const qs=questionSet('Science','Space',9,{Space:[['Which planet is red?','Mars',['Mars','Venus','Earth']]]});
  assert.equal(qs.filter(q=>q.answer==='Mars').length,1);
  assert.ok(qs.length>=5);
});
test('unknown topic fails clearly',()=>assert.throws(()=>expandedFactQuestions('Nonexistent',8)));
