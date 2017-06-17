import {vec2, Material, ContactMaterial} from 'p2'
import {World, Planetoid, Ship, IOnRender,IOnFixedUpdate} from "../common"
import {PlanetoidDisplay, ShipDisplay} from "./display"

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
            gravity: [0, 0],
        });

        let pd = new PlanetoidDisplay(this.world.spawnDevPlanet());

        this.stage.addChild(pd);

        let ship = this.b = new Ship();
        this.world.addBody(ship);
        
        let s = new ShipDisplay(ship);
        this.stage.addChild(s);

        // eugh, TODO: fix this
        this.stage.addChild(s._orbit);

        this.t = s;

        ship.position = [0, -5050];

        this.onRenderers.push(s);
    }

    onRender(dt : number) {
       // camera follow
        this.stage.pivot.set(this.t.x, this.t.y);
        this.stage.position.set(this.renderer.width/2, this.renderer.height/2);
        
        // zoom
        this.stage.scale.set(0.25);
    }

    onFixedUpdate(dt: number): void {
        if(Input.Thrust.isDown) {
            this.b.setThrust(-400);
        }

        if(Input.Left.isDown) {
            this.b.angle -= dt * 4;
        }

        if(Input.Right.isDown) {
            this.b.angle += dt * 4;
        }

        let grav = this.world.calculateGravityAtPoint(this.b.position);
        vec2.scale(grav, grav, dt);

        vec2.add(this.b.velocity, this.b.velocity, grav);
    }

    public run() {
        this.create();

        let lastTime : number = null;

        let fixedRate = 1/20;

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
