import test from 'node:test';
import assert from 'node:assert/strict';
import {buildProgressCharts} from '../src/progressCharts.js';
const attempt=(correct,subject='Maths')=>({subject,topic:'Fractions',correct,total:10,passed:correct>=7,at:'2026-11-13T12:00:00.000Z'});
test('empty subjects show no fabricated progress',()=>{assert.deepEqual(buildProgressCharts({},['Maths'])[0].points,[])});
test('charts keep child subjects separate',()=>{const x=buildProgressCharts({lessonHistory:[attempt(8)]},['Maths','Science']);assert.equal(x[0].recentAverage,80);assert.equal(x[1].count,0)});
test('trend compares first and last five only with enough data',()=>{const x=buildProgressCharts({lessonHistory:[1,2,3,4,5,6,7,8,9,10].map(n=>attempt(n))},['Maths'])[0];assert.equal(x.change,50);assert.equal(x.points.length,10)});
test('five results do not imply a trend',()=>{assert.equal(buildProgressCharts({lessonHistory:[attempt(8)]},['Maths'])[0].change,null)});
test('invalid histories are rejected',()=>{assert.throws(()=>buildProgressCharts({lessonHistory:[{}]},['Maths']))});
