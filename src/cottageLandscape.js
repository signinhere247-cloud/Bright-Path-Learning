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
  const stoneGeometry = new THREE.BoxGeometry(.45,.075,.31);
  stoneGeometry.translate(0,.038,0);
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
      dummy.position.set(x,-.043,z+(rand()-.5)*.06);
      dummy.rotation.set(0,(rand()-.5)*.13,0);
      dummy.scale.set(.85+rand()*.2,.7+rand()*.25,.83+rand()*.15);
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

  const tuftGeometry=new THREE.ConeGeometry(.12,.42,3);
  const tufts=new THREE.InstancedMesh(tuftGeometry,new THREE.MeshStandardMaterial({color:0x4b8346,side:THREE.DoubleSide,roughness:1}),220);
  for(let i=0;i<220;i++){
    const angle=rand()*Math.PI*2,radius=2.4+rand()*4.4;
    const x=-17+Math.cos(angle)*radius,z=4+Math.sin(angle)*radius*.7;
    dummy.position.set(x,.13,z);
    dummy.rotation.set(0,rand()*6.28,(rand()-.5)*.3);
    dummy.scale.set(.65+rand(),.65+rand(),.65+rand());
    dummy.updateMatrix();
    tufts.setMatrixAt(i,dummy.matrix);
  }
  group.add(tufts);
  return group;
}
