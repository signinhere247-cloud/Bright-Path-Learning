// Step 117: distinguish missing cloud configuration from uninspectable bundles.
// This pure diagnostic never exposes credentials and never grants write permission.
export function assessCloudBuildConfiguration({mainRefs=[],testingRefs=[],mainAssetsInspected=false,testingAssetsInspected=false,mainCloudFeatureEnabled}={}){
 const reasons=[];
 if(!mainAssetsInspected||!testingAssetsInspected)reasons.push('asset-inspection-incomplete');
 if(mainRefs.length===0)reasons.push('main-backend-ref-undetected');
 if(testingRefs.length!==1||testingRefs[0]!=='kvsmoxyemuimmlivcevn')reasons.push('testing-backend-ref-unexpected');
 if(mainRefs.length>1)reasons.push('main-backend-ref-ambiguous');
 if(mainRefs.length===1&&mainRefs[0]===testingRefs[0])reasons.push('same-backend-ref');
 if(mainCloudFeatureEnabled===false)reasons.push('main-cloud-feature-reported-disabled');
 return Object.freeze({
  status:reasons.length?'unverified':'distinct-public-refs-observed',
  mainCloudConfigured:mainCloudFeatureEnabled===true?'reported-enabled':mainCloudFeatureEnabled===false?'reported-disabled':'unknown',
  backendIsolationVerified:false,
  allowsDatabaseWrites:false,
  reasons
 });
}
