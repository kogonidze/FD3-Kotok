var Filter = React.createClass({
    displayName: 'Filter',

    propTypes: {
        strings: React.PropTypes.arrayOf(React.PropTypes.string),
    },

    getDefaultProps: function() {
        return {strings: ["Здесь должен быть массив строк"]}
    },

    getInitialState: function() {
        return {
            isSorted: false,
            isFiltered: false,
            isCancelled: false,
        }
    },

    sortArray: function() {
        this.setState({isSorted: true});
        console.log("qq");
    },

    render: function() {
        var stringsCode = this.props.strings;

        return React.DOM.div(null, 
            React.DOM.input({type: 'checkbox', onClick: this.sortArray}),
            React.DOM.input({type: 'text'}),
            React.DOM.input({type: 'button', value: 'сброс'}),
            this.state.isSorted ? React.DOM.div(null, React.DOM.textarea({type: "text", defaultValue: stringsCode.sort().join("\n"), rows: 10, cols: 25}))
            : React.DOM.div(null, React.DOM.textarea({type: "text", defaultValue: stringsCode.join("\n"), rows: 10, cols: 25})),
        );
    }
})