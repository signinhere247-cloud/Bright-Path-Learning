import {buildEyfsTraceability} from './eyfs-traceability.mjs';
import {auditEyfsCommunication} from './eyfs-communication-audit.mjs';
import {auditEyfsPsed} from './eyfs-psed-audit.mjs';
import {auditEyfsPhysical} from './eyfs-physical-audit.mjs';
import {auditEyfsLiteracy} from './eyfs-literacy-audit.mjs';
import {auditEyfsMaths} from './eyfs-maths-audit.mjs';
import {auditEyfsWorld} from './eyfs-world-audit.mjs';
import {auditEyfsArts} from './eyfs-arts-audit.mjs';
const audits=[
 ['Communication and language',auditEyfsCommunication],
 ['Personal, social and emotional development',auditEyfsPsed],
 ['Physical development',auditEyfsPhysical],
 ['Literacy',auditEyfsLiteracy],
 ['Mathematics',auditEyfsMaths],
 ['Understanding the world',auditEyfsWorld],
 ['Expressive arts and design',auditEyfsArts]
];
export function buildEyfsImplementationHandoff(){
 const trace=buildEyfsTraceability();
 const areas=audits.map(([name,fn])=>{
  const a=fn();
  return {name,teachingStrands:a.summary.strands,existingQuizTopicsReviewed:a.summary.topics??a.summary.lessons??a.summary.topicsReviewed,
   quizQuestionsReviewed:a.summary.questions??a.examinedTopics?.reduce((n,x)=>n+x.questionCount,0)??0,
   verified:0,status:'requires implementation and educator review'};
 });
 const tasks=trace.entries.map(e=>({
  strandId:e.strandId,area:e.learningArea,proposedActivityId:e.activityId,requirement:e.requirement,
  implementationStatus:'not verified as implemented',
  nextActions:['build working adult-supported play activity','connect activity to lesson navigation','test accessibility and age safety','verify educational accuracy and statutory alignment']
 }));
 return {areas,summary:{areas:areas.length,strands:tasks.length,plannedActivities:tasks.filter(t=>t.proposedActivityId).length,
  quizTopicsReviewed:areas.reduce((n,a)=>n+a.existingQuizTopicsReviewed,0),quizQuestionsReviewed:areas.reduce((n,a)=>n+a.quizQuestionsReviewed,0),verifiedStrands:0},
  tasks,phase:'mapping and evidence audit completed; activity implementation not certified'};
}
if(process.argv[1]?.endsWith('/eyfs-implementation-handoff.mjs'))console.log(JSON.stringify(buildEyfsImplementationHandoff(),null,2));
