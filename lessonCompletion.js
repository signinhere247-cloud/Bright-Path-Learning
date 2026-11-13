import {settleLesson} from './lessonProgress.js';
import {recordLessonAttempt} from './learningHistory.js';
import {recordDailyLessonPass,validQuestDay} from './dailyQuests.js';

/** Calculate all lesson effects before persisting anything. Never mutate the input save. */
export function completeLessonAttempt(save,subject,topic,correct,total,at=new Date().toISOString()){
 const timestamp=new Date(at);
 if(!Number.isFinite(timestamp.getTime()))throw Error('Invalid lesson completion time.');
 const day=timestamp.toISOString().slice(0,10);
 if(!validQuestDay(day))throw Error('Invalid lesson completion date.');
 const result=settleLesson(save,subject,topic,correct,total);
 let next=recordLessonAttempt(result.save,subject,topic,correct,total,timestamp.toISOString());
 if(result.passed)next=recordDailyLessonPass(next,day);
 return {...result,save:next};
}
