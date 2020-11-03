var Product = React.createClass({
    displayName: 'Product',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        photo: React.PropTypes.string.isRequired,
    },

    render: function() {
        return React.DOM.div({className: 'Row'},
                React.DOM.div({className: 'Cell Text'}, this.props.name),
                React.DOM.div({className: 'Cell Text ToCenter'}, this.props.price),
                React.DOM.div({className: 'Cell Text ToCenter'}, this.props.count),
                React.DOM.img({src: this.props.photo, alt:'Product Sample', className: 'Cell Image'}));
    },
})