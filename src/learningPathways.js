/**
 * BrightPath England learning-pathway mapping — Stage 2, Step 2.
 *
 * Age/year recommendations are guidance only, not an assessment or an
 * automatic change to a child's saved learning level.
 * England school-year convention: age on 31 August before the school year.
 * Academic year runs September–August. No date of birth is required.
 */
import {
 learningYears, learningStages, availableSubjectsForYear,
 findLearningYear, curriculumStageForYear
} from './curriculumCatalogue.js';

const YEAR_ORDER = learningYears.map(year=>year.id);
const MIN_AGE = 3;
const MAX_AGE = 16;

export const learningPathwayModes = Object.freeze([
 {id:'school-support',label:'School support',description:'Follow a selected school year, with flexibility to practise other levels.'},
 {id:'home-education',label:'Home education',description:'Choose a flexible pathway and move between learning levels.'}
]);

export function assertLearningAge(age){
 const value=Number(age);
 if(!Number.isInteger(value)||value<MIN_AGE||value>MAX_AGE)throw Error('Learning age must be between 3 and 16.');
 return value;
}

/** Approximate school year for a learning age, for initial suggestions only. */
export function suggestedYearForAge(age){
 const value=assertLearningAge(age);
 if(value===3)return 'nursery';
 if(value===4)return 'reception';
 return 'year-'+Math.min(11,value-4);
}

/** School-year placement based on DOB and the year the academic year starts. */
export function yearForDateOfBirth(dateOfBirth,academicYearStart){
 if(typeof dateOfBirth!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth))throw Error('Use a YYYY-MM-DD date of birth.');
 const [y,m,d]=dateOfBirth.split('-').map(Number);
 const dob=new Date(Date.UTC(y,m-1,d));
 if(dob.getUTCFullYear()!==y||dob.getUTCMonth()!==m-1||dob.getUTCDate()!==d)throw Error('Invalid date of birth.');
 if(!Number.isInteger(academicYearStart)||academicYearStart<2000||academicYearStart>2100)throw Error('Invalid academic year.');
 const cutoff=new Date(Date.UTC(academicYearStart,7,31));
 const ageAtCutoff=academicYearStart-y-((m>8)?1:0);
 if(dob>cutoff||ageAtCutoff<3||ageAtCutoff>16)return null;
 if(ageAtCutoff===3)return 'nursery';
 if(ageAtCutoff===4)return 'reception';
 return 'year-'+Math.min(11,ageAtCutoff-4);
}

export function academicYearStartForDate(date){
 if(!(date instanceof Date)||!Number.isFinite(date.getTime()))throw Error('Invalid date.');
 const year=date.getUTCFullYear();
 return date.getUTCMonth()>=8?year:year-1;
}

/**
 * Explicit parent selection takes priority. Never silently reassign a child
 * because of a birthday or because they are learning at a different level.
 */
export function resolveLearningPathway({age,yearId=null,mode='school-support',jurisdiction='england'}={}){
 const learningAge=assertLearningAge(age);
 if(jurisdiction!=='england')throw Error('Only England learning pathways are mapped at this stage.');
 if(!learningPathwayModes.some(entry=>entry.id===mode))throw Error('Unknown learning mode.');
 const selectedYear=yearId??suggestedYearForAge(learningAge);
 const year=findLearningYear(selectedYear);
 if(!year)throw Error('Unknown school year.');
 const stage=curriculumStageForYear(selectedYear);
 return {
  jurisdiction,mode,learningAge,
  selectedYearId:year.id,selectedYearLabel:year.label,
  stageId:stage.id,stageLabel:stage.label,
  suggestedYearId:suggestedYearForAge(learningAge),
  parentSelectedYear:yearId!==null,
  subjectIds:availableSubjectsForYear(selectedYear).map(subject=>subject.id)
 };
}

export function listLearningPathways(){
 return learningStages.map(stage=>({
  stageId:stage.id,stageLabel:stage.label,
  years:stage.years.map(yearId=>{
   const year=findLearningYear(yearId);
   return {id:year.id,label:year.label,typicalAges:[...year.typicalAges]};
  })
 }));
}

/** All 13 year levels are selectable; age never locks out a level. */
export function selectableLearningYears(){
 return YEAR_ORDER.map(id=>{
  const year=findLearningYear(id);
  return {id:year.id,label:year.label,stageId:year.stage,typicalAges:[...year.typicalAges]};
 });
}
