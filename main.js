import * as THREE from 'three';

const canvas = document.getElementById('canvas');
// canvas.height = window.innerHeight;
// canvas.width = window.innerWidth;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 3;
scene.add(camera);
renderer.render(scene, camera);
