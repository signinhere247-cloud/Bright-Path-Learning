import {learningDashboard} from './learningDashboard.js';
import {learningGoalProgress} from './learningGoals.js';
import {dailyLearningChallenge} from './dailyLearningChallenges.js';
import {achievementGallery} from './achievementGallery.js';
/** Read-only snapshot for the active child's learning adventure hub. */
export function learningAdventureHub(save,subjects,day){
 const dashboard=learningDashboard(save,subjects);
 const goal=learningGoalProgress(save,subjects);
 const challenge=dailyLearningChallenge(save,day);
 const gallery=achievementGallery(save,subjects,day);
 return {completed:dashboard.completed,attempts:dashboard.attempts,goal,challenge,achievements:{earned:gallery.earned,total:gallery.total}};
}
