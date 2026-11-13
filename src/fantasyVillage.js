/** Decorative, non-interactive fantasy scenery. Gameplay portals remain owned by main.js. */
export function buildFantasyVillage(THREE,scene){
 const materials=new Map();
 const mat=color=>{if(!materials.has(color))materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.78}));return materials.get(color)};
 const add=(geometry,color,x,y,z)=>{const m=new THREE.Mesh(geometry,mat(color));m.position.set(x,y,z);m.receiveShadow=true;scene.add(m);return m};
 const block=(w,h,d,c,x,y,z)=>add(new THREE.BoxGeometry(w,h,d),c,x,y,z);
 const cone=(r,h,c,x,y,z,sides=8)=>add(new THREE.ConeGeometry(r,h,sides),c,x,y,z);
 const cylinder=(r,h,c,x,y,z)=>add(new THREE.CylinderGeometry(r,r,h,12),c,x,y,z);
 const orb=(r,c,x,y,z)=>add(new THREE.SphereGeometry(r,10,8),c,x,y,z);
 // The academy castle sits beyond the existing subject portals, without obstructing them.
 const castleZ=-30;
 block(12,7,5,0xf5e8cf,0,3.5,castleZ);
 block(4,9,5,0xe8c9e8,0,4.5,castleZ+1);
 for(const x of [-6.3,6.3]){
  cylinder(2.1,10,0xe4d6f2,x,5,castleZ);
  cone(2.9,4.6,0x8455bd,x,12.3,castleZ);
  orb(.5,0xffe9a3,x,14.8,castleZ);
  for(const z of [castleZ-1.7,castleZ+1.7])block(.7,1.4,.16,0xffefad,x,6,z);
 }
 cone(3.8,5.3,0x9b64c5,0,11.6,castleZ+1);
 block(2.7,4,.22,0x6e4e9b,0,2,castleZ+3.1);
 for(const x of [-4,-2,2,4])block(.8,1.5,.16,0xffeab0,x,5.4,castleZ+2.6);
 // An irregular cobbled promenade replaces the oversized rectangular stepping slabs.
 // Instancing keeps the entire path to a single draw call.
 const stoneGeo=new THREE.CylinderGeometry(.24,.26,.065,7);
 const stoneMat=new THREE.MeshStandardMaterial({color:0xc9b69a,roughness:.97});
 const stones=new THREE.InstancedMesh(stoneGeo,stoneMat,1100);
 const dummy=new THREE.Object3D(),tone=new THREE.Color();
 let seed=4703;
 const rand=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296};
 let used=0;
 for(let row=0;row<110;row++){
  const z=11-row*.39,center=Math.sin(row*.13)*1.5;
  for(let col=-5;col<=4;col++){
   if(rand()<.06)continue;
   dummy.position.set(center+(col+(row%2)*.5)*.43+(rand()-.5)*.09,-.047,z+(rand()-.5)*.09);
   dummy.rotation.set(0,rand()*.25,0);
   dummy.scale.set(.78+rand()*.45,.8+rand()*.2,.8+rand()*.4);
   dummy.updateMatrix();stones.setMatrixAt(used,dummy.matrix);
   tone.setHSL(.09+rand()*.03,.13+rand()*.08,.54+rand()*.14);
   stones.setColorAt(used,tone);used++;
  }
 }
 stones.count=used;stones.receiveShadow=true;scene.add(stones);
 // Two water gardens with short bridges, away from the portal entrances.
 for(const side of [-1,1]){
  const x=side*23,z=-7;
  const pool=cylinder(5,.1,0x58b8d9,x,-.07,z);pool.scale.z=.72;
  for(let i=0;i<6;i++){
   const a=i*Math.PI/3;
   orb(.65,0xd3f3f4,x+Math.cos(a)*2.8,.25,z+Math.sin(a)*1.7);
  }
  block(3,.25,8,0xb88c62,x,.22,z);
  for(const dx of [-1.3,1.3])for(const dz of [-3,3])cylinder(.12,1.1,0xf9e4ad,x+dx,.8,z+dz);
 }
 // Distant cliffs, stylised waterfalls and mountains create depth without blocking gameplay.
 for(let i=0;i<9;i++){
  const x=-40+i*10;
  const z=-49-(i%3)*4;
  cone(8+(i%3)*2,15+(i%4)*4,i%2?0x9eb6ad:0x9ab4c7,x,6,z,5);
  cone(2.6,3.6,0xf7f6ed,x,15+(i%4)*3,z,5);
 }
 for(const x of [-34,34]){
  block(2.2,8,.28,0x8ce3f0,x,3.6,-36);
  orb(1.2,0xd9f9ff,x,.1,-35);
 }
 // Flower clusters and lanterns are decorative; portals and their click targets are unchanged.
 for(let i=0;i<45;i++){
  const a=i*2.39996,r=17+(i%5)*3.7,x=Math.cos(a)*r,z=Math.sin(a)*r;
  if(z < -42)continue;
  orb(.22,[0xf5a7c9,0xffe4a0,0xbba9f4][i%3],x,.18,z);
  if(i%6===0){cylinder(.1,2.4,0x886a62,x,1.2,z);orb(.36,0xffe5a2,x,2.5,z)}
 }
 // Atmospheric effects are lightweight and strictly decorative. No new click targets.
 const animated=[];
 const glowMat=new THREE.MeshStandardMaterial({color:0xffd98b,emissive:0xffb34c,emissiveIntensity:.65,roughness:.45});
 const pondMat=new THREE.MeshStandardMaterial({color:0x5ebfd8,transparent:true,opacity:.42,metalness:.1,roughness:.22,depthWrite:false});
 // Gently rippling overlays, held above the existing water gardens.
 for(const side of [-1,1]){
  const surface=new THREE.Mesh(new THREE.CircleGeometry(3.65,32),pondMat.clone());
  surface.rotation.x=-Math.PI/2;surface.position.set(side*23,.005,-7);scene.add(surface);
  animated.push({kind:'water',mesh:surface,phase:side});
 }
 // Warm lamp halos give the pathways an inviting evening-adventure feeling.
 for(let i=0;i<8;i++){
  const z=9-i*4.1,x=(i%2?-1:1)*5.4;
  cylinder(.12,2.3,0x6f4a36,x,1.15,z);
  const lantern=add(new THREE.OctahedronGeometry(.35),0xffd98b,x,2.55,z);
  lantern.material=glowMat.clone();
  animated.push({kind:'light',mesh:lantern,phase:i*.9});
 }
 // Flowering trees on the village perimeter, away from lesson entrances.
 for(let i=0;i<18;i++){
  const a=i*Math.PI*2/18,rad=32+(i%3)*2.5;
  const x=Math.cos(a)*rad,z=Math.sin(a)*rad;
  if(z < -39)continue;
  cylinder(.32,3.2,0x79543b,x,1.6,z);
  const crown=orb(2.05,[0x78b879,0x91c58a,0xd8a5bd][i%3],x,4.1,z);
  crown.scale.set(1.2,.88,1.1);
  for(let j=0;j<3;j++)orb(.26,0xffd9aa,x+Math.cos(j*2.1)*1.1,4.15,z+Math.sin(j*2.1)*.8);
 }
 // Firefly motes drift above the flower gardens. Modest count for mobile devices.
 for(let i=0;i<18;i++){
  const angle=i*2.39996,radius=16+(i%4)*3.1;
  const x=Math.cos(angle)*radius,z=Math.sin(angle)*radius;
  const mote=new THREE.Mesh(new THREE.SphereGeometry(.09,6,4),glowMat.clone());
  mote.position.set(x,1.3+(i%3)*.35,z);scene.add(mote);
  animated.push({kind:'firefly',mesh:mote,baseY:mote.position.y,phase:i*1.37});
 }
 function update(timeMs){
  const t=timeMs*.001;
  for(const item of animated){
   if(item.kind==='water')item.mesh.material.opacity=.32+.09*Math.sin(t*.8+item.phase);
   else if(item.kind==='light')item.mesh.material.emissiveIntensity=.55+.15*Math.sin(t*1.7+item.phase);
   else {item.mesh.position.y=item.baseY+.24*Math.sin(t*.85+item.phase);item.mesh.position.x+=Math.sin(t+item.phase)*.00035;item.mesh.material.emissiveIntensity=.45+.25*Math.sin(t*1.3+item.phase)}
  }
 }
 return {castle:{x:0,z:castleZ},decorative:true,update};
}
