import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createDirectionalInput} from '../src/directionalInput.js';
test('two simultaneous touches keep both directions active',()=>{
 const input=createDirectionalInput();
 input.press(1,'arrowup');input.press(2,'arrowright');
 assert.deepEqual([...input.keys].sort(),['arrowright','arrowup']);
 input.release(1);
 assert.equal(input.keys.has('arrowright'),true);
 assert.equal(input.keys.has('arrowup'),false);
 input.release(2);
 assert.equal(input.keys.size,0);
});
test('two fingers on same direction do not cancel one another',()=>{
 const input=createDirectionalInput();
 input.press(1,'arrowup');input.press(2,'arrowup');
 input.release(1);assert.equal(input.keys.has('arrowup'),true);
 input.release(2);assert.equal(input.keys.has('arrowup'),false);
});
test('cancellation and focus loss clear all held movement',()=>{
 const input=createDirectionalInput();
 input.press(7,'arrowleft');input.press(8,'arrowdown');
 input.clear();assert.equal(input.heldCount(),0);assert.equal(input.keys.size,0);
 input.release(7);assert.equal(input.keys.size,0);
});
test('game uses independent pointer tracking and avoids repeat Enter',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.ok(main.includes('const touchMovement=createDirectionalInput()'));
 assert.ok(main.includes('touchMovement.press(e.pointerId,key)'));
 assert.ok(main.includes('touchMovement.release(e.pointerId)'));
 assert.ok(main.includes('touchMovement.clear()'));
 assert.ok(main.includes('!e.repeat'));
 assert.ok(main.includes('movingKey('));
});
