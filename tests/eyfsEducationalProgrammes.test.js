import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync(new URL('../curriculum/eyfs-2026-educational-programmes.json',import.meta.url),'utf8'));
test('EYFS educational programme map covers all seven learning areas',()=>{
 assert.equal(data.programmes.length,7);
 const strands=data.programmes.flatMap(p=>p.strands);
 assert.equal(strands.length,28);
 assert.equal(new Set(strands.map(s=>s.id)).size,28);
 assert.ok(strands.every(s=>s.reviewStatus==='unverified'&&s.verifiedLessonIds.length===0));
});
test('EYFS programme map includes real-world, language and creative learning',()=>{
 const text=data.programmes.flatMap(p=>p.strands.map(s=>s.summary)).join(' ');
 for(const term of ['conversations','motor','phonics','manipulatives','community','music'])assert.match(text,new RegExp(term,'i'));
 assert.match(data.source,/publishing\.service\.gov\.uk/);
});
