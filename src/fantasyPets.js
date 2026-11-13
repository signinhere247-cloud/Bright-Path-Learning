/** Lightweight animated fantasy companions; geometry is created locally without downloads. */
export function buildFantasyPet(THREE,kind){
 if(!['cat','dog'].includes(kind))throw Error('Unknown fantasy pet');
 const group=new THREE.Group();
 const cat=kind==='cat';
 const fur=new THREE.MeshStandardMaterial({color:cat?0xe4b78a:0xc58e61,roughness:.9});
 const cream=new THREE.MeshStandardMaterial({color:0xffe7c6,roughness:.9});
 const dark=new THREE.MeshStandardMaterial({color:0x302b35});
 const eyes=new THREE.MeshStandardMaterial({color:cat?0x4caa83:0x704e38});
 const gold=new THREE.MeshStandardMaterial({color:0xffd66d,metalness:.4,roughness:.35});
 const pink=new THREE.MeshStandardMaterial({color:0xe8879b});
 const part=(geometry,material,x,y,z,parent=group)=>{const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh};
 part(new THREE.SphereGeometry(.37,16,12),fur,0,.49,-.12).scale.set(1,.8,1.35);
 part(new THREE.SphereGeometry(.29,16,12),fur,0,.78,.27);
 part(new THREE.SphereGeometry(.18,12,10),cream,0,.64,.46).scale.set(1,.65,.45);
 for(const side of [-1,1]){
  if(cat){const ear=part(new THREE.ConeGeometry(.13,.27,4),fur,side*.2,1.11,.25);ear.rotation.y=Math.PI/4;part(new THREE.ConeGeometry(.07,.14,4),pink,side*.2,1.12,.31).rotation.y=Math.PI/4}
  else {const ear=part(new THREE.SphereGeometry(.14,10,8),fur,side*.29,.88,.18);ear.scale.set(.65,1.25,.75);ear.rotation.z=side*.4}
  part(new THREE.SphereGeometry(.063,10,8),cream,side*.115,.82,.51);
  part(new THREE.SphereGeometry(.04,10,8),eyes,side*.115,.82,.562);
  part(new THREE.SphereGeometry(.016,8,6),cream,side*.103,.84,.596);
  for(const z of [-.35,.28])part(new THREE.CapsuleGeometry(.095,.19,4,8),fur,side*.23,.2,z);
 }
 part(new THREE.SphereGeometry(.062,10,8),pink,0,.7,.57);
 const collar=part(new THREE.TorusGeometry(.23,.045,7,18),gold,0,.56,.23);collar.rotation.x=Math.PI/2;
 part(new THREE.SphereGeometry(.065,10,8),gold,0,.45,.48);
 const tail=new THREE.Group();tail.position.set(0,.57,-.52);group.add(tail);
 const tailMesh=part(new THREE.CapsuleGeometry(cat?.065:.09,cat?.46:.3,5,9),fur,0,.25,-.12,tail);tailMesh.rotation.x=-.42;
 if(cat){for(const side of [-1,1])for(const dy of [-.035,.025]){const whisker=part(new THREE.CylinderGeometry(.007,.007,.24,5),cream,side*.22,.68+dy,.54);whisker.rotation.z=side*1.15}}
 const animate=(time,moving=false,action=null)=>{
  const speed=moving?.014:.004;
  tail.rotation.z=Math.sin(time*speed)*(.27+(action==='play'?.25:0));
  group.rotation.z=Math.sin(time*.003)*.025;
  group.scale.y=1+Math.sin(time*(action==='play'?.014:.004))*(action==='play'?.045:.012);
 };
 const dispose=()=>{group.traverse(child=>{if(child.isMesh)child.geometry.dispose()});for(const material of [fur,cream,dark,eyes,gold,pink])material.dispose()};
 return {group,animate,dispose,kind};
}
