/** Optional parent sign-in. Never store service-role credentials in browser code. */
let cached;
export function cloudConfigured(env=import.meta.env){
 return Boolean(env?.VITE_SUPABASE_URL && env?.VITE_SUPABASE_PUBLISHABLE_KEY);
}
export function validParentEmail(value){
 return typeof value==='string' && value.length<=254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
export async function cloudClient(){
 if(!cloudConfigured())throw Error('Cloud accounts are not configured for this website. Your local profiles are safe.');
 if(!cached){cached=import('@supabase/supabase-js').then(({createClient})=>createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}));}
 return cached;
}
export async function parentAccount(){
 const client=await cloudClient();const {data,error}=await client.auth.getUser();if(error)throw Error('Unable to verify the parent session. Please sign in again.');return data.user;
}
export async function requestParentLink(email){
 if(!validParentEmail(email))throw Error('Enter a valid parent email address.');
 const client=await cloudClient();const {error}=await client.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+location.pathname,shouldCreateUser:true}});
 if(error)throw Error('Unable to send the sign-in link. Please try again.');
}
export async function signOutParent(){const client=await cloudClient();const {error}=await client.auth.signOut();if(error)throw Error('Sign-out failed. Please try again.');}
/** Read-only preflight. No local progress is sent to the cloud. */
export async function previewParentCloudProfiles(){
 const user=await parentAccount();if(!user)throw Error('Sign in as a parent first.');
 const client=await cloudClient();const {data,error}=await client.from('family_snapshots').select('profile_key,display_name,learning_age').eq('parent_id',user.id).limit(8);
 if(error)throw Error('Cloud profiles could not be loaded. Check the Supabase setup and permissions.');
 return Array.isArray(data)?data:[];
}

/** First upload only: existing cloud snapshots are never overwritten implicitly. */
export async function uploadCloudExplorer(profile){
 const user=await parentAccount();if(!user)throw Error('Sign in as a parent first.');
 const {cloudSnapshot}=await import('./cloudSaves.js');
 const snapshot=cloudSnapshot(profile);
 const client=await cloudClient();
 const {error}=await client.from('family_snapshots').insert({...snapshot,parent_id:user.id});
 if(error){if(error.code==='23505')throw Error('This explorer already has a cloud backup. Existing cloud data was not overwritten.');throw Error('Upload failed. Local progress is unchanged. Check cloud setup and try again.');}
 return true;
}
export async function listCloudExplorers(){
 const user=await parentAccount();if(!user)throw Error('Sign in as a parent first.');
 const client=await cloudClient();const {data,error}=await client.from('family_snapshots').select('profile_key,display_name,learning_age,created_at').eq('parent_id',user.id).order('created_at',{ascending:false}).limit(8);
 if(error)throw Error('Cloud backups could not be loaded. Check database setup.');
 return data||[];
}
export async function downloadCloudExplorer(profileKey){
 if(typeof profileKey!=='string'||!/^[a-zA-Z0-9_-]{8,80}$/.test(profileKey))throw Error('Invalid cloud explorer.');
 const user=await parentAccount();if(!user)throw Error('Sign in as a parent first.');
 const client=await cloudClient();const {data,error}=await client.from('family_snapshots').select('profile_key,learning_age,save_data').eq('parent_id',user.id).eq('profile_key',profileKey).single();
 if(error||!data)throw Error('Cloud backup unavailable. Nothing was changed locally.');
 const {readCloudSnapshot}=await import('./cloudSaves.js');return readCloudSnapshot(data);
}

/** Revision-checked upload; conflicts never replace remote data. */
export async function syncCloudExplorer(profile,revision){
 const user=await parentAccount();if(!user)throw Error('Sign in as a parent first.');
 const client=await cloudClient();
 const {data:remote,error:readError}=await client.from('family_snapshots').select('profile_key,revision').eq('parent_id',user.id).eq('profile_key',profile.id).maybeSingle();
 if(readError)throw Error('Could not verify cloud version. Local progress is unchanged.');
 const {planCloudSync}=await import('./cloudSync.js');
 const payload=planCloudSync(profile,remote,revision);
 const {data,error}=await client.rpc('update_family_snapshot',{
  p_profile_key:payload.profile_key,p_expected_revision:payload.expected_revision,
  p_display_name:payload.display_name,p_learning_age:payload.learning_age,p_save_data:payload.save_data
 });
 if(error)throw Error('Cloud sync could not be completed. Another device may have updated this backup. Local progress is unchanged.');
 if(!Number.isSafeInteger(Number(data))||Number(data)!==revision+1)throw Error('Cloud returned an unexpected revision. Check cloud status before trying again.');
 return Number(data);
}
