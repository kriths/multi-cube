import {Scene} from "three";
import {Cubelet} from "./Cubelet";

export class MultiCube {
    private static CUBE_SIZE = 0.2;
    private static CUBE_SCALE = 0.9;

    private readonly cubelets: Cubelet[] = [];
    private readonly size: number;
    private readonly layerSize: number;

    constructor(scene: Scene, size: number) {
        if (!Number.isInteger(size) || size < 1)
            throw new Error("Cube size must be integer.");

        this.size = size;
        this.layerSize = size * size;
        this.addCubelets(scene);
    }

    getLayerFromLeft(index: number): Cubelet[] {
        return this.cubelets.slice(index * this.layerSize, (index + 1) * this.layerSize);
    }

    getLayerFromBack(index: number): Cubelet[] {
        const objects: Cubelet[] = [];
        for (let i = 0; i < this.layerSize; ++i) {
            objects.push(this.cubelets[index + this.size * i]);
        }
        return objects;
    }

    getLayerFromBottom(index: number): Cubelet[] {
        const objects: Cubelet[] = [];
        for (let i = 0; i < this.size; ++i) {
            const start = index + i * this.layerSize;
            objects.push(...this.cubelets.slice(start, start + this.size));
        }
        return objects;
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
        const mesh = new Cubelet(vertexLength);
        mesh.position.set(x, y, z);
        this.cubelets.push(mesh);
    }
}