import * as THREE from "three";
import { PerspectiveCamera, Renderer, Scene } from "three";

const CUBE_SIZE = 0.2;
const CUBE_SCALE = 0.9;
const CUBE_COUNT = 3;

const [ camera, scene, renderer ] = setupScene();

function setupScene(): [ PerspectiveCamera, Scene, Renderer ] {
    const _camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    _camera.position.set(1, 1, 3);

    const _scene = new THREE.Scene();

    const _renderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    _renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(_renderer.domElement);

    return [ _camera, _scene, _renderer ];
}

function addBox(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(CUBE_SIZE * CUBE_SCALE, CUBE_SIZE * CUBE_SCALE, CUBE_SIZE * CUBE_SCALE);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
}

function addBoxes() {
    const leftEdge = - CUBE_COUNT / 2 * CUBE_SIZE;
    const lowestCenter = leftEdge + CUBE_SIZE / 2;
    for (let i = 0; i < CUBE_COUNT; ++i) {
        for (let j = 0; j < CUBE_COUNT; ++j) {
            for (let k = 0; k < CUBE_COUNT; ++k) {
                addBox(lowestCenter + i * CUBE_SIZE, lowestCenter + j * CUBE_SIZE, lowestCenter + k * CUBE_SIZE);
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
}

addBoxes();
animate();
