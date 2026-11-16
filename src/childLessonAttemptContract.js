// Step 92: pure per-child lesson-attempt data contract; no storage, network or rewards.
// Caller must authenticate and authorise childProfileId before using these functions.
const MAX_QUESTIONS=50;
const validId=(value)=>typeof value==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(value);
const validDate=(value)=>typeof value==='string'&&!Number.isNaN(Date.parse(value))&&new Date(value).toISOString()===value;
const own=(obj,key)=>Object.prototype.hasOwnProperty.call(obj,key);
export function createLessonAttempt({childProfileId,lessonId,attemptId,totalQuestions,startedAt}={}){
 if(!validId(childProfileId)||!validId(lessonId)||!validId(attemptId))throw new Error('Invalid attempt identifiers.');
 if(!Number.isInteger(totalQuestions)||totalQuestions<1||totalQuestions>MAX_QUESTIONS)throw new Error('Invalid question count.');
 if(!validDate(startedAt))throw new Error('Invalid start timestamp.');
 return {schemaVersion:1,childProfileId,lessonId,attemptId,totalQuestions,startedAt,answers:{},completedAt:null};
}
export function recordLessonAnswer(attempt,{childProfileId,questionIndex,correct}={}){
 validateAttempt(attempt);
 if(attempt.childProfileId!==childProfileId)throw new Error('Child profile mismatch.');
 if(attempt.completedAt!==null)throw new Error('Completed attempt cannot be changed.');
 if(!Number.isInteger(questionIndex)||questionIndex<0||questionIndex>=attempt.totalQuestions)throw new Error('Invalid question index.');
 if(typeof correct!=='boolean')throw new Error('Correct must be boolean.');
 if(own(attempt.answers,String(questionIndex)))throw new Error('Question already answered.');
 return {...attempt,answers:{...attempt.answers,[questionIndex]:correct}};
}
export function completeLessonAttempt(attempt,{childProfileId,completedAt}={}){
 validateAttempt(attempt);
 if(attempt.childProfileId!==childProfileId)throw new Error('Child profile mismatch.');
 if(attempt.completedAt!==null)throw new Error('Attempt already completed.');
 if(!validDate(completedAt)||Date.parse(completedAt)<Date.parse(attempt.startedAt))throw new Error('Invalid completion timestamp.');
 if(Object.keys(attempt.answers).length!==attempt.totalQuestions)throw new Error('All questions must be answered before completion.');
 return {...attempt,answers:{...attempt.answers},completedAt};
}
export function lessonAttemptSummary(attempt,{childProfileId}={}){
 validateAttempt(attempt);
 if(attempt.childProfileId!==childProfileId)throw new Error('Child profile mismatch.');
 const answered=Object.keys(attempt.answers).length;
 const correct=Object.values(attempt.answers).filter(Boolean).length;
 return {childProfileId,lessonId:attempt.lessonId,attemptId:attempt.attemptId,answered,total:attempt.totalQuestions,correct,completed:attempt.completedAt!==null,percentCorrect:answered===0?0:Math.round(100*correct/answered)};
}
function validateAttempt(a){
 if(!a||a.schemaVersion!==1||!validId(a.childProfileId)||!validId(a.lessonId)||!validId(a.attemptId)||!Number.isInteger(a.totalQuestions)||a.totalQuestions<1||a.totalQuestions>MAX_QUESTIONS||!validDate(a.startedAt)||!(a.completedAt===null||validDate(a.completedAt))||!a.answers||typeof a.answers!=='object'||Array.isArray(a.answers))throw new Error('Invalid attempt.');
 for(const [key,value] of Object.entries(a.answers)){const n=Number(key);if(!/^(0|[1-9][0-9]*)$/.test(key)||!Number.isInteger(n)||n>=a.totalQuestions||typeof value!=='boolean')throw new Error('Invalid attempt answers.');}
 if(a.completedAt!==null&&(Date.parse(a.completedAt)<Date.parse(a.startedAt)||Object.keys(a.answers).length!==a.totalQuestions))throw new Error('Invalid completed attempt.');
}
