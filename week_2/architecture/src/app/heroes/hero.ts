export class Hero{

    public id: number
    public name: String;
    public oneLiners: String[];

    constructor(id, name){
        this.id = id;
        this.name = name;
        this.oneLiners = [];
        this.oneLiners.push("With great power comes great power");
    }

    public addLine(msg : String): void{
        this.oneLiners.push(msg);
    }
}
