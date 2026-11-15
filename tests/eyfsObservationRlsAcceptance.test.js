import test from 'node:test';import assert from 'node:assert/strict';
import matrix from '../curriculum/eyfs-observation-rls-acceptance.json' with {type:'json'};
test('RLS acceptance matrix includes denied cross-parent and immutable field attempts',()=>{
 assert.equal(matrix.status,'staging-tests-not-run');
 assert.equal(matrix.cases.length,15);
 assert.equal(new Set(matrix.cases.map(c=>c.id)).size,15);
 assert.ok(matrix.cases.some(c=>c.actor==='parent-B'&&c.operation==='read'&&c.expected==='deny'));
 assert.ok(matrix.cases.some(c=>c.operation==='update-ownership'&&c.expected==='deny'));
 assert.ok(matrix.cases.some(c=>c.operation==='update-note'&&c.expected==='allow'));
 assert.ok(matrix.cases.some(c=>c.actor==='anonymous'&&c.expected==='deny'));
 assert.ok(matrix.preconditions.some(s=>s.includes('staging')));
 assert.ok(matrix.acceptance.some(s=>s.includes('real database requests')));
});
