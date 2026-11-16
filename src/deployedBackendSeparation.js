// Step 109: no network access; validates independently obtained deployed build evidence.
// A service name, Git branch, or configured URL alone is NOT proof of deployed backend isolation.
const refFromUrl=url=>{
 try {const parsed=new URL(url);if(parsed.protocol!=='https:')return null;const match=/^([a-z0-9]{20})\.supabase\.co$/.exec(parsed.hostname);return match?.[1]||null;}
 catch{return null;}
};
export function verifyDeployedBackendSeparation({main,testing}={}){
 const reasons=[];
 for(const [name,item] of [['main',main],['testing',testing]]){
  if(!item||item.evidenceType!=='deployed-build-asset'||item.buildSha?.length<7||!refFromUrl(item.supabaseUrl))reasons.push(name+'-deployed-backend-unverified');
 }
 const mainRef=refFromUrl(main?.supabaseUrl),testingRef=refFromUrl(testing?.supabaseUrl);
 if(testingRef&&testingRef!=='kvsmoxyemuimmlivcevn')reasons.push('testing-project-mismatch');
 if(mainRef&&testingRef&&mainRef===testingRef)reasons.push('shared-backend-detected');
 return {isolated:reasons.length===0,stagingWritesPermitted:false,reasons,mainProjectRef:mainRef,testingProjectRef:testingRef};
}
