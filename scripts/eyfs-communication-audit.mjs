import {earlyDevelopmentTopics,earlyDevelopmentLesson} from '../src/earlyDevelopment.js';
import {buildEyfsTraceability} from './eyfs-traceability.mjs';
const topics=['Listening and attention','Speaking and storytelling','Understanding instructions'];
const linked={'EYFS-P1-01':['Listening and attention','Speaking and storytelling'],'EYFS-P1-02':['Speaking and storytelling'],'EYFS-P1-03':['Listening and attention'],'EYFS-P1-04':['Speaking and storytelling']};
export function auditEyfsCommunication(){
 const available=new Set(earlyDevelopmentTopics.map(([name])=>name));
 const evidence=topics.map(topic=>{
  const lesson=earlyDevelopmentLesson(topic,4);
  return {topic,found:available.has(topic),questionCount:lesson.questions.length,explanationPattern:'generic answer repetition',samplePrompt:lesson.questions[0].prompt,
  delivery:'multiple-choice questions',adultInteractionEvidence:'not demonstrated by quiz',educationalReview:'pending'};
 });
 const requirements=buildEyfsTraceability().entries.filter(x=>x.learningArea==='Communication and language').map(x=>({
  strandId:x.strandId,requirement:x.requirement,existingTopicCandidates:linked[x.strandId],proposedActivityId:x.activityId,
  observedStrength:'related quiz topics exist',gap:'No verified live conversational, story-retelling, vocabulary-use or rhyme performance evidence',
  coverage:'not verified',review:'pending educator review'
 }));
 return {availableTopicCount:available.size,examinedTopics:evidence,requirements,summary:{requirements:requirements.length,verified:0,topicsReviewed:evidence.length}};
}
if(process.argv[1]?.endsWith('/eyfs-communication-audit.mjs'))console.log(JSON.stringify(auditEyfsCommunication(),null,2));
