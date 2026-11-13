import {journalSummary} from './villageJournal.js';
import {progressSummary} from './lessonProgress.js';
import {DISCOVERY_LEARNING_LINKS} from './discoveryLearningLinks.js';
/** Read-only highlights from one child's existing village and lesson records. */
export function villageLearningHighlights(save,subjects,day){
 const journal=journalSummary(save,day);
 const learning=progressSummary(save,subjects);
 const linkedSubjects=[...new Set(Object.values(DISCOVERY_LEARNING_LINKS))].filter(s=>subjects.includes(s));
 const links=linkedSubjects.map(subject=>({
  subject,
  discoveries:Object.entries(DISCOVERY_LEARNING_LINKS).filter(([id,s])=>s===subject&&typeof save?.discoveries?.[id]==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(save.discoveries[id])).length,
  lessons:learning.counts[subject]||0
 })).filter(item=>item.discoveries||item.lessons);
 return {discoveries:journal.discovered,totalDiscoveries:journal.total,completedToday:journal.today,lessons:learning.total,links};
}
