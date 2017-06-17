import {Body} from 'p2'
import Point from "./Point"

export class Planetoid extends Body {
    private terrainPoints : number[][];

    public get TerrainPoints() : number[][] {
        return this.terrainPoints;
    }

    constructor(terrain : number[][]) {
        super({
            mass: 0,
            fixedRotation: true
        });

        this.terrainPoints = terrain;
        this.fromPolygon(terrain);
    }
}
