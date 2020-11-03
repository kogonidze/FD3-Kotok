var Product = React.createClass({
    displayName: 'Product',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        barcode: React.PropTypes.number.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        photo: React.PropTypes.string.isRequired,
    },

    render: function() {

    },
})