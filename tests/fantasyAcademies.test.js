import test from 'node:test';
import assert from 'node:assert/strict';
import {ACADEMY_STYLES,buildFantasyAcademy} from '../src/fantasyAcademies.js';
test('all six school subjects have distinctive academy themes',()=>{
 assert.equal(Object.keys(ACADEMY_STYLES).length,6);
 assert.equal(new Set(Object.values(ACADEMY_STYLES).map(s=>s.theme)).size,6);
});
test('academy builder preserves original world coordinates and portal placement',()=>{
 class Obj {constructor(...args){this.args=args;this.geometry=args[0];this.children=[];this.position={set:(...v)=>{this.position.coords=v}};this.rotation={};this.material={};}add(child){this.children.push(child)}}
 const THREE={Group:Obj,Mesh:Obj,MeshStandardMaterial:Obj,BoxGeometry:Obj,SphereGeometry:Obj,ConeGeometry:Obj,CylinderGeometry:Obj,TorusGeometry:Obj,OctahedronGeometry:Obj,Color:Obj};
 const scene=new Obj();let label;
 const group=buildFantasyAcademy(THREE,scene,{name:'Maths',x:-12,z:-9,c:0xffaa00},(...args)=>label=args);
 assert.deepEqual(group.position.coords,[-12,0,-9]);
 assert.ok(group.children.some(m=>m.geometry?.args?.[0]===1.1&&m.position.coords?.[2]===4));
 assert.deepEqual(label,['Maths',-12,9.5,-9]);
});
