/**
 * BrightPath adaptive learning — Stage 2 Step 16.
 * Draft recommendation engine only; no live UI, saves or cloud sync changes.
 * Parent-selected level remains authoritative. No age/ability diagnoses.
 * Deterministic, local-only, with no child identifiers or personal information.
 */
import {expandedQuestionsFor,expandedQuestionBank} from './expandedQuestionBank.js';
import {workedExampleFor} from './teachingSupport.js';

export const adaptivePolicy=Object.freeze({
 minimumGradedAttempts:5,lowAccuracy:0.6,secureAccuracy:0.8,
 revisionDays:Object.freeze({new:1,developing:2,practising:4,secure:7,mastered:21}),
 maxHistoryPerTopic:100
});
const dayMs=86400000;
const topicKey=(subject,topicId,yearId)=>[subject,topicId,yearId].join('::');
function validYear(yearId){return typeof yearId==='string'&&/^(?:nursery|reception|year-(?:[1-9]|10|11))$/.test(yearId);}
function validTopic(t){return t&&typeof t.subject==='string'&&t.subject.trim()&&typeof t.topicId==='string'&&t.topicId.trim()&&validYear(t.yearId);}
function safeDate(value){const n=Date.parse(value);return Number.isFinite(n)?n:NaN;}
function normaliseAttempts(attempts,now){
 if(!Array.isArray(attempts))throw Error('Attempts must be an array.');
 return attempts.map((a,i)=>{
  if(!a||typeof a!=='object'||!validTopic(a)||typeof a.questionId!=='string'||!a.questionId||
   !['correct','incorrect','needs-review','skipped'].includes(a.outcome)||
   typeof a.completedAt!=='string'||!Number.isFinite(safeDate(a.completedAt))||
   safeDate(a.completedAt)>now)throw Error('Invalid practice attempt at index '+i);
  return {subject:a.subject,topicId:a.topicId,yearId:a.yearId,questionId:a.questionId,
   outcome:a.outcome,completedAt:a.completedAt};
 });
}
function dateAfter(timestamp,days){return new Date(timestamp+days*dayMs).toISOString();}
function recentTopicAttempts(attempts,topic){
 return attempts.filter(a=>a.subject===topic.subject&&a.topicId===topic.topicId&&a.yearId===topic.yearId)
  .sort((a,b)=>safeDate(b.completedAt)-safeDate(a.completedAt))
  .slice(0,adaptivePolicy.maxHistoryPerTopic);
}
export function summariseTopicPractice(topic,attempts,{now=new Date().toISOString()}={}){
 if(!validTopic(topic))throw Error('Invalid learning topic.');
 const nowMs=safeDate(now);
 if(!Number.isFinite(nowMs))throw Error('Invalid current date.');
 const history=recentTopicAttempts(normaliseAttempts(attempts,nowMs),topic);
 const graded=history.filter(a=>a.outcome==='correct'||a.outcome==='incorrect');
 const correct=graded.filter(a=>a.outcome==='correct').length;
 const accuracy=graded.length?correct/graded.length:null;
 const lastAt=history.length?history[0].completedAt:null;
 const lastGraded=graded.length?graded[0].completedAt:null;
 let stage='new';
 if(graded.length>0)stage='developing';
 if(graded.length>=adaptivePolicy.minimumGradedAttempts){
  stage=accuracy>=0.9?'mastered':accuracy>=adaptivePolicy.secureAccuracy?'secure':
   accuracy>=adaptivePolicy.lowAccuracy?'practising':'developing';
 }
 const revisionFrom=lastGraded||lastAt;
 const dueAt=revisionFrom?dateAfter(safeDate(revisionFrom),adaptivePolicy.revisionDays[stage]):null;
 return {subject:topic.subject,topicId:topic.topicId,yearId:topic.yearId,
  attempts:history.length,gradedAttempts:graded.length,correct,accuracy,stage,
  ungradedAttempts:history.length-graded.length,lastAt,revisionDueAt:dueAt,
  revisionDue:!dueAt||safeDate(dueAt)<=nowMs,
  evidenceLimited:graded.length<adaptivePolicy.minimumGradedAttempts};
}
export function recommendTopicAction(topic,attempts,{now=new Date().toISOString(),parentYearId=topic.yearId}={}){
 if(!validYear(parentYearId))throw Error('Invalid parent-selected year.');
 const summary=summariseTopicPractice(topic,attempts,{now});
 const {stage,revisionDue,evidenceLimited}=summary;
 let action='continue-practice',reason='Continue practising to gather more evidence.';
 if(summary.gradedAttempts===0){action='start';reason='No graded practice is recorded for this topic.';}
 else if(evidenceLimited){action='guided-practice';reason='There are too few graded attempts to make a reliable progression suggestion.';}
 else if(stage==='developing'){action='revisit-explanation';reason='Recent answers suggest revisiting the method and using hints.';}
 else if(revisionDue){action='spaced-revision';reason='This topic is due for a short review.';}
 else if(stage==='mastered'){action='optional-challenge';reason='Strong practice evidence supports offering an optional challenge.';}
 else if(stage==='secure'){action='continue-or-challenge';reason='The topic appears secure; offer choice rather than automatic advancement.';}
 const support=workedExampleFor(topic.subject,topic.topicId);
 return {...summary,action,reason,parentYearId,
  recommendedYearId:parentYearId,levelChangeRequiresParentChoice:true,
  workedExampleId:support?.id||null,
  teachingSupportAvailable:Boolean(support),
  reviewNeeded:!support&&(action==='revisit-explanation'||action==='guided-practice')};
}
export function recommendRevision(topics,attempts,{now=new Date().toISOString(),parentYearId=null,limit=10}={}){
 if(!Array.isArray(topics)||!Number.isInteger(limit)||limit<1||limit>100)throw Error('Invalid revision request.');
 const unique=new Set();
 const recommendations=[];
 for(const topic of topics){
  if(!validTopic(topic))throw Error('Invalid topic in revision request.');
  const key=topicKey(topic.subject,topic.topicId,topic.yearId);
  if(unique.has(key))continue;
  unique.add(key);
  const r=recommendTopicAction(topic,attempts,{now,parentYearId:parentYearId||topic.yearId});
  if(r.revisionDue||r.action==='revisit-explanation'||r.action==='guided-practice')recommendations.push(r);
 }
 const rank={ 'revisit-explanation':0,'guided-practice':1,'spaced-revision':2,start:3,'continue-practice':4,
  'continue-or-challenge':5,'optional-challenge':6};
 return recommendations.sort((a,b)=>(rank[a.action]??9)-(rank[b.action]??9)||
  (a.lastAt||'').localeCompare(b.lastAt||'')||
  topicKey(a.subject,a.topicId,a.yearId).localeCompare(topicKey(b.subject,b.topicId,b.yearId))).slice(0,limit);
}
export function adaptivePracticeSelection(topic,attempts,{now=new Date().toISOString(),count=6,seed=0}={}){
 if(!validTopic(topic))throw Error('Invalid topic.');
 if(!Number.isInteger(count)||count<1||count>30||!Number.isSafeInteger(seed)||seed<0)throw Error('Invalid practice settings.');
 const recommendation=recommendTopicAction(topic,attempts,{now});
 const bankSubject=topic.subject;
 const matching=expandedQuestionBank.filter(q=>q.subject===bankSubject&&q.topicId===topic.topicId);
 if(!matching.length||!/^year-(?:[1-9]|10|11)$/.test(topic.yearId)){
  return {recommendation,questions:[],available:0,shortage:count,
   reason:'No mapped expanded question bank for this topic and year.'};
 }
 const selection=expandedQuestionsFor({subject:bankSubject,topicId:topic.topicId,
  yearId:topic.yearId,count,seed});
 return {recommendation,...selection,
  reason:selection.shortage?'Not enough distinct authored questions; additional content required.':null};
}
export function adaptiveLearningCoverage(topics,attempts,{now=new Date().toISOString()}={}){
 if(!Array.isArray(topics))throw Error('Topics must be an array.');
 const summaries=topics.map(topic=>summariseTopicPractice(topic,attempts,{now}));
 return {topics:summaries.length,withEvidence:summaries.filter(x=>x.gradedAttempts>0).length,
  dueForRevision:summaries.filter(x=>x.revisionDue).length,
  evidenceLimited:summaries.filter(x=>x.evidenceLimited).length,
  summaries};
}
