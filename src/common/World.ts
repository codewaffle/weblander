import * as p2 from 'p2'

export class World extends p2.World {
    public calculateGravityAtPoint(point : number[]) : number [] {
        return [0, 0];
    }
}