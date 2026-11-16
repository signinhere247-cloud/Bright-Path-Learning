// Supplementary adult-supported KS1 multiplication/division; no assessment data stored.
export const ks1MultiplicationDivisionActivities=[
 {id:'KS1-MULT-01',year:1,title:'Make equal groups',focus:'equal grouping and counting',example:'3 groups of 2 = 6',steps:['Collect six safe counters.','Arrange them into three groups with two in each.','Count each group and the total.','Change the arrangement and explain which groups are equal.'],adultPrompt:'How can you tell that every group has the same number?'},
 {id:'KS1-MULT-02',year:1,title:'Share fairly',focus:'equal sharing',example:'8 shared between 2 = 4 each',steps:['Start with eight counters and two bowls.','Place one counter in each bowl in turn.','Count how many each bowl contains.','Explain how you checked the sharing was fair.'],adultPrompt:'What would happen if one bowl had more?'},
 {id:'KS1-MULT-03',year:2,title:'Arrays and repeated addition',focus:'multiplication as equal groups',example:'3 rows of 4 = 4 + 4 + 4 = 12',steps:['Build three rows with four counters in each.','Record the repeated addition sentence.','Write the matching multiplication sentence.','Rotate the array and discuss what stays the same.'],adultPrompt:'Why does turning the array not change the total?'},
 {id:'KS1-MULT-04',year:2,title:'Divide into equal groups',focus:'division and inverse checking',example:'15 ÷ 5 = 3',steps:['Make a collection of fifteen counters.','Split them into five equal groups.','Count the counters in each group.','Check the result by multiplying five groups of three.'],adultPrompt:'How does multiplication help you check the division?'}
];
export function ks1MultiplicationDivisionActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1MultiplicationDivisionActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown multiplication/division activity for year.');
 return {...a,steps:[...a.steps],safety:'Supervise counters and use larger objects or digital manipulatives where small items are unsuitable.',masteryVerified:false,reviewRequired:true};
}
