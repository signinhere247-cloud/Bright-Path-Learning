// Step 113: scan already-published JS text for Supabase project refs.
// Never return matched source lines, tokens or keys. No network or database access.
export function findSupabaseProjectRefs(assets){
 if(!Array.isArray(assets)||assets.some(x=>typeof x!=='string'))throw Error('Asset text array required.');
 const refs=new Set();
 for(const asset of assets){
  for(const match of asset.matchAll(/https:\/\/([a-z0-9]{20})\.supabase\.co(?:\/|["'`])/g))refs.add(match[1]);
 }
 return [...refs].sort();
}
export function classifyDeployedRefs({mainAssets,testingAssets}={}){
 const mainRefs=findSupabaseProjectRefs(mainAssets),testingRefs=findSupabaseProjectRefs(testingAssets);
 const reasons=[];
 if(mainRefs.length!==1)reasons.push('main-ref-not-unique');
 if(testingRefs.length!==1)reasons.push('testing-ref-not-unique');
 if(testingRefs.length===1&&testingRefs[0]!=='kvsmoxyemuimmlivcevn')reasons.push('unexpected-testing-ref');
 if(mainRefs.length===1&&testingRefs.length===1&&mainRefs[0]===testingRefs[0])reasons.push('shared-supabase-ref');
 return {mainRefs,testingRefs,distinctRefs:reasons.length===0,provesDeployedProvenance:false,allowsWrites:false,reasons};
}
