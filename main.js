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

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);

//

const addOffice = (x, z, rotation = 0) => {
  loader.load(
    // resource URL
    "./assets/office1.glb",
    (gltf) => {
      // console.log(gltf);
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const basicMaterial = new THREE.MeshBasicMaterial({
            color: child.material.color, // Retain the original color
            map: child.material.map, // Retain the original texture map, if any
          });
          child.material = basicMaterial;
        }
      });
      gltf.scene.position.set(
        Math.random() * 10 - 5,
        0,
        Math.random() * 10 - 5
      );

      sceneManager.add(gltf.scene);
    }
  );
};
