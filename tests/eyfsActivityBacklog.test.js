import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const programmes=JSON.parse(readFileSync(new URL('../curriculum/eyfs-2026-educational-programmes.json',import.meta.url),'utf8'));
const backlog=JSON.parse(readFileSync(new URL('../curriculum/eyfs-activity-backlog.json',import.meta.url),'utf8'));
test('every EYFS educational strand has one proposed hands-on activity',()=>{
 const ids=programmes.programmes.flatMap(p=>p.strands.map(s=>s.id));
 assert.equal(ids.length,28);
 assert.equal(backlog.activities.length,ids.length);
 assert.deepEqual(backlog.activities.map(a=>a.strandId).sort(),ids.sort());
 assert.equal(new Set(backlog.activities.map(a=>a.id)).size,28);
});
test('proposed activities are age-appropriate, adult-supported and not falsely marked implemented',()=>{
 for(const a of backlog.activities){
  assert.equal(a.ageBand,'3–5');
  assert.equal(a.status,'proposed');
  assert.equal(a.delivery,'adult-supported offline');
  assert.deepEqual(a.implementedLessonIds,[]);
  assert.ok(a.instructions.length>30&&a.evidence.length>15);
  assert.match(a.accessibility,/adapted-motor/);
 }
 assert.match(backlog.guidance,/No grading/);
});
