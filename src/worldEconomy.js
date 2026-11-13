/** Pure, immutable world purchase and placement rules. */
export function purchaseItem(save,item){
 if(!item||typeof item.id!=='string'||!Number.isSafeInteger(item.price)||item.price<0)throw Error('Invalid shop item.');
 if(!save||!Number.isSafeInteger(save.coins)||save.coins<0||!Array.isArray(save.inventory)||!Array.isArray(save.placed))throw Error('Invalid explorer save.');
 if(save.inventory.includes(item.id)||((item.id==='cat'||item.id==='dog')&&save.pet))throw Error('You already own this item or have adopted a pet.');
 if(save.coins<item.price)throw Error('Not enough BrightCoins yet. Complete lessons to earn more!');
 const next=structuredClone(save);next.coins-=item.price;
 if(item.id==='cat'||item.id==='dog'){next.pet=item.id;next.petMood=75;}else next.inventory.push(item.id);
 return next;
}
export function placeFurniture(save,id,x,z){
 if(!save||!Array.isArray(save.inventory)||!Array.isArray(save.placed))throw Error('Invalid explorer save.');
 if(typeof id!=='string'||!save.inventory.includes(id)||id==='cat'||id==='dog')throw Error('You do not own this furniture.');
 if(!Number.isFinite(x)||!Number.isFinite(z)||Math.abs(x)>3||Math.abs(z)>3)throw Error('Invalid placement position.');
 if(save.placed.some(p=>p.item===id))throw Error('This furniture is already placed.');
 const next=structuredClone(save);next.placed.push({item:id,x,z});return next;
}
export function moveFurniture(save,id,x,z,rotation=0){
 if(!save||!Array.isArray(save.placed))throw Error('Invalid explorer save.');
 if(!Number.isFinite(x)||!Number.isFinite(z)||Math.abs(x)>5.7||Math.abs(z)>4.7||!Number.isFinite(rotation))throw Error('Furniture must stay inside the room.');
 if(!save.placed.some(p=>p.item===id))throw Error('This item is not placed.');
 const next=structuredClone(save);
 next.placed=next.placed.map(p=>p.item===id?{...p,x,z,rotation}:p);
 return next;
}
export function removeFurniture(save,id){
 if(!save||!Array.isArray(save.placed))throw Error('Invalid explorer save.');
 if(!save.placed.some(p=>p.item===id))throw Error('This item is not placed.');
 const next=structuredClone(save);next.placed=next.placed.filter(p=>p.item!==id);return next;
}
