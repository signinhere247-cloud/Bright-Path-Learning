import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export const stages=[
 {name:'Early years',ages:'3–5',files:['earlyLiteracy','earlyMaths','earlyDevelopment','earlyWorld']},
 {name:'Key stage 1',ages:'5–7',files:['ks1English','ks1Maths','ks1Foundation']},
 {name:'Key stage 2',ages:'7–11',files:['years34','years56','ks2Science','ks2Foundation']},
 {name:'Key stage 3',ages:'11–14',files:['ks3English','ks3Maths','ks3Science','ks3Humanities']},
 {name:'GCSE introduction',ages:'14–16',files:['gcseEnglish','gcseMaths','gcseScience']}
];
export function auditCurriculum(){
 const main=readFileSync(resolve(root,'src/main.js'),'utf8');
 const findings=[],coverage=[];
 for(const stage of stages){
  const files=stage.files.map(name=>{
   const path=resolve(root,'src',name+'.js'),present=existsSync(path);
   const source=present?readFileSync(path,'utf8'):'';
   const imported=main.includes("from './"+name+".js'");
   const integrated=main.includes(name+'Lesson(')||main.includes(name+'Subjects');
   if(!present||!imported||!integrated)findings.push({severity:'error',stage:stage.name,module:name,issue:!present?'Missing curriculum file':!imported?'Not imported into academy':'Lesson not integrated into academy'});
   return {name,present,imported,integrated,bytes:source.length};
  });
  coverage.push({stage:stage.name,ages:stage.ages,modules:files});
 }
 const gcse=readFileSync(resolve(root,'src/gcseScience.js'),'utf8');
 if(!gcse.includes('combined-science revision'))findings.push({severity:'warning',stage:'GCSE',issue:'Confirm exam-board mapping and combined science specifications'});
 findings.push(
  {severity:'scope',stage:'All',issue:'Module presence is not proof of complete national-curriculum coverage, correct difficulty, or educational accuracy'},
  {severity:'scope',stage:'GCSE',issue:'GCSE banks are introductory; map all specification statements for AQA, Edexcel, OCR or chosen boards before claiming full coverage'},
  {severity:'scope',stage:'All',issue:'Manually review ambiguous answers, age appropriateness, accessibility and mobile experience with real devices'},
  {severity:'scope',stage:'All',issue:'Legacy general subjects may overlap age-specific banks; review content progression and avoid repeating generic questions'}
 );
 return {coverage,findings,passed:findings.every(f=>f.severity!=='error')};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=auditCurriculum();console.log(JSON.stringify(result,null,2));if(!result.passed)process.exitCode=1;
}
