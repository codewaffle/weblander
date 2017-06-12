export default class Point {
    public X : number;
    public Y : number;

    constructor(x?:number, y?:number) {
        this.X = x || 0;
        this.Y = y || 0;
    }
}