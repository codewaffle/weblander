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

        // both arrays are sourced from planetoid.TerrainPoints
        let pPoints : PIXI.Point[] = [];

        for(let p of planetoid.TerrainPoints) {
            pPoints.push(new PIXI.Point(p.X, p.Y));
        }
        pPoints.push(pPoints[0]);

        graphics.lineStyle(8, 0x888888);
        graphics.drawPolygon(pPoints);

        let pointPairs : number[][] = []; // array of points, [[0, 0], [1, 1], ...]
        for(let p of planetoid.TerrainPoints) {
            pointPairs.push([p.X, p.Y]);
        }

        // game.physics.p2.enable(this, true);
        // this.body.clearShapes();
        // this.body.data.adjustCenterOfMass = function() {}
        // this.body.addPolygon(null, pointPairs);

        // this.addChild(graphics);
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
            8, 8
        ];

        g.lineStyle(1, 0xDDDDDD);
        g.drawPolygon(poly);
    }

    onRender(dt: number): void {
        this.position.set(this.body.interpolatedPosition[0], this.body.interpolatedPosition[1]);
        this.rotation = this.body.interpolatedAngle;
    }

}