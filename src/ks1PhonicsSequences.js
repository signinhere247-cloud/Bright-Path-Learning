// Supplementary adult-supported KS1 phonics practice. No attainment claims.
export const ks1PhonicsSequences=Object.freeze([
 {id:'KS1-PHON-01',year:1,title:'Hear and spot digraphs',focus:'sh, ch, th, ng',words:['ship','chip','thin','ring'],steps:['Say each word aloud slowly.','Ask the child to identify the two-letter sound.','Point to the letters while saying the sound.','Blend the sounds back into the whole word.'],adultPrompt:'Which letters work together to make that sound?'},
 {id:'KS1-PHON-02',year:1,title:'Blend vowel teams',focus:'ai, ee, oa, igh',words:['rain','feet','boat','night'],steps:['Show the written word.','Say each phoneme in order.','Blend smoothly into the word.','Read the word in a short spoken sentence.'],adultPrompt:'Can you stretch the sounds and then say the word?'},
 {id:'KS1-PHON-03',year:2,title:'Read longer words',focus:'syllables and familiar graphemes',words:['sunshine','raincoat','farmyard','bedroom'],steps:['Find the smaller word parts.','Read each part using known sounds.','Blend the parts into the whole word.','Explain the word in a sentence.'],adultPrompt:'Which smaller parts can you read first?'},
 {id:'KS1-PHON-04',year:2,title:'Choose a spelling pattern',focus:'ai/ay, ee/ea, oa/ow',words:['play','beach','snow','train'],steps:['Say the target word clearly.','Notice the vowel sound.','Compare two possible grapheme spellings.','Write or arrange the letters and check together.'],adultPrompt:'What other word uses a similar spelling pattern?'}
]);
export function ks1PhonicsSequence(id,year){
 if(!Number.isInteger(year)||![1,2].includes(year))throw Error('Year must be 1 or 2.');
 const activity=ks1PhonicsSequences.find(x=>x.id===id&&x.year===year);
 if(!activity)throw Error('Unknown phonics sequence for year.');
 return {...activity,words:[...activity.words],steps:[...activity.steps],reviewRequired:true,masteryVerified:false};
}
