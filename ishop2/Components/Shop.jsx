var Shop = React.createClass({
    displayName: 'Shop',

    propTypes: {
        shop: React.PropTypes.string.isRequired,
    },

    render: function() {
        return React.DOM.h2({className: 'Signboard'},`Магазин ${this.props.shop}`);
    },
})