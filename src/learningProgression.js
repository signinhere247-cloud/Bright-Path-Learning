/**
 * BrightPath Stage 2 Step 4 — objective progression and mastery rules.
 * This is the learning-engine contract, not a completed statutory curriculum.
 * Parent-selected levels remain editable. Scores are evidence, not diagnoses.
 */
import {findLearningYear,findCurriculumSubject} from './curriculumCatalogue.js';

export const masteryLevels=Object.freeze([
 {id:'not-started',label:'Not started'},
 {id:'developing',label:'Developing'},
 {id:'practising',label:'Practising'},
 {id:'secure',label:'Secure'},
 {id:'mastered',label:'Mastered'}
]);

export const progressionPolicy=Object.freeze({
 minimumQuestions:5,
 secureAccuracy:0.8,
 masteredAccuracy:0.9,
 masteredDistinctAttempts:2
});

const idPattern=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function validId(id){return typeof id==='string'&&idPattern.test(id);}
function assertObjective(objective){
 if(!objective||!validId(objective.id)||typeof objective.statement!=='string'||!objective.statement.trim())throw Error('Invalid learning objective.');
 if(!findLearningYear(objective.yearId))throw Error('Unknown objective year.');
 const subject=findCurriculumSubject(objective.subjectId);
 if(!subject||!subject.stages.includes(findLearningYear(objective.yearId).stage))throw Error('Invalid objective subject.');
 if(!subject.areas.some(area=>area.id===objective.areaId))throw Error('Invalid objective strand.');
 if(!Array.isArray(objective.prerequisiteIds)||objective.prerequisiteIds.some(id=>!validId(id)))throw Error('Invalid prerequisites.');
 if(!['draft','reviewed','verified'].includes(objective.status))throw Error('Invalid objective review status.');
 if(typeof objective.sourceReference!=='string')throw Error('Invalid source reference.');
 if(objective.status==='verified'&&!objective.sourceReference.trim())throw Error('Verified objectives require a source reference.');
}

/** Validate prerequisites, including missing links, duplicate links and cycles. */
export function validateObjectiveProgression(objectives){
 if(!Array.isArray(objectives))throw Error('Objectives must be an array.');
 const byId=new Map();
 for(const objective of objectives){
  assertObjective(objective);
  if(byId.has(objective.id))throw Error('Duplicate objective ID.');
  byId.set(objective.id,objective);
 }
 for(const objective of objectives){
  if(new Set(objective.prerequisiteIds).size!==objective.prerequisiteIds.length)throw Error('Duplicate prerequisite.');
  for(const id of objective.prerequisiteIds){
   if(!byId.has(id))throw Error('Missing prerequisite: '+id);
   if(id===objective.id)throw Error('An objective cannot depend on itself.');
  }
 }
 const visiting=new Set(),visited=new Set();
 function visit(id){
  if(visiting.has(id))throw Error('Circular objective prerequisites.');
  if(visited.has(id))return;
  visiting.add(id);
  for(const prerequisite of byId.get(id).prerequisiteIds)visit(prerequisite);
  visiting.delete(id);visited.add(id);
 }
 for(const id of byId.keys())visit(id);
 return true;
}

/** Individual completed attempts: {correct,total,attemptId}. */
export function objectiveMastery(attempts){
 if(!Array.isArray(attempts))throw Error('Invalid objective attempts.');
 if(!attempts.length)return {level:'not-started',accuracy:null,questions:0,attempts:0};
 let correct=0,total=0;
 const attemptIds=new Set();
 for(const attempt of attempts){
  if(!attempt||!validId(attempt.attemptId)||attemptIds.has(attempt.attemptId))throw Error('Invalid or duplicate attempt.');
  if(!Number.isInteger(attempt.correct)||!Number.isInteger(attempt.total)||attempt.total<1||attempt.correct<0||attempt.correct>attempt.total)throw Error('Invalid attempt score.');
  attemptIds.add(attempt.attemptId);correct+=attempt.correct;total+=attempt.total;
 }
 const accuracy=correct/total;
 let level='developing';
 if(total>=progressionPolicy.minimumQuestions){
  level=accuracy>=progressionPolicy.masteredAccuracy&&attempts.length>=progressionPolicy.masteredDistinctAttempts?'mastered'
   :accuracy>=progressionPolicy.secureAccuracy?'secure':'practising';
 }
 return {level,accuracy,questions:total,attempts:attempts.length};
}

/** Returns a suggested next action, never silently blocks or changes a profile. */
export function recommendObjectiveAction(objectiveId,objectives,attemptsByObjective={}){
 validateObjectiveProgression(objectives);
 const objective=objectives.find(item=>item.id===objectiveId);
 if(!objective)throw Error('Unknown objective.');
 const getMastery=id=>objectiveMastery(attemptsByObjective[id]??[]);
 const unmet=objective.prerequisiteIds.filter(id=>!['secure','mastered'].includes(getMastery(id).level));
 const mastery=getMastery(objectiveId);
 return {
  objectiveId,
  level:mastery.level,
  unmetPrerequisiteIds:unmet,
  suggestedAction:unmet.length?'review-prerequisites'
   :mastery.level==='not-started'?'start-lesson'
   :mastery.level==='developing'||mastery.level==='practising'?'guided-practice'
   :mastery.level==='secure'?'extension-or-revision':'next-objective',
  parentMayOverride:true
 };
}

/** Draft examples are illustrative only and not verified statutory objectives. */
export const progressionExamples=Object.freeze([
 {id:'count-to-ten',statement:'Count objects reliably up to ten.',yearId:'reception',subjectId:'maths',areaId:'number',prerequisiteIds:[],status:'draft',sourceReference:''},
 {id:'add-within-ten',statement:'Combine two small groups and find the total within ten.',yearId:'year-1',subjectId:'maths',areaId:'operations',prerequisiteIds:['count-to-ten'],status:'draft',sourceReference:''},
 {id:'subtract-within-ten',statement:'Find how many remain after taking away within ten.',yearId:'year-1',subjectId:'maths',areaId:'operations',prerequisiteIds:['count-to-ten'],status:'draft',sourceReference:''}
]);
