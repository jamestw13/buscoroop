import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export class SceneManager {
  constructor(canvas) {
    this.scene = new THREE.Scene();
    this.canvas = canvas;
    this.initRenderer();
    this.initCamera();
    this.initControls();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.clock = new THREE.Clock();
    this.world = new World(this.scene);
    this.loader = this.initLoader();
    this.mode = "view";
    this.initGUI();
    this.newObject = null;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.office = this.loader.load("office1.glb", (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const basicMaterial = new THREE.MeshBasicMaterial({
            color: child.material.color, // Retain the original color
            map: child.material.map, // Retain the original texture map, if any
          });
          child.material = basicMaterial;
        }
      });
    });
  }

  onMouseMove(e) {
    if (this.mode === "build") {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersects = this.raycaster.intersectObjects(this.scene.children);
      const groundIntersect = intersects.find(
        (intersect) => intersect.object.name === "ground"
      );
      if (groundIntersect) {
        this.office.position.copy(groundIntersect);
      }
    }
  }

  initLoader() {
    // Instantiate a loader
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
    loader.setDRACOLoader(dracoLoader);
    return loader;
  }

  initCamera() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    this.camera.position.set(1, 3, 5);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
  }
  setMode(mode) {
    this.mode = mode;
    document.getElementById("status").textContent = mode;
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
  }

  add = (obj) => {
    this.scene.add(obj);
    // console.log(this.scene.children.length);
  };

  animate = () => {
    // const office = this.scene.children.find((child) => child.name === "office");
    // if (office) {
    //   office.position.x = Math.sin(this.clock.getElapsedTime()) * 2;
    // }
    if (this.mode === "build") {
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };

  start() {
    this.animate();
  }

  initGUI() {
    const officeButton = document.createElement("button");
    officeButton.textContent = "Add office";
    officeButton.className = "button";
    officeButton.onclick = () => {
      this.addOffice(5, -5);
    };
    document.body.appendChild(officeButton);

    const statusArea = document.createElement("div");
    statusArea.textContent = this.mode;
    statusArea.id = "status";

    document.body.appendChild(statusArea);
  }

  addOffice = (x, z, rotation = 0) => {
    this.setMode(this.mode === "build" ? "view" : "build");
    this.loader.load(
      // resource URL
      "office1.glb",
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            const basicMaterial = new THREE.MeshBasicMaterial({
              color: child.material.color, // Retain the original color
              map: child.material.map, // Retain the original texture map, if any
            });
            child.material = basicMaterial;
          }
        });
        this.office = gltf.scene;

        this.add(this.office);
      }
    );
  };
}

export class World {
  constructor(scene) {
    this.scene = scene;
    this.initGround();
    this.buildLimitHeight = 3;
    this.buildLimitWidth = 3;
    this.floors = [];
    this.initFloor();
  }

  floorToY(floor) {
    return floor * 3 - 1.5;
  }
  initGround() {
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.MeshBasicMaterial({
      color: "#6C9642",
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.name = "ground";
    this.scene.add(ground);
  }

  initFloor() {
    const firstFloor = new Floor(this.scene, 1);
    this.floors.push(firstFloor);
  }
}

// Object that stores the spaces and floor pad
export class Floor {
  constructor(scene, number, spaces = []) {
    this.scene = scene;
    this.number = number;
    this.spaces = spaces;
    this.pad = this.initPad(number);
  }
  initPad(number) {
    if (number === 1) {
      const padGeometry = new THREE.BoxGeometry(18, 0.0025, 18);
      const padMaterial = new THREE.MeshBasicMaterial({
        color: "#adadad",
        side: THREE.DoubleSide,
      });
      const pad = new THREE.Mesh(padGeometry, padMaterial);
      pad.position.set(0, 0, 0);
      pad.name = "floor1";
      this.scene.add(pad);
      return pad;
    }
  }
}
