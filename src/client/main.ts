import Point from "../common/Point"
import Planetoid from "../common/Planetoid"
import {PlanetoidDisplay, ShipDisplay} from "./display"

export class GameClient extends PIXI.Application {
    private planets: Planetoid[];

    private t : PIXI.Graphics;

    constructor() {
        super();
    }

    private create() {
        this.planets = [];

        let t : Point[] = [];

        for(let r = 0; r < 2*Math.PI;r+=Math.PI/4) {
            t.push(new Point(512 * Math.cos(r), 512 * Math.sin(r)));
        }

        let p = new Planetoid(t);
        let pd = this.t = new PlanetoidDisplay(p);

        this.stage.addChild(pd);

        let s = new ShipDisplay(0, -600);
        this.stage.addChild(s);

        this.stage.scale.set(0.2, 0.2);

        // this.game.camera.scale.setTo(2);
        // this.game.camera.follow(s, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }

    update() {
        let dt = 1/(this.ticker.FPS * this.ticker.deltaTime);

        this.stage.pivot.set(this.t.x, this.t.y);
        this.stage.position.set(this.renderer.width/2, this.renderer.height/2);
        this.stage.scale.set(0.5);
    }

    public start() {
        super.start();
        this.create();
        this.ticker.add(() => this.update());
    }
}
