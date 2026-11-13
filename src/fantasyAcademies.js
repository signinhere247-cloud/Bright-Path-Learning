/** Visual-only academy architecture. Portal coordinates and interaction rules stay in main.js. */
export const ACADEMY_STYLES=Object.freeze({
 Maths:{theme:'observatory',roof:0xd77c45,trim:0xffd38b},
 English:{theme:'storybook',roof:0xc15b98,trim:0xffd5ee},
 Science:{theme:'laboratory',roof:0x278e92,trim:0xa5f9e5},
 History:{theme:'clocktower',roof:0x7855aa,trim:0xffdba0},
 Geography:{theme:'explorer',roof:0x4689c2,trim:0xb5ecff},
 Computing:{theme:'crystal',roof:0x5c8e4e,trim:0xb7f2a0}
});
export function buildFantasyAcademy(THREE,scene,building,addLabel){
 const {x,z,name,c}=building,style=ACADEMY_STYLES[name]||{theme:'cottage',roof:0x8a6fa9,trim:0xffe7bb};
 const group=new THREE.Group();group.position.set(x,0,z);group.name=`${name} academy decoration`;group.userData={...group.userData,interactionBuilding:name};scene.add(group);
 const material=color=>new THREE.MeshStandardMaterial({color,roughness:.72,metalness:.04});
 const shape=(geometry,color,px,py,pz)=>{const m=new THREE.Mesh(geometry,material(color));m.position.set(px,py,pz);m.castShadow=true;m.receiveShadow=true;group.add(m);return m};
 const box=(w,h,d,color,px,py,pz)=>shape(new THREE.BoxGeometry(w,h,d),color,px,py,pz);
 const orb=(r,color,px,py,pz)=>shape(new THREE.SphereGeometry(r,12,9),color,px,py,pz);
 const spire=(r,h,color,px,py,pz,n=8)=>shape(new THREE.ConeGeometry(r,h,n),color,px,py,pz);
 const tower=(r,h,color,px,py,pz)=>shape(new THREE.CylinderGeometry(r,r,h,12),color,px,py,pz);
 // Geography is now housed in a textured storybook cottage GLB, not primitive geometry.
 // Preserve the exact portal coordinates and labels for lessons.
 if(name==='Geography'){
   const portal=tower(1.1,.08,0xffe682,0,.06,4);
   portal.material.emissive=new THREE.Color(0xb78b1d);
   portal.material.emissiveIntensity=.5;
   addLabel(name,x,9.5,z);
   return group;
 }
 // Compact footprint leaves existing walkway and glowing portal at local z=+4 accessible.
 box(4.8,3.2,4,c,0,1.6,0);
 box(5.15,.28,4.3,style.trim,0,3.22,0);
 const roof=spire(3.55,2.4,style.roof,0,4.52,0,4);roof.rotation.y=Math.PI/4;
 box(1.3,2,.13,0x5c4472,0,1,2.08);
 box(1.05,1.05,.14,0xfff0b4,-1.5,2,2.08);
 box(1.05,1.05,.14,0xfff0b4,1.5,2,2.08);
 // Handcrafted facade details: timber framing, stone plinth, arched windows and lanterns.
 // Keep the portal at local z=4 unobstructed.
 const timber=0x76543c,stone=0x9c927e,glass=0xffd99a;
 box(5.05,.42,4.18,stone,0,.21,0);
 for(const side of [-1,1]){
   box(.17,3.05,.18,timber,side*2.29,1.68,2.1);
   box(.17,3.05,.18,timber,side*2.29,1.68,-2.1);
   box(.18,.18,4.25,timber,side*2.29,2.86,0);
   // Arched, warm-lit windows and carved frames.
   box(.88,1.15,.08,timber,side*1.45,1.85,2.16);
   box(.66,.94,.09,glass,side*1.45,1.86,2.22);
   const arch=shape(new THREE.TorusGeometry(.33,.09,6,12,Math.PI),timber,side*1.45,2.34,2.22);
   arch.rotation.z=0;
   box(.09,.95,.11,timber,side*1.45,1.84,2.29);
   box(.73,.09,.12,timber,side*1.45,1.83,2.29);
   const lantern=shape(new THREE.OctahedronGeometry(.22,0),0xffd58b,side*.95,2.72,2.4);
   lantern.material.emissive=new THREE.Color(0xffa84a);
   lantern.material.emissiveIntensity=.6;
 }
 box(4.9,.2,.2,timber,0,2.92,2.11);
 box(1.52,.18,.18,timber,0,2.1,2.17);
 for(let i=0;i<6;i++){
   const px=-2.05+i*.82;
   box(.07,.34,.16,style.roof,px,3.36,2.12);
 }
 for(const side of [-1,1]){
  tower(.42,3.9,style.trim,side*2.15,1.95,-1.45);
  spire(.67,1.25,style.roof,side*2.15,4.55,-1.45);
 }
 // Distinct silhouettes make each subject recognisable without relying on labels alone.
 switch(style.theme){
  case 'observatory':
   tower(.85,1.15,0xf7dca2,0,5.95,-.3);orb(.86,0x5a7eaa,0,6.75,-.3);
   for(const side of [-1,1])orb(.26,0xffe4a0,side*1.7,4.2,1.35);
   break;
  case 'storybook':
   box(1.65,.25,1.05,0xfaf1d8,0,5.8,0);
   for(const side of [-1,1]){const page=box(.72,.08,.9,0xfff4d2,side*.4,6.03,0);page.rotation.z=side*.22}
   orb(.3,0xffd3ed,0,6.5,0);
   break;
  case 'laboratory':
   tower(.48,1.65,0xd7faf1,0,6.05,0);orb(.72,0x72e7dc,0,7.05,0);
   for(const side of [-1,1])orb(.35,0xa9fff1,side*1.7,4.35,1.2);
   break;
  case 'clocktower':{
   tower(.9,2.6,0xe8d8b5,0,6.25,0);
   const face=shape(new THREE.CylinderGeometry(.63,.63,.12,16),0xfff0c6,0,6.55,1);face.rotation.x=Math.PI/2;
   box(.07,.55,.08,0x544372,0,6.65,1.1);box(.38,.07,.08,0x544372,.15,6.55,1.1);
   spire(1.1,1.3,style.roof,0,8.2,0);break;
  }
  case 'explorer':
   orb(.85,0x6dbbb4,0,6.2,0);
   shape(new THREE.TorusGeometry(.92,.1,7,18),0xfce3a3,0,6.2,0).rotation.x=.55;
   spire(.3,.85,0xffe9a0,0,7.35,0);
   break;
  case 'crystal':
   spire(.9,2.25,0x8be6d0,0,6.05,0,6);
   for(const side of [-1,1])spire(.45,1.4,0xb0f1aa,side*1.4,5.35,.3,6);
   break;
  default:orb(.5,style.trim,0,5.85,0);
 }
 // Keep the existing glowing portal and original interaction target unchanged.
 const portal=tower(1.1,.08,0xffe682,0,.06,4);
 portal.material.emissive=new THREE.Color(0xb78b1d);portal.material.emissiveIntensity=.5;
 addLabel(name,x,9.5,z);
 return group;
}
