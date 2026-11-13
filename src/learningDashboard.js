import {buildProgressCharts} from './progressCharts.js';
import {progressSummary} from './lessonProgress.js';
import {practiceTopics} from './practiceTopics.js';
import {challengeKeepsakes} from './challengeKeepsakes.js';
/** Read-only, per-explorer dashboard; missing scores are never invented. */
export function learningDashboard(save,subjects){
 const charts=buildProgressCharts(save,subjects);
 const counts=progressSummary(save,subjects).counts;
 const rows=charts.map(chart=>({
  subject:chart.subject,completed:counts[chart.subject]||0,attempts:chart.count,
  average:chart.average,recentAverage:chart.recentAverage,
  practice:practiceTopics(save,chart.subject).slice(0,2).map(item=>item.topic)
 }));
 return {rows,attempts:rows.reduce((sum,row)=>sum+row.attempts,0),
 completed:Object.values(counts).reduce((sum,n)=>sum+n,0),
 challenges:challengeKeepsakes(save).total};
}
