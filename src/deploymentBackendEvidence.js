// Step 110: build-time backend-ref attestation for an OPTIONAL isolated test build.
// Never emits API keys, passwords or session data. Do not expose on main production build.
export function extractSupabaseProjectRef(url){
 if(typeof url!=='string')return null;
 try{const u=new URL(url);const m=/^([a-z0-9]{20})\.supabase\.co$/.exec(u.hostname);return u.protocol==='https:'&&u.pathname==='/'&&m?m[1]:null;}catch{return null;}
}
export function makeBackendEvidence({service,environment,url,commit}={}){
 if(service!=='brightpath-cloud-auth-testing'||environment!=='testing')throw new Error('Only isolated testing service may emit backend evidence.');
 const projectRef=extractSupabaseProjectRef(url);
 if(!projectRef||typeof commit!=='string'||!/^[0-9a-f]{7,40}$/i.test(commit))throw new Error('Invalid backend URL or commit.');
 return Object.freeze({service,environment,projectRef,commit,containsSecrets:false});
}
export function compareBackendEvidence({testing,main}={}){
 if(!testing||!main||testing.service!=='brightpath-cloud-auth-testing'||main.service!=='Bright-Path-Learning')return {verified:false,reason:'missing-deployed-evidence'};
 if(testing.projectRef!=='kvsmoxyemuimmlivcevn')return {verified:false,reason:'unexpected-testing-project'};
 if(!main.projectRef||main.projectRef===testing.projectRef)return {verified:false,reason:'live-backend-not-separated'};
 if(!testing.commit||!main.commit)return {verified:false,reason:'missing-build-identity'};
 return {verified:true,reason:null,allowsDatabaseWrites:false};
}
