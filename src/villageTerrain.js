/** Colour-varied, softly rolling ground with a flat, playable central village. */
export function buildVillageTerrain(THREE,scene) {
 const geometry=new THREE.PlaneGeometry(140,140,70,70);
 geometry.rotateX(-Math.PI/2);
 const positions=geometry.attributes.position;
 const colours=[];
 const colour=new THREE.Color();
 for(let i=0;i<positions.count;i++){
  const x=positions.getX(i),z=positions.getZ(i);
  const radius=Math.hypot(x,z);
  const fade=THREE.MathUtils.smoothstep(radius,19,43);
  const waves=Math.sin(x*.13+z*.07)*1.1+Math.cos(z*.16-x*.045)*.85+Math.sin(x*.31+z*.23)*.32;
  const height=-.07+fade*(.6+waves*.85);
  positions.setY(i,height);
  const patch=Math.sin(x*.32+Math.cos(z*.17))*Math.cos(z*.27-x*.09);
  colour.setHSL(.27+patch*.014,.31+patch*.06,.43+patch*.045+fade*.025);
  colours.push(colour.r,colour.g,colour.b);
 }
 geometry.setAttribute('color',new THREE.Float32BufferAttribute(colours,3));
 geometry.computeVertexNormals();
 const ground=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}));
 ground.receiveShadow=true;
 ground.name='Village rolling terrain';
 scene.add(ground);
 return ground;
}
