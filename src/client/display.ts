import {Body, vec2} from 'p2'
import {Planetoid, IOnRender} from "../common"

export class PlanetoidDisplay extends PIXI.Graphics {
    private planetoid : Planetoid;

    constructor(planetoid: Planetoid) {
        super();

        this.planetoid = planetoid;
        let graphics = this;

        let pPoints : PIXI.Point[] = [];

        for(let p of planetoid.TerrainPoints) {
            pPoints.push(new PIXI.Point(p[0], p[1]));
        }
        pPoints.push(pPoints[0]);

        graphics.lineStyle(8, 0x888888);
        graphics.beginFill(0x444444);
        graphics.drawPolygon(pPoints);
        graphics.endFill();
    }
}

export class ShipDisplay extends PIXI.Graphics implements IOnRender {
    private body: Body;
    public _orbit : PIXI.Graphics; // TODO : fix this, should be private
    

    constructor(body : Body) {
        super()
        this.body = body;

        let g = this;

        let poly = [
            -8, 8,
            0, -8,
            8, 8,
            -8, 8
        ];

        g.lineStyle(1, 0xDDDDDD);
        g.beginFill(0x884422);
        g.drawPolygon(poly);
        g.endFill();

        this._orbit = new PIXI.Graphics();
    }

    onRender(dt: number): void {
        this.position.set(this.body.interpolatedPosition[0], this.body.interpolatedPosition[1]);
        this.rotation = this.body.interpolatedAngle;

        this.updateOrbitPrediction();
    }

    updateOrbitPrediction(): void {
        this._orbit.clear();
        
        this._orbit
            .moveTo(this.position.x, this.position.y);

        let pos = vec2.clone(this.body.position);
        let vel = vec2.clone(this.body.velocity);

        let scratch : number[] = [0, 0];

        for(var i=0;i<50;++i) {
            // vec2.add(pos, pos, )
            this._orbit
                .lineStyle(4, 0xffffff)
                .lineTo(0, 0);
        }
    }

}