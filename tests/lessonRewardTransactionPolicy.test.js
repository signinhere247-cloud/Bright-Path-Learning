import test from 'node:test';
import assert from 'node:assert/strict';
import {planLessonCompletionReward,createRewardTransactionGateway} from '../src/lessonRewardTransactionPolicy.js';
test('one completion reward per child and lesson, even with a different attempt',()=>{
 const p=planLessonCompletionReward({childProfileId:'kid-a',lessonId:'maths-1',attemptId:'try-1',verifiedCompletion:true});
 assert.equal(p.coins,10);assert.equal(p.eligible,true);
 const repeat=planLessonCompletionReward({childProfileId:'kid-a',lessonId:'maths-1',attemptId:'try-2',verifiedCompletion:true,priorLessonRewardKeys:[p.key]});
 assert.equal(repeat.eligible,false);assert.equal(repeat.coins,0);
 assert.notEqual(planLessonCompletionReward({childProfileId:'kid-b',lessonId:'maths-1',attemptId:'try-1',verifiedCompletion:true}).key,p.key);
 assert.equal(planLessonCompletionReward({childProfileId:'kid-a',lessonId:'maths-1',attemptId:'try-1'}).eligible,false);
});
test('trusted gateway requires authorization and verified completion',async()=>{
 const ledger=new Set();let balance=0;
 const gateway=createRewardTransactionGateway({authorize:async(ctx,id)=>ctx.children.includes(id),verifyCompletion:async({attemptId})=>attemptId==='complete',storage:{grantOnce:async({key,coins})=>{if(ledger.has(key))return {duplicate:true};ledger.add(key);balance+=coins;return {granted:true};}}});
 const context={children:['kid-a']};
 await assert.rejects(gateway.grant({context,childProfileId:'kid-b',lessonId:'maths-1',attemptId:'complete'}),/Access denied/);
 assert.equal((await gateway.grant({context,childProfileId:'kid-a',lessonId:'maths-1',attemptId:'incomplete'})).status,'rejected');
 assert.equal((await gateway.grant({context,childProfileId:'kid-a',lessonId:'maths-1',attemptId:'complete'})).status,'granted');
 assert.equal((await gateway.grant({context,childProfileId:'kid-a',lessonId:'maths-1',attemptId:'complete'})).status,'already-granted');
 assert.equal(balance,10);
});
test('rejects missing trusted adapters and invalid identifiers',()=>{
 assert.throws(()=>createRewardTransactionGateway({}),/Trusted reward/);
 assert.throws(()=>planLessonCompletionReward({childProfileId:'',lessonId:'x',attemptId:'a'}),/identifiers/);
});
