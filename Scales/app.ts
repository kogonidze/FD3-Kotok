
class Scales {
    products: Product[] = [];

    add(newProduct: Product) : void{
        this.products.push(newProduct);
    }

    getNameList() : string[] {
        var nameList: string[] = [];

        this.products.forEach((product : Product) => {
            nameList.push(product.getName());
        });

        return nameList;
    }

    getSumScale() : number {
        var sumScale: number = 0;

        this.products.forEach((product : Product) => {
            var scale : number = product.getScale();
            sumScale += scale;
        });

        return sumScale;
    }
}

class Product {
    name: string;
    scale: number;

    constructor(_name:string, _scale:number)
    {
        this.name = _name;
        this.scale = _scale;
    }

    getName(): string {
        return this.name;
    }

    getScale(): number {
        return this.scale;
    }
}

class Apple extends Product {
    constructor(_name: string, _scale: number)
    {
        super(_name, _scale);
    }
}

class Tomato extends Product {
    constructor(_name: string, _scale: number)
    {
        super(_name, _scale);
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
