import {learningStreak} from './learningStreaks.js';
import {challengeKeepsakes} from './challengeKeepsakes.js';
import {learningGoalCelebration} from './learningGoalCelebrations.js';
/** Replayable milestone messages, derived from saved achievements; no new rewards. */
export function learningHubCelebrations(save,subjects){
 const days=learningStreak(save).learningDays;
 const challenges=challengeKeepsakes(save).total;
 const goals=learningGoalCelebration(save,subjects).earned.length;
 const milestones=[
  ...[1,3,7,14,30].filter(n=>days>=n).map(n=>({id:'days:'+n,emoji:'🔥',title:n+' learning '+(n===1?'day':'days')+'!',message:'Every day you choose to learn is worth celebrating.'})),
  ...[1,3,7].filter(n=>challenges>=n).map(n=>({id:'challenges:'+n,emoji:'🌈',title:n+' daily '+(n===1?'challenge':'challenges')+' completed!',message:'What a wonderful learning adventure!'})),
  ...[1,3,5].filter(n=>goals>=n).map(n=>({id:'goals:'+n,emoji:'⭐',title:n+' learning goal '+(n===1?'star':'stars')+'!',message:'You worked towards something special.'}))
 ];
 return milestones;
}
