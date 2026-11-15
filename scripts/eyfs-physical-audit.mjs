import {earlyDevelopmentTopics,earlyDevelopmentLesson} from '../src/earlyDevelopment.js';
import {buildEyfsTraceability} from './eyfs-traceability.mjs';
const topics=['Movement and balance','Hands and independence'];
const mapping={'EYFS-P3-01':['Movement and balance'],'EYFS-P3-02':['Movement and balance'],'EYFS-P3-03':['Hands and independence'],'EYFS-P3-04':['Hands and independence']};
export function auditEyfsPhysical(){
 const available=new Set(earlyDevelopmentTopics.map(([name])=>name));
 const lessons=topics.map(topic=>{
  const l=earlyDevelopmentLesson(topic,4);
  return {topic,exists:available.has(topic),questions:l.questions.length,delivery:'multiple-choice discussion',motorPerformanceMeasured:false,educatorReviewed:false};
 });
 const strands=buildEyfsTraceability().entries.filter(e=>e.learningArea==='Physical development').map(e=>({
  strandId:e.strandId,requirement:e.requirement,candidateTopics:mapping[e.strandId],activityId:e.activityId,
  gap:'No verified child-led gross- or fine-motor practice, safe adult guidance or inclusive movement observation in live lessons',
  evidenceNeeded:['working adult-supported offline activity','safe setup and supervision instructions','accessible movement alternatives','educator review'],
  coverage:'not verified'
 }));
 return {lessons,strands,summary:{topics:lessons.length,questions:lessons.reduce((n,x)=>n+x.questions,0),strands:strands.length,verified:0}};
}
if(process.argv[1]?.endsWith('/eyfs-physical-audit.mjs'))console.log(JSON.stringify(auditEyfsPhysical(),null,2));
