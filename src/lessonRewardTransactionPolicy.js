// Step 96: pure BrightCoins transaction policy; no account writes or grants.
// Server must verify lesson completion and enforce unique reward keys atomically.
const validId=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{1,100}$/.test(x);
export const LESSON_COMPLETION_COINS=10;
export function planLessonCompletionReward({childProfileId,lessonId,attemptId,verifiedCompletion=false,priorLessonRewardKeys=[]}={}){
 if(!validId(childProfileId)||!validId(lessonId)||!validId(attemptId))throw new Error('Invalid reward identifiers.');
 if(typeof verifiedCompletion!=='boolean')throw new Error('Completion verification must be boolean.');
 if(!Array.isArray(priorLessonRewardKeys)||priorLessonRewardKeys.some(x=>typeof x!=='string'))throw new Error('Invalid reward ledger.');
 const key=JSON.stringify(['lesson-completion',childProfileId,lessonId]);
 if(!verifiedCompletion)return {eligible:false,reason:'unverified-completion',key,coins:0};
 if(priorLessonRewardKeys.includes(key))return {eligible:false,reason:'already-rewarded',key,coins:0};
 return {eligible:true,key,coins:LESSON_COMPLETION_COINS,childProfileId,lessonId,attemptId};
}
/** Trusted storage adapter MUST transact unique ledger insertion and balance increment together. */
export function createRewardTransactionGateway({authorize,verifyCompletion,storage}={}){
 if(typeof authorize!=='function'||typeof verifyCompletion!=='function'||!storage||typeof storage.grantOnce!=='function')throw new Error('Trusted reward transaction dependencies required.');
 return {async grant({context,childProfileId,lessonId,attemptId}={}){
  if(!validId(childProfileId)||!validId(lessonId)||!validId(attemptId))throw new Error('Invalid reward identifiers.');
  if(!context||await authorize(context,childProfileId)!==true)throw new Error('Access denied.');
  const verified=await verifyCompletion({context,childProfileId,lessonId,attemptId});
  if(verified!==true)return {status:'rejected',reason:'unverified-completion'};
  const key=JSON.stringify(['lesson-completion',childProfileId,lessonId]);
  const result=await storage.grantOnce({childProfileId,lessonId,attemptId,key,coins:LESSON_COMPLETION_COINS});
  if(result?.granted===true)return {status:'granted',coins:LESSON_COMPLETION_COINS,key};
  if(result?.duplicate===true)return {status:'already-granted',coins:0,key};
  throw new Error('Reward transaction failed.');
 }};
}
