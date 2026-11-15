import {eyfsPlayActivities} from './eyfsPlayActivities.js';
const activityIds=new Set(eyfsPlayActivities.map(a=>a.id));
export const EYFS_OBSERVATION_STATUSES=Object.freeze(['noted','developing','needs-support']);
export function validateEyfsObservation(input){
 if(!input||typeof input!=='object')return {valid:false,errors:['Observation must be an object']};
 const errors=[];
 if(!activityIds.has(input.activityId))errors.push('Unknown activity');
 if(!EYFS_OBSERVATION_STATUSES.includes(input.status))errors.push('Invalid observation status');
 if(typeof input.note!=='string'||input.note.trim().length<3||input.note.length>500)errors.push('Note must contain 3–500 characters');
 if(input.childId!==undefined||input.photo!==undefined||input.video!==undefined||input.upload!==undefined)errors.push('Personal identifiers and media are not accepted by this observation helper');
 if(input.mastery===true||input.elgAchieved===true)errors.push('Participation cannot certify ELG mastery');
 return {valid:errors.length===0,errors};
}
export function createEyfsObservation(input){
 const result=validateEyfsObservation(input);
 if(!result.valid)throw new Error(result.errors.join('; '));
 return Object.freeze({activityId:input.activityId,status:input.status,note:input.note.trim(),elgVerified:false,reviewRequired:true});
}
