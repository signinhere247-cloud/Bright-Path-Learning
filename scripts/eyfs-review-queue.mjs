import {buildEyfsTraceability} from './eyfs-traceability.mjs';
const areaPriority=new Map([
 ['Communication and language',1],
 ['Physical development',2],
 ['Literacy',3],
 ['Mathematics',4],
 ['Personal, social and emotional development',5],
 ['Understanding the world',6],
 ['Expressive arts and design',7]
]);
export function buildEyfsReviewQueue(){
 const trace=buildEyfsTraceability();
 const tasks=trace.entries.map(e=>{
  const rank=areaPriority.get(e.learningArea);
  return {strandId:e.strandId,activityId:e.activityId,area:e.learningArea,requirement:e.requirement,
   priority:rank<=3?'P0':rank<=5?'P1':'P2',areaOrder:rank,
   workNeeded:['inspect existing lesson content','review proposed hands-on activity','check inclusive participation','check safety and privacy','record educator review'],
   status:'awaiting review',verifiedCoverage:false};
 }).sort((a,b)=>a.areaOrder-b.areaOrder||a.strandId.localeCompare(b.strandId));
 return {policy:'Editorial sequencing only; all EYFS learning areas remain essential and none is optional.',counts:{total:tasks.length,P0:tasks.filter(x=>x.priority==='P0').length,P1:tasks.filter(x=>x.priority==='P1').length,P2:tasks.filter(x=>x.priority==='P2').length},tasks};
}
if(process.argv[1]?.endsWith('/eyfs-review-queue.mjs'))console.log(JSON.stringify(buildEyfsReviewQueue(),null,2));
