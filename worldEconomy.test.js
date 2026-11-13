import test from 'node:test';import assert from 'node:assert/strict';import {purchaseItem,placeFurniture,removeFurniture} from '../src/worldEconomy.js';
const base=()=>({coins:100,inventory:['bed'],placed:[{item:'bed',x:0,z:0}],pet:null});
test('purchase charges exact amount and does not mutate source',()=>{const s=base(),n=purchaseItem(s,{id:'lamp',price:35});assert.equal(n.coins,65);assert.deepEqual(n.inventory,['bed','lamp']);assert.equal(s.coins,100)});
test('cannot buy duplicates',()=>assert.throws(()=>purchaseItem(base(),{id:'bed',price:20}),/already own/));
test('cannot spend more than balance',()=>assert.throws(()=>purchaseItem(base(),{id:'sofa',price:101}),/Not enough/));
test('pet adoption only once',()=>{const s=purchaseItem(base(),{id:'cat',price:80});assert.equal(s.pet,'cat');assert.throws(()=>purchaseItem(s,{id:'dog',price:80}),/adopted/)});
test('place only owned furniture once',()=>{const s=base();assert.throws(()=>placeFurniture(s,'sofa',0,0),/do not own/);assert.throws(()=>placeFurniture(s,'bed',1,1),/already placed/)});
test('remove then rearrange without losing ownership',()=>{const s=base(),r=removeFurniture(s,'bed'),p=placeFurniture(r,'bed',2,-1);assert.deepEqual(p.placed,[{item:'bed',x:2,z:-1}]);assert.equal(s.placed.length,1)});
test('invalid positions rejected',()=>assert.throws(()=>placeFurniture({...base(),placed:[]},'bed',Infinity,0),/Invalid placement/));
