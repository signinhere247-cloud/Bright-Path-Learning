import {cloudSnapshot} from './cloudSaves.js';
export const SYNC_KEY='brightpath-cloud-sync-v1';
export function readSyncLinks(storage){
 try{const value=JSON.parse(storage.getItem(SYNC_KEY)||'{}');if(!value||typeof value!=='object'||Array.isArray(value))return {};return Object.fromEntries(Object.entries(value).filter(([k,v])=>/^[A-Za-z0-9_-]{8,80}$/.test(k)&&Number.isSafeInteger(v)&&v>=0));}catch{return {};}
}
export function planCloudSync(profile,remote,revision){
 const snapshot=cloudSnapshot(profile);
 if(!Number.isSafeInteger(revision)||revision<0)throw Error('This explorer has not been linked to cloud sync on this device. Restore or create a cloud backup first.');
 if(!remote||remote.profile_key!==snapshot.profile_key)throw Error('Cloud backup not found. Local progress is safe.');
 if(!Number.isSafeInteger(remote.revision)||remote.revision!==revision)throw Error('Cloud backup changed on another device. Automatic upload stopped. Review and restore the newer cloud version before continuing.');
 return {profile_key:snapshot.profile_key,expected_revision:revision,display_name:snapshot.display_name,learning_age:snapshot.learning_age,save_data:snapshot.save_data};
}
export function linkCloudProfile(storage,id,revision){
 if(!/^[A-Za-z0-9_-]{8,80}$/.test(id)||!Number.isSafeInteger(revision)||revision<0)throw Error('Invalid sync link.');
 const links=readSyncLinks(storage);links[id]=revision;storage.setItem(SYNC_KEY,JSON.stringify(links));
}
