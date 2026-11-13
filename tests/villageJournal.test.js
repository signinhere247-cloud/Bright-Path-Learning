import test from 'node:test';
import assert from 'node:assert/strict';
import {villageJournal,journalSummary} from '../src/villageJournal.js';
test('journal only reveals explanations for completed discoveries',()=>{
 const entries=villageJournal({discoveries:{pond:'2026-11-13'}},'2026-11-13');
 assert.equal(entries.length,6);
 assert.equal(entries.find(e=>e.id==='pond').completedToday,true);
 assert.ok(entries.find(e=>e.id==='pond').explanation);
 assert.equal(entries.find(e=>e.id==='garden').explanation,null);
});
test('journal summary is per explorer and per day',()=>{
 const a=journalSummary({discoveries:{pond:'2026-11-12',garden:'2026-11-13'}},'2026-11-13');
 assert.deepEqual(a,{discovered:2,total:6,today:1});
 assert.equal(journalSummary({},'2026-11-13').discovered,0);
});
test('invalid journal date is rejected',()=>assert.throws(()=>villageJournal({},'tomorrow')));
