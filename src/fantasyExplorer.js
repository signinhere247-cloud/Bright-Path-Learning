// Stylised explorer made from lightweight Three.js geometry; no external assets required.
export function buildFantasyExplorer(THREE,skin='#f7ad65',outfit='#7b5ee8'){
 const group=new THREE.Group();
 const materials={skin:new THREE.MeshStandardMaterial({color:skin,roughness:.86}),outfit:new THREE.MeshStandardMaterial({color:outfit,roughness:.76}),hair:new THREE.MeshStandardMaterial({color:0x503327,roughness:.92}),boots:new THREE.MeshStandardMaterial({color:0x36446a}),trim:new THREE.MeshStandardMaterial({color:0xffd88b,metalness:.15}),eyes:new THREE.MeshStandardMaterial({color:0x292735}),white:new THREE.MeshStandardMaterial({color:0xffffff})};
 const part=(geometry,material,x,y,z,parent=group)=>{const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh};
 const torso=part(new THREE.CylinderGeometry(.35,.48,.86,12),materials.outfit,0,1.32,0);
 part(new THREE.CylinderGeometry(.37,.4,.14,12),materials.trim,0,.93,0);
 const head=part(new THREE.SphereGeometry(.39,18,14),materials.skin,0,2.09,0);
 part(new THREE.SphereGeometry(.402,18,12,0,Math.PI*2,0,Math.PI*.46),materials.hair,0,2.21,-.055);
 for(const x of [-.16,.16]){part(new THREE.SphereGeometry(.055,10,8),materials.white,x,2.11,.357);part(new THREE.SphereGeometry(.032,10,8),materials.eyes,x,2.11,.405)}
 const smile=part(new THREE.TorusGeometry(.095,.012,5,16,Math.PI),materials.hair,0,1.96,.371);smile.rotation.z=Math.PI;
 const arms=[],legs=[];
 for(const side of [-1,1]){
  const arm=new THREE.Group();arm.position.set(side*.41,1.67,0);group.add(arm);
  part(new THREE.CapsuleGeometry(.115,.4,4,8),materials.outfit,side*.045,-.31,0,arm);
  part(new THREE.SphereGeometry(.12,10,8),materials.skin,side*.045,-.67,.02,arm);arms.push(arm);
  const leg=new THREE.Group();leg.position.set(side*.23,.91,0);group.add(leg);
  part(new THREE.CapsuleGeometry(.135,.39,4,8),materials.boots,0,-.34,0,leg);
  part(new THREE.BoxGeometry(.28,.17,.39),materials.boots,0,-.68,.085,leg);legs.push(leg);
 }
 // A small explorer backpack and golden compass emblem.
 part(new THREE.BoxGeometry(.63,.68,.22),materials.boots,0,1.35,-.37);
 part(new THREE.SphereGeometry(.11,12,10),materials.trim,0,1.43,.357);
 const animate=(time,moving)=>{const swing=moving?Math.sin(time*.011)*.45:Math.sin(time*.002)*.045;arms[0].rotation.x=swing;arms[1].rotation.x=-swing;legs[0].rotation.x=-swing;legs[1].rotation.x=swing;torso.rotation.z=moving?Math.sin(time*.011)*.025:0;head.rotation.z=Math.sin(time*.0014)*.025};
 const setAppearance=(nextSkin,nextOutfit)=>{materials.skin.color.set(nextSkin);materials.outfit.color.set(nextOutfit)};
 return {group,animate,setAppearance};
}
