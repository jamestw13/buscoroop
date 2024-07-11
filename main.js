import { SceneManager } from "./SceneManager";

const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);
sceneManager.start();

window.addEventListener("mousemove", sceneManager.onMouseMove);
