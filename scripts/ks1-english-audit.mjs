import {ks1EnglishTopics,ks1EnglishLesson} from '../src/ks1English.js';
const topics=ks1EnglishTopics.map(([name])=>{const lesson=ks1EnglishLesson(name,6);return {name,questions:lesson.questions.length,examplePrompt:lesson.questions[0].prompt};});
const domains=[
 {name:'word reading and phonics',topics:['Phonics digraphs','Read and blend words','Common exception words'],gaps:['Systematic phonics progression and oral decoding evidence','Fluency and age-appropriate independent reading']},
 {name:'reading comprehension',topics:['Reading for meaning','Story order and prediction'],gaps:['Reading and discussing whole texts, fiction/non-fiction and poetry','Retrieval, inference and vocabulary in context with varied passages']},
 {name:'spelling and handwriting',topics:['Spelling patterns','Common exception words'],gaps:['Year-specific spelling sequences and dictated sentences','Physical handwriting, letter formation and joining evidence']},
 {name:'composition and grammar',topics:['Sentence punctuation','Nouns verbs adjectives','Joining sentences','Writing and editing'],gaps:['Authentic independent writing and oral rehearsal','Year 1 versus Year 2 grammar/punctuation and editing expectations']},
 {name:'spoken language',topics:[],gaps:['Structured speaking/listening and discussion opportunities','Evidence of oral storytelling, explanations and turn-taking']}
];
const report={stage:'KS1 English',status:'inventory-only-unverified',years:['Year 1','Year 2'],topics,questionTotal:topics.reduce((n,t)=>n+t.questions,0),domains,findings:['Topics are age 5–7 combined, not independently mapped to Year 1 and Year 2 objectives','Questions are multiple-choice prompts; offline reading, spoken language, handwriting and original composition require separate activities','Lesson explanations are generic and do not demonstrate differentiated feedback']};
console.log(JSON.stringify(report,null,2));
