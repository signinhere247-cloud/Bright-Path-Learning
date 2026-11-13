/** Small, predictable profile menu groups for younger explorers and guardians. */
export const PROFILE_MENU_GROUPS=Object.freeze([
 {id:'adventure',title:'My adventures 🌟',items:[
  {id:'adventureOverview',label:'My adventure progress 🌟'},
  {id:'achievements',label:'My achievements 🏆'},
  {id:'dailyQuests',label:'Daily adventures ✨'},
  {id:'discoveryShortcut',label:'Village discoveries 🌿'}]},
 {id:'world',title:'My world 🏡',items:[
  {id:'petCare',label:'Care for my pet 🐾'},
  {id:'shopShortcut',label:'BrightCoins Shop 🛍️'},
  {id:'homeShortcut',label:'My 3D Home 🏠'}]},
 {id:'family',title:'Grown-up tools 🔒',items:[
  {id:'backupControls',label:'Backup & restore progress'},
  {id:'familyControls',label:'Family explorers'},
  {id:'cloudControls',label:'Parent cloud account (optional)'},
  {id:'parentReport',label:'Parent learning report'},
  {id:'revisionStudio',label:'My revision suggestions'}]}
]);
export function profileMenuIds(){
 return PROFILE_MENU_GROUPS.flatMap(group=>group.items.map(item=>item.id));
}
