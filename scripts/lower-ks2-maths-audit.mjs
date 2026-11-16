import {mathsQuestions,learningBand} from '../src/curriculum.js';
import {ks1MathsTopics} from '../src/ks1Maths.js';
const topicNames=['Counting','Addition','Subtraction','Multiplication','Division','Fractions','Percentages','Algebra'];
export const lowerKs2MathsDomains=[
 {name:'number and place value',topics:['Counting'],gaps:['Year 3/4 place value across larger numbers','Rounding, negative numbers in context and Roman numerals where required']},
 {name:'addition and subtraction',topics:['Addition','Subtraction'],gaps:['Written column methods and mental strategies','Estimating, checking and multi-step problems']},
 {name:'multiplication and division',topics:['Multiplication','Division'],gaps:['Year 3/4 times-table progression and recall','Written methods, remainders and problem-solving']},
 {name:'fractions',topics:['Fractions'],gaps:['Equivalent fractions, comparing and ordering','Adding/subtracting fractions with same denominator and fractions of amounts']},
 {name:'measurement',topics:[],gaps:['Length, mass, volume/capacity and perimeter','Time, money and converting between units']},
 {name:'geometry',topics:[],gaps:['Properties of 2D/3D shapes and angles','Horizontal/vertical, parallel/perpendicular and position']},
 {name:'statistics',topics:[],gaps:['Interpret and present data in tables, charts and graphs','Solve comparison, sum and difference questions']},
 {name:'mathematical reasoning',topics:[],gaps:['Explain methods, prove and investigate patterns','Authentic multi-step contextual problems']}
];
export function auditLowerKs2Maths(){
 const topics=topicNames.map(name=>{
  const y3=mathsQuestions(name,8,20),y4=mathsQuestions(name,9,20);
  const valid=set=>set.every(q=>typeof q.prompt==='string'&&q.prompt.length>0&&typeof q.answer==='string'&&q.options.length===3&&new Set(q.options).size===3&&q.options.includes(q.answer));
  return {name,year3Questions:y3.length,year4Questions:y4.length,year3OptionsValid:valid(y3),year4OptionsValid:valid(y4),exampleYear3Prompt:y3[0].prompt,sharedPrimaryAgeBand:learningBand(8)===learningBand(9)};
 });
 return {stage:'Lower KS2 Mathematics',status:'inventory-only-unverified',years:['Year 3','Year 4'],
  dedicatedLowerKs2MathsModuleFound:false,sourceModules:['src/curriculum.js','src/ks1Maths.js'],
  existingKs1Topics:ks1MathsTopics.length,topics,domains:lowerKs2MathsDomains,
  year3QuestionTotal:topics.reduce((n,t)=>n+t.year3Questions,0),year4QuestionTotal:topics.reduce((n,t)=>n+t.year4Questions,0),
  findings:['General mathsQuestions generator supplies eight broad topics to all age bands','Ages 8 and 9 use the same primary band and the same broad question-generation rules, not separate Year 3/4 statutory sequences','KS1 maths module is explicitly for ages 5–7 and is not Lower KS2 coverage','Percentages and algebra appear in the generic topic generator but do not replace Year 3/4 statutory domains','Measurement, geometry, statistics and reasoning lack dedicated Lower KS2 module identified in src inventory','Question counts and valid multiple-choice options do not prove curriculum coverage, progression or learner mastery'],
  educatorVerified:false,statutoryObjectiveCoverageVerified:false};
}
if(process.argv[1]&&import.meta.url===new URL('file://'+process.argv[1]).href)console.log(JSON.stringify(auditLowerKs2Maths(),null,2));
