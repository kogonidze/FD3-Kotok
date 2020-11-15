import React from 'react';

import './BunchOfProducts.css';

var Product = React.createClass({
    displayName: 'Product',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        photo: React.PropTypes.string.isRequired,
        cbSelectRow: React.PropTypes.func.isRequired,
        cbDeleteRow: React.PropTypes.func.isRequired,
        productToDelete: React.PropTypes.arrayOf(React.PropTypes.number),
        selectedProduct: React.PropTypes.number,
    },

    selectRow: function() {
        if(this.props.selectedProduct == this.props.barcode)
        {
            this.props.cbSelectRow(null);
        }
        else
        {
            this.props.cbSelectRow(this.props.barcode);
        }
    },

    deleteRow: function() {
        let isDelete = confirm("Вы действительно хотите удалить элемент?");
        if(isDelete)
            this.props.cbDeleteRow(this.props.barcode);
    },

    render: function() {
        return (this.props.productToDelete.includes(this.props.barcode)) ? null : React.DOM.tr({onClick: this.selectRow, style: {background: this.props.selectedProduct == this.props.barcode ? 'grey' : 'white'}},
                React.DOM.td({className: 'Cell Text'}, this.props.name),
                React.DOM.td({className: 'Cell Text ToCenter'}, this.props.price),
                React.DOM.td({className: 'Cell Text ToCenter'}, this.props.count),
                React.DOM.td({className: 'Cell'}, 
                    React.DOM.img({src: this.props.photo, alt:'Product Sample', className: 'Image'})),
                React.DOM.td({className: 'Cell ToCenter'}, 
                    React.DOM.input({type: 'button', value: "Удалить", onClick: this.deleteRow})));
    },
})

export default Product;