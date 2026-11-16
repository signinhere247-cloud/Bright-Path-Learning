import test from 'node:test';
import assert from 'node:assert/strict';
import {createChildProgressSnapshot,stageChildProgressAttempt,prepareChildProgressSync,validateSnapshot} from '../src/childProgressSyncContract.js';
const attempt={schemaVersion:1,childProfileId:'kid-a',lessonId:'maths-01',attemptId:'a-1',totalQuestions:2,startedAt:'2026-11-16T12:00:00.000Z',answers:{'0':true,'1':false},completedAt:'2026-11-16T12:04:00.000Z'};
test('snapshot is child-bound and defensively copied',()=>{
 const s=createChildProgressSnapshot({childProfileId:'kid-a',attempts:[attempt]});
 assert.equal(s.revision,0);s.attempts[0].answers['0']=false;assert.equal(attempt.answers['0'],true);
 assert.throws(()=>validateSnapshot(s,'kid-b'),/mismatch/);
 assert.throws(()=>createChildProgressSnapshot({childProfileId:'kid-a',attempts:[attempt,attempt]}),/Duplicate/);
 assert.throws(()=>createChildProgressSnapshot({childProfileId:'kid-b',attempts:[attempt]}),/Invalid child/);
});
test('stage attempt without mutating source',()=>{
 const original=createChildProgressSnapshot({childProfileId:'kid-a'});
 const staged=stageChildProgressAttempt(original,attempt,{childProfileId:'kid-a'});
 assert.equal(original.attempts.length,0);assert.equal(staged.attempts.length,1);
 assert.throws(()=>stageChildProgressAttempt(staged,attempt,{childProfileId:'kid-a'}),/Duplicate/);
});
test('optimistic sync prepares increment and detects revisions',()=>{
 const remote=createChildProgressSnapshot({childProfileId:'kid-a',revision:2});
 const local=stageChildProgressAttempt(remote,attempt,{childProfileId:'kid-a'});
 const ready=prepareChildProgressSync(local,remote,{childProfileId:'kid-a'});
 assert.equal(ready.status,'ready');assert.equal(ready.expectedRevision,2);assert.equal(ready.snapshot.revision,3);
 assert.equal(prepareChildProgressSync(remote,remote,{childProfileId:'kid-a'}).status,'unchanged');
 const newer=createChildProgressSnapshot({childProfileId:'kid-a',revision:3});
 assert.equal(prepareChildProgressSync(local,newer,{childProfileId:'kid-a'}).reason,'revision-mismatch');
 assert.equal(prepareChildProgressSync(remote,local,{childProfileId:'kid-a'}).reason,'remote-attempt-missing-locally');
});
test('rejects changed existing attempts and malformed records',()=>{
 const remote=createChildProgressSnapshot({childProfileId:'kid-a',attempts:[attempt]});
 const changed={...attempt,answers:{'0':false,'1':false}};
 const local=createChildProgressSnapshot({childProfileId:'kid-a',attempts:[changed]});
 assert.equal(prepareChildProgressSync(local,remote,{childProfileId:'kid-a'}).reason,'attempt-changed');
 assert.throws(()=>createChildProgressSnapshot({childProfileId:'kid-a',attempts:[{...attempt,answers:{'4':true}}]}),/answers/);
});
