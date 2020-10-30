var Products = React.createClass({
    displayName: 'Products',

    getDefaultProps: function() {
        return { shop: "Безымянный"}
    }, 

    render: function() {
        var productsCode = [];
        var FirstLineCode = 
                React.DOM.div({key: 0, className: 'Row'},
                React.DOM.div({className: 'Cell FirstRow'}, 'Наименование товара'),
                React.DOM.div({className: 'Cell FirstRow'}, 'Цена (в BYN)'),
                React.DOM.div({className: 'Cell FirstRow'}, 'Остаток'),
                React.DOM.div({className: 'Cell FirstRow ToCenter'}, 'Фото'),
                );

        productsCode.push(FirstLineCode);

        allProducts = this.props.products;
        allProducts.forEach(function(item, i, allProducts) {
            var product = allProducts[i];

            var productCode = 
                React.DOM.div({key: product.barcode, className: 'Row'},
                React.DOM.div({className: 'Cell Text'}, product.name),
                React.DOM.div({className: 'Cell Text ToCenter'}, product.price),
                React.DOM.div({className: 'Cell Text ToCenter'}, product.count),
                React.DOM.img({src: product.photo, alt:'Product Sample', className: 'Cell Image'}),
                );

            productsCode.push(productCode);
        });

        return React.DOM.div({className: 'Table'},
        React.DOM.h2({},`Магазин ${this.props.shop}`),
        React.DOM.div({}, productsCode),
        );
    },
});