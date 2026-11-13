/** Constructive, age-neutral feedback that never shames a learner. */
export function learningHint(question,chosenAnswer){
 const answer=String(question?.answer??'').trim();
 const explanation=typeof question?.explanation==='string'?question.explanation.trim():'';
 const correct=String(chosenAnswer)===answer;
 return {
  correct,
  title:correct?'You got it! 🌟':'Good effort! 💛',
  explanation:explanation|| (correct?'You found the right answer.':'The correct answer is '+answer+'.'),
  suggestion:correct?'Ready for the next challenge?':'Take a moment to read why, then try the next question. You can practise this topic again later.'
 };
}
