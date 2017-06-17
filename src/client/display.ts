import {Body} from 'p2'
import Point from "../common/Point"
import Planetoid from "../common/Planetoid"
import { IOnRender } from "../common/interfaces";

export class PlanetoidDisplay extends PIXI.Graphics {
    private planetoid : Planetoid;

    constructor(planetoid: Planetoid) {
        super();

        this.planetoid = planetoid;
        let graphics = this;

        let pPoints : PIXI.Point[] = [];

        for(let p of planetoid.TerrainPoints) {
            pPoints.push(new PIXI.Point(p[0], p[1]));
        }
        pPoints.push(pPoints[0]);

        graphics.lineStyle(8, 0x888888);
        graphics.beginFill(0x444444);
        graphics.drawPolygon(pPoints);
        graphics.endFill();
    }
}

export class ShipDisplay extends PIXI.Graphics implements IOnRender {
    private body: Body;

    constructor(body : Body) {
        super()
        this.body = body;

        let g = this;

        let poly = [
            -8, 8,
            0, -8,
            8, 8,
            -8, 8
        ];

        g.lineStyle(1, 0xDDDDDD);
        g.beginFill(0x884422);
        g.drawPolygon(poly);
        g.endFill();
    }

    onRender(dt: number): void {
        this.position.set(this.body.interpolatedPosition[0], this.body.interpolatedPosition[1]);
        this.rotation = this.body.interpolatedAngle;
    }

}