// Structural QA for supplementary KS1 maths activities. Not a curriculum certification.
import {ks1PlaceValueActivities} from '../src/ks1PlaceValueActivities.js';
import {ks1AdditionSubtractionActivities} from '../src/ks1AdditionSubtractionActivities.js';
import {ks1MultiplicationDivisionActivities} from '../src/ks1MultiplicationDivisionActivities.js';
import {ks1FractionsActivities} from '../src/ks1FractionsActivities.js';
import {ks1MeasurementActivities} from '../src/ks1MeasurementActivities.js';
import {ks1GeometryActivities} from '../src/ks1GeometryActivities.js';
import {ks1StatisticsActivities} from '../src/ks1StatisticsActivities.js';
import {ks1MathsReasoningActivities} from '../src/ks1MathsReasoningActivities.js';

export const ks1MathsGroups={
 placeValue:ks1PlaceValueActivities,
 additionSubtraction:ks1AdditionSubtractionActivities,
 multiplicationDivision:ks1MultiplicationDivisionActivities,
 fractions:ks1FractionsActivities,
 measurement:ks1MeasurementActivities,
 geometry:ks1GeometryActivities,
 statistics:ks1StatisticsActivities,
 reasoning:ks1MathsReasoningActivities
};
export function auditKs1MathsActivities(){
 const issues=[],ids=new Set(),yearCounts={1:0,2:0};
 for(const [domain,activities] of Object.entries(ks1MathsGroups)){
  if(!Array.isArray(activities)||activities.length===0){issues.push(domain+': no activities');continue;}
  const localYears=new Set();
  for(const a of activities){
   if(!a||typeof a.id!=='string'||!a.id.trim()){issues.push(domain+': missing ID');continue;}
   if(ids.has(a.id))issues.push('duplicate ID: '+a.id);
   ids.add(a.id);
   if(a.year!==1&&a.year!==2){issues.push(a.id+': invalid year');continue;}
   yearCounts[a.year]++;localYears.add(a.year);
   if(!Array.isArray(a.steps)||a.steps.length<3||a.steps.some(s=>typeof s!=='string'||!s.trim()))issues.push(a.id+': incomplete steps');
   if(typeof a.adultPrompt!=='string'||!a.adultPrompt.trim())issues.push(a.id+': missing adult prompt');
  }
  if(!localYears.has(1)||!localYears.has(2))issues.push(domain+': missing Year 1 or 2');
 }
 return {domains:Object.keys(ks1MathsGroups).length,activities:ids.size,yearCounts,issues,structuralPass:issues.length===0,educatorVerified:false,statutoryObjectiveCoverageVerified:false,liveInterfaceIntegrated:false,remainingGates:['Educator review','Statutory objective-by-objective mapping','Practical assessment validation','Live lesson navigation integration']};
}
if(process.argv[1]&&import.meta.url===new URL('file://'+process.argv[1]).href){
 console.log(JSON.stringify(auditKs1MathsActivities(),null,2));
 if(!auditKs1MathsActivities().structuralPass)process.exitCode=1;
}
