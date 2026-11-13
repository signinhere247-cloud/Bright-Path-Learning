import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createDirectionalInput} from '../src/directionalInput.js';
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/style.css',import.meta.url),'utf8');
test('all four on-screen directions have accessible names and button semantics',()=>{
 for(const [dir,label] of [['up','Walk forward'],['down','Walk backward'],['left','Walk left'],['right','Walk right']]){
  assert.ok(main.includes('data-dir="'+dir+'" aria-label="'+label+'"'));
 }
 assert.ok(main.includes('role="group" aria-label="Explorer movement controls"'));
 assert.ok(main.includes('aria-label="Interact with nearby village location"'));
});
test('touch controls expose pressed state and reset on movement cancellation',()=>{
 assert.ok(main.includes("button.setAttribute('aria-pressed','true')"));
 assert.ok(main.includes("button.setAttribute('aria-pressed','false')"));
 assert.ok(main.includes('touchMovement.release(e.pointerId)'));
 const input=createDirectionalInput();
 input.press(1,'arrowup');input.press(2,'arrowup');input.release(1);
 assert.equal(input.keys.has('arrowup'),true);
 input.clear();assert.equal(input.keys.size,0);
});
test('mobile controls have minimum touch size, safe-area spacing and focus styles',()=>{
 assert.ok(css.includes('#joystick button{min-width:52px;min-height:52px'));
 assert.ok(css.includes('env(safe-area-inset-bottom'));
 assert.ok(css.includes('#joystick button:focus-visible'));
 assert.ok(css.includes('prefers-reduced-motion:reduce'));
});
test('Enter interaction is guarded against key repeat and home mode',()=>{
 assert.ok(main.includes("!e.repeat&&e.target===document.body&&mode==='world'"));
});
