// Adult-supported KS1 data activities; no personal or child data is collected.
export const ks1StatisticsActivities=[
 {id:'KS1-DATA-01',year:1,title:'Sort and count',focus:'sorting by properties',materials:['mixed colour counters','sorting hoops or paper circles'],steps:['Sort counters by colour or shape.','Count the items in each group.','Record totals using marks or numerals.','Explain which group has more and which has fewer.'],adultPrompt:'How could you sort the same objects in a different way?'},
 {id:'KS1-DATA-02',year:1,title:'Our toy picture chart',focus:'simple pictograms',materials:['toy picture cards','paper chart'],steps:['Choose three kinds of toys to count.','Place one picture for each toy in a column.','Compare the column heights.','Answer which type has the most and how many more it has.'],adultPrompt:'Why must every picture stand for the same number of toys?'},
 {id:'KS1-DATA-03',year:2,title:'Tally and compare',focus:'tally charts and tables',materials:['paper tally table','collection of safe objects'],steps:['Sort objects into four named categories.','Make one tally mark for each object.','Group tallies in fives and record totals in a table.','Compare categories using more, fewer and difference.'],adultPrompt:'How can you check that your tally and total agree?'},
 {id:'KS1-DATA-04',year:2,title:'Read a pictogram',focus:'pictograms with keys',materials:['prepared pictogram','pencil and paper'],steps:['Read the chart title and key: one symbol represents two items.','Count symbols to find each category total.','Answer questions about the largest, smallest and difference.','Explain why two symbols mean four items.'],adultPrompt:'How would the totals change if the key meant one item instead of two?'}
];
export function ks1StatisticsActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1StatisticsActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown statistics activity for year.');
 return {...a,materials:[...a.materials],steps:[...a.steps],privacy:'Use anonymous objects or fictional examples, not identifiable child information.',masteryVerified:false,reviewRequired:true};
}
