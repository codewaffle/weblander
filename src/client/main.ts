import Point from "../common/Point"
import Planetoid from "../common/Planetoid"
import {PlanetoidDisplay} from "./display"

export class GameClient {
    private game: Phaser.Game;
    private planets: Planetoid[];

    constructor() {
        this.game = new Phaser.Game(1280 / 2, 720 / 2, Phaser.AUTO, "content", {preload: this.preload, create: this.create, update: this.update});
    }

    private preload() {
        this.game.load.image("tiles", "tileset.png");
    }

    private create() {
        this.game.world.setBounds(-32768, -32768, 32768*2, 32768*2);
        this.game.camera.focusOnXY(0, 0);
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.planets = [];

        let t : Point[] = [];

        for(let r = 0; r < 2*Math.PI;r+=Math.PI/4) {
            t.push(new Point(100 * Math.cos(r), 100 * Math.sin(r)));
        }

        let p = new Planetoid(t);
        let pd = new PlanetoidDisplay(this.game, p);
        this.game.add.existing(pd);
    }

    update() {
    }
}
