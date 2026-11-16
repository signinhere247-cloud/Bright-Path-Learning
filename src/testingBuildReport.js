// Step 111: opt-in report generator, restricted to testing build identity.
// It does not read keys or write any output itself.
export function createTestingBuildReport(env={}){
 const {BRIGHTPATH_BUILD_REPORT,BRIGHTPATH_RENDER_SERVICE,BRIGHTPATH_ENVIRONMENT,VITE_SUPABASE_URL,RENDER_GIT_COMMIT}=env;
 if(BRIGHTPATH_BUILD_REPORT!=='enabled')throw new Error('Build report must be explicitly enabled.');
 if(BRIGHTPATH_RENDER_SERVICE!=='brightpath-cloud-auth-testing'||BRIGHTPATH_ENVIRONMENT!=='testing')throw new Error('Refusing report outside dedicated testing service.');
 let url;
 try{url=new URL(VITE_SUPABASE_URL);}catch{throw new Error('Invalid testing Supabase URL.');}
 const match=/^([a-z0-9]{20})\.supabase\.co$/.exec(url.hostname);
 if(url.protocol!=='https:'||!match||url.pathname!=='/'||url.search||url.hash)throw new Error('Invalid testing Supabase URL.');
 if(match[1]!=='kvsmoxyemuimmlivcevn')throw new Error('Unexpected testing Supabase project.');
 if(typeof RENDER_GIT_COMMIT!=='string'||!/^[a-f0-9]{40}$/i.test(RENDER_GIT_COMMIT))throw new Error('Missing verified Render commit SHA.');
 return {schemaVersion:1,service:'brightpath-cloud-auth-testing',environment:'testing',projectRef:match[1],commit:RENDER_GIT_COMMIT.toLowerCase()};
}
