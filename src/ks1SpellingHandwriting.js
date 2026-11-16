// Adult-supported KS1 spelling and handwriting tasks; no written samples are stored.
export const ks1SpellingHandwritingActivities=[
 {id:'KS1-SPELL-01',year:1,title:'Hear, say, spell',focus:'consonant digraphs',words:['ship','chat','thin','ring'],steps:['Say each word slowly.','Identify the sound made by two letters.','Arrange or write the letters.','Read the completed word aloud.'],physicalCheck:'Check comfortable grip and clearly formed lower-case letters.'},
 {id:'KS1-SPELL-02',year:1,title:'Letters and spaces',focus:'letter formation and spacing',words:['sun','fish','shop','rain'],steps:['Warm up hands with gentle finger movements.','Trace letters in the air or on paper.','Write each word with clear letter shapes.','Write a short sentence leaving spaces between words.'],physicalCheck:'Notice letter direction, baseline and spaces without demanding speed.'},
 {id:'KS1-SPELL-03',year:2,title:'Suffix detectives',focus:'-ed, -ing, -er, -est',words:['jumped','jumping','quicker','quickest'],steps:['Read the base word and ending.','Explain how the ending changes meaning.','Write each word in a sentence.','Check the spelling against the model.'],physicalCheck:'Support consistent letter size and legibility.'},
 {id:'KS1-SPELL-04',year:2,title:'Spell and edit a note',focus:'common exception words and proofreading',words:['because','people','could','would'],steps:['Say and read each target word.','Look closely at any unexpected spelling.','Write a short friendly note using two target words.','Reread, check spellings and revise with an adult.'],physicalCheck:'Encourage comfortable writing position and readable spacing.'}
];
export function ks1SpellingHandwritingActivity(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const a=ks1SpellingHandwritingActivities.find(x=>x.id===id&&x.year===year);
 if(!a)throw Error('Unknown spelling and handwriting activity for year.');
 return {...a,words:[...a.words],steps:[...a.steps],adultPrompt:'Model each word, give specific encouragement, and allow suitable writing adaptations.',physicalSkillVerified:false,reviewRequired:true};
}
