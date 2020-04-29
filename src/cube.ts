import {BoxGeometry, Mesh, MeshBasicMaterial, Object3D, Scene} from "three";

const Materials = {
    BLUE: new MeshBasicMaterial({ color: 0x0022cc }),
    GREEN: new MeshBasicMaterial({ color: 0x00aa00 }),
    ORANGE: new MeshBasicMaterial({ color: 0xee6600 }),
    RED: new MeshBasicMaterial({ color: 0xaa1100 }),
    WHITE: new MeshBasicMaterial({ color: 0xeeeeee }),
    YELLOW: new MeshBasicMaterial({ color: 0xeedd00 }),
}

const randomMaterial = () => Object.values(Materials)[Math.floor(Math.random() * Object.values(Materials).length)];

export class MultiCube {
    private static CUBE_SIZE = 0.2;
    private static CUBE_SCALE = 0.9;

    private readonly cubelets: Object3D[] = [];
    private readonly size: number;

    constructor(scene: Scene, size: number) {
        if (!Number.isInteger(size) || size < 1)
            throw new Error("Cube size must be integer.");

        this.size = size;
        this.addCubelets(scene);
    }

    getLayerFromLeft(index: number): Object3D[] {
        return this.cubelets.slice(index * 9, (index + 1) * 9);
    }

    private addCubelets(scene: Scene): void {
        const lowestCenter = (1 - this.size) * MultiCube.CUBE_SIZE / 2;
        for (let i = 0; i < this.size; ++i) {
            const xOffset = i * MultiCube.CUBE_SIZE;
            for (let j = 0; j < this.size; ++j) {
                const yOffset = j * MultiCube.CUBE_SIZE;
                for (let k = 0; k < this.size; ++k) {
                    const zOffset = k * MultiCube.CUBE_SIZE;
                    this.addCubelet(lowestCenter + xOffset, lowestCenter + yOffset, lowestCenter + zOffset);
                }
            }
        }

        scene.add(...this.cubelets);
    }

    private addCubelet(x: number, y: number, z: number): void {
        const vertexLength = MultiCube.CUBE_SIZE * MultiCube.CUBE_SCALE;
        const geometry =new BoxGeometry(vertexLength, vertexLength, vertexLength, 0,0,0);
        const materials = [
            randomMaterial(),
            randomMaterial(),
            randomMaterial(),
            randomMaterial(),
            randomMaterial(),
            randomMaterial(),
        ]
        const mesh = new Mesh(geometry, materials);
        mesh.position.set(x, y, z);
        this.cubelets.push(mesh);
    }
}