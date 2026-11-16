// Step 91: safe, pure draft lesson experience adapter; no production UI wiring.
// This adapter is for review/testing only until content is educator-approved.
import {upperKs2NumberPlaceValueLessons} from './upperKs2NumberPlaceValueLessons.js';
import {upperKs2CalculationLessons} from './upperKs2CalculationLessons.js';
import {upperKs2FractionsDecimalsPercentagesLessons} from './upperKs2FractionsDecimalsPercentagesLessons.js';
import {upperKs2MeasurementLessons} from './upperKs2MeasurementLessons.js';
import {upperKs2GeometryShapeLessons} from './upperKs2GeometryShapeLessons.js';
import {upperKs2PositionDirectionLessons} from './upperKs2PositionDirectionLessons.js';
import {upperKs2StatisticsLessons} from './upperKs2StatisticsLessons.js';
import {upperKs2ReasoningLessons} from './upperKs2ReasoningLessons.js';
import {lessonStepProgress,lessonAnswerFeedback} from './lessonExperience.js';
const lessons=[upperKs2NumberPlaceValueLessons,upperKs2CalculationLessons,upperKs2FractionsDecimalsPercentagesLessons,upperKs2MeasurementLessons,upperKs2GeometryShapeLessons,upperKs2PositionDirectionLessons,upperKs2StatisticsLessons,upperKs2ReasoningLessons].flat();
const find=(id,year)=>lessons.find(x=>x.id===id&&x.year===year);
function requireReviewAccess(reviewMode){if(reviewMode!==true)throw new Error('Draft lessons are not available to pupils.');}
function requireStep(lesson,index){if(!Number.isInteger(index)||index<0||index>=lesson.questions.length)throw new Error('Invalid question index.');}
/** Returns a question without its correct answer or explanation until submission. */
export function previewDraftQuestion({lessonId,year,index=0,reviewMode=false}={}){
 requireReviewAccess(reviewMode);
 const lesson=find(lessonId,year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 requireStep(lesson,index);
 const question=lesson.questions[index];
 return {lessonId,year,title:lesson.title,index,prompt:question.prompt,options:[...question.options],progress:lessonStepProgress(index,lesson.questions.length)};
}
/** A single attempt yields feedback; this function neither awards coins nor stores progress. */
export function evaluateDraftAnswer({lessonId,year,index,selectedAnswer,reviewMode=false}={}){
 requireReviewAccess(reviewMode);
 const lesson=find(lessonId,year);
 if(!lesson)throw new Error('Lesson not found for this year.');
 requireStep(lesson,index);
 const question=lesson.questions[index];
 if(typeof selectedAnswer!=='string'||!question.options.includes(selectedAnswer))throw new Error('Select one of the supplied options.');
 const correct=selectedAnswer===question.answer;
 return {correct,correctAnswer:question.answer,explanation:question.explanation,feedback:lessonAnswerFeedback(correct,index===lesson.questions.length-1),isLast:index===lesson.questions.length-1};
}
