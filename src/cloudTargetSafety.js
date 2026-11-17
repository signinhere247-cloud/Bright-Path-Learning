/** Fail closed if a production BrightPath page targets the known testing backend. */
export const TESTING_PROJECT_REF = 'kvsmoxyemuimmlivcevn';
export function assertSafeCloudTarget({url,hostname}={}) {
 let parsed;
 try { parsed = new URL(url); } catch { throw Error('Cloud configuration is invalid. No cloud data was changed.'); }
 if(parsed.protocol!=='https:' || !/^[a-z0-9]{20}\.supabase\.co$/.test(parsed.hostname) || parsed.username || parsed.password || parsed.port || parsed.pathname!=='/' || parsed.search || parsed.hash){
  throw Error('Cloud configuration is invalid. No cloud data was changed.');
 }
 if(hostname!=='brightpath-cloud-auth-testing.onrender.com' && hostname!=='localhost' && hostname!=='127.0.0.1' && parsed.hostname===TESTING_PROJECT_REF+'.supabase.co'){
  throw Error('This BrightPath site cannot use the testing database. No cloud data was changed.');
 }
 return parsed.hostname.slice(0,20);
}
