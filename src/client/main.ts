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


        this.world.applyDamping = false;
        this.world.applyGravity = false;
        this.world.defaultContactMaterial.friction = 0.8;

        this.planets = [];

        let t : number[][] = [];

        for(let r = 0; r < 2*Math.PI;r+=Math.PI/64) {
            t.push([5000 * Math.cos(r), 5000 * Math.sin(r)]);
        }

        let p = new Planetoid(t);
        let pd = new PlanetoidDisplay(p);

        this.stage.addChild(pd);

        let ship = this.b = new Ship();
        this.world.addBody(ship);
        this.world.addBody(p);
        
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

        let _mass = 1000000000;

        let mag = _mass/vec2.squaredLength(this.b.position);
        let grav = [0, 0];

        vec2.normalize(grav, this.b.position);
        vec2.scale(grav, grav, -mag * dt);

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
