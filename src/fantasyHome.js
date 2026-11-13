// Cosy Adventure Home: a timber-framed cottage, not a pastel dollhouse.
// The permanent environment is separate from player-owned furniture.
export function buildFantasyHome(THREE){
 const scene=new THREE.Scene();scene.background=new THREE.Color(0xa5c5d1);
 scene.add(new THREE.HemisphereLight(0xffeed4,0x685341,2.1));
 const sun=new THREE.DirectionalLight(0xffd6a0,2.1);sun.position.set(-5,10,7);scene.add(sun);
 const firelight=new THREE.PointLight(0xff8b37,2.1,9);firelight.position.set(4.2,1.5,-4.3);scene.add(firelight);
 const group=new THREE.Group();scene.add(group);
 const mat=(c,glow=false)=>new THREE.MeshStandardMaterial({color:c,roughness:.8,emissive:glow?c:0x000000,emissiveIntensity:glow?.5:0});
 function box(w,h,d,c,x,y,z,glow=false){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,glow));m.position.set(x,y,z);m.receiveShadow=true;group.add(m);return m}
 function ball(r,c,x,y,z,glow=false){const m=new THREE.Mesh(new THREE.SphereGeometry(r,12,10),mat(c,glow));m.position.set(x,y,z);group.add(m);return m}
 function beam(a,b,r=.15){const v=new THREE.Vector3(...b).sub(new THREE.Vector3(...a));const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,v.length(),8),mat(0x68442d));m.position.copy(new THREE.Vector3(...a).add(new THREE.Vector3(...b)).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());group.add(m)}
 // Open front keeps the explorer, purchased furniture and placement visible.
 box(13,.3,11,0x936846,0,-.2,0);
 for(let x=-6;x<=6;x+=1.2)box(.045,.018,10.8,0x6b482f,x,-.02,0);
 box(13,6,.25,0xe5cda8,0,3,-5.45);
 for(const x of [-6.45,6.45])box(.25,6,11,0xe5cda8,x,3,0);
 for(const x of [-6.2,-3.1,0,3.1,6.2]){
  box(.28,5.8,.3,0x68442d,x,2.9,-5.2);
  beam([x,5.8,-5.1],[x,6.8,0]);
 }
 for(const z of [-5.1,0,5.1])beam([-6.2,5.8,z],[6.2,5.8,z],.18);
 for(const x of [-6.2,6.2])for(const z of [-5.1,5.1])box(.3,5.8,.3,0x68442d,x,2.9,z);
 // Timber-framed daylight windows.
 for(const x of [-4.3,0,4.3]){
  box(2.1,2.55,.08,0x83b8c8,x,3.5,-5.26);
  for(const dx of [-1.1,0,1.1])box(.13,2.75,.2,0x68442d,x+dx,3.5,-5.06);
  for(const y of [2.15,3.5,4.85])box(2.35,.13,.2,0x68442d,x,y,-5.06);
 }
 // Stone hearth, mantel and flickering-colour flame details.
 box(2.65,2.8,.7,0x8c8175,4.2,1.4,-4.92);
 box(1.65,1.28,.13,0x2f2927,4.2,.9,-4.47);
 box(3,.24,.9,0x725641,4.2,2.85,-4.72);
 for(const x of [3.55,4.1,4.65])ball(.23,0xff963b,x,.7,-4.34,true);
 for(const x of [3.9,4.45])ball(.15,0xffdf7b,x,1,-4.32,true);
 // Bookcases and individually coloured book spines.
 for(const x of [-2.65,1.65]){
  box(1.65,2.9,.48,0x785038,x,1.45,-5.02);
  for(const y of [.48,1.23,1.98,2.73]){
   box(1.6,.1,.52,0x503524,x,y,-4.75);
   for(let j=0;j<7;j++)box(.14,.33+(j%3)*.06,.23,[0x537c76,0x9f684b,0x765b8a,0xb59b56][j%4],x-.62+j*.2,y+.23,-4.7);
  }
 }
 // Floor remains clear so purchased rugs are the only floor rugs.
 for(const [x,z] of [[-5,2.9],[5,2.7],[-5,-3.5]]){
  box(.7,.65,.7,0x99714c,x,.35,z);
  for(const [dx,dz] of [[-.25,0],[.22,.16],[0,-.23]])ball(.4,0x4c8553,x+dx,1.05,z+dz);
 }
 // Hanging lanterns and a few subtle enchanted crystals.
 for(const x of [-4.8,0,4.8]){
  beam([x,5.8,1.3],[x,4.85,1.3],.045);
  box(.38,.5,.38,0x8c623b,x,4.6,1.3);
  ball(.16,0xffd48b,x,4.58,1.3,true);
 }
 for(const [x,y,z] of [[-1.65,2.65,-4.55],[2.7,2.8,-4.55]])ball(.17,0x8ad6d3,x,y,z,true);
 return {scene};
}

export function fantasyFurniture(THREE,id,color=0x8a677a){
 const group=new THREE.Group(),material=c=>new THREE.MeshStandardMaterial({color:c,roughness:.65});
 const box=(w,h,d,c,x,y,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(c));m.position.set(x,y,z);group.add(m)};
 const sphere=(r,c,x,y,z)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),material(c));m.position.set(x,y,z);group.add(m)};
 if(id==='sofa'||id==='chair'){
  const w=id==='sofa'?1.8:1.05;
  box(w,.45,.85,color,0,.48,0);box(w,.85,.18,color,0,.87,-.39);
  for(const x of [-w/2+.12,w/2-.12])box(.22,.55,.82,color,x,.65,0);
  box(w-.35,.15,.48,0xdac5a4,0,.77,.08);
 }else if(id==='bed'){
  box(1.7,.35,2.3,0x795039,0,.32,0);box(1.6,.23,1.85,0x8d6b81,0,.59,.12);
  box(1.75,1,.2,0x694832,0,.7,-1.1);box(1.2,.14,.48,0xffffff,0,.78,-.62);
 }else if(id==='desk'){
  box(1.65,.16,.85,0xc58b66,0,1,0);
  for(const x of [-.68,.68])for(const z of [-.3,.3])box(.12,.95,.12,0x98664f,x,.49,z);
  box(.55,.08,.35,0xf8e9aa,0,1.13,0);
 }else if(id==='lamp'){
  box(.5,.1,.5,0xc7a46d,0,.06,0);box(.09,1.55,.09,0xe6c584,0,.84,0);
  const shade=new THREE.Mesh(new THREE.ConeGeometry(.45,.65,16),material(0xffdc8a));shade.position.y=1.67;group.add(shade);
  sphere(.15,0xfff7c7,0,1.35,0);
 }else if(id==='plant'){
  box(.62,.58,.62,0xd5a178,0,.31,0);box(.47,.07,.47,0x755c46,0,.63,0);
  for(const [x,z,y] of [[0,0,1.25],[-.34,0,1.03],[.33,.12,1.04],[0,-.28,1.12]])sphere(.4,0x6abf8a,x,y,z);
 }else if(id==='rug'){
  box(2.1,.055,1.45,color,0,.035,0);box(1.8,.065,1.15,0xdac5a4,0,.065,0);
 }
 return group;
}
