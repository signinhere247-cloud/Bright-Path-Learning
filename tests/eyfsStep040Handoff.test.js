import test from 'node:test';import assert from 'node:assert/strict';
import {eyfsPlayActivities} from '../src/eyfsPlayActivities.js';
import goals from '../curriculum/eyfs-activity-goal-evidence.json' with {type:'json'};
import acceptance from '../curriculum/eyfs-observation-rls-acceptance.json' with {type:'json'};
import handoff from '../curriculum/eyfs-step040-handoff.json' with {type:'json'};
test('EYFS handoff counts implemented guides and preserves unverified security status',()=>{
 assert.equal(eyfsPlayActivities.length,handoff.implemented.activityGuideCount);
 assert.equal(new Set(eyfsPlayActivities.map(x=>x.area)).size,handoff.implemented.learningAreas);
 assert.equal(goals.goalLinks.length,handoff.implemented.goalCandidateMappings);
 assert.ok(goals.goalLinks.every(x=>x.alignmentStatus==='candidate-unreviewed'));
 assert.equal(acceptance.status,'staging-tests-not-run');
 assert.equal(handoff.releaseDecision,'EYFS activity guides may remain available; observation persistence must stay disabled');
 assert.ok(handoff.unverified.length>=5);
});
