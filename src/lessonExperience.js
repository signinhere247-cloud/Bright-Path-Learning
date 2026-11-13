/** Accessible, reassuring lesson feedback with a single next action. */
export function lessonStepProgress(index,total){
 if(!Number.isInteger(index)||!Number.isInteger(total)||total<1||index<0||index>=total)throw Error('Invalid lesson step.');
 return {current:index+1,total,percent:Math.round(index/total*100),label:'Question '+(index+1)+' of '+total};
}
export function lessonAnswerFeedback(correct,isLast){
 return {heading:correct?'Correct! Great work. 🌟':'Good try! Keep learning. 💛',
 nextLabel:isLast?'See my results':'Next question →'};
}
