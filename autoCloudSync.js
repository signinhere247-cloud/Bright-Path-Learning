/** Opt-in sync coordinator. Never creates a cloud profile or overwrites a remote conflict. */
export const AUTO_SYNC_KEY='brightpath-auto-cloud-sync-v1';
export function autoSyncEnabled(storage){try{return storage.getItem(AUTO_SYNC_KEY)==='enabled'}catch{return false}}
export function setAutoSyncEnabled(storage,enabled){storage.setItem(AUTO_SYNC_KEY,enabled?'enabled':'disabled')}
export function createAutoSyncCoordinator({upload,linked,onStatus=()=>{},delay=12000,setTimer=setTimeout,clearTimer=clearTimeout}){
 let timer=null,busy=false,dirty=false,stopped=false,paused=false,subject=null;
 const status=message=>onStatus(message);
 async function flush(){
  if(stopped||paused||busy||!dirty)return;
  if(!linked(subject)){status('Automatic sync paused: this explorer needs a linked cloud backup.');paused=true;return}
  busy=true;dirty=false;
  try{await upload(subject);status('Cloud progress synced.');}
  catch(error){paused=true;dirty=true;status(`Automatic sync paused: ${error?.message||'Upload failed'}. Local progress is unchanged. Review the cloud backup before resuming.`)}
  finally{busy=false;if(dirty&&!paused&&!stopped)schedule()}
 }
 function schedule(){if(timer!==null)clearTimer(timer);timer=setTimer(()=>{timer=null;void flush()},delay)}
 return {
  changed(id){if(stopped)return;if(typeof id!=='string'||!id)throw Error('Automatic sync requires an explorer ID.');if(subject!==null&&subject!==id){paused=true;dirty=false;if(timer!==null){clearTimer(timer);timer=null}status('Automatic sync paused: explorer changed. Local progress is safe.');return}subject=id;dirty=true;if(!paused)schedule()},
  async flush(){if(timer!==null){clearTimer(timer);timer=null}await flush()},
  resume(){if(stopped)return;paused=false;if(dirty)schedule()},
  pause(){paused=true;if(timer!==null){clearTimer(timer);timer=null}},
  stop(){stopped=true;if(timer!==null)clearTimer(timer);timer=null},
  get status(){return {busy,dirty,paused,stopped,subject}}
 };
}
