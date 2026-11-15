import {earlyWorldTopics,earlyWorldLesson} from '../src/earlyWorld.js';
import {buildEyfsTraceability} from './eyfs-traceability.mjs';
const selected=['Materials and senses','Music and rhythm','Art and imagination','Stories and role play'];
const mapping={'EYFS-P7-01':['Materials and senses','Art and imagination'],'EYFS-P7-02':['Stories and role play'],'EYFS-P7-03':['Music and rhythm','Stories and role play'],'EYFS-P7-04':['Art and imagination','Music and rhythm']};
export function auditEyfsArts(){
 const available=new Set(earlyWorldTopics.map(([topic])=>topic));
 const lessons=selected.map(topic=>{
  const l=earlyWorldLesson(topic,4);
  return {topic,exists:available.has(topic),questions:l.questions.length,delivery:'multiple-choice questions',childCreatedWorkVerified:false,educatorReviewed:false};
 });
 const strands=buildEyfsTraceability().entries.filter(e=>e.learningArea==='Expressive arts and design').map(e=>({
  strandId:e.strandId,requirement:e.requirement,candidateTopics:mapping[e.strandId],activityId:e.activityId,
  evidenceNeeded:['open-ended child-led creative activity','access to safe varied materials or instruments','pretend play or musical expression','inclusive sensory and motor alternatives','educator and safety review'],
  coverage:'not verified'
 }));
 return {lessons,strands,summary:{topics:lessons.length,questions:lessons.reduce((n,x)=>n+x.questions,0),strands:strands.length,verified:0}};
}
if(process.argv[1]?.endsWith('/eyfs-arts-audit.mjs'))console.log(JSON.stringify(auditEyfsArts(),null,2));
