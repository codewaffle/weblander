import Point from "../common/Point"
import Planetoid from "../common/Planetoid"

export class PlanetoidDisplay extends Phaser.Sprite {
    private planetoid : Planetoid;
    private graphics : Phaser.Graphics;

    constructor(game: Phaser.Game, planetoid: Planetoid) {
        super(game, 0, 0);
        this.position = new Phaser.Point(planetoid.X, planetoid.Y);

        this.planetoid = planetoid;
        let graphics = this.graphics = new Phaser.Graphics(game);

        planetoid.TerrainPoints[0].X = 0; 
        planetoid.TerrainPoints[0].Y /= 2;

        // both arrays are sourced from planetoid.TerrainPoints
        let phaserPoints : Phaser.Point[] = [];
        for(let p of planetoid.TerrainPoints) {
            phaserPoints.push(new Phaser.Point(p.X, p.Y));
        }
        phaserPoints.push(phaserPoints[0]);
        graphics.lineStyle(5, 0xFF33FF);
        graphics.drawPolygon(phaserPoints);

        let pointPairs : number[][] = []; // array of points, [[0, 0], [1, 1], ...]
        for(let p of planetoid.TerrainPoints) {
            pointPairs.push([p.X, p.Y]);
        }
        game.physics.p2.enable(this, true);
        this.body.clearShapes();
        this.body.data.adjustCenterOfMass = function() {}
        this.body.addPolygon(null, pointPairs);

        this.addChild(graphics);
    }

    update() {
        this.body.angle += 1;
    }
}

export class ShipDisplay extends Phaser.Graphics {
    test() {
    }
}