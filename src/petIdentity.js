/** Pet names belong to the active explorer save, never to a shared account. */
export function petDisplayName(save){
 if(!save||!['cat','dog'].includes(save.pet))return null;
 return typeof save.petName==='string'&&save.petName.trim()?save.petName.trim():(save.pet==='cat'?'My Cat':'My Dog');
}
export function renamePet(save,name){
 if(!save||!['cat','dog'].includes(save.pet))throw Error('Adopt a pet before naming it.');
 if(typeof name!=='string')throw Error('Enter a pet name.');
 const trimmed=name.trim();
 if(!trimmed||trimmed.length>20||!(/^[\p{L}\p{N} '-]+$/u).test(trimmed))throw Error('Use 1–20 letters, numbers, spaces, apostrophes or hyphens.');
 return {...structuredClone(save),petName:trimmed};
}
