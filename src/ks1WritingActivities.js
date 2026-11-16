// Adult-supported KS1 writing prompts; completed writing is not stored or graded.
export const ks1WritingActivities=[
 {id:'KS1-WRITE-01',year:1,title:'Say it, write it',focus:'oral rehearsal and simple sentences',prompt:'Write a sentence about an animal you like.',steps:['Say your sentence aloud to an adult.','Count the words on your fingers.','Write the sentence with spaces between words.','Check the capital letter and full stop.'],checklist:['capital letter','word spaces','full stop']},
 {id:'KS1-WRITE-02',year:1,title:'Describe a place',focus:'adjectives and handwriting',prompt:'Describe a garden, playground or favourite place in two sentences.',steps:['Look closely or imagine the place.','Say two describing words.','Write two clear sentences.','Read them aloud and check letter formation with an adult.'],checklist:['describing words','sentence punctuation','readable letter shapes']},
 {id:'KS1-WRITE-03',year:2,title:'Write a short story',focus:'sequence and expanded noun phrases',prompt:'Write a story about finding a mysterious box.',steps:['Plan a beginning, middle and end.','Tell the story aloud before writing.','Write at least three connected sentences.','Reread and improve one description.'],checklist:['clear sequence','expanded noun phrase','capital letters and end punctuation']},
 {id:'KS1-WRITE-04',year:2,title:'Write instructions',focus:'purpose, order and editing',prompt:'Explain how to plant a seed or make a sandwich.',steps:['List the materials or ingredients.','Use time words such as first, next and finally.','Write each step in order.','Ask an adult to follow your instructions and revise anything unclear.'],checklist:['ordered steps','clear verbs','revised for clarity']}
];
export function ks1WritingActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1WritingActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown writing activity for year.');
 return {...a,steps:[...a.steps],checklist:[...a.checklist],adultSupport:'Encourage original writing and provide supportive, specific feedback.',assessed:false,reviewRequired:true};
}
