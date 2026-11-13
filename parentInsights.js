import {buildProgressCharts} from './progressCharts.js';
import {revisionRecommendations} from './revisionRecommendations.js';

/** Evidence-aware insights. No diagnoses, inferred marks or fabricated trends. */
export function buildParentInsights(save, subjects){
 const charts=buildProgressCharts(save,subjects);
 const improving=charts.filter(c=>c.count>=6&&c.change>=10).sort((a,b)=>b.change-a.change);
 const steady=charts.filter(c=>c.count>=5&&c.recentAverage>=80&&!(c.change>=10)).sort((a,b)=>b.recentAverage-a.recentAverage);
 const practice=revisionRecommendations(save,subjects,3);
 const attempts=charts.reduce((n,c)=>n+c.count,0);
 const messages=[];
 if(!attempts)messages.push('No scored lessons recorded yet. Complete a lesson to start building learning insights.');
 else if(attempts<6)messages.push('Early results: more completed lessons will help show meaningful trends.');
 if(improving.length)messages.push(`${improving[0].subject} has improved by ${improving[0].change} percentage points when comparing the first five attempts with the latest five.`);
 if(steady.length)messages.push(`${steady[0].subject} has a recent average of ${steady[0].recentAverage}% across up to five attempts.`);
 if(practice.length)messages.push(`Suggested next practice: ${practice[0].subject} — ${practice[0].topic} (recent topic average ${practice[0].average}%).`);
 if(attempts>=6&&!improving.length&&!steady.length&&!practice.length)messages.push('Keep practising across subjects to build a clearer picture of progress.');
 return {attempts,improving,steady,practice,messages};
}
