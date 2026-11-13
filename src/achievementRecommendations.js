import {achievementProgress} from './achievementProgress.js';
import {achievementNextStep} from './achievementNextSteps.js';
/** Recommend up to three reachable, unfinished achievements nearest completion. */
export function achievementRecommendations(gallery,limit=3){
 const candidates=(gallery?.groups||[]).flatMap(g=>g.items||[]).filter(b=>!b.earned).map(b=>{
  const progress=achievementProgress(b),next=achievementNextStep(b);
  return progress&&next?{badge:b,next,remaining:progress.max-progress.value,progress}:null;
 }).filter(Boolean);
 candidates.sort((a,b)=>a.remaining-b.remaining||b.progress.value/b.progress.max-a.progress.value/a.progress.max||a.badge.title.localeCompare(b.badge.title));
 return candidates.slice(0,Math.max(0,Math.min(3,Number.isInteger(limit)?limit:3)));
}
