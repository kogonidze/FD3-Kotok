import React from 'react';

import './Shop.css';

var Shop = React.createClass({
    displayName: 'Shop',

    propTypes: {
        shop: React.PropTypes.string.isRequired,
    },

    render: function() {
        return React.DOM.h2({className: 'Shop'},`Магазин ${this.props.shop}`);
    },
});

export default Shop;

