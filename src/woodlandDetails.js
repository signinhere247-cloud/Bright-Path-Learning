/** Instanced woodland undergrowth; keeps the central village paths clear. */
export function addWoodlandDetails(THREE,scene){
 const group=new THREE.Group();group.name='Woodland details';scene.add(group);
 let seed=81427;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const dummy=new THREE.Object3D(),tone=new THREE.Color();
 const create=(geometry,material,count)=>{const m=new THREE.InstancedMesh(geometry,material,count);m.count=0;m.receiveShadow=true;group.add(m);return m};
 const grass=create(new THREE.ConeGeometry(.12,.68,4),new THREE.MeshStandardMaterial({color:0x8baa70,roughness:1}),600);
 const fern=create(new THREE.IcosahedronGeometry(.36,0),new THREE.MeshStandardMaterial({color:0x5b8c59,roughness:1}),150);
 const rocks=create(new THREE.DodecahedronGeometry(.33,0),new THREE.MeshStandardMaterial({color:0xa7a395,roughness:1}),95);
 const mushrooms=create(new THREE.ConeGeometry(.19,.18,8),new THREE.MeshStandardMaterial({color:0xbb6f5f,roughness:.9}),65);
 const add=(mesh,x,y,z,sx,sy,sz,color)=>{
  const i=mesh.count++;dummy.position.set(x,y,z);dummy.rotation.set(0,random()*Math.PI*2,0);
  dummy.scale.set(sx,sy,sz);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
  mesh.setColorAt(i,color);
 };
 for(let i=0;i<650;i++){
  const a=random()*Math.PI*2,r=20+random()*22,x=Math.cos(a)*r,z=Math.sin(a)*r;
  if(z< -40)continue;
  const slope=Math.max(0,Math.min(1,(r-19)/24));
  const y=-.07+slope*(.6+(Math.sin(x*.13+z*.07)*1.1+Math.cos(z*.16-x*.045)*.85+Math.sin(x*.31+z*.23)*.32)*.85);
  const pick=random();
  if(pick<.66&&grass.count<600){
   tone.setHSL(.26+random()*.06,.32+random()*.15,.36+random()*.16);
   add(grass,x,y+.2,z,.6+random()*.7,.5+random()*.9,.6+random()*.7,tone);
  }else if(pick<.83&&fern.count<150){
   tone.setHSL(.29+random()*.05,.25+random()*.15,.31+random()*.13);
   add(fern,x,y+.22,z,1+random()*.5,.45+random()*.4,1+random()*.5,tone);
  }else if(pick<.94&&rocks.count<95){
   tone.setHSL(.11,.06,.46+random()*.19);
   add(rocks,x,y+.13,z,.6+random(),.3+random()*.5,.6+random(),tone);
  }else if(mushrooms.count<65){
   tone.setHSL(random()*.04,.3+random()*.25,.45+random()*.15);
   add(mushrooms,x,y+.18,z,.6+random()*.4,.8+random()*.5,.6+random()*.4,tone);
  }
 }
 for(const m of [grass,fern,rocks,mushrooms]){m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true}
 return group;
}
