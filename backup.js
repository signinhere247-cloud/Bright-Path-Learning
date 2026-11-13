import {validateLearningHistory} from './learningHistory.js';
export const SAVE_KEY='brightpath3d-save';
export const AGE_KEY='bp-age';
const allowedItems=new Set(['bed','desk','sofa','lamp','plant','rug','chair']);
const colour=/^#[0-9a-fA-F]{6}$/;
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
export function validateSave(raw){
  if(!object(raw))throw Error('Backup progress is not an object.');
  if(!Number.isSafeInteger(raw.coins)||raw.coins<0||raw.coins>10000000)throw Error('Invalid BrightCoins balance.');
  if(typeof raw.profile!=='string'||!raw.profile.trim()||raw.profile.length>20)throw Error('Invalid explorer name.');
  if(!object(raw.completed)||Object.keys(raw.completed).length>1000||Object.entries(raw.completed).some(([k,v])=>k.length>100||v!==true))throw Error('Invalid lesson records.');
  if(!colour.test(raw.avatar)||!colour.test(raw.outfit))throw Error('Invalid avatar colours.');
  if(raw.pet!==null&&!['cat','dog'].includes(raw.pet))throw Error('Invalid pet.');
  if(!Array.isArray(raw.inventory)||raw.inventory.length>30||raw.inventory.some(i=>!allowedItems.has(i)))throw Error('Invalid inventory.');
  if(!Array.isArray(raw.placed)||raw.placed.length>200||raw.placed.some(p=>!object(p)||!allowedItems.has(p.item)||!Number.isFinite(p.x)||!Number.isFinite(p.z)||Math.abs(p.x)>30||Math.abs(p.z)>30))throw Error('Invalid furniture placement.');
  validateLearningHistory(raw.lessonHistory);
  return structuredClone(raw);
}
export function makeBackup(save,age){
  const safe=validateSave(save);
  if(!Number.isInteger(age)||age<3||age>16)throw Error('Invalid learning age.');
  return JSON.stringify({format:'brightpath-guest-backup',version:1,exportedAt:new Date().toISOString(),age,save:safe},null,2);
}
export function parseBackup(text){
  if(typeof text!=='string'||text.length>2_000_000)throw Error('Backup is too large.');
  let doc;try{doc=JSON.parse(text)}catch{throw Error('This is not a valid JSON backup.');}
  if(!object(doc)||doc.format!=='brightpath-guest-backup'||doc.version!==1)throw Error('Unsupported BrightPath backup format.');
  if(!Number.isInteger(doc.age)||doc.age<3||doc.age>16)throw Error('Invalid learning age.');
  return {save:validateSave(doc.save),age:doc.age};
}
export function restoreBackup(storage,backup){
  const next=validateSave(backup.save);
  if(!Number.isInteger(backup.age)||backup.age<3||backup.age>16)throw Error('Invalid learning age.');
  // Preserve a valid previous save before replacing it. A failed write must not trigger reload.
  const old=storage.getItem(SAVE_KEY),oldAge=storage.getItem(AGE_KEY);
  if(old!==null){try{validateSave(JSON.parse(old));storage.setItem('brightpath3d-pre-import',old)}catch{ /* Keep an existing recovery snapshot intact. */ }}
  try{storage.setItem(SAVE_KEY,JSON.stringify(next));storage.setItem(AGE_KEY,String(backup.age))}
  catch(err){try{if(old===null)storage.removeItem(SAVE_KEY);else storage.setItem(SAVE_KEY,old);if(oldAge===null)storage.removeItem(AGE_KEY);else storage.setItem(AGE_KEY,oldAge)}catch{}throw Error('Could not save the imported progress. Your previous progress may need restoring from a backup.');}
}
