import * as THREE from "three";
import { SceneManager, World } from "./SceneManager";
const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);
const world = new World(sceneManager.scene);
sceneManager.start();

function floorToY(floor) {
  return floor * 3 - 1.5;
}

const addOffice = (x, z, rotation = 0) => {
  const office = new THREE.Group();
  office.name = "office";

  const carpet = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 0.005, 4.5),
    new THREE.MeshBasicMaterial({ color: "#808080" })
  );
  carpet.position.set(0, -1.4925, 0);

  const wall1 = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 1, 0.05),
    new THREE.MeshBasicMaterial({ color: "#809090" })
  );
  wall1.position.set(0, -1, 2.225);

  const wall2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 0.05),
    new THREE.MeshBasicMaterial({ color: "#809090" })
  );
  wall2.position.set(-1.5, -1, -0.75);

  const wall3 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 0.05),
    new THREE.MeshBasicMaterial({ color: "#809090" })
  );
  wall3.position.set(1.5, -1, -0.75);

  const wall4 = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 1, 3),
    new THREE.MeshBasicMaterial({ color: "#809090" })
  );
  wall4.position.set(-2.225, -1, 0.75);

  const wall5 = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 1, 3),
    new THREE.MeshBasicMaterial({ color: "#809090" })
  );
  wall5.position.set(2.225, -1, 0.75);

  office.add(carpet, wall1, wall2, wall3, wall4, wall5);
  office.position.set(x, floorToY(1), z);
  office.rotation.y = rotation;
  sceneManager.add(office);
};
addOffice(0, 0, Math.PI);
