import * as THREE from 'three';
export class Space {
  constructor(x, y, floor) {
    this.x = x;
    this.y = y;
    this.floor = floor;
    this.desks = [];
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  }
}
