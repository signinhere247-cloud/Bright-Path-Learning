import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const map=JSON.parse(readFileSync(new URL('../curriculum/eyfs-2026-goal-map.json',import.meta.url),'utf8'));
test('2026 EYFS map has seven areas, three prime and 17 end-of-stage goals',()=>{
 assert.equal(map.areas.length,7);
 assert.equal(map.areas.filter(a=>a.type==='prime').length,3);
 const goals=map.areas.flatMap(a=>a.goals);
 assert.equal(goals.length,17);
 assert.equal(new Set(goals.map(g=>g.id)).size,17);
 assert.ok(goals.every(g=>g.reviewStatus==='unverified'&&g.verifiedLessonIds.length===0));
});
test('EYFS map cites official framework and avoids claiming ELGs are the curriculum',()=>{
 assert.match(map.source,/gov\.uk/);
 assert.match(map.note,/NOT a complete curriculum/);
 assert.ok(map.areas.every(a=>a.goals.every(g=>g.candidateModule.startsWith('early'))));
});
