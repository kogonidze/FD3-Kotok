var Product = React.createClass({
    displayName: 'Product',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        photo: React.PropTypes.string.isRequired,
    },

    render: function() {
        return React.DOM.tr(null,
                React.DOM.td({className: 'Cell Text'}, this.props.name),
                React.DOM.td({className: 'Cell Text ToCenter'}, this.props.price),
                React.DOM.td({className: 'Cell Text ToCenter'}, this.props.count),
                React.DOM.td({className: 'Cell'}, React.DOM.img({src: this.props.photo, alt:'Product Sample', className: 'Image'})));
    },
})