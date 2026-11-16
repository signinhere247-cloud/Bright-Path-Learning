// Step 95: pure offline conflict classification and reward eligibility keys.
// No cloud writes, balance mutations, authentication, or coin grants occur here.
import {createChildProgressSnapshot} from './childProgressSyncContract.js';
const id=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{1,100}$/.test(x);
const canonical=x=>JSON.stringify({schemaVersion:x.schemaVersion,childProfileId:x.childProfileId,lessonId:x.lessonId,attemptId:x.attemptId,totalQuestions:x.totalQuestions,startedAt:x.startedAt,answers:Object.fromEntries(Object.entries(x.answers).sort(([a],[b])=>Number(a)-Number(b))),completedAt:x.completedAt});
/** Classify two offline snapshots without discarding attempts or modifying input. */
export function reconcileOfflineChildProgress(local,remote,{childProfileId}={}){
 const a=createChildProgressSnapshot(local),b=createChildProgressSnapshot(remote);
 if(a.childProfileId!==childProfileId||b.childProfileId!==childProfileId)throw new Error('Child profile mismatch.');
 const byId=new Map(b.attempts.map(x=>[x.attemptId,x]));
 const conflicts=[];
 for(const attempt of a.attempts){
  const existing=byId.get(attempt.attemptId);
  if(existing&&canonical(existing)!==canonical(attempt))conflicts.push(attempt.attemptId);
  else if(!existing)byId.set(attempt.attemptId,attempt);
 }
 if(conflicts.length)return {status:'manual-review',conflictingAttemptIds:conflicts.sort(),localRevision:a.revision,remoteRevision:b.revision};
 return {status:'merge-ready',expectedRemoteRevision:b.revision,snapshot:createChildProgressSnapshot({childProfileId,revision:b.revision+1,attempts:[...byId.values()]})};
}
/** Stable completion event key for a single child, lesson and attempt. */
export function completionRewardKey({childProfileId,lessonId,attemptId}={}){
 if(!id(childProfileId)||!id(lessonId)||!id(attemptId))throw new Error('Invalid reward identifiers.');
 return JSON.stringify([childProfileId,lessonId,attemptId]);
}
/** Checks a proposed reward without granting or modifying any balance. */
export function checkCompletionRewardEligibility({attempt,childProfileId,grantedKeys=[]}={}){
 if(!attempt||attempt.childProfileId!==childProfileId)throw new Error('Child profile mismatch.');
 const validated=createChildProgressSnapshot({childProfileId,attempts:[attempt]});
 const a=validated.attempts[0];
 if(a.completedAt===null)return {eligible:false,reason:'incomplete'};
 if(!Array.isArray(grantedKeys)||grantedKeys.some(x=>typeof x!=='string'))throw new Error('Invalid reward ledger.');
 const key=completionRewardKey(a);
 return grantedKeys.includes(key)?{eligible:false,reason:'already-granted',key}:{eligible:true,key};
}
