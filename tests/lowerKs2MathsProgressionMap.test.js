import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const map=JSON.parse(readFileSync(new URL('../curriculum/lower-ks2-maths-progression-map.json',import.meta.url),'utf8'));
test('Lower KS2 maths map has separate Year 3 and Year 4 progression across eight domains',()=>{
 assert.deepEqual(Object.keys(map.years),['3','4']);
 const domains=map.implementationOrder;
 assert.equal(domains.length,8);
 for(const year of ['3','4'])for(const domain of domains){
  assert.ok(Array.isArray(map.years[year][domain]));
  assert.ok(map.years[year][domain].length>=2);
 }
});
test('Lower KS2 progression includes key year-specific milestones',()=>{
 const y3=JSON.stringify(map.years[3]),y4=JSON.stringify(map.years[4]);
 assert.match(y3,/1,000/);assert.match(y4,/10,000/);
 assert.match(y3,/3, 4 and 8/);assert.match(y4,/12 × 12/);
 assert.match(y3,/tenths/);assert.match(y4,/hundredths/);
 assert.match(y3,/right angles/);assert.match(y4,/acute and obtuse/);
 assert.match(y3,/bar charts/);assert.match(y4,/line graphs/);
});
test('Map retains explicit unverified review gates',()=>{
 assert.equal(map.verification.officialObjectiveTraceability,false);
 assert.equal(map.verification.educatorApproved,false);
 assert.equal(map.verification.liveLearnerIntegration,false);
});
