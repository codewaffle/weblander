import * as p2 from 'p2'
import {Planetoid, Ship} from '.'

export class World extends p2.World {
    private _planets : Planetoid[];
    private _ships : Ship[];

    constructor(options : any) {
        super(options);

        this.applyDamping = false;
        this.applyGravity = false;
        this.defaultContactMaterial.friction = 0.8;

        this._planets = [];
        this._ships = [];
    }

    public calculateGravityAtPoint(point : number[]) : number[] {
        let _mass = 1000000000;
        let mag = _mass/p2.vec2.squaredLength(point);
        let grav = [0, 0];

        p2.vec2.normalize(grav, point);
        p2.vec2.scale(grav, grav, -mag);

        return grav;
    }

    public spawnDevPlanet() : Planetoid {
        let t : number[][] = [];

        for(let r = 0; r < 2*Math.PI;r+=Math.PI/64) {
            t.push([5000 * Math.cos(r), 5000 * Math.sin(r)]);
        }

        let rv = new Planetoid(t);
        this.addBody(rv);

        return rv;
    }
}