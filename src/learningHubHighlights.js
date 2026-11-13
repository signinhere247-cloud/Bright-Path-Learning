import {learningStreak} from './learningStreaks.js';
import {challengeKeepsakes} from './challengeKeepsakes.js';
import {learningGoalCelebration} from './learningGoalCelebrations.js';
import {achievementGallery} from './achievementGallery.js';
/** Positive, read-only progress highlights for one child's saved adventure. */
export function learningHubHighlights(save,subjects,day){
 const highlights=[];
 const streak=learningStreak(save);
 if(streak.learningDays)highlights.push({id:'learning-days',emoji:'🔥',title:'Learning days',detail:streak.learningDays+' day'+(streak.learningDays===1?'':'s')+' spent learning — every day counts!'});
 const challenges=challengeKeepsakes(save);
 if(challenges.total)highlights.push({id:'challenges',emoji:'✨',title:'Daily challenges',detail:challenges.total+' completed learning challenge'+(challenges.total===1?'':'s')+'!'});
 const goals=learningGoalCelebration(save,subjects);
 if(goals.earned.length)highlights.push({id:'goal-stars',emoji:'⭐',title:'Learning goal stars',detail:goals.earned.length+' personal goal star'+(goals.earned.length===1?'':'s')+' collected!'});
 const gallery=achievementGallery(save,subjects,day);
 if(gallery.earned)highlights.push({id:'achievements',emoji:'🏅',title:'Achievement collection',detail:gallery.earned+' achievement'+(gallery.earned===1?'':'s')+' unlocked!'});
 return highlights.slice(0,4);
}
