import Point from "../common/Point"
import Planetoid from "../common/Planetoid"

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

        graphics.lineStyle(2, 0x888888);
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

export class ShipDisplay extends PIXI.Graphics {
    constructor(x: number, y: number) {
        super()

        let g = this;

        let poly = [
            -5, 5,
            0, -5,
            5, 5
        ];

        g.lineStyle(1, 0xDDDDDD);
        g.drawPolygon(poly);

        // game.physics.p2.enable(this, true);
        // this.body.clearShapes();

        // this.body.data.adjustCenterOfMass = function() {};
        // this.body.addPolygon(null, poly);

        // this.addChild(g);
    }

    update() {
        // this.body.velocity.y += 9.81 * this.game.time.physicsElapsed;
    }
}