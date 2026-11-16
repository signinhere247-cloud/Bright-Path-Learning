import test from 'node:test';import assert from 'node:assert/strict';
import backlog from '../curriculum/ks1-priority-backlog.json' with {type:'json'};
import map from '../curriculum/ks1-subject-year-map.json' with {type:'json'};
test('KS1 backlog has unique, prioritised, unverified tasks across mapped subjects',()=>{
 assert.equal(backlog.tasks.length,17);
 assert.equal(new Set(backlog.tasks.map(t=>t.id)).size,17);
 assert.ok(backlog.tasks.every(t=>['P0','P1','P2'].includes(t.priority)&&t.status==='planned-unverified'));
 assert.ok(backlog.tasks.every(t=>map.subjects.some(s=>s.name===t.subject)));
 assert.ok(backlog.tasks.some(t=>t.year==='Year 1'));
 assert.ok(backlog.tasks.some(t=>t.year==='Year 2'));
 assert.ok(backlog.tasks.filter(t=>t.priority==='P0').length>=5);
 assert.equal(backlog.sources.length,3);
});
