/** Shared-geometry storybook trees; decorative and non-interactive. */
export function addStorybookTrees(THREE,scene) {
 const group=new THREE.Group();group.name='Storybook woodland';scene.add(group);
 const bark=new THREE.MeshStandardMaterial({color:0x755039,roughness:1});
 const leaves=[0x527d4b,0x638f57,0x7b9c63,0x8caa73,0xa1ad79].map(color=>new THREE.MeshStandardMaterial({color,roughness:.94,flatShading:false}));
 const trunkGeo=new THREE.CylinderGeometry(.19,.36,1,7);
 const branchGeo=new THREE.CylinderGeometry(.075,.14,1,6);
 const crownGeo=new THREE.IcosahedronGeometry(1,1);
 const tree=(x,z,index)=>{
  const root=new THREE.Group();root.position.set(x,0,z);
  const height=2.6+(index%4)*.33;
  const trunk=new THREE.Mesh(trunkGeo,bark);trunk.position.y=height*.5;trunk.scale.y=height;root.add(trunk);
  for(let j=0;j<3;j++){
   const angle=j*Math.PI*2/3+index*.37;
   const branch=new THREE.Mesh(branchGeo,bark);
   branch.position.set(Math.cos(angle)*.48,height*.75,Math.sin(angle)*.48);
   branch.rotation.z=Math.sin(angle)*.83;
   branch.rotation.x=-Math.cos(angle)*.83;
   branch.scale.y=1.7;root.add(branch);
  }
  for(let j=0;j<7;j++){
   const a=j*2.39996+index*.53;
   const ring=j===0?0:1.0+(j%3)*.24;
   const puff=new THREE.Mesh(crownGeo,leaves[(index+j)%leaves.length]);
   puff.position.set(Math.cos(a)*ring,height+1.15+((j*3)%4)*.31,Math.sin(a)*ring);
   puff.scale.set(1.05+(j%3)*.15,.9+(j%2)*.21,1.05+(j%4)*.08);
   root.add(puff);
  }
  root.scale.setScalar(.85+(index%5)*.09);
  group.add(root);
 };
 // Keep academy doorways and the cottage showcase clear.
 for(let i=0;i<30;i++){
  const a=i*2.39996323,r=24+(i%5)*2.3;
  const x=Math.cos(a)*r,z=Math.sin(a)*r;
  if(z< -39)continue;
  tree(x,z,i);
 }
 return group;
}
