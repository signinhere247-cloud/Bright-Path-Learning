/** Slow ambient drifting lights and floating seed fluff, with no gameplay collisions. */
export function addVillageMagic(THREE,scene){
 const count=48;
 const geo=new THREE.SphereGeometry(.065,6,4);
 const mat=new THREE.MeshBasicMaterial({color:0xffe6a7,transparent:true,opacity:.7,depthWrite:false});
 const motes=new THREE.InstancedMesh(geo,mat,count);
 motes.frustumCulled=false;motes.name='Floating woodland motes';scene.add(motes);
 const dummy=new THREE.Object3D();
 const particles=[];
 for(let i=0;i<count;i++){
  const angle=i*2.39996323,r=11+(i%7)*4.1;
  particles.push({x:Math.cos(angle)*r,z:Math.sin(angle)*r,y:1.1+(i%9)*.38,phase:i*.93,speed:.25+(i%5)*.07});
 }
 let previous=-1;
 function update(now){
  // Update only 20 times a second, even on high refresh-rate phones.
  if(previous>=0&&now-previous<50)return;
  previous=now;
  const t=now*.001;
  for(let i=0;i<count;i++){
   const p=particles[i],drift=t*p.speed+p.phase;
   dummy.position.set(p.x+Math.sin(drift*.7)*.65,p.y+Math.sin(drift)*.35,p.z+Math.cos(drift*.6)*.65);
   const scale=.65+.3*(1+Math.sin(t*1.5+p.phase));
   dummy.scale.setScalar(scale);dummy.updateMatrix();motes.setMatrixAt(i,dummy.matrix);
  }
  motes.instanceMatrix.needsUpdate=true;
 }
 update(0);
 return {update};
}
