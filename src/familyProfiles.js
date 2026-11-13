import {validateSave,SAVE_KEY,AGE_KEY} from './backup.js';
export const FAMILY_KEY='brightpath-family-v1';
const fresh=()=>({coins:100,completed:{},profile:'Explorer',avatar:'#f7ad65',outfit:'#7b5ee8',pet:null,petMood:75,inventory:['bed','desk'],placed:[{item:'bed',x:-2,z:-1},{item:'desk',x:2,z:-1}],sound:false});
const validAge=a=>Number.isInteger(a)&&a>=3&&a<=16;
const nameOk=n=>typeof n==='string'&&n.trim().length>0&&n.trim().length<=20;
const idOk=id=>typeof id==='string'&&/^[a-zA-Z0-9_-]{8,80}$/.test(id);
export function readFamily(storage){
 const raw=storage.getItem(FAMILY_KEY);
 if(raw){let data;try{data=JSON.parse(raw)}catch{throw Error('Family profile data is damaged. Do not overwrite it.');}
  if(!data||data.version!==1||!Array.isArray(data.profiles)||data.profiles.length<1||data.profiles.length>8||!idOk(data.activeId))throw Error('Family profile data is invalid.');
  const seen=new Set();for(const p of data.profiles){if(!idOk(p.id)||seen.has(p.id)||!validAge(p.age))throw Error('Family profile data is invalid.');seen.add(p.id);validateSave(p.save)}
  if(!seen.has(data.activeId))throw Error('Active family profile is missing.');return data;
 }
 let save=fresh();try{const old=storage.getItem(SAVE_KEY);if(old)save=validateSave({...fresh(),...JSON.parse(old)})}catch{ /* Retain original damaged guest data without overwriting it here. */ }
 const age=Number(storage.getItem(AGE_KEY));return {version:1,activeId:'explorer_1',profiles:[{id:'explorer_1',age:validAge(age)?age:9,save}]};
}
export function writeFamily(storage,family){
 if(!family||family.version!==1||!Array.isArray(family.profiles)||family.profiles.length<1||family.profiles.length>8)throw Error('Invalid family data.');
 const ids=new Set();for(const p of family.profiles){if(!idOk(p.id)||ids.has(p.id)||!validAge(p.age))throw Error('Invalid explorer profile.');ids.add(p.id);validateSave(p.save)}
 if(!ids.has(family.activeId))throw Error('Active explorer not found.');
 const active=family.profiles.find(p=>p.id===family.activeId);
 const previous={family:storage.getItem(FAMILY_KEY),save:storage.getItem(SAVE_KEY),age:storage.getItem(AGE_KEY)};
 try{storage.setItem(FAMILY_KEY,JSON.stringify(family));storage.setItem(SAVE_KEY,JSON.stringify(active.save));storage.setItem(AGE_KEY,String(active.age));}
 catch{for(const [key,val] of [[FAMILY_KEY,previous.family],[SAVE_KEY,previous.save],[AGE_KEY,previous.age]]){try{if(val===null)storage.removeItem(key);else storage.setItem(key,val)}catch{}}throw Error('Could not save family progress. Storage may be full.');}
}
export function updateActive(family,save,age){if(!validAge(age))throw Error('Invalid age.');const next=structuredClone(family);const active=next.profiles.find(p=>p.id===next.activeId);if(!active)throw Error('Active explorer missing.');active.save=validateSave(save);active.age=age;return next;}
export function addExplorer(family,name,age,id){if(family.profiles.length>=8)throw Error('Maximum of 8 explorers.');if(!nameOk(name)||!validAge(age)||!idOk(id)||family.profiles.some(p=>p.id===id))throw Error('Invalid name, age or explorer ID.');const next=structuredClone(family);next.profiles.push({id,age,save:{...fresh(),profile:name.trim()}});next.activeId=id;return next;}
export function selectExplorer(family,id){if(!family.profiles.some(p=>p.id===id))throw Error('Explorer not found.');return {...family,activeId:id};}
