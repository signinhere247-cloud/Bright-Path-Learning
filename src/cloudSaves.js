import {validateSave} from './backup.js';

export function cloudSnapshot(profile){
 if(!profile||typeof profile.id!=='string'||!/^[a-zA-Z0-9_-]{8,80}$/.test(profile.id)||!Number.isInteger(profile.age)||profile.age<3||profile.age>16)throw Error('Invalid explorer profile.');
 return {profile_key:profile.id,display_name:validateSave(profile.save).profile,learning_age:profile.age,save_data:validateSave(profile.save)};
}
export function readCloudSnapshot(row){
 if(!row||typeof row.profile_key!=='string'||!/^[a-zA-Z0-9_-]{8,80}$/.test(row.profile_key)||!Number.isInteger(row.learning_age)||row.learning_age<3||row.learning_age>16)throw Error('Invalid cloud profile.');
 const save=validateSave(row.save_data);
 return {id:row.profile_key,age:row.learning_age,save};
}
export function prepareCloudRestore(family,row,targetId){
 const remote=readCloudSnapshot(row);
 if(!family?.profiles?.some(p=>p.id===targetId))throw Error('Choose an existing local explorer to restore.');
 const next=structuredClone(family);
 const target=next.profiles.find(p=>p.id===targetId);
 target.save=remote.save;target.age=remote.age;
 return next;
}
