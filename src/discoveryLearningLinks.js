/** Learning subjects connected to each village discovery. Pure presentation data. */
export const DISCOVERY_LEARNING_LINKS=Object.freeze({
 pond:'Science',garden:'Science',observatory:'Science',woodland:'Science',
 weather:'Geography',numbers:'Maths'
});
export function discoveryLearningLink(id,subjects){
 const subject=DISCOVERY_LEARNING_LINKS[id];
 if(!subject||!Array.isArray(subjects)||!subjects.includes(subject))return null;
 return {subject,label:'📚 Explore '+subject+' lessons',detail:'Keep learning about ideas you discovered in the village.'};
}
