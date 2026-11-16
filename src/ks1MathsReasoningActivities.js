// Adult-supported KS1 maths reasoning activities; no learner responses stored.
export const ks1MathsReasoningActivities=[
 {id:'KS1-REASON-01',year:1,title:'Which way works?',focus:'choosing a strategy',problem:'You have 7 blocks and get 5 more. How many now?',expected:'12',steps:['Act out the problem with blocks.','Try counting on from seven.','Compare the two strategies.','Explain how you know the answer is correct.'],adultPrompt:'Which strategy was easier for you and why?'},
 {id:'KS1-REASON-02',year:1,title:'Spot the mistake',focus:'reasoning and checking',problem:'A character says 9 - 4 = 6. Is that right?',expected:'No; 9 - 4 = 5',steps:['Read the character’s claim.','Model nine counters and take away four.','Explain what was wrong with the claim.','Check the result using five plus four.'],adultPrompt:'How could you convince someone your answer is right?'},
 {id:'KS1-REASON-03',year:2,title:'Two-step shop problem',focus:'multi-step word problems',problem:'A book costs 12p and a pencil costs 8p. You pay 30p. How much change?',expected:'10p',steps:['Identify the two costs and money paid.','Add the costs to find the total price.','Subtract the total from the amount paid.','Check by adding the change back to the price.'],adultPrompt:'Why do you need two calculations rather than one?'},
 {id:'KS1-REASON-04',year:2,title:'Prove the pattern',focus:'generalising and explaining',problem:'The pattern is 5, 10, 15, 20. What are the next two numbers?',expected:'25, 30',steps:['Represent the pattern on a number line.','Describe what changes between terms.','Predict the next two numbers.','Explain and test the rule with another example.'],adultPrompt:'How can you show your rule will keep working?'}
];
export function ks1MathsReasoningActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1MathsReasoningActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown maths reasoning activity for year.');
 return {...a,steps:[...a.steps],adultSupport:'Invite multiple explanations and allow counters, drawings or spoken answers.',masteryVerified:false,reviewRequired:true};
}
