var BunchOfProducts = React.createClass({
    displayName: 'BunchOfProducts',

    propTypes: {
        shop: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        barcode: React.PropTypes.number.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        photo: React.PropTypes.string.isRequired,
    },
    
    getDefaultProps: function() {
        return { shop: "Безымянный"}
    }, 

    render: function() {
        var productsCode = [];
        var ColumnNames = 
                React.DOM.div({key: 0, className: 'Row'},
                React.DOM.div({className: 'Cell ColumnNames'}, 'Наименование товара'),
                React.DOM.div({className: 'Cell ColumnNames'}, 'Цена (в BYN)'),
                React.DOM.div({className: 'Cell ColumnNames'}, 'Остаток'),
                React.DOM.div({className: 'Cell ColumnNames ToCenter'}, 'Фото'),
                );

        productsCode.push(ColumnNames);

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

        return React.DOM.div({className: 'BunchOfProducts'},
        React.DOM.h2({className: 'Signboard'},`Магазин ${this.props.shop}`),
        React.DOM.div({className: 'Table'}, productsCode),
        );
    },
});