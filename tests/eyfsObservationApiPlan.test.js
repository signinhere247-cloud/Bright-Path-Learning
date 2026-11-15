import test from 'node:test';import assert from 'node:assert/strict';
import plan from '../curriculum/eyfs-observation-api-plan.json' with {type:'json'};
test('EYFS observation API plan has complete authenticated operations and release gates',()=>{
 assert.equal(plan.status,'design-only');
 assert.equal(plan.routes.length,6);
 assert.deepEqual(new Set(plan.routes.map(r=>r.method)),new Set(['GET','POST','PATCH','DELETE']));
 assert.ok(plan.routes.every(r=>r.auth.startsWith('verified-parent-and-child-ownership')));
 assert.ok(plan.identity.includes('Server-verified session'));
 assert.ok(plan.tables[0].rules.some(r=>r.includes('row-level security')));
 assert.ok(plan.implementationGates.length>=6);
 assert.ok(plan.apiRequirements.some(r=>r.includes('CSRF')));
});
