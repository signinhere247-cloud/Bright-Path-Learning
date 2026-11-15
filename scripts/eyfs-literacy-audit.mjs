import {earlyLiteracyTopics,earlyLiteracyLesson} from '../src/earlyLiteracy.js';
import {buildEyfsTraceability} from './eyfs-traceability.mjs';
const mapping={'EYFS-P4-01':['Read a sentence','Rhyming words'],'EYFS-P4-02':['Read a sentence'],'EYFS-P4-03':['Beginning sounds','Blend the sounds','Common words','Letters and names'],'EYFS-P4-04':['Writing and punctuation','Capital letters']};
export function auditEyfsLiteracy(){
 const topics=earlyLiteracyTopics.map(([topic])=>{
  const l=earlyLiteracyLesson(topic,4);
  return {topic,questions:l.questions.length,hasTeachingIntro:Boolean(l.intro),answersValid:l.questions.every(q=>q.options.includes(q.answer)),hasExplanations:l.questions.every(q=>Boolean(q.explanation)),delivery:'screen-based multiple-choice',actualReadingOrWritingObserved:false};
 });
 const strands=buildEyfsTraceability().entries.filter(e=>e.learningArea==='Literacy').map(e=>({
  strandId:e.strandId,requirement:e.requirement,candidateTopics:mapping[e.strandId],activityId:e.activityId,
  missingEvidence:['adult-child shared reading','oral language and story comprehension','systematic phonics sequence review','child-created mark-making or writing','independent educator review'],
  coverage:'not verified'
 }));
 return {topics,strands,summary:{topics:topics.length,questions:topics.reduce((n,x)=>n+x.questions,0),strands:strands.length,verified:0}};
}
if(process.argv[1]?.endsWith('/eyfs-literacy-audit.mjs'))console.log(JSON.stringify(auditEyfsLiteracy(),null,2));
