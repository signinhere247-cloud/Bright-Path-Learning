import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export const stageModules={
 'EYFS (3–5)':['earlyLiteracy','earlyMaths','earlyDevelopment','earlyWorld'],
 'KS1 (5–7)':['ks1English','ks1Maths','ks1Foundation'],
 'KS2 (7–11)':['years34','years56','ks2Science','ks2Foundation'],
 'KS3 (11–14)':['ks3English','ks3Maths','ks3Science','ks3Humanities'],
 'GCSE (14–16)':['gcseEnglish','gcseMaths','gcseScience']
};
export function curriculumInventory(){
 const main=readFileSync(resolve(root,'src/main.js'),'utf8'),entries=[];
 for(const [stage,modules] of Object.entries(stageModules))for(const module of modules){
  const path=resolve(root,'src',module+'.js'),exists=existsSync(path);
  const source=exists?readFileSync(path,'utf8'):'';
  entries.push({stage,module,exists,imported:main.includes("from './"+module+".js'"),lessonConnected:main.includes(module+'Lesson('),bytes:source.length,questionDefinitionMentions:(source.match(/questions|\bprompt\b/g)||[]).length,objectiveMappingVerified:false,examBoardMappingVerified:false,contentReviewed:false});
 }
 const gaps=[
  {id:'MAP-001',priority:'critical',issue:'No verified objective-by-objective mapping to official statutory frameworks',next:'Create authoritative EYFS and National Curriculum objective inventory and link each objective to lessons'},
  {id:'MAP-002',priority:'critical',issue:'GCSE awarding body, specification version and tier coverage not verified',next:'Choose exam boards and map each specification requirement'},
  {id:'CONTENT-001',priority:'high',issue:'Lesson/question counts do not demonstrate sufficient depth, teaching or mastery',next:'Audit each topic for explanations, varied practice and applied tasks'},
  {id:'QUALITY-001',priority:'high',issue:'Question correctness and age suitability not independently reviewed',next:'Expert review with provenance and ambiguity checks'},
  {id:'ASSESS-001',priority:'high',issue:'Multiple-choice results alone cannot assess all curriculum skills',next:'Add writing, oral, practical and extended-response evidence where appropriate'},
  {id:'ACCESS-001',priority:'high',issue:'Mobile accessibility and real-device checks not fully verified',next:'Run mobile/desktop browser and accessibility tests and resolve failures'}
 ];
 return {generatedAt:null,modules:entries,summary:{stages:Object.keys(stageModules).length,modules:entries.length,missing:entries.filter(e=>!e.exists||!e.imported||!e.lessonConnected).map(e=>e.module),objectivesVerified:0},gaps};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=curriculumInventory();console.log(JSON.stringify(result,null,2));if(result.summary.missing.length)process.exitCode=1;
}
