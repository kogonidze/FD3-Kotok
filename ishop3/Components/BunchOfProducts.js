import React from 'react';

import './BunchOfProducts.css';
import Shop from './Shop';
import Product from './Product';

var BunchOfProducts = React.createClass({
    displayName: 'BunchOfProducts',

    propTypes: {
        shop: React.PropTypes.string.isRequired,
        products: React.PropTypes.arrayOf(
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

    getInitialState: function() {
        return {
            productToDelete: [],
            selectedProduct: null,
            products: this.props.products,
        };
    },

    cbSelectRow: function(code) {
        this.setState({selectedProduct: code});
    },

    cbDeleteRow: function(code) {
        this.setState({products: this.state.products.filter(elem => {
            if(elem.barcode != code)
                return elem;
        })})
    },

    render: function() {
        var productsCode = this.state.products.map( product => 
            React.createElement(Product, {key: product.barcode, 
                                name: product.name, 
                                price: product.price, 
                                count: product.count,
                                photo: product.photo,
                                barcode: product.barcode,
                                cbSelectRow: this.cbSelectRow,
                                cbDeleteRow: this.cbDeleteRow,
                                selectedProduct: this.state.selectedProduct,
                                productToDelete: this.state.productToDelete,
                            }));

        return React.DOM.div({className: 'BunchOfProducts'},
        React.createElement(Shop, {shop: this.props.shop}),
        React.DOM.table({className: 'Table'},
            React.DOM.tbody(null, 
                React.DOM.tr({className: 'Row'}, 
                    React.DOM.th({className: 'Cell ColumnNames ToCenter'}, 'Наименование товара'),
                    React.DOM.th({className: 'Cell ColumnNames ToCenter'}, 'Цена (в BYN)'),
                    React.DOM.th({className: 'Cell ColumnNames ToCenter'}, 'Остаток'),
                    React.DOM.th({className: 'Cell ColumnNames ToCenter'}, 'Фото'),
                    React.DOM.th({className: 'Cell ColumnNames ToCenter'}, "Удаление"),
                ),
                ({className: 'Row'}, productsCode)
        )),
        );
    },
});

export default BunchOfProducts;