import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {achievementGallery} from '../src/achievementGallery.js';
import {filterAchievementGallery} from '../src/galleryFilters.js';
import {achievementCollectionSummary} from '../src/achievementCollectionSummary.js';
import {achievementSpotlight} from '../src/achievementSpotlight.js';
import {achievementProgress} from '../src/achievementProgress.js';
import {galleryCelebration} from '../src/galleryCelebrations.js';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/style.css',import.meta.url),'utf8');
const galleryUI=main.slice(main.indexOf('function showAchievementGallery(){'),main.indexOf('function showAchievements(){'));

test('gallery navigation has accessible landmarks and working target identifiers',()=>{
 for(const id of ['galleryCollectionHeading','gallerySpotlightHeading','galleryRecommendationsHeading','achievementGalleryGroups']){
  assert.match(galleryUI,new RegExp('href="#'+id+'"'));
  assert.match(galleryUI,new RegExp('id="'+id+'"'));
 }
 assert.match(galleryUI,/aria-label="Achievement gallery sections"/);
 assert.match(galleryUI,/galleryBack.*onclick=showAchievements/s);
});
test('filters are keyboard-operable buttons with announced selection and results',()=>{
 for(const filter of ['all','earned','upcoming'])assert.match(galleryUI,new RegExp('data-gallery-filter="'+filter+'"'));
 assert.match(galleryUI,/aria-pressed/);
 assert.match(galleryUI,/galleryFilterStatus.*role="status"/);
 assert.match(galleryUI,/setAttribute\('aria-pressed'/);
 assert.match(galleryUI,/renderGallery\(button\.dataset\.galleryFilter\)/);
});
test('gallery progress, celebration and navigation controls have accessible names',()=>{
 assert.match(galleryUI,/setAttribute\('aria-label',badge\.title\+' progress'\)/);
 assert.match(galleryUI,/setAttribute\('aria-label','Celebrate '/);
 assert.match(galleryUI,/aria-live="polite"/);
 assert.match(galleryUI,/createElement\('button'\)/);
 assert.match(galleryUI,/textContent=step\.description/);
});
test('small-screen layout and visible focus styling are present',()=>{
 assert.match(css,/@media\(max-width:480px\)/);
 assert.match(css,/@media\(max-width:340px\)/);
 assert.match(css, /gallery-jump-links a:focus-visible/);
 assert.match(css, /min-height:44px/);
 assert.match(css, /prefers-reduced-motion:reduce/);
});
test('collection, spotlight, filters and celebration agree on saved explorer state',()=>{
 const save={completed:{},goalKeepsakes:['Maths:1'],coins:27};
 const gallery=achievementGallery(save,['Maths'],'2026-11-13');
 const summary=achievementCollectionSummary(gallery);
 assert.equal(summary.total,gallery.total);
 assert.equal(summary.earned,gallery.earned);
 assert.equal(filterAchievementGallery(gallery,'earned').visible,summary.earned);
 assert.equal(filterAchievementGallery(gallery,'upcoming').visible,summary.remaining);
 const spotlight=achievementSpotlight(gallery);
 if(spotlight)assert.ok(achievementProgress({...spotlight.progress,current:spotlight.progress.value,goal:spotlight.progress.max}));
 const earned=gallery.groups.flatMap(g=>g.items).find(b=>b.earned);
 assert.ok(earned);
 assert.ok(galleryCelebration(earned)?.message);
 assert.equal(save.coins,27);
});
