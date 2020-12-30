var Scales = /** @class */ (function () {
    function Scales() {
        this.products = [];
    }
    Scales.prototype.add = function (newProduct) {
        this.products.push(newProduct);
    };
    Scales.prototype.getNameList = function () {
        var nameList = [];
        this.products.forEach(function (product) {
            nameList.push(product.getName());
        });
        return nameList;
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        this.products.forEach(function (product) {
            var scale = product.getScale();
            sumScale += scale;
        });
        return sumScale;
    };
    return Scales;
}());
var Apple = /** @class */ (function () {
    function Apple(name, scale) {
        this.name = name;
        this.scale = scale;
    }
    Apple.prototype.getName = function () {
        return "Apple " + this.name;
    };
    Apple.prototype.getScale = function () {
        return this.scale;
    };
    return Apple;
}());
var Tomato = /** @class */ (function () {
    function Tomato(name, scale) {
        this.name = name;
        this.scale = scale;
    }
    Tomato.prototype.getName = function () {
        return "Tomato " + this.name;
    };
    Tomato.prototype.getScale = function () {
        return this.scale;
    };
    return Tomato;
}());
var scale = new Scales();
var redApple = new Apple("red", 500);
var greenApple = new Apple("green", 700);
var smallTomato = new Tomato("small", 200);
var bigTomato = new Tomato("big", 600);
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
//# sourceMappingURL=app.js.map