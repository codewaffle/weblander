import Point from "./Point"

export default class Planetoid {
    private position : Point;
    private terrain : Point[];

    public get TerrainPoints() : Point [] {
        return this.terrain;
    }

    get X(): number {
        return this.position.X;
    }

    get Y(): number{
        return this.position.Y;
    }

    constructor(terrain : Point[]) {
        this.position = new Point();
        this.terrain = terrain;
    }
}
