// Step 94: dependency-injected authenticated progress gateway.
// Requires a trusted server-side authorizer and atomic storage implementation.
// This module does not provide authentication, persistence or cloud credentials.
import {createChildProgressSnapshot} from './childProgressSyncContract.js';
const validId=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{1,100}$/.test(x);
function requireGateway({authorize,storage}){
 if(typeof authorize!=='function'||!storage||typeof storage.read!=='function'||typeof storage.compareAndSwap!=='function')throw new Error('Trusted authorization and atomic storage adapters required.');
}
async function requireAuthorized(authorize,context,childProfileId){
 if(!context||!validId(childProfileId)||await authorize(context,childProfileId)!==true)throw new Error('Access denied.');
}
export function createAuthorizedProgressGateway({authorize,storage}={}){
 requireGateway({authorize,storage});
 return {
  async read({context,childProfileId}={}){
   await requireAuthorized(authorize,context,childProfileId);
   const record=await storage.read(childProfileId);
   if(record==null)return createChildProgressSnapshot({childProfileId});
   return createChildProgressSnapshot(record);
  },
  async save({context,childProfileId,expectedRevision,snapshot}={}){
   await requireAuthorized(authorize,context,childProfileId);
   if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw new Error('Invalid expected revision.');
   if(!snapshot||snapshot.childProfileId!==childProfileId||snapshot.revision!==expectedRevision+1)throw new Error('Invalid proposed snapshot revision or child.');
   const proposed=createChildProgressSnapshot(snapshot);
   const result=await storage.compareAndSwap({childProfileId,expectedRevision,snapshot:proposed});
   if(!result||result.ok!==true){
    if(result?.conflict===true)return {status:'conflict',expectedRevision};
    throw new Error('Progress storage failed.');
   }
   return {status:'saved',revision:proposed.revision};
  }
 };
}
