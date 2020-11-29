import React from 'react';
import PropTypes from 'prop-types';
import './BunchOfProducts.css';
import Shop from './Shop.jsx';
import Product from './Product.jsx';
import ProductCard from './ProductCard.jsx';
import AddNewProduct from './AddNewProduct.jsx';

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
            shouldAddNewRow: false,
            isValidName: false,
            isValidPrice: false,
            isValidCount: false,
            isValidImage: false,
            isValidBarcode: false
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

    addNewRow = () => {
        this.setState({shouldAddNewRow: true, selectedProduct: null})
    }

    getProductCard = (code) => {
         this.state.products.find(product => {
             if(product.barcode == code)
                return product;
         })
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
            
        var selectedProductInfo = this.state.products.find(product => {
            if(product.barcode == this.state.selectedProduct)
                return product;
        });

        return <div className='BunchOfProducts'>
            <Shop shop={this.props.shop} />
            <div className="Flex">
                <table className='Table'>
                    <thead>
                        <tr className='Row'>
                            <th className='Cell ColumnNames ToCenter'>Наименование товара</th>
                            <th className='Cell ColumnNames ToCenter'>Цена (в BYN)</th>
                            <th className='Cell ColumnNames ToCenter'>Остаток</th>
                            <th className='Cell ColumnNames ToCenter'>Фото</th>
                            <th className='Cell ColumnNames ToCenter'>Удаление</th>
                        </tr>
                    </thead>
                    <tbody className='Row'>{productsCode}</tbody> 
                </table>
                <div className="ProductCard"> {this.state.selectedProduct != null && <ProductCard key={selectedProductInfo.barcode}
                                        name={selectedProductInfo.name}
                                        price={selectedProductInfo.price}
                                        count={selectedProductInfo.count}
                                        photo={selectedProductInfo.photo} />} 
                </div>
                <div className="ProductCard"> {this.state.shouldAddNewRow == true && 
                   <AddNewProduct />}
                </div>
            </div>
            <input type="button" value="Добавить новый товар" onClick={this.addNewRow}/>
        </div>
    }
}

export default BunchOfProducts;