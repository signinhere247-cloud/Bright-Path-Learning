/** Celebration messages for already earned achievements; no side effects or currency. */
export function galleryCelebration(badge){
 if(!badge?.earned)return null;
 const title=String(badge.title||'Achievement');
 return {title:'🎉 '+title+'!',message:'You earned this achievement through your adventures. Keep shining! 🌟'};
}
