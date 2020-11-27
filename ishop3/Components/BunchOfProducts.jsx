import React from 'react';
import PropTypes from 'prop-types';
import './BunchOfProducts.css';
import Shop from './Shop.jsx';
import Product from './Product.jsx';

class BunchOfProducts extends React.Component {
    static propTypes = {
        shop: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                barcode: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
                count: PropTypes.number.isRequired,
                photo: PropTypes.string.isRequired,
            })
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            productToDelete: [],
            selectedProduct: null,
            products: this.props.products,
        };
    }

    cbSelectRow = (code) => {
        this.setState({selectedProduct: code});
    }

    cbDeleteRow = (code) => {
        this.setState({products: this.state.products.filter(elem => {
            if(elem.barcode != code)
                return elem;
        })})
    }

    render() {
        var productsCode = this.state.products.map( product => 
            <Product key={product.barcode}
                    name={product.name} 
                    price={product.price} 
                    count={product.count}
                    photo={product.photo}
                    barcode={product.barcode}
                    cbSelectRow={this.cbSelectRow}
                    cbDeleteRow={this.cbDeleteRow}
                    selectedProduct={this.state.selectedProduct}
                    productToDelete={this.state.productToDelete} />
                );

        return <div className='BunchOfProducts'>
            <Shop shop={this.props.shop} />
            <table className='Table'>
                <tr className='Row'>
                    <th className='Cell ColumnNames ToCenter'> Наименование товара </th>
                    <th className='Cell ColumnNames ToCenter'> Цена (в BYN) </th>
                    <th className='Cell ColumnNames ToCenter'> Остаток </th>
                    <th className='Cell ColumnNames ToCenter'> Фото </th>
                    <th className='Cell ColumnNames ToCenter'> Удаление </th>
                </tr>
                <tbody className='Row'> {productsCode} </tbody> 
            </table>
        </div>
    }
}

export default BunchOfProducts;