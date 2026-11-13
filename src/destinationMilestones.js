/** Replayable, read-only village exploration milestones. No BrightCoins are awarded. */
export function destinationMilestones(progress){
 const count=Math.max(0,Math.min(progress?.summary?.discovered||0,progress?.summary?.total||0));
 const total=progress?.summary?.total||0;
 const thresholds=[1,3,5].filter(n=>n<=total);
 if(total>0&&!thresholds.includes(total))thresholds.push(total);
 return thresholds.filter(n=>count>=n).map(n=>({
  id:'village:'+n,emoji:n===total?'🏆':n>=5?'🌟':n>=3?'✨':'🌱',
  title:n===total?'Village explorer champion!':n+' village '+(n===1?'discovery':'discoveries')+' explored!',
  message:n===total?'You have discovered every village secret. What an adventure!':'Every new discovery makes your adventure special.'
 }));
}
