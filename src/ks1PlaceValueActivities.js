// Adult-supported KS1 maths activities. No learner results are collected.
export const ks1PlaceValueActivities=[
 {id:'KS1-NUM-01',year:1,title:'Count and match',focus:'counting objects to 20',materials:['20 small safe counters','number cards'],steps:['Arrange a small group of counters.','Count each counter once aloud.','Match the group to a number card.','Rearrange and recount to check the total.'],adultPrompt:'How do you know you counted every object once?'},
 {id:'KS1-NUM-02',year:1,title:'Tens and ones bundles',focus:'representing numbers to 100',materials:['bundles of ten sticks','single sticks'],steps:['Make one bundle of ten.','Add single sticks to show a teen number.','Build another two-digit number with bundles and singles.','Say how many tens and ones it contains.'],adultPrompt:'What changes when we add another ten?'},
 {id:'KS1-NUM-03',year:2,title:'Build, compare and order',focus:'place value to 100',materials:['tens and ones blocks','number cards'],steps:['Build two different two-digit numbers.','Explain the value of each digit.','Compare the tens before the ones.','Order three numbers from smallest to largest.'],adultPrompt:'Why is the number with more tens greater?'},
 {id:'KS1-NUM-04',year:2,title:'Number line detectives',focus:'estimate, partition and reason',materials:['number line 0–100','number cards'],steps:['Mark 0, 50 and 100 on a number line.','Estimate where a given number belongs.','Partition the number into tens and ones.','Explain and check the position with a partner.'],adultPrompt:'How can tens and ones help you find the position?'}
];
export function ks1PlaceValueActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1PlaceValueActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown place value activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],safety:'Use age-appropriate materials; supervise small objects and offer accessible alternatives.',masteryVerified:false,reviewRequired:true};
}
