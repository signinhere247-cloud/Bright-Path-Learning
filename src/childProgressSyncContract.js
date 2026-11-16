// Step 93: pure per-child progress snapshot and optimistic-sync contract.
// No storage, network, authentication or reward writes are performed here.
const isId=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{1,100}$/.test(x);
const validTimestamp=x=>typeof x==='string'&&!Number.isNaN(Date.parse(x))&&new Date(x).toISOString()===x;
const copy=x=>JSON.parse(JSON.stringify(x));
function validateAttempt(a,childProfileId){
 if(!a||typeof a!=='object'||Array.isArray(a)||a.schemaVersion!==1||a.childProfileId!==childProfileId||!isId(a.lessonId)||!isId(a.attemptId)||!Number.isInteger(a.totalQuestions)||a.totalQuestions<1||a.totalQuestions>50||!validTimestamp(a.startedAt)||!(a.completedAt===null||validTimestamp(a.completedAt))||!a.answers||typeof a.answers!=='object'||Array.isArray(a.answers))throw new Error('Invalid child lesson attempt.');
 const entries=Object.entries(a.answers);
 if(entries.some(([k,v])=>!/^(0|[1-9][0-9]*)$/.test(k)||Number(k)>=a.totalQuestions||typeof v!=='boolean'))throw new Error('Invalid attempt answers.');
 if(a.completedAt!==null&&(Date.parse(a.completedAt)<Date.parse(a.startedAt)||entries.length!==a.totalQuestions))throw new Error('Invalid completed attempt.');
}
export function createChildProgressSnapshot({childProfileId,revision=0,attempts=[]}={}){
 if(!isId(childProfileId))throw new Error('Invalid child profile ID.');
 if(!Number.isSafeInteger(revision)||revision<0)throw new Error('Invalid revision.');
 if(!Array.isArray(attempts)||attempts.length>1000)throw new Error('Invalid attempts list.');
 const seen=new Set();
 for(const a of attempts){
  validateAttempt(a,childProfileId);
  if(seen.has(a.attemptId))throw new Error('Duplicate attempt ID.');
  seen.add(a.attemptId);
 }
 return {schemaVersion:1,childProfileId,revision,attempts:copy(attempts)};
}
export function stageChildProgressAttempt(snapshot,attempt,{childProfileId}={}){
 const current=validateSnapshot(snapshot,childProfileId);
 validateAttempt(attempt,childProfileId);
 if(current.attempts.some(a=>a.attemptId===attempt.attemptId))throw new Error('Duplicate attempt ID.');
 return createChildProgressSnapshot({...current,attempts:[...current.attempts,attempt]});
}
export function prepareChildProgressSync(localSnapshot,remoteSnapshot,{childProfileId}={}){
 const local=validateSnapshot(localSnapshot,childProfileId);
 const remote=validateSnapshot(remoteSnapshot,childProfileId);
 if(local.revision!==remote.revision)return {status:'conflict',reason:'revision-mismatch',localRevision:local.revision,remoteRevision:remote.revision};
 const localIds=new Set(local.attempts.map(a=>a.attemptId));
 const remoteIds=new Set(remote.attempts.map(a=>a.attemptId));
 if(remote.attempts.some(a=>!localIds.has(a.attemptId)))return {status:'conflict',reason:'remote-attempt-missing-locally',localRevision:local.revision,remoteRevision:remote.revision};
 for(const a of local.attempts){
  const r=remote.attempts.find(x=>x.attemptId===a.attemptId);
  if(r&&JSON.stringify(r)!==JSON.stringify(a))return {status:'conflict',reason:'attempt-changed',localRevision:local.revision,remoteRevision:remote.revision};
 }
 if(local.attempts.length===remote.attempts.length)return {status:'unchanged',snapshot:copy(remote)};
 return {status:'ready',expectedRevision:remote.revision,snapshot:createChildProgressSnapshot({...local,revision:remote.revision+1})};
}
export function validateSnapshot(snapshot,childProfileId){
 if(!snapshot||snapshot.schemaVersion!==1||snapshot.childProfileId!==childProfileId)throw new Error('Child profile mismatch or invalid snapshot.');
 return createChildProgressSnapshot(snapshot);
}
