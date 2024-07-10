import * as THREE from "three";
import { SceneManager } from "./SceneManager";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
// import "./assets/office1.glb";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const officeButton = document.createElement("button");
officeButton.textContent = "Add office";
officeButton.className = "button";
officeButton.onclick = () => {
  addOffice(5, -5, Math.PI / 2);
};
document.body.appendChild(officeButton);

const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);
sceneManager.start();

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
sceneManager.add(directionalLight);

function floorToY(floor) {
  return floor * 3 - 1.5;
}

// Instantiate a loader
const loader = new GLTFLoader();
console.log(loader);

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);

// Load a glTF resource
loader.load(
  // resource URL
  "./assets/office1.glb",
  (gltf) => {
    console.log(gltf);
    sceneManager.add(gltf.scene);
  }
  // // called when the resource is loaded
  // function (gltf) {
  //   scene.add(gltf.scene);

  //   // gltf.animations; // Array<THREE.AnimationClip>
  //   // gltf.scene; // THREE.Group
  //   // gltf.scenes; // Array<THREE.Group>
  //   // gltf.cameras; // Array<THREE.Camera>
  //   // gltf.asset; // Object
  // },
  // // called while loading is progressing
  // function (xhr) {
  //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  // },
  // // called when loading has errors
  // function (error) {
  //   console.log("An error happened", error);
  // }
);

const addOffice = (x, z, rotation = 0) => {
  //   const office = new THREE.Group();
  //   office.name = "office";
  //   const carpet = new THREE.Mesh(
  //     new THREE.BoxGeometry(4.5, 0.005, 4.5),
  //     new THREE.MeshBasicMaterial({ color: "#808080" })
  //   );
  //   carpet.position.set(0, -1.4925, 0);
  //   const wall1 = new THREE.Mesh(
  //     new THREE.BoxGeometry(4.5, 1, 0.05),
  //     new THREE.MeshBasicMaterial({ color: "#809090" })
  //   );
  //   wall1.position.set(0, -1, 2.225);
  //   const wall2 = new THREE.Mesh(
  //     new THREE.BoxGeometry(1.5, 1, 0.05),
  //     new THREE.MeshBasicMaterial({ color: "#809090" })
  //   );
  //   wall2.position.set(-1.5, -1, -0.75);
  //   const wall3 = new THREE.Mesh(
  //     new THREE.BoxGeometry(1.5, 1, 0.05),
  //     new THREE.MeshBasicMaterial({ color: "#809090" })
  //   );
  //   wall3.position.set(1.5, -1, -0.75);
  //   const wall4 = new THREE.Mesh(
  //     new THREE.BoxGeometry(0.05, 1, 3),
  //     new THREE.MeshBasicMaterial({ color: "#809090" })
  //   );
  //   wall4.position.set(-2.225, -1, 0.75);
  //   const wall5 = new THREE.Mesh(
  //     new THREE.BoxGeometry(0.05, 1, 3),
  //     new THREE.MeshBasicMaterial({ color: "#809090" })
  //   );
  //   wall5.position.set(2.225, -1, 0.75);
  //   office.add(carpet, wall1, wall2, wall3, wall4, wall5);
  //   office.position.set(x, floorToY(1), z);
  //   office.rotation.y = rotation;
  //   sceneManager.add(office);
};
// addOffice(0, 0, Math.PI);
