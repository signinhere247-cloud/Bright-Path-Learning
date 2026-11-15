import {earlyWorldTopics,earlyWorldLesson} from '../src/earlyWorld.js';
import {buildEyfsTraceability} from './eyfs-traceability.mjs';
const selected=['Seasons and weather','Plants and animals','People and communities','Places and journeys','Materials and senses'];
const mapping={'EYFS-P6-01':['People and communities','Places and journeys'],'EYFS-P6-02':['People and communities','Places and journeys'],'EYFS-P6-03':['Seasons and weather','Plants and animals'],'EYFS-P6-04':['Materials and senses','Plants and animals']};
export function auditEyfsWorld(){
 const available=new Set(earlyWorldTopics.map(([topic])=>topic));
 const lessons=selected.map(topic=>{
  const l=earlyWorldLesson(topic,4);
  return {topic,exists:available.has(topic),questions:l.questions.length,explanationPattern:'generic answer repetition',realWorldObservationVerified:false,educatorReviewed:false};
 });
 const strands=buildEyfsTraceability().entries.filter(e=>e.learningArea==='Understanding the world').map(e=>({
  strandId:e.strandId,requirement:e.requirement,candidateTopics:mapping[e.strandId],activityId:e.activityId,
  evidenceNeeded:['local and family history exploration','inclusive representation of people and cultures','real-world nature observations','child-led questions and investigation','educator and safety review'],
  coverage:'not verified'
 }));
 return {lessons,strands,summary:{topics:lessons.length,questions:lessons.reduce((n,x)=>n+x.questions,0),strands:strands.length,verified:0}};
}
if(process.argv[1]?.endsWith('/eyfs-world-audit.mjs'))console.log(JSON.stringify(auditEyfsWorld(),null,2));
