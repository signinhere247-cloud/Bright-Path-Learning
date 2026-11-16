import {expandedFacts,expandedFactQuestions} from '../src/expandedFacts.js';
import {ks1EnglishTopics} from '../src/ks1English.js';

export const lowerKs2EnglishDomains=[
 {name:'word reading and fluency',topics:['Reading'],gaps:['Year 3/4 fluent independent reading and oral reading evidence','Whole texts, poetry and reading aloud']},
 {name:'comprehension and vocabulary',topics:['Reading','Vocabulary'],gaps:['Inference, evidence and retrieval from age-appropriate texts','Discussion of fiction, nonfiction and poetry']},
 {name:'spelling and handwriting',topics:['Spelling'],gaps:['Year 3/4 statutory spelling patterns and word lists','Joined handwriting and real writing samples']},
 {name:'grammar and punctuation',topics:['Grammar','Punctuation'],gaps:['Year 3/4 grammar terminology and sentence construction progression','Applying punctuation in original writing']},
 {name:'composition and editing',topics:[],gaps:['Planning, drafting, revising and evaluating authentic texts','Different audiences, genres and purposes']},
 {name:'spoken language',topics:[],gaps:['Structured presentations, discussion, listening and performance evidence']}
];
export function auditLowerKs2English(){
 const topics=['Spelling','Grammar','Punctuation','Vocabulary','Reading'].map(name=>{
  const year3=expandedFactQuestions(name,8),year4=expandedFactQuestions(name,9);
  return {name,year3Questions:year3.length,year4Questions:year4.length,examplePrompt:year3[0]?.prompt??null,sharedPrimaryAgeBand:true};
 });
 return {stage:'Lower KS2 English',status:'inventory-only-unverified',years:['Year 3','Year 4'],
  dedicatedLowerKs2EnglishModuleFound:false,
  sourceModules:['src/expandedFacts.js','src/curriculum.js','src/ks1English.js'],
  ks1TopicCount:ks1EnglishTopics.length,
  topics,domains:lowerKs2EnglishDomains,
  year3QuestionTotal:topics.reduce((n,t)=>n+t.year3Questions,0),
  year4QuestionTotal:topics.reduce((n,t)=>n+t.year4Questions,0),
  findings:['English facts are shared across primary ages 7–10, not independently Year 3/4 sequenced','KS1 English bank is for Years 1–2 and is not evidence of Lower KS2 coverage','Multiple-choice question counts do not establish statutory objective coverage, reading fluency or original composition','Educator review, authentic writing, text study, spoken language and live integration remain unverified'],
  educatorVerified:false,statutoryObjectiveCoverageVerified:false};
}
if(process.argv[1]&&import.meta.url===new URL('file://'+process.argv[1]).href)console.log(JSON.stringify(auditLowerKs2English(),null,2));
