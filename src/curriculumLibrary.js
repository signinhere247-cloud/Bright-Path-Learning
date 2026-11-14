/**
 * Stage 2 Step 3: Curriculum library hierarchy and validation.
 * Pure functions: safe to use from browser UI, parent dashboard and tests.
 * Catalogue records are authoring scaffolds; an empty topic is NOT a lesson.
 */
import {findLearningYear,findCurriculumSubject,availableSubjectsForYear} from './curriculumCatalogue.js';

const idPattern=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedLessonStatuses=new Set(['draft','reviewed','verified']);
const allowedLessonKinds=new Set(['teaching','practice','revision','assessment']);

function assertId(value,label){
 if(typeof value!=='string'||!idPattern.test(value))throw Error('Invalid '+label+'.');
 return value;
}
function assertTitle(value,label){
 if(typeof value!=='string'||!value.trim()||value.length>180)throw Error('Invalid '+label+'.');
 return value.trim();
}
function assertUniqueIds(items,label){
 const ids=new Set();
 for(const item of items){
  if(ids.has(item.id))throw Error('Duplicate '+label+' ID: '+item.id);
  ids.add(item.id);
 }
}
function assertReferences(ids,known,label){
 if(!Array.isArray(ids)||!ids.every(id=>typeof id==='string'&&known.has(id)))throw Error('Unknown '+label+' reference.');
 if(new Set(ids).size!==ids.length)throw Error('Duplicate '+label+' reference.');
}

/** Validate a topic with explicitly ordered lessons; never invent lesson content. */
export function validateCurriculumLibrary(library){
 if(!library||typeof library!=='object'||Array.isArray(library))throw Error('Invalid curriculum library.');
 const {topics,lessons,objectives,questions}=library;
 for(const [name,records] of Object.entries({topics,lessons,objectives,questions})){
  if(!Array.isArray(records))throw Error(name+' must be an array.');
  for(const record of records){
   if(!record||typeof record!=='object'||Array.isArray(record))throw Error('Invalid '+name+' record.');
   assertId(record.id,name+' ID');
  }
  assertUniqueIds(records,name);
 }
 const topicIds=new Set(topics.map(x=>x.id));
 const lessonIds=new Set(lessons.map(x=>x.id));
 const objectiveIds=new Set(objectives.map(x=>x.id));
 const questionIds=new Set(questions.map(x=>x.id));
 for(const topic of topics){
  assertTitle(topic.title,'topic title');
  const year=findLearningYear(topic.yearId);
  const subject=findCurriculumSubject(topic.subjectId);
  if(!year||!subject||!subject.stages.includes(year.stage))throw Error('Topic has invalid year/subject.');
  if(!subject.areas.some(area=>area.id===topic.areaId))throw Error('Unknown subject strand.');
  assertReferences(topic.objectiveIds,objectiveIds,'objective');
  assertReferences(topic.lessonIds,lessonIds,'lesson');
  for(const id of topic.lessonIds){
   const lesson=lessons.find(item=>item.id===id);
   if(lesson.topicId!==topic.id)throw Error('Lesson belongs to a different topic.');
  }
 }
 for(const lesson of lessons){
  assertTitle(lesson.title,'lesson title');
  if(!topicIds.has(lesson.topicId))throw Error('Lesson topic does not exist.');
  if(!allowedLessonKinds.has(lesson.kind))throw Error('Unknown lesson kind.');
  if(!allowedLessonStatuses.has(lesson.status))throw Error('Unknown lesson status.');
  assertReferences(lesson.objectiveIds,objectiveIds,'objective');
  assertReferences(lesson.questionIds,questionIds,'question');
  if(!Number.isInteger(lesson.estimatedMinutes)||lesson.estimatedMinutes<1||lesson.estimatedMinutes>180)throw Error('Invalid lesson duration.');
  const topic=topics.find(item=>item.id===lesson.topicId);
  if(!topic.lessonIds.includes(lesson.id))throw Error('Unlisted lesson.');
  for(const id of lesson.questionIds){
   if(questions.find(q=>q.id===id).lessonId!==lesson.id)throw Error('Question belongs to a different lesson.');
  }
 }
 for(const objective of objectives){
  assertTitle(objective.statement,'objective statement');
  if(!allowedLessonStatuses.has(objective.status))throw Error('Invalid objective status.');
  if(typeof objective.sourceReference!=='string')throw Error('Objective source reference required (empty if not verified).');
 }
 for(const question of questions){
  if(!lessonIds.has(question.lessonId))throw Error('Question lesson does not exist.');
  assertTitle(question.prompt,'question prompt');
  if(typeof question.answer!=='string'||!question.answer.trim())throw Error('Invalid question answer.');
  if(!Array.isArray(question.options)||question.options.length<2||!question.options.includes(question.answer)||new Set(question.options).size!==question.options.length)throw Error('Invalid question options.');
  if(typeof question.explanation!=='string'||!question.explanation.trim())throw Error('Question explanation required.');
  const lesson=lessons.find(item=>item.id===question.lessonId);
  if(!lesson.questionIds.includes(question.id))throw Error('Unlisted question.');
 }
 return true;
}

export function createEmptyCurriculumLibrary(){
 return {topics:[],lessons:[],objectives:[],questions:[]};
}

/** The navigation tree only displays real, explicitly authored records. */
export function buildCurriculumNavigation(library,{yearId=null,subjectId=null,includeDrafts=false}={}){
 validateCurriculumLibrary(library);
 const years=yearId?[findLearningYear(yearId)]:undefined;
 if(yearId&&!years[0])throw Error('Unknown year.');
 if(subjectId&&!findCurriculumSubject(subjectId))throw Error('Unknown subject.');
 const yearRecords=years??[
  'nursery','reception',...Array.from({length:11},(_,i)=>'year-'+(i+1))
 ].map(findLearningYear);
 return yearRecords.map(year=>({
  id:year.id,label:year.label,stageId:year.stage,
  subjects:availableSubjectsForYear(year.id)
   .filter(subject=>!subjectId||subject.id===subjectId)
   .map(subject=>({
    id:subject.id,label:subject.name,
    areas:subject.areas.map(area=>({
     id:area.id,label:area.label,
     topics:library.topics.filter(topic=>topic.yearId===year.id&&topic.subjectId===subject.id&&topic.areaId===area.id)
      .map(topic=>({
       id:topic.id,title:topic.title,
       lessons:topic.lessonIds.map(id=>library.lessons.find(lesson=>lesson.id===id))
        .filter(lesson=>includeDrafts||lesson.status==='verified')
        .map(lesson=>({
         id:lesson.id,title:lesson.title,kind:lesson.kind,status:lesson.status,
         estimatedMinutes:lesson.estimatedMinutes,questionCount:lesson.questionIds.length
        }))
      }))
    })).filter(area=>area.topics.length>0)
   })).filter(subject=>subject.areas.length>0)
 })).filter(year=>year.subjects.length>0);
}

/** Counts are derived from real content, not planned subject strands. */
export function curriculumCoverage(library){
 validateCurriculumLibrary(library);
 return {
  topics:library.topics.length,
  lessons:library.lessons.length,
  verifiedLessons:library.lessons.filter(lesson=>lesson.status==='verified').length,
  questions:library.questions.length,
  objectives:library.objectives.length
 };
}
