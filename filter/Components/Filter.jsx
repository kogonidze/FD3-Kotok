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
            isFiltered: "",
            isCancelled: false,
        }
    },

    sortArray: function(EO) {
        this.setState({isSorted: EO.target.checked});
        console.log("qq");
    },

    filterArray: function(EO) {
        this.setState({isFiltered: EO.target.value});
    },

    cancel: function() {
        this.setState({isSorted: false, isFiltered: ""});
    },

    getAllSubstr: function() {
        return this.props.strings.filter(elem => {
            if(elem.toLowerCase().indexOf(this.state.isFiltered.toLowerCase()) !== -1)
            {
                return elem
            }
        });
    },

    render: function() {
        var stringsCode = this.props.strings.slice();

        return React.DOM.div({className: 'Filter'}, 
            React.DOM.input({type: 'checkbox', checked: this.state.isSorted, onClick: this.sortArray}),
            React.DOM.input({type: 'text', onChange: this.filterArray, value: this.state.isFiltered}),
            React.DOM.input({type: 'button', value: 'сброс', onClick: this.cancel}),
            React.DOM.div({className: "Textarea"}, React.DOM.textarea({type: "text", value: this.state.isFiltered != "" ? (
                this.state.isSorted ?  this.getAllSubstr().sort().join("\n") : this.getAllSubstr().join("\n")
            ) : (this.state.isSorted ?
            stringsCode.sort().join("\n") : this.props.strings.join("\n")), rows: 10, cols: 25})),
        );
    }
})