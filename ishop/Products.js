var Products = React.createClass({
    displayName: 'Products',

    render: function() {
        var productsCode = [];
        
        array = this.props.products;
        array.forEach(product => {
            var product = array[i];

            var productCode = 
                React.DOM.div({key: product.code, className: 'Product'},
                React.DOM.span({className: 'Text'}, product.text),
                );

            productsCode.push(productCode);
        });

        return React.DOM.div({className: 'ProductsBlock'},
        React.DOM.h2("Список стройматериалов: "),
        React.DOM.div({className: 'Records'}, productsCode),
        );
    },
});