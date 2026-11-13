/** Helpful, non-punitive next steps for locked gallery achievements. */
export function achievementNextStep(badge){
 if(!badge||badge.earned)return null;
 const id=String(badge.id||'');
 const actions={
  'explorer:first-lesson':['Try a lesson','learn','Complete your first academy lesson.'],
  'explorer:five-lessons':['Explore lessons','learn','Complete five different academy topics.'],
  'explorer:first-discovery':['Explore the village','discoveries','Find your first village discovery.'],
  'explorer:village-master':['Explore the village','discoveries','Discover every village secret.'],
  'explorer:keepsake-collector':['Collect keepsakes','discoveries','Find three village keepsakes by exploring.'],
  'explorer:pet-friend':['Visit the pet shop','shop','Adopt a pet companion when you are ready.'],
  'challenge:first-challenge':['View daily challenges','challenges','Complete one optional two-subject daily challenge.'],
  'challenge:three-challenges':['View daily challenges','challenges','Complete three optional daily challenges.'],
  'challenge:seven-challenges':['View daily challenges','challenges','Complete seven optional daily challenges.']
 };
 const action=actions[id];return action?{label:action[0],destination:action[1],description:action[2]}:null;
}
