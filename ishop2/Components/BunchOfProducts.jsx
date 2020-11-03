var BunchOfProducts = React.createClass({
    displayName: 'BunchOfProducts',

    propTypes: {
        shop: React.PropTypes.string.isRequired,
        product: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                barcode: React.PropTypes.number.isRequired,
                price: React.PropTypes.number.isRequired,
                count: React.PropTypes.number.isRequired,
                photo: React.PropTypes.string.isRequired,
            })
        ),
    },
    
    getDefaultProps: function() {
        return { shop: "Безымянный"}
    }, 

    render: function() {
        var productsCode = this.props.products.map( product => 
            React.createElement(Product, {key: product.barcode, 
                                name: product.name, 
                                price: product.price, 
                                count: product.count,
                                photo: product.photo,
                            }));

        return React.DOM.div({className: 'BunchOfProducts'},
        React.createElement(Shop, {shop: this.props.shop}),
        React.DOM.table({className: 'Table'},
            React.DOM.tbody(null, 
                React.DOM.tr({className: 'Row'}, 
                    React.DOM.th({className: 'Cell ColumnNames'}, 'Наименование товара'),
                    React.DOM.th({className: 'Cell ColumnNames'}, 'Цена (в BYN)'),
                    React.DOM.th({className: 'Cell ColumnNames'}, 'Остаток'),
                    React.DOM.th({className: 'Cell ColumnNames ToCenter'}, 'Фото'),
                ),
                ({className: 'Row'}, productsCode)
        )),
        );
    },
});