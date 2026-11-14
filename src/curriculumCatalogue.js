/**
 * BrightPath curriculum catalogue — Stage 2, Step 1.
 *
 * Structural foundation only. These are planned subject pathways, NOT a claim
 * that lessons or statutory learning objectives have been authored or verified.
 * England is the initial curriculum jurisdiction. Other UK nations require
 * separately researched and validated curricula.
 *
 * Age is a guide, not a placement decision. A parent can choose another level.
 */
export const CURRICULUM_SCHEMA_VERSION = 1;

export const curriculumJurisdictions = Object.freeze([
 {id:'england',name:'England',status:'foundation'},
 {id:'wales',name:'Wales',status:'planned'},
 {id:'scotland',name:'Scotland',status:'planned'},
 {id:'northern-ireland',name:'Northern Ireland',status:'planned'}
]);

export const learningStages = Object.freeze([
 {id:'eyfs',label:'Early Years Foundation Stage',years:['nursery','reception'],ages:[3,5]},
 {id:'ks1',label:'Key Stage 1',years:['year-1','year-2'],ages:[5,7]},
 {id:'ks2',label:'Key Stage 2',years:['year-3','year-4','year-5','year-6'],ages:[7,11]},
 {id:'ks3',label:'Key Stage 3',years:['year-7','year-8','year-9'],ages:[11,14]},
 {id:'ks4',label:'Key Stage 4 / GCSE preparation',years:['year-10','year-11'],ages:[14,16]}
]);

export const learningYears = Object.freeze([
 {id:'nursery',label:'Nursery',stage:'eyfs',typicalAges:[3,4]},
 {id:'reception',label:'Reception',stage:'eyfs',typicalAges:[4,5]},
 ...Array.from({length:11},(_,index)=>{
  const year=index+1;
  return {id:`year-${year}`,label:`Year ${year}`,stage:year<=2?'ks1':year<=6?'ks2':year<=9?'ks3':'ks4',typicalAges:[year+4,year+5]};
 })
]);

const subject = (id,name,stages,areas)=>({
 id,name,stages,areas:areas.map(([areaId,label])=>({id:areaId,label}))
});

/** Subject/strand inventory for authoring. Each strand still needs year-level mapping. */
export const curriculumSubjects = Object.freeze([
 subject('english','English',['eyfs','ks1','ks2','ks3','ks4'],[
  ['phonics','Phonics and early reading'],['reading','Reading comprehension'],['literature','Literature and texts'],
  ['spelling','Spelling and vocabulary'],['grammar','Grammar and punctuation'],['writing','Writing and composition'],
  ['speaking','Speaking and listening']
 ]),
 subject('maths','Mathematics',['eyfs','ks1','ks2','ks3','ks4'],[
  ['number','Number and place value'],['operations','Calculation and operations'],['fractions','Fractions, decimals and percentages'],
  ['ratio','Ratio and proportion'],['algebra','Algebra'],['measurement','Measurement'],
  ['geometry','Geometry and spatial reasoning'],['statistics','Statistics and probability']
 ]),
 subject('science','Science',['eyfs','ks1','ks2','ks3','ks4'],[
  ['scientific-enquiry','Working scientifically'],['biology','Biology and living systems'],
  ['chemistry','Chemistry and materials'],['physics','Physics and forces'],['earth-space','Earth and space']
 ]),
 subject('history','History',['ks1','ks2','ks3'],[
  ['chronology','Chronology'],['british-history','British history'],['world-history','World history'],
  ['historical-enquiry','Historical enquiry']
 ]),
 subject('geography','Geography',['ks1','ks2','ks3'],[
  ['places','Places and location'],['physical','Physical geography'],['human','Human geography'],
  ['fieldwork','Geographical skills and fieldwork']
 ]),
 subject('computing','Computing',['ks1','ks2','ks3','ks4'],[
  ['algorithms','Algorithms and programming'],['data','Data and information'],
  ['systems','Computer systems and networks'],['digital-literacy','Digital literacy and online safety']
 ]),
 subject('art-design','Art and Design',['ks1','ks2','ks3'],[
  ['making','Creating and making'],['techniques','Materials and techniques'],['artists','Artists and evaluation']
 ]),
 subject('music','Music',['ks1','ks2','ks3'],[
  ['performing','Singing and performing'],['listening','Listening and appreciation'],['composing','Composing and notation']
 ]),
 subject('design-technology','Design and Technology',['ks1','ks2','ks3'],[
  ['design','Design and evaluate'],['make','Make and use tools'],['food','Cooking and nutrition']
 ]),
 subject('languages','Languages',['ks2','ks3'],[
  ['listening','Listening'],['speaking','Speaking'],['reading','Reading'],['writing','Writing'],['culture','Language and culture']
 ]),
 subject('physical-education','Physical Education',['ks1','ks2','ks3','ks4'],[
  ['movement','Movement and coordination'],['fitness','Health and fitness'],['games','Games and teamwork']
 ]),
 subject('religious-education','Religious Education',['ks1','ks2','ks3','ks4'],[
  ['beliefs','Beliefs and worldviews'],['practices','Practices and traditions'],['reflection','Reflection and respect']
 ]),
 subject('relationships-health','Relationships, Health and Wellbeing',['ks1','ks2','ks3','ks4'],[
  ['relationships','Healthy relationships'],['safety','Personal and online safety'],['wellbeing','Physical and emotional wellbeing']
 ]),
 subject('early-development','Early Years Development',['eyfs'],[
  ['communication','Communication and language'],['physical','Physical development'],
  ['personal-social','Personal, social and emotional development'],
  ['literacy','Early literacy'],['mathematics','Early mathematics'],
  ['understanding-world','Understanding the world'],['expressive-arts','Expressive arts and design']
 ])
]);

/**
 * Future content record contracts (no fabricated content or coverage claims):
 * Topic: {id, jurisdiction, yearId, subjectId, areaId, title, objectiveIds, lessonIds}
 * Objective: {id, statement, sourceReference, curriculumStatus}
 * Lesson: {id, topicId, title, objectives, activities, questionIds, estimatedMinutes}
 * Question: {id, lessonId, prompt, answer, options, explanation, difficulty}
 * Assessment: {id, topicId, questionIds, masteryThreshold}
 *
 * Curriculum status: draft | reviewed | verified.
 */
export const curriculumRecordTypes = Object.freeze([
 'topic','objective','lesson','question','assessment'
]);

export function findLearningYear(yearId){
 return learningYears.find(year=>year.id===yearId) ?? null;
}
export function findCurriculumSubject(subjectId){
 return curriculumSubjects.find(subject=>subject.id===subjectId) ?? null;
}
export function curriculumStageForYear(yearId){
 const year=findLearningYear(yearId);
 return year ? learningStages.find(stage=>stage.id===year.stage) ?? null : null;
}
export function availableSubjectsForYear(yearId){
 const year=findLearningYear(yearId);
 return year ? curriculumSubjects.filter(item=>item.stages.includes(year.stage)) : [];
}
