/** Fail closed unless the existing BrightPath backend is explicitly promoted on the exact live host. */
export const TESTING_PROJECT_REF = 'kvsmoxyemuimmlivcevn';
export function assertSafeCloudTarget({url,hostname,allowExistingProduction=false}={}) {
 let parsed;
 try { parsed = new URL(url); } catch { throw Error('Cloud configuration is invalid. No cloud data was changed.'); }
 if(parsed.protocol!=='https:' || !/^[a-z0-9]{20}\.supabase\.co$/.test(parsed.hostname) || parsed.username || parsed.password || parsed.port || parsed.pathname!=='/' || parsed.search || parsed.hash){
  throw Error('Cloud configuration is invalid. No cloud data was changed.');
 }
 const testingHost=hostname==='brightpath-cloud-auth-testing.onrender.com' || hostname==='localhost' || hostname==='127.0.0.1';
 const explicitlyPromoted=hostname==='bright-path-learning.onrender.com' && allowExistingProduction===true;
 if(!testingHost && !explicitlyPromoted && parsed.hostname===TESTING_PROJECT_REF+'.supabase.co'){
  throw Error('This BrightPath site cannot use the testing database. No cloud data was changed.');
 }
 return parsed.hostname.slice(0,20);
}
