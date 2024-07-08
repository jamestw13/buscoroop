import * as THREE from "three";
import { SceneManager, World } from "./SceneManager";
const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);
const world = new World(sceneManager.scene);
sceneManager.start();

// addEventListener("click", (e) => {
//   const rect = canvas.getBoundingClientRect();
//   const x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
//   const y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

//   const vector = new THREE.Vector3(x, y, 0.5); // z is set to 0.5 to ensure it's in front of the camera
//   vector.unproject(sceneManager.camera);

//   const dir = vector.sub(sceneManager.camera.position).normalize();
//   const distance = -sceneManager.camera.position.z / dir.z;
//   const pos = sceneManager.camera.position
//     .clone()
//     .add(dir.multiplyScalar(distance));

//   const box = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
//   );
//   box.position.set(pos.x, pos.y, pos.z);
//   sceneManager.add(box);
// });
