import {ks1ScienceActivities} from '../src/ks1ScienceActivities.js';
import {ks1HistoryActivities} from '../src/ks1HistoryActivities.js';
import {ks1GeographyActivities} from '../src/ks1GeographyActivities.js';
import {ks1ArtDesignActivities} from '../src/ks1ArtDesignActivities.js';
import {ks1DesignTechnologyActivities} from '../src/ks1DesignTechnologyActivities.js';
import {ks1ComputingActivities} from '../src/ks1ComputingActivities.js';
import {ks1MusicActivities} from '../src/ks1MusicActivities.js';
import {ks1PhysicalEducationActivities} from '../src/ks1PhysicalEducationActivities.js';
import {ks1ReligiousEducationActivities} from '../src/ks1ReligiousEducationActivities.js';

export const ks1FoundationModules={
 science:ks1ScienceActivities,history:ks1HistoryActivities,geography:ks1GeographyActivities,
 artAndDesign:ks1ArtDesignActivities,designTechnology:ks1DesignTechnologyActivities,
 computing:ks1ComputingActivities,music:ks1MusicActivities,
 physicalEducation:ks1PhysicalEducationActivities,religiousEducation:ks1ReligiousEducationActivities
};
export function auditKs1FoundationActivities(modules=ks1FoundationModules){
 const issues=[],ids=new Set(),bySubject={},byYear={1:0,2:0};
 for(const [subject,activities] of Object.entries(modules)){
  if(!Array.isArray(activities)||activities.length===0){issues.push(subject+': no activities');continue;}
  const counts={1:0,2:0};bySubject[subject]=activities.length;
  for(const a of activities){
   if(!a||typeof a!=='object'){issues.push(subject+': invalid activity');continue;}
   if(typeof a.id!=='string'||!a.id.trim()||ids.has(a.id))issues.push(subject+': duplicate or missing ID '+a.id);
   else ids.add(a.id);
   if(a.year!==1&&a.year!==2)issues.push(a.id+': invalid year');
   else{counts[a.year]++;byYear[a.year]++;}
   if(typeof a.title!=='string'||!a.title.trim()||typeof a.focus!=='string'||!a.focus.trim())issues.push(a.id+': missing title or focus');
   if(!Array.isArray(a.steps)||a.steps.length<4||a.steps.some(s=>typeof s!=='string'||!s.trim()))issues.push(a.id+': insufficient steps');
   if(!Array.isArray(a.materials)||a.materials.length<2||a.materials.some(s=>typeof s!=='string'||!s.trim()))issues.push(a.id+': insufficient materials');
   if(typeof a.adultPrompt!=='string'||!a.adultPrompt.trim().endsWith('?'))issues.push(a.id+': missing adult question');
   if(typeof a.safety!=='string'||a.safety.trim().length<20)issues.push(a.id+': missing safety guidance');
  }
  if(!counts[1]||!counts[2])issues.push(subject+': missing year coverage');
 }
 return {moduleCount:Object.keys(modules).length,activityCount:Object.values(bySubject).reduce((a,b)=>a+b,0),bySubject,byYear,issues,passed:issues.length===0,educatorVerified:false,statutoryObjectiveCoverageVerified:false,liveInterfaceIntegrated:false};
}
if(process.argv[1]&&import.meta.url===new URL('file://'+process.argv[1]).href){
 const report=auditKs1FoundationActivities();console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
}
