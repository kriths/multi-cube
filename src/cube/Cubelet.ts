import {BoxGeometry, FontLoader, Geometry, Material, Mesh, MeshBasicMaterial, TextGeometry} from "three";

import fontJson from "three/examples/fonts/helvetiker_regular.typeface.json";


const font = new FontLoader().parse(fontJson);
const Materials = {
    BLUE: new MeshBasicMaterial({ color: 0x0022cc }),
    GREEN: new MeshBasicMaterial({ color: 0x00aa00 }),
    ORANGE: new MeshBasicMaterial({ color: 0xee6600 }),
    RED: new MeshBasicMaterial({ color: 0xaa1100 }),
    WHITE: new MeshBasicMaterial({ color: 0xeeeeee }),
    YELLOW: new MeshBasicMaterial({ color: 0xeedd00 }),
}

const randomMaterial = () => Object.values(Materials)[Math.floor(Math.random() * Object.values(Materials).length)];

export class Cubelet extends Mesh {
    private static index = 0;

    constructor(vertexLength: number) {
        const [ geometry, materials ] = Cubelet.color(vertexLength);
        // const [ geometry, materials ] = Cubelet.enumerate();
        super(geometry, materials);
    }

    private static enumerate(): [Geometry, Material[]] {
        const geometry = new TextGeometry("" + (Cubelet.index++), {
            font,
            size: 0.1,
            height: 0.1,
        })
        return [ geometry, [ randomMaterial() ] ];
    }

    private static color(vertexLength: number): [Geometry, Material[]] {
        const geometry = new BoxGeometry(vertexLength, vertexLength, vertexLength, 0,0,0);
        const materials = [
            randomMaterial(),
            randomMaterial(),
            randomMaterial(),
            randomMaterial(),
            randomMaterial(),
            randomMaterial(),
        ];
        return [ geometry, materials ];
    }
}