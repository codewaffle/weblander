import Point from "../common/Point"
import Planetoid from "../common/Planetoid"

export default class PlanetoidDisplay extends Phaser.Graphics {
    private planetoid : Planetoid;
    private polygon : Phaser.Polygon;

    constructor(game: Phaser.Game, planetoid: Planetoid) {
        super(game, planetoid.X, planetoid.Y);
        this.planetoid = planetoid;



        for(let p of planetoid.TerrainPoints) {

        }

        this.beginFill(0xFF33FF);
        this.drawCircle(0, 0, 30);
        this.endFill();
    }

    setPolygon(points:Point[]) {
        let phaserPoints : Phaser.Point[] = [];

        for(let p of points) {
            phaserPoints.push(new Phaser.Point(p.X, p.Y));
        }

        this.polygon = new Phaser.Polygon(phaserPoints);
    }

    update() {
        super.update();
    }
}