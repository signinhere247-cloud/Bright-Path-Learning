import test from 'node:test';
import assert from 'node:assert/strict';
import {readFamily,writeFamily,updateActive,addExplorer,selectExplorer,FAMILY_KEY} from '../src/familyProfiles.js';
import {completeDiscovery,discoveryStatus} from '../src/villageActivities.js';
const storage=()=>{const map=new Map();return {getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)}};
test('migrates legacy guest progress and age',()=>{const s=storage();s.setItem('bp-age','12');s.setItem('brightpath3d-save',JSON.stringify({coins:321,completed:{Maths:true},profile:'Alex',avatar:'#f7ad65',outfit:'#7b5ee8',pet:'cat',inventory:['bed'],placed:[]}));const f=readFamily(s);assert.equal(f.profiles[0].save.coins,321);assert.equal(f.profiles[0].age,12);writeFamily(s,f);assert.ok(s.getItem(FAMILY_KEY));});
test('switching profiles isolates progress, age and pets',()=>{const s=storage();let f=readFamily(s);f=addExplorer(f,'Sam',7,'explorer_222');writeFamily(s,f);let first=selectExplorer(f,'explorer_1');first=updateActive(first,{...first.profiles[0].save,coins:999,pet:'dog'},14);writeFamily(s,first);let second=selectExplorer(first,'explorer_222');writeFamily(s,second);assert.equal(JSON.parse(s.getItem('brightpath3d-save')).coins,100);assert.equal(s.getItem('bp-age'),'7');assert.equal(readFamily(s).profiles[0].save.coins,999);assert.equal(readFamily(s).profiles[1].save.pet,null);});
test('cannot add ninth explorer',()=>{let f=readFamily(storage());for(let i=2;i<=8;i++)f=addExplorer(f,'Child'+i,9,'explorer_'+i);assert.throws(()=>addExplorer(f,'Nine',9,'explorer_9'),/Maximum/)});
test('rejects corrupt family data without overwriting',()=>{const s=storage();s.setItem(FAMILY_KEY,'broken');assert.throws(()=>readFamily(s),/damaged/);assert.equal(s.getItem(FAMILY_KEY),'broken')});
test('rejects duplicate profile identifiers',()=>{let f=readFamily(storage());assert.throws(()=>addExplorer(f,'A',8,'explorer_1'),/Invalid/)});

test('discovery rewards remain claimed after family persistence and cannot be earned twice',()=>{
 const s=storage();let f=readFamily(s);const active=f.profiles[0];const first=completeDiscovery(active.save,'pond','Frogs','2026-11-15');assert.equal(first.earned,8);
 f=updateActive(f,first.save,active.age);writeFamily(s,f);
 const reloaded=readFamily(s);const saved=reloaded.profiles[0].save;
 assert.equal(discoveryStatus(saved,'pond','2026-11-15'),true);
 const repeat=completeDiscovery(saved,'pond','Frogs','2026-11-15');
 assert.equal(repeat.earned,0);assert.equal(repeat.save.coins,first.save.coins);
});
