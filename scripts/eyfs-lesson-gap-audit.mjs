import {readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {earlyLiteracyTopics,earlyLiteracyLesson} from '../src/earlyLiteracy.js';
import {earlyMathsTopics,earlyMathsLesson} from '../src/earlyMaths.js';
import {earlyDevelopmentTopics,earlyDevelopmentLesson} from '../src/earlyDevelopment.js';
import {earlyWorldTopics,earlyWorldLesson} from '../src/earlyWorld.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=JSON.parse(readFileSync(resolve(root,'curriculum/eyfs-2026-educational-programmes.json'),'utf8'));
const banks={earlyLiteracy:[earlyLiteracyTopics,earlyLiteracyLesson],earlyMaths:[earlyMathsTopics,earlyMathsLesson],earlyDevelopment:[earlyDevelopmentTopics,earlyDevelopmentLesson],earlyWorld:[earlyWorldTopics,earlyWorldLesson]};
export function eyfsLessonGapAudit(){
 const modules=[],byModule={};
 for(const [name,[topics,lesson]] of Object.entries(banks)){
  const lessons=topics.map(([topic])=>{
   const result=lesson(topic,4),q=result.questions;
   return {topic,questions:q.length,hasIntro:Boolean(result.intro),validAnswers:q.every(x=>x.options.includes(x.answer)),hasExplanations:q.every(x=>Boolean(x.explanation)),distinctPrompts:new Set(q.map(x=>x.prompt)).size===q.length,hasObservedPracticalEvidence:false};
  });
  modules.push({module:name,topics:lessons.length,questions:lessons.reduce((n,x)=>n+x.questions,0),lessons});
  byModule[name]=lessons;
 }
 const strands=source.programmes.flatMap(p=>p.strands.map(s=>({
  id:s.id,area:p.area,summary:s.summary,candidateModule:p.candidateModule,
  candidateLessonTopics:byModule[p.candidateModule].map(l=>l.topic),
  mappingStatus:'needs human review',verifiedLessonIds:[],
  priority:s.summary.match(/movement|motor|tools|writing|music|creative|performance|observation|conversation|role play|manipulatives/i)?'hands-on evidence needed':'curriculum evidence needed'
 })));
 return {modules,strands,summary:{modules:modules.length,topics:modules.reduce((n,m)=>n+m.topics,0),questions:modules.reduce((n,m)=>n+m.questions,0),strands: strands.length,verifiedStrands:0,unverifiedStrands:strands.length}};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(eyfsLessonGapAudit(),null,2));
