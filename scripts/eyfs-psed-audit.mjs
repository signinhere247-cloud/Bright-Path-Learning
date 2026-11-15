import {earlyDevelopmentTopics,earlyDevelopmentLesson} from '../src/earlyDevelopment.js';
import {buildEyfsTraceability} from './eyfs-traceability.mjs';
const selected=['Naming feelings','Calming and self-regulation','Friendship and kindness','Hands and independence'];
const mapping={'EYFS-P2-01':['Naming feelings','Calming and self-regulation'],'EYFS-P2-02':['Calming and self-regulation'],'EYFS-P2-03':['Hands and independence'],'EYFS-P2-04':['Friendship and kindness']};
export function auditEyfsPsed(){
 const names=new Set(earlyDevelopmentTopics.map(([name])=>name));
 const lessons=selected.map(topic=>{
  const result=earlyDevelopmentLesson(topic,4);
  return {topic,exists:names.has(topic),questions:result.questions.length,answerExplanations:result.questions.every(q=>q.explanation==='Talk with a grown-up: '+q.answer+'.'),delivery:'multiple-choice and adult discussion prompt',realWorldEvidence:'not demonstrated',educatorReviewed:false};
 });
 const strands=buildEyfsTraceability().entries.filter(e=>e.learningArea==='Personal, social and emotional development').map(e=>({
  strandId:e.strandId,requirement:e.requirement,candidateTopics:mapping[e.strandId],proposedActivityId:e.activityId,
  gaps:['child-led everyday practice','supported observation in real contexts','inclusive communication and sensory adaptations','independent educator review'],
  coverage:'not verified'
 }));
 return {lessons,strands,summary:{lessons:lessons.length,questions:lessons.reduce((n,x)=>n+x.questions,0),strands:strands.length,verified:0}};
}
if(process.argv[1]?.endsWith('/eyfs-psed-audit.mjs'))console.log(JSON.stringify(auditEyfsPsed(),null,2));
