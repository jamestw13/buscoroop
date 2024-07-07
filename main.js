import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Corp } from './Corp.js';
import { Space } from './Space.js';

const canvas = document.getElementById('canvas');
const aspectRatio = window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 100);

camera.position.z = 5;
camera.position.x = 1;
camera.position.y = 3;
camera.lookAt(mesh.position);

const controls = new OrbitControls(camera, canvas);

const corp = new Corp();
corp.spaces.push(new Space(1, 1, 1));

scene.add(camera);
// renderer.render(scene, camera);

const tick = () => {
  controls.update();

  requestAnimationFrame(tick);
  renderer.render(scene, camera);
};

tick();
