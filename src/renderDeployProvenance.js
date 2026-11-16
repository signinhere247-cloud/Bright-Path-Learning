// Step 112: validates read-only Render deployment provenance before comparing backend refs.
export function verifyRenderDeployProvenance({main,testing}={}){
 const expected=[
  {name:'main',item:main,serviceId:'srv-dbrercbm8hqs73cr73sg',branch:'main'},
  {name:'testing',item:testing,serviceId:'srv-dbsc47d6e07s739ebvig',branch:'cloud-auth-testing'}
 ];
 const findings=[];
 for(const {name,item,serviceId,branch} of expected){
  if(!item||item.serviceId!==serviceId||item.branch!==branch)findings.push(name+'-service-mismatch');
  if(item?.status!=='live'||!/^[0-9a-f]{40}$/i.test(item?.commit||''))findings.push(name+'-deploy-unverified');
 }
 if(main?.commit&&testing?.commit&&main.commit===testing.commit)findings.push('same-commit-not-expected');
 return {provenanceVerified:findings.length===0,backendIsolationVerified:false,allowsDatabaseWrites:false,findings};
}
