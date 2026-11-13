/** Persist a purchase or pet/home change before making it visible in memory. */
export function commitEconomyChange(current, transform, persist){
 if(typeof transform!=='function'||typeof persist!=='function')throw Error('Invalid economy operation.');
 const next=transform(current);
 if(!next||next===current)throw Error('Economy operation must return a new save.');
 persist(next); // Throws on quota/storage failures; caller must retain current state.
 return next;
}
