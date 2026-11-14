/**
 * BrightPath assessments and mastery — Stage 2 Step 17.
 * Pure functions for assessment creation, validation, marking and progress.
 * No child names, account IDs, cloud writes, rewards or live UI changes.
 * The caller must store records under the authenticated child's own profile.
 * Mastery is a learning estimate, not a diagnosis or formal qualification.
 */
import {expandedQuestionBank} from './expandedQuestionBank.js';
import {summariseTopicPractice} from './adaptiveLearning.js';

const questionById=new Map(expandedQuestionBank.map(q=>[q.id,q]));
const validYear=y=>typeof y==='string'&&/^(?:nursery|reception|year-(?:[1-9]|10|11))$/.test(y);
const validText=x=>typeof x==='string'&&x.trim().length>0;
const validDate=x=>typeof x==='string'&&Number.isFinite(Date.parse(x));
function assertTopic(topic){
 if(!topic||!validText(topic.subject)||!validText(topic.topicId)||!validYear(topic.yearId))throw Error('Invalid assessment topic.');
}
function assertDate(value){if(!validDate(value))throw Error('Invalid assessment date.');}
function getQuestionForTopic(questionId,topic){
 const q=questionById.get(questionId);
 if(!q||q.subject!==topic.subject||q.topicId!==topic.topicId)throw Error('Question does not belong to this topic.');
 const year=topic.yearId.startsWith('year-')?Number(topic.yearId.slice(5)):0;
 if(year<q.minYear||year>q.maxYear)throw Error('Question is not mapped to this learning year.');
 return q;
}
export const assessmentPolicy=Object.freeze({
 minimumDistinctGradedQuestions:5,
 minimumDistinctSessionsForMastery:2,
 secureAccuracy:0.8,masteredAccuracy:0.9,
 maximumAssessmentQuestions:30
});
export function createAssessment({assessmentId,topic,questionIds,createdAt}){
 if(!validText(assessmentId))throw Error('Assessment ID required.');
 assertTopic(topic);assertDate(createdAt);
 if(!Array.isArray(questionIds)||questionIds.length<1||questionIds.length>assessmentPolicy.maximumAssessmentQuestions||
 new Set(questionIds).size!==questionIds.length)throw Error('Invalid assessment questions.');
 const questions=questionIds.map(id=>getQuestionForTopic(id,topic));
 return {assessmentId,topic:{subject:topic.subject,topicId:topic.topicId,yearId:topic.yearId},
  createdAt,questionIds:[...questionIds],questionCount:questions.length,
  requiresHumanReview:questions.some(q=>q.marking==='human-review'),
  status:'in-progress',schemaVersion:1};
}
function assertAssessment(a){
 if(!a||!validText(a.assessmentId)||!a.topic||!Array.isArray(a.questionIds))throw Error('Invalid assessment.');
 createAssessment(a);
}
export function markAssessment(assessment,responses,{completedAt}){
 assertAssessment(assessment);assertDate(completedAt);
 if(Date.parse(completedAt)<Date.parse(assessment.createdAt))throw Error('Completion precedes creation.');
 if(!Array.isArray(responses)||responses.some(r=>!r||!validText(r.questionId)||
  !['string','number'].includes(typeof r.answer)))throw Error('Invalid responses.');
 const byId=new Map();
 for(const response of responses){
  if(byId.has(response.questionId)||!assessment.questionIds.includes(response.questionId))throw Error('Duplicate or unknown response.');
  byId.set(response.questionId,String(response.answer));
 }
 const results=assessment.questionIds.map(questionId=>{
  const q=getQuestionForTopic(questionId,assessment.topic);
  const answer=byId.get(questionId);
  if(answer===undefined||!answer.trim())return {questionId,outcome:'skipped',feedback:'No answer submitted.',needsHumanReview:false};
  if(q.marking==='human-review')return {questionId,outcome:'needs-review',feedback:'A parent or educator should review this response.',needsHumanReview:true};
  const correct=answer===q.answer;
  return {questionId,outcome:correct?'correct':'incorrect',
   feedback:correct?'Correct.':q.explanation,needsHumanReview:false};
 });
 const graded=results.filter(r=>r.outcome==='correct'||r.outcome==='incorrect');
 const correct=graded.filter(r=>r.outcome==='correct').length;
 return {...assessment,completedAt,status:results.some(r=>r.needsHumanReview)?'awaiting-review':'completed',
  results,gradedCount:graded.length,correctCount:correct,
  accuracy:graded.length?correct/graded.length:null};
}
export function reviewAssessmentResult(markedAssessment,{questionId,reviewerDecision,reviewedAt}){
 if(!markedAssessment||!Array.isArray(markedAssessment.results)||!validText(questionId)||
 !['correct','incorrect'].includes(reviewerDecision))throw Error('Invalid review request.');
 assertDate(reviewedAt);
 if(!validDate(markedAssessment.completedAt)||Date.parse(reviewedAt)<Date.parse(markedAssessment.completedAt))throw Error('Invalid review time.');
 const result=markedAssessment.results.find(r=>r.questionId===questionId);
 if(!result||result.outcome!=='needs-review')throw Error('Question is not awaiting review.');
 const results=markedAssessment.results.map(r=>r.questionId===questionId?
  {...r,outcome:reviewerDecision,needsHumanReview:false,
   feedback:'Reviewed by a parent or educator.',reviewedAt}:r);
 const graded=results.filter(r=>r.outcome==='correct'||r.outcome==='incorrect');
 const correct=graded.filter(r=>r.outcome==='correct').length;
 return {...markedAssessment,results,status:results.some(r=>r.outcome==='needs-review')?'awaiting-review':'completed',
  gradedCount:graded.length,correctCount:correct,accuracy:graded.length?correct/graded.length:null};
}
export function assessmentMastery(topic,assessmentHistory,{now}={}){
 assertTopic(topic);
 if(!Array.isArray(assessmentHistory))throw Error('Assessment history must be an array.');
 const relevant=assessmentHistory.filter(a=>a&&a.topic&&a.topic.subject===topic.subject&&
  a.topic.topicId===topic.topicId&&a.topic.yearId===topic.yearId);
 const distinctIds=new Set(),gradedQuestionIds=new Set(),sessions=new Set();
 const attempts=[];
 for(const assessment of relevant){
  if(!validText(assessment.assessmentId)||!validDate(assessment.completedAt)||!Array.isArray(assessment.results))
   throw Error('Invalid completed assessment history.');
  if(distinctIds.has(assessment.assessmentId))throw Error('Duplicate assessment in history.');
  distinctIds.add(assessment.assessmentId);
  for(const result of assessment.results){
   if(!result||!validText(result.questionId)||
    !['correct','incorrect','needs-review','skipped'].includes(result.outcome))
    throw Error('Invalid historical result.');
   if(result.outcome==='correct'||result.outcome==='incorrect'){
    gradedQuestionIds.add(result.questionId);sessions.add(assessment.assessmentId);
   }
   attempts.push({subject:topic.subject,topicId:topic.topicId,yearId:topic.yearId,
    questionId:result.questionId,outcome:result.outcome,completedAt:assessment.completedAt});
  }
 }
 const summary=summariseTopicPractice(topic,attempts,now?{now}:{});
 let mastery='not-started';
 if(summary.gradedAttempts>0)mastery='developing';
 if(summary.gradedAttempts>=assessmentPolicy.minimumDistinctGradedQuestions&&
  gradedQuestionIds.size>=assessmentPolicy.minimumDistinctGradedQuestions){
  mastery=summary.accuracy>=assessmentPolicy.masteredAccuracy&&
   sessions.size>=assessmentPolicy.minimumDistinctSessionsForMastery?'mastered':
   summary.accuracy>=assessmentPolicy.secureAccuracy?'secure':'practising';
 }
 return {...summary,mastery,distinctGradedQuestions:gradedQuestionIds.size,
  distinctGradedSessions:sessions.size,assessmentSessions:relevant.length,
  evidenceSufficient:gradedQuestionIds.size>=assessmentPolicy.minimumDistinctGradedQuestions,
  pendingHumanReview:attempts.filter(a=>a.outcome==='needs-review').length,
  note:'Mastery is provisional and depends on sufficient distinct, reviewed evidence.'};
}
export function assessmentProgressReport(topics,history,{now}={}){
 if(!Array.isArray(topics)||!Array.isArray(history))throw Error('Invalid progress report inputs.');
 const seen=new Set();
 const summaries=topics.map(topic=>{
  assertTopic(topic);
  const key=[topic.subject,topic.topicId,topic.yearId].join('::');
  if(seen.has(key))throw Error('Duplicate topic in progress report.');
  seen.add(key);
  return assessmentMastery(topic,history,now?{now}:{});
 });
 const masteryCounts=Object.fromEntries(['not-started','developing','practising','secure','mastered'].map(k=>[k,summaries.filter(s=>s.mastery===k).length]));
 return {topicCount:summaries.length,masteryCounts,
  awaitingReview:summaries.reduce((n,s)=>n+s.pendingHumanReview,0),
  summaries};
}
