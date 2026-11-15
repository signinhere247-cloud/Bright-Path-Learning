import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const load=path=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
export function buildEyfsTraceability(){
 const programmes=load('../curriculum/eyfs-2026-educational-programmes.json');
 const backlog=load('../curriculum/eyfs-activity-backlog.json');
 const byStrand=new Map(backlog.activities.map(a=>[a.strandId,a]));
 const entries=programmes.programmes.flatMap(p=>p.strands.map(s=>{
  const a=byStrand.get(s.id);
  return {strandId:s.id,learningArea:p.area,requirement:s.summary,candidateModule:p.candidateModule,activityId:a?.id??null,activityTitle:a?.title??null,
   proposedEvidence:a?.evidence??null,activityStatus:a?.status??'missing',lessonEvidenceIds:[],educationalReview:'not reviewed',accessibilityReview:'not reviewed',safeguardingReview:'not reviewed',
   coverage:'not verified',readiness:a?'planned':'missing activity'};
 }));
 const summary={requirements:entries.length,planned:entries.filter(e=>e.readiness==='planned').length,missingActivities:entries.filter(e=>e.readiness==='missing activity').length,verified:entries.filter(e=>e.coverage==='verified').length};
 return {framework:programmes.source,summary,entries};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1])console.log(JSON.stringify(buildEyfsTraceability(),null,2));
