import {World} from 'p2'
import Point from "../common/Point"
import Planetoid from "../common/Planetoid"
import {PlanetoidDisplay, ShipDisplay} from "./display"
import Ship from "../common/Ship"
import {IOnRender,IOnFixedUpdate} from "../common/interfaces"

import * as Input from "./input"

export class GameClient extends PIXI.Application implements IOnRender, IOnFixedUpdate {
    gameloop: (t: number) => void;
    private planets: Planetoid[];
    private t : PIXI.Graphics;
    private b : Ship;

    private onRenderers : IOnRender[];
    private onFixedUpdaters : IOnFixedUpdate[];

    private world : World;

    constructor() {
        super({
            antialias: true,
            width: 1920/2,
            height: 1080/2
        });

        this.onRenderers = [];
        this.onFixedUpdaters = [];
    }

    private create() {
        this.world = new World({
            gravity: [0, 9.81]
        });

        this.planets = [];

        let t : Point[] = [];

        for(let r = 0; r < 2*Math.PI;r+=Math.PI/8) {
            t.push(new Point(100 * Math.cos(r), 100 * Math.sin(r)));
        }

        let p = new Planetoid(t);
        let pd = new PlanetoidDisplay(p);

        this.stage.addChild(pd);

        let ship = this.b = new Ship();
        this.world.addBody(ship);
        
        let s = new ShipDisplay(ship);
        this.stage.addChild(s);

        this.t = s;

        ship.position = [0, -120];

        this.onRenderers.push(s);
    }

    onRender(dt : number) {
       // camera follow
        this.stage.pivot.set(this.t.x, this.t.y);
        this.stage.position.set(this.renderer.width/2, this.renderer.height/2);
        
        // zoom
        this.stage.scale.set(2);
    }

    onFixedUpdate(dt: number): void {
        if(Input.Thrust.isDown) {
            this.b.force = [0, -400];
        }

        if(Input.Left.isDown) {
            this.b.angle -= dt * 4;
        }

        if(Input.Right.isDown) {
            this.b.angle += dt * 4;
        }
    }

    public run() {
        this.create();

        let lastTime : number = null;

        let fixedRate = 1/10;

        this.world.on("postStep", () => {
            for(var obj of this.onFixedUpdaters) {
                obj.onFixedUpdate(fixedRate);
            }

            this.onFixedUpdate(fixedRate);
        }, null);

        this.gameloop = (t : number) => {
            requestAnimationFrame(this.gameloop);
            let dt = lastTime ? (t - lastTime) / 1000 : 0;

            this.world.step(fixedRate, dt, 10);

            for(var obj of this.onRenderers) {
                obj.onRender(dt);
            }

            this.onRender(dt);

            lastTime = t;
        }

        this.gameloop(0);
    }
}
