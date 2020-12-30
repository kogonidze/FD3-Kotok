function uniFactory(classRef) {
    return new classRef();
}
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.products = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.products.push(item);
    };
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        return this.products[index];
    };
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.products.length;
    };
    return ScalesStorageEngineArray;
}());
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage() {
        localStorage.clear();
    }
    ScalesStorageEngineLocalStorage.prototype.addItem = function (item) {
        localStorage.setItem(localStorage.length.toString(), JSON.stringify(item));
    };
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        var object = JSON.parse(localStorage.getItem(index.toString()));
        return new Product(object.name, object.scale);
    };
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        return localStorage.length;
    };
    return ScalesStorageEngineLocalStorage;
}());
var Scales = /** @class */ (function () {
    function Scales(scales) {
        this.scales = scales;
    }
    Scales.prototype.add = function (newProduct) {
        this.scales.addItem(newProduct);
    };
    Scales.prototype.getNameList = function () {
        var nameList = [];
        for (var i = 0; i < this.scales.getCount(); i++) {
            var product = this.scales.getItem(i);
            nameList.push(product.getName());
        }
        return nameList;
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        for (var i = 0; i < this.scales.getCount(); i++) {
            var product = this.scales.getItem(i);
            var scale = product.getScale();
            sumScale += scale;
        }
        return sumScale;
    };
    return Scales;
}());
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getScale = function () {
        return this.scale;
    };
    return Product;
}());
// let scaleArray1: Scales<ScalesStorageEngineArray> = new Scales(
//   new ScalesStorageEngineArray()
// );
var scaleArray1 = new Scales(uniFactory(ScalesStorageEngineArray));
var scaleArray2 = new Scales(uniFactory(ScalesStorageEngineArray));
var scaleLocalStorage = new Scales(uniFactory(ScalesStorageEngineLocalStorage));
var redApple = new Product("red", 500);
var greenApple = new Product("green", 700);
var smallTomato = new Product("small", 200);
var bigTomato = new Product("big", 600);
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
var waterMelon = new Product("greenWaterMelon", 6400);
var pineApple = new Product("yellowPineApple", 1100);
scaleLocalStorage.add(waterMelon);
scaleLocalStorage.add(pineApple);
console.log("About localstorage");
console.log(scaleLocalStorage.getSumScale());
console.log(scaleLocalStorage.getNameList());
//# sourceMappingURL=app.js.map