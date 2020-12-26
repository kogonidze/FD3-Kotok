interface IScalable {
    getScale() : number;
    getName() : string;
}

class Scales {
    products: IScalable[] = [];

    add(newProduct: IScalable) : void{
        this.products.push(newProduct);
    }

    getNameList() : string[] {
        var nameList: string[] = [];

        this.products.forEach((product : IScalable) => {
            nameList.push(product.getName());
        });

        return nameList;
    }

    getSumScale() : number {
        var sumScale: number = 0;

        this.products.forEach((product : IScalable) => {
            var scale : number = product.getScale();
            sumScale += scale;
        });

        return sumScale;
    }
}

class Apple implements IScalable {
    constructor(private name: string, private scale: number) {}

    getName(): string {
        return this.name;
    }

    getScale(): number {
        return this.scale;
    }
}

class Tomato implements IScalable {
    constructor(private name: string, private scale: number) {}

    getName(): string {
        return this.name;
    }

    getScale(): number {
        return this.scale;
    }
}

let scale : Scales = new Scales();

let redApple : Apple = new Apple("red", 500);
let greenApple : Apple = new Apple("green", 700);

let smallTomato : Tomato = new Tomato("small", 200);
let bigTomato : Tomato = new Tomato("big", 600);

scale.add(redApple);
scale.add(greenApple);

console.log("After addition of apples");
console.log(scale.getSumScale());
console.log(scale.getNameList());

scale.add(smallTomato);
scale.add(bigTomato);

console.log("After addition of tomatoes");
console.log(scale.getSumScale());
console.log(scale.getNameList());
