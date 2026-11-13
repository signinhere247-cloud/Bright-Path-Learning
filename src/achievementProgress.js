/** Only render progress when the achievement has a real measurable target. */
export function achievementProgress(badge){
 if(!badge||!Number.isFinite(badge.current)||!Number.isFinite(badge.goal)||badge.goal<=0)return null;
 const value=Math.min(badge.goal,Math.max(0,badge.current));
 return {value,max:badge.goal,label:value+' of '+badge.goal+' completed'};
}
