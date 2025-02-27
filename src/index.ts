import {setupScene} from "./scene";
import {MultiCube} from "./cube/Cube";
import {Quaternion, Vector3} from "three";

const CUBE_COUNT = 3;

const [ camera, scene, renderer ] = setupScene();

const cube = new MultiCube(scene, CUBE_COUNT);

function animate() {
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
}

document.addEventListener("keypress", e => {
    if (e.code === "KeyL") {
        cube?.getLayerFromLeft(0).forEach(c => {
            let q = new Quaternion();
            q.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 4);
            c.applyQuaternion(q);
            c.position.applyQuaternion(q);
        });
    } else if (e.code === "KeyA") {
        cube?.getLayerFromBack(0).forEach(c => {
            let q = new Quaternion();
            q.setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 4);
            c.applyQuaternion(q);
            c.position.applyQuaternion(q);
        });
    } else if (e.code === "KeyB") {
        cube?.getLayerFromBottom(0).forEach(c => {
            let q = new Quaternion();
            q.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 4);
            c.applyQuaternion(q);
            c.position.applyQuaternion(q);
        });
    }
});

animate();
