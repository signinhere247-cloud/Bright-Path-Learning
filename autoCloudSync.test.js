import test from 'node:test';
import assert from 'node:assert/strict';
import {autoSyncEnabled,setAutoSyncEnabled,createAutoSyncCoordinator} from '../src/autoCloudSync.js';
const storage=()=>{const data=new Map();return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)}};
test('automatic sync requires opt-in',()=>{const s=storage();assert.equal(autoSyncEnabled(s),false);setAutoSyncEnabled(s,true);assert.equal(autoSyncEnabled(s),true);setAutoSyncEnabled(s,false);assert.equal(autoSyncEnabled(s),false)});
test('debounces multiple changes into one upload',async()=>{let calls=0;const timers=new Map();let id=0;const c=createAutoSyncCoordinator({linked:()=>true,upload:async()=>{calls++},setTimer:fn=>{timers.set(++id,fn);return id},clearTimer:key=>timers.delete(key)});c.changed('explorer_one');c.changed('explorer_one');assert.equal(timers.size,1);await c.flush();assert.equal(calls,1)});
test('unlinked profile never uploads',async()=>{let calls=0;const c=createAutoSyncCoordinator({linked:()=>false,upload:async()=>calls++});c.changed('explorer_one');await c.flush();assert.equal(calls,0);assert.equal(c.status.paused,true);c.stop()});
test('failed upload pauses without retrying automatically',async()=>{let calls=0;const c=createAutoSyncCoordinator({linked:()=>true,upload:async()=>{calls++;throw Error('revision conflict')}});c.changed('explorer_one');await c.flush();assert.equal(c.status.paused,true);assert.equal(c.status.dirty,true);await c.flush();assert.equal(calls,1);c.stop()});
test('disabled coordinator does not schedule changes',()=>{let calls=0;const c=createAutoSyncCoordinator({linked:()=>true,upload:async()=>{},setTimer:()=>{calls++}});c.pause();c.changed('explorer_one');assert.equal(calls,0);c.stop()});

test('pending sync stays assigned to original explorer',async()=>{
 const sent=[];const c=createAutoSyncCoordinator({linked:id=>id==='explorer_one',upload:async id=>sent.push(id)});
 c.changed('explorer_one');await c.flush();assert.deepEqual(sent,['explorer_one']);c.stop();
});
test('switching explorer while a sync is pending pauses instead of uploading another child',async()=>{
 const sent=[];const c=createAutoSyncCoordinator({linked:()=>true,upload:async id=>sent.push(id)});
 c.changed('explorer_one');c.changed('explorer_two');await c.flush();
 assert.deepEqual(sent,[]);assert.equal(c.status.paused,true);c.stop();
});
test('stopping a coordinator cancels pending upload',async()=>{
 const sent=[];const c=createAutoSyncCoordinator({linked:()=>true,upload:async id=>sent.push(id)});
 c.changed('explorer_one');c.stop();await c.flush();assert.deepEqual(sent,[]);
});
