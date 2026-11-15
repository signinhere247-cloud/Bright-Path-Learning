// Staging-only executable RLS probe. Never run against production.
import {createClient} from '@supabase/supabase-js';
const required=['EYFS_STAGING_URL','EYFS_STAGING_ANON_KEY','EYFS_STAGING_PARENT_A_JWT','EYFS_STAGING_PARENT_B_JWT','EYFS_STAGING_PARENT_A_ID','EYFS_STAGING_CHILD_A_KEY'];
const missing=required.filter(k=>!process.env[k]);
if(missing.length){console.error('SKIPPED: staging probe requires '+missing.join(', '));process.exitCode=2;}
else {
 const e=process.env;
 const url=new URL(e.EYFS_STAGING_URL);
 if(url.protocol!=='https:'||!url.hostname.endsWith('.supabase.co')||!/(staging|test|dev)/i.test(url.hostname+' '+(e.EYFS_STAGING_PROJECT_LABEL||''))){
  console.error('REFUSED: set a verified nonproduction Supabase URL and staging/test/dev project label');process.exitCode=2;
 } else if(e.EYFS_STAGING_PARENT_A_JWT===e.EYFS_STAGING_PARENT_B_JWT){
  console.error('REFUSED: parent sessions must differ');process.exitCode=2;
 } else {
  const client=jwt=>createClient(url.toString(),e.EYFS_STAGING_ANON_KEY,{global:{headers:{Authorization:'Bearer '+jwt}},auth:{persistSession:false,autoRefreshToken:false}});
  const a=client(e.EYFS_STAGING_PARENT_A_JWT),b=client(e.EYFS_STAGING_PARENT_B_JWT);
  const filter=q=>q.eq('parent_id',e.EYFS_STAGING_PARENT_A_ID).eq('profile_key',e.EYFS_STAGING_CHILD_A_KEY);
  const owner=await filter(a.from('eyfs_observations').select('id').limit(1));
  const outsider=await filter(b.from('eyfs_observations').select('id').limit(1));
  const checks=[
   {id:'RLS-PROBE-01',pass:!owner.error,detail:owner.error?.code||'owner query succeeded'},
   {id:'RLS-PROBE-02',pass:!outsider.error&&Array.isArray(outsider.data)&&outsider.data.length===0,detail:outsider.error?.code||'outsider sees no rows'}
  ];
  for(const c of checks)console.log(c.id+': '+(c.pass?'PASS':'FAIL')+' ('+c.detail+')');
  if(!checks.every(c=>c.pass))process.exitCode=1;
  console.log('Read-only staging probes only; write, revoke and export acceptance cases remain untested.');
 }
}
