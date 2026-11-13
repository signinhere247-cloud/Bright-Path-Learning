import {explorerMilestones} from './explorerMilestones.js';
import {challengeKeepsakes} from './challengeKeepsakes.js';
import {learningGoalCelebration} from './learningGoalCelebrations.js';
/** One read-only collection for the active explorer's achievements. */
export function achievementGallery(save,subjects,day){
 const explorer=explorerMilestones(save,day).milestones.map(m=>({id:'explorer:'+m.id,title:m.name,emoji:m.emoji,earned:m.earned,current:m.progress,goal:m.goal,detail:m.earned?'Completed!':m.progress+' of '+m.goal+' steps · Keep exploring'}));
 const challenge=challengeKeepsakes(save);
 const challenges=challenge.badges.map(b=>({id:'challenge:'+b.id,title:b.name,emoji:b.emoji,earned:b.earned,current:Math.min(challenge.total,b.goal),goal:b.goal,detail:b.earned?'Collected! Great work!':'Complete '+b.goal+' daily challenge'+(b.goal===1?'':'s')}));
 const goals=learningGoalCelebration(save,subjects).earned.map((name,index)=>({id:'goal:'+index+':'+name,title:'Learning goal star',emoji:'⭐',earned:true,detail:'Goal completed: '+name}));
 const groups=[{id:'explorer',title:'Adventure milestones',items:explorer},{id:'challenge',title:'Daily challenge keepsakes',items:challenges},{id:'goal',title:'Personal goal stars',items:goals}];
 return {groups,earned:groups.reduce((n,g)=>n+g.items.filter(i=>i.earned).length,0),total:groups.reduce((n,g)=>n+g.items.length,0)};
}
