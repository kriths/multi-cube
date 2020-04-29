import {PerspectiveCamera, Renderer, Scene, WebGLRenderer} from "three";

export function setupScene(): [ PerspectiveCamera, Scene, Renderer ] {
    const _camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    _camera.position.set(1, 1, 3);

    const _scene = new Scene();

    const _renderer = new WebGLRenderer({
        antialias: true,
    });

    _renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(_renderer.domElement);

    return [ _camera, _scene, _renderer ];
}
