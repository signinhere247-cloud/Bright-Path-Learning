// Supplementary KS1 fractions practice with adult support; no learner data is stored.
export const ks1FractionsActivities=[
 {id:'KS1-FRAC-01',year:1,title:'Find a fair half',focus:'halves of shapes and objects',example:'1 whole split into 2 equal parts',steps:['Fold a paper circle in half.','Check that both parts are equal in size.','Colour one half and name it.','Compare with an unequal fold and explain the difference.'],adultPrompt:'Why must both parts be equal to call one part a half?'},
 {id:'KS1-FRAC-02',year:1,title:'Quarter explorers',focus:'quarters of shapes',example:'1 whole split into 4 equal parts',steps:['Fold a square paper into two equal halves.','Fold again to make four equal parts.','Shade one quarter, then two quarters.','Explain how two quarters compare with one half.'],adultPrompt:'What makes each of the four parts a quarter?'},
 {id:'KS1-FRAC-03',year:2,title:'Fractions of a set',focus:'one half and one quarter of quantities',example:'1/4 of 12 counters = 3 counters',steps:['Count twelve safe counters.','Share them equally into four groups.','Identify one quarter of the total.','Make two equal groups and compare one half with one quarter.'],adultPrompt:'How do equal groups help you find a fraction of an amount?'},
 {id:'KS1-FRAC-04',year:2,title:'Thirds and equivalence',focus:'thirds and equivalent fractions',example:'2/4 = 1/2',steps:['Fold a strip into three equal sections and label one third.','Fold another strip into four equal sections.','Shade two quarters and compare it with one half.','Explain why equal-sized wholes matter when comparing fractions.'],adultPrompt:'How can different fractions represent the same amount?'}
];
export function ks1FractionsActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1FractionsActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown fractions activity for year.');
 return {...a,steps:[...a.steps],safety:'Supervise folding and counters; offer pre-folded shapes or accessible visual models.',masteryVerified:false,reviewRequired:true};
}
