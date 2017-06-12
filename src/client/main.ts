import Point from "../common/Point"
import Planetoid from "../common/Planetoid"
import PlanetoidDisplay from "./PlanetoidDisplay"

export class GameClient {
    private game: Phaser.Game;
    private planets: Planetoid[];

    constructor() {
        this.game = new Phaser.Game(1280 / 2, 720 / 2, Phaser.AUTO, "content", {preload: this.preload, create: this.create});
    }

    private preload() {
        this.game.load.image("tiles", "tileset.png");
    }

    private create() {
        this.planets = [];

        let t : Point[] = [];

        for(let r = 0; r < 2*Math.PI;r+=Math.PI/4) {
            t.push(new Point(100 * Math.cos(r), 100 * Math.sin(r)));
        }

        let p = new Planetoid(t);
        let pd = new PlanetoidDisplay(this.game, p);
        this.game.add.existing(pd);
    }
}
