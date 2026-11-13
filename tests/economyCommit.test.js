import test from 'node:test';
import assert from 'node:assert/strict';
import {commitEconomyChange} from '../src/economyCommit.js';
import {purchaseItem,placeFurniture} from '../src/worldEconomy.js';
const base=()=>({coins:100,inventory:['bed'],placed:[],pet:null});
test('purchase is persisted before result is returned',()=>{const current=base();let persisted;const next=commitEconomyChange(current,s=>purchaseItem(s,{id:'lamp',price:35}),s=>{persisted=structuredClone(s)});assert.deepEqual(next,persisted);assert.equal(current.coins,100);assert.equal(next.coins,65)});
test('failed persistence cannot expose a charged result',()=>{const current=base();assert.throws(()=>commitEconomyChange(current,s=>purchaseItem(s,{id:'lamp',price:35}),()=>{throw Error('Storage full')}),/Storage full/);assert.equal(current.coins,100);assert.deepEqual(current.inventory,['bed'])});
test('invalid purchase never attempts persistence',()=>{let called=false;assert.throws(()=>commitEconomyChange(base(),s=>purchaseItem(s,{id:'sofa',price:200}),()=>{called=true}),/Not enough/);assert.equal(called,false)});
test('placement also preserves current save on storage failure',()=>{const current=base();assert.throws(()=>commitEconomyChange(current,s=>placeFurniture(s,'bed',1,1),()=>{throw Error('Storage full')}),/Storage full/);assert.deepEqual(current.placed,[])});
