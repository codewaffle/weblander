import {Body, Box} from 'p2';

export default class Ship extends Body {
    constructor() {
        super({
            mass: 10
        });

        this.addShape(new Box());
    }

    public setThrust(amount : number) {
        let upDir = this.upDir;
        this.force = [upDir[0] * amount, upDir[1] * amount]
    }

    public get upDir(): number[] {
        let up = this.angle + Math.PI/2;
        return [Math.cos(up), Math.sin(up)]
    }
}
