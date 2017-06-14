import {Body, Box} from 'p2';

export default class Ship extends Body {
    constructor() {
        super({
            mass: 10
        });

        this.addShape(new Box());
    }
}
