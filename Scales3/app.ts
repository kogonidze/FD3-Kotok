function uniFactory<objtype>(classRef: { new (): objtype }): objtype {
  return new classRef();
}

interface IStorageEngine {
  addItem(item: Product): void;
  getItem(index: number): Product;
  getCount(): number;
}

class ScalesStorageEngineArray implements IStorageEngine {
  private products: Array<Product>;

  constructor() {
    this.products = [];
  }

  addItem(item: Product): void {
    this.products.push(item);
  }

  getItem(index: number): Product {
    return this.products[index];
  }

  getCount(): number {
    return this.products.length;
  }
}

class ScalesStorageEngineLocalStorage implements IStorageEngine {
  constructor() {
    localStorage.clear();
  }
  addItem(item: Product): void {
    localStorage.setItem(localStorage.length.toString(), JSON.stringify(item));
  }
  getItem(index: number): Product {
    var object = JSON.parse(localStorage.getItem(index.toString()));
    return new Product(object.name, object.scale);
  }
  getCount(): number {
    return localStorage.length;
  }
}

class Scales<StorageItem extends IStorageEngine> {
  constructor(private scales: StorageItem) {}

  add(newProduct: Product): void {
    this.scales.addItem(newProduct);
  }

  getNameList(): string[] {
    var nameList: Array<string> = [];

    for (let i = 0; i < this.scales.getCount(); i++) {
      var product = this.scales.getItem(i);
      nameList.push(product.getName());
    }

    return nameList;
  }

  getSumScale(): number {
    var sumScale: number = 0;

    for (let i = 0; i < this.scales.getCount(); i++) {
      var product = this.scales.getItem(i);
      var scale: number = product.getScale();
      sumScale += scale;
    }

    return sumScale;
  }
}

class Product {
  private name: string;
  private scale: number;

  constructor(_name: string, _scale: number) {
    this.name = _name;
    this.scale = _scale;
  }

  public getName(): string {
    return this.name;
  }

  public getScale(): number {
    return this.scale;
  }
}

let scaleArray1: Scales<ScalesStorageEngineArray> = new Scales(
  uniFactory(ScalesStorageEngineArray)
);

let scaleArray2: Scales<ScalesStorageEngineArray> = new Scales(
  uniFactory(ScalesStorageEngineArray)
);

let scaleLocalStorage: Scales<ScalesStorageEngineLocalStorage> = new Scales(
  uniFactory(ScalesStorageEngineLocalStorage)
);

let redApple: Product = new Product("red", 500);
let greenApple: Product = new Product("green", 700);

let smallTomato: Product = new Product("small", 200);
let bigTomato: Product = new Product("big", 600);

scaleArray1.add(redApple);
scaleArray1.add(greenApple);
scaleArray2.add(smallTomato);
scaleArray2.add(bigTomato);

console.log("About array №1");
console.log(scaleArray1.getSumScale());
console.log(scaleArray1.getNameList());

console.log("About array №2");
console.log(scaleArray2.getSumScale());
console.log(scaleArray2.getNameList());

let waterMelon: Product = new Product("greenWaterMelon", 6400);
let pineApple: Product = new Product("yellowPineApple", 1100);

scaleLocalStorage.add(waterMelon);
scaleLocalStorage.add(pineApple);

console.log("About localstorage");
console.log(scaleLocalStorage.getSumScale());
console.log(scaleLocalStorage.getNameList());
