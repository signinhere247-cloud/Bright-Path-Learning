/**
 * BrightPath model pipeline. Models are GLB files under public/models/village/.
 * This module intentionally does not replace the playable world until a reviewed
 * model has been added to the manifest and verified on mobile.
 */
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const MAX_MODELS = 24;
const MAX_DISTANCE = 120;
const allowedPath = path => typeof path === 'string' &&
  /^\/models\/village\/[a-z0-9/_-]+\.glb$/i.test(path) &&
  !path.includes('..');

export function validateVillageManifest(entries) {
  if (!Array.isArray(entries) || entries.length > MAX_MODELS) throw new Error('Invalid village model manifest');
  const ids = new Set();
  return entries.map(entry => {
    if (!entry || !/^[a-z0-9_-]+$/i.test(entry.id || '') || ids.has(entry.id) || !allowedPath(entry.file)) {
      throw new Error('Invalid village model entry');
    }
    ids.add(entry.id);
    const position = entry.position || [0,0,0];
    const rotationY = entry.rotationY ?? 0;
    const scale = entry.scale ?? 1;
    if (!Array.isArray(position) || position.length !== 3 || !position.every(v => Number.isFinite(v) && Math.abs(v) <= MAX_DISTANCE) ||
        !Number.isFinite(rotationY) || !Number.isFinite(scale) || scale <= 0 || scale > 20) {
      throw new Error('Invalid village model transform');
    }
    return {id:entry.id,file:entry.file,position,rotationY,scale};
  });
}

/** Loads approved models, with a safe fallback if a model is unavailable. */
export async function loadVillageModels(scene, entries, {onError=console.warn}={}) {
  const manifest = validateVillageManifest(entries);
  const loader = new GLTFLoader();
  const models = new Map();
  const results = await Promise.allSettled(manifest.map(async item => {
    const gltf = await loader.loadAsync(item.file);
    const root = gltf.scene;
    root.position.set(...item.position);
    root.rotation.y = item.rotationY;
    root.scale.setScalar(item.scale);
    root.traverse(node => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material?.map) node.material.map.colorSpace = 'srgb';
      }
    });
    scene.add(root);
    models.set(item.id,root);
    return item.id;
  }));
  results.forEach((result,index) => {
    if (result.status === 'rejected') onError('BrightPath 3D model unavailable: '+manifest[index].id, result.reason);
  });
  return {models,failed:results.filter(r=>r.status==='rejected').length,dispose(){
    for (const root of models.values()) scene.remove(root);
    models.clear();
  }};
}
