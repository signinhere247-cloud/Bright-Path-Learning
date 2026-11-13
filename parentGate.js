/** Local convenience lock for parent-only menus; not a substitute for account authentication. */
const KEY='bp-parent-pin-v1';
export function hasParentPin(store){return Boolean(store.getItem(KEY));}
export function validPin(pin){return typeof pin==='string'&&/^\d{6,12}$/.test(pin);}
async function derive(pin,salt){
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveBits']);
 const bytes=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:150000,hash:'SHA-256'},key,256);
 return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
}
export async function setParentPin(store,pin){
 if(!validPin(pin))throw Error('Choose a 6–12 digit parent PIN.');
 if(hasParentPin(store))throw Error('A parent PIN is already set.');
 const salt=crypto.getRandomValues(new Uint8Array(16));
 const hash=await derive(pin,salt);
 store.setItem(KEY,JSON.stringify({salt:Array.from(salt),hash}));
}
export async function verifyParentPin(store,pin){
 if(!validPin(pin))return false;
 let record;try{record=JSON.parse(store.getItem(KEY));}catch{return false;}
 if(!record||!Array.isArray(record.salt)||record.salt.length!==16||!/^[a-f0-9]{64}$/.test(record.hash||''))return false;
 const actual=await derive(pin,new Uint8Array(record.salt));
 let diff=0;for(let i=0;i<actual.length;i++)diff|=actual.charCodeAt(i)^record.hash.charCodeAt(i);
 return diff===0;
}
