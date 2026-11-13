/** Lightweight, instanced landscaping for the cottage showcase. */
export function addCottageLandscape(THREE, scene) {
  const group = new THREE.Group();
  group.name = 'Cottage landscape';
  scene.add(group);
  const soil = new THREE.MeshStandardMaterial({color:0x647d4a,roughness:1});
  const border = new THREE.Mesh(new THREE.CircleGeometry(6.1,48),soil);
  border.rotation.x=-Math.PI/2;
  border.scale.set(1,.69,1);
  border.position.set(-17,-.052,4);
  border.receiveShadow=true;
  group.add(border);

  // Uneven cobbles, with shared geometry and one draw call per material.
  const stoneGeometry = new THREE.CylinderGeometry(.24,.27,.065,7);
  stoneGeometry.translate(0,.033,0);
  const cobbles = new THREE.InstancedMesh(stoneGeometry,new THREE.MeshStandardMaterial({color:0xc1ac8d,roughness:.96}),280);
  const dummy = new THREE.Object3D();
  const colour = new THREE.Color();
  let seed=17821;
  const rand=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296};
  let n=0;
  // Small, irregular walkway connecting the cottage to the village.
  for(let row=0;row<35;row++){
    const z=2.2+row*.27;
    const center=-17+Math.sin(row*.15)*.55;
    for(let col=-4;col<=3;col++){
      if(rand()<.075)continue;
      const x=center+(col+(row%2)*.5)*.47+(rand()-.5)*.055;
      if(z>6.3 && x>-15.8)continue;
      dummy.position.set(x,-.045,z+(rand()-.5)*.08);
      dummy.rotation.set(0,(rand()-.5)*.13,0);
      dummy.scale.set(.9+rand()*.35,.75+rand()*.3,.7+rand()*.55);
      dummy.updateMatrix();
      cobbles.setMatrixAt(n,dummy.matrix);
      colour.setHSL(.09+rand()*.025,.13+rand()*.09,.52+rand()*.16);
      cobbles.setColorAt(n,colour);
      n++;
    }
  }
  cobbles.count=n;
  cobbles.receiveShadow=true;
  group.add(cobbles);

  const tuftGeometry=new THREE.PlaneGeometry(.19,.32);
  tuftGeometry.translate(0,.16,0);
  const tufts=new THREE.InstancedMesh(tuftGeometry,new THREE.MeshStandardMaterial({color:0x4b8346,side:THREE.DoubleSide,roughness:1}),220);
  for(let i=0;i<220;i++){
    const angle=rand()*Math.PI*2,radius=2.4+rand()*4.4;
    const x=-17+Math.cos(angle)*radius,z=4+Math.sin(angle)*radius*.7;
    dummy.position.set(x,-.03,z);
    dummy.rotation.set(0,rand()*6.28,(rand()-.5)*.25);
    dummy.scale.set(.55+rand()*.8,.45+rand()*.7,1);
    dummy.updateMatrix();
    tufts.setMatrixAt(i,dummy.matrix);
  }
  group.add(tufts);

  // Storybook garden beds flank the entrance without blocking the walkway.
  const timber=new THREE.MeshStandardMaterial({color:0x806044,roughness:.92});
  const earth=new THREE.MeshStandardMaterial({color:0x59432e,roughness:1});
  const leaf=new THREE.MeshStandardMaterial({color:0x48835a,roughness:.9});
  const petals=[0xf5b4ca,0xffdf8b,0xc6a5f1,0xf6f0e1].map(color=>new THREE.MeshStandardMaterial({color,roughness:.85}));
  const petalGeo=new THREE.SphereGeometry(.105,7,5);
  const stemGeo=new THREE.CylinderGeometry(.022,.027,.32,5);
  const stemMat=new THREE.MeshStandardMaterial({color:0x447a42,roughness:1});
  function block(w,h,d,material,x,y,z){
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
    mesh.position.set(x,y,z);mesh.receiveShadow=true;group.add(mesh);return mesh;
  }
  for(const x of [-20.6,-13.4]){
    block(2.3,.13,2.45,earth,x,-.008,3.7);
    for(const side of [-1,1]){
      block(.12,.24,2.55,timber,x+side*1.17,.09,3.7);
      block(2.45,.24,.12,timber,x,.09,3.7+side*1.25);
    }
    for(let i=0;i<16;i++){
      const px=x+(rand()-.5)*1.9,pz=3.7+(rand()-.5)*2.1;
      const stem=new THREE.Mesh(stemGeo,stemMat);stem.position.set(px,.23,pz);group.add(stem);
      const bloom=new THREE.Mesh(petalGeo,petals[i%petals.length]);
      bloom.position.set(px,.44,pz);group.add(bloom);
      const foliage=new THREE.Mesh(petalGeo,leaf);
      foliage.scale.set(1.15,.55,1.35);foliage.position.set(px+.09,.2,pz);group.add(foliage);
    }
  }
  // A small pet rest nook, positioned beside the cottage garden.
  // This is scenery only; pet care state and rewards remain unchanged.
  const cushion=new THREE.MeshStandardMaterial({color:0xb77d68,roughness:1});
  block(1.65,.14,1.35,timber,-21.1,.04,6.65);
  block(1.3,.13,1.05,cushion,-21.1,.17,6.65);
  const bowl=new THREE.Mesh(new THREE.CylinderGeometry(.26,.21,.14,12),new THREE.MeshStandardMaterial({color:0x9fc6c5,roughness:.5}));
  bowl.position.set(-20.0,.08,6.65);group.add(bowl);
  // Low garden lanterns add a gentle glow without expensive dynamic lights.
  const lanternMat=new THREE.MeshStandardMaterial({color:0xffd995,emissive:0xffae58,emissiveIntensity:.35});
  for(const x of [-18.6,-15.4]){
    block(.11,.66,.11,timber,x,.3,1.35);
    block(.28,.3,.28,lanternMat,x,.76,1.35);
    block(.38,.08,.38,timber,x,.95,1.35);
  }
  return group;
}
