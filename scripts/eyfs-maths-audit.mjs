import {earlyMathsTopics,earlyMathsLesson} from '../src/earlyMaths.js';
import {buildEyfsTraceability} from './eyfs-traceability.mjs';
const mapping={'EYFS-P5-01':['Count to ten','Number order'],'EYFS-P5-02':['More and fewer','Adding together','Taking away'],'EYFS-P5-03':['Shapes around us','Size and measures'],'EYFS-P5-04':['Repeating patterns']};
export function auditEyfsMaths(){
 const topics=earlyMathsTopics.map(([topic])=>{
  const l=earlyMathsLesson(topic,4);
  return {topic,questions:l.questions.length,hasTeachingIntro:Boolean(l.intro),validAnswers:l.questions.every(q=>q.options.includes(q.answer)),hasExplanations:l.questions.every(q=>Boolean(q.explanation)),practicalManipulativesObserved:false};
 });
 const strands=buildEyfsTraceability().entries.filter(e=>e.learningArea==='Mathematics').map(e=>({
  strandId:e.strandId,requirement:e.requirement,candidateTopics:mapping[e.strandId],activityId:e.activityId,
  evidenceNeeded:['one-to-one correspondence with real objects','subitising and number composition','hands-on pattern and shape investigation','developmentally appropriate maths language and tasks','educator review'],
  coverage:'not verified'
 }));
 return {topics,strands,summary:{topics:topics.length,questions:topics.reduce((n,x)=>n+x.questions,0),strands:strands.length,verified:0}};
}
if(process.argv[1]?.endsWith('/eyfs-maths-audit.mjs'))console.log(JSON.stringify(auditEyfsMaths(),null,2));
