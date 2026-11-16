import {ks1MathsTopics,ks1MathsLesson} from '../src/ks1Maths.js';
const topics=ks1MathsTopics.map(([name])=>{const lesson=ks1MathsLesson(name,6);return {name,questions:lesson.questions.length,examplePrompt:lesson.questions[0].prompt};});
const domains=[
 {name:'number and place value',topics:['Counting and sequences','Place value'],gaps:['Counting, comparing and representing numbers with concrete materials','Separate Year 1 numbers to 100 and Year 2 place-value expectations']},
 {name:'addition and subtraction',topics:['Addition','Subtraction','Word problems'],gaps:['Number bonds, missing numbers and mental strategies','Practical problem solving, explanations and inverse relationships']},
 {name:'multiplication and division',topics:['Multiplication','Division and sharing'],gaps:['Arrays and repeated addition with real objects','Year 2 multiplication/division facts and reasoning']},
 {name:'fractions',topics:['Simple fractions'],gaps:['Year-specific halves, quarters and thirds with concrete shapes and quantities','Equivalent fractions and practical reasoning']},
 {name:'measurement',topics:['Money','Time and measures'],gaps:['Length, mass, capacity, temperature and comparison using equipment','Year 1 and Year 2 time progression and real coin handling']},
 {name:'geometry and statistics',topics:['Shapes and position'],gaps:['Position, direction and movement with physical shapes','Year 2 pictograms, tally charts and tables']}
];
const report={stage:'KS1 Mathematics',status:'inventory-only-unverified',years:['Year 1','Year 2'],topics,questionTotal:topics.reduce((n,t)=>n+t.questions,0),domains,findings:['Existing practice uses age 5–7 combined topics rather than statutory Year 1/Year 2 objective maps','Ten generated multiple-choice questions per topic do not establish fluency, reasoning or mastery','Practical measurement, manipulatives, data handling and spoken mathematical explanations require expansion']};
console.log(JSON.stringify(report,null,2));
