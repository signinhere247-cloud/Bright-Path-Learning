// Adult-supported KS1 addition/subtraction practice; no learner data is recorded.
export const ks1AdditionSubtractionActivities=[
 {id:'KS1-CALC-01',year:1,title:'Make ten in different ways',focus:'number bonds to ten',example:'6 + 4 = 10',steps:['Place ten counters in a row.','Split the counters into two groups.','Say and write the matching addition sentence.','Find another pair and explain how you know the total stays ten.'],adultPrompt:'What changes and what stays the same when you move one counter?'},
 {id:'KS1-CALC-02',year:1,title:'Find the missing part',focus:'subtraction and missing numbers',example:'8 - ? = 5',steps:['Show eight objects.','Cover or remove some so five remain.','Count the hidden or removed objects.','Write and check the missing-number equation.'],adultPrompt:'How could addition help you check your subtraction?'},
 {id:'KS1-CALC-03',year:2,title:'Two ways to add',focus:'partitioning and mental strategies',example:'27 + 15 = 42',steps:['Represent 27 and 15 with tens and ones.','Combine tens, then ones, regrouping if needed.','Try another method such as bridging through ten.','Compare methods and explain why both give 42.'],adultPrompt:'Which method made the calculation easier, and why?'},
 {id:'KS1-CALC-04',year:2,title:'Solve a real-life change problem',focus:'subtraction, checking and reasoning',example:'There are 34 tickets; 18 are sold. 16 remain.',steps:['Read the problem and identify what is known.','Model 34 minus 18 using tens and ones or a number line.','Explain the steps and record the answer with units.','Check by adding 18 and 16 to make 34.'],adultPrompt:'How can you prove the answer is reasonable?'}
];
export function ks1AdditionSubtractionActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1AdditionSubtractionActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown addition/subtraction activity for year.');
 return {...a,steps:[...a.steps],adultSupport:'Offer counters, visual number lines, spoken explanations and accessible alternatives.',masteryVerified:false,reviewRequired:true};
}
