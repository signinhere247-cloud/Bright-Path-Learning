/** Track each held touch/pointer independently so releasing one cannot cancel another. */
export function createDirectionalInput(){
 const held=new Map();
 const keys=new Set();
 return {
  keys,
  press(pointerId,key){if(!Number.isInteger(pointerId)||!key)return;held.set(pointerId,key);keys.add(key)},
  release(pointerId){const key=held.get(pointerId);held.delete(pointerId);if(key&&!Array.from(held.values()).includes(key))keys.delete(key)},
  clear(){held.clear();keys.clear()},
  heldCount(){return held.size}
 };
}
