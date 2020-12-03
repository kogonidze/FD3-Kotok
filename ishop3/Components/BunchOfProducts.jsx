import React from 'react';
import PropTypes from 'prop-types';
import './BunchOfProducts.css';
import Shop from './Shop.jsx';
import Product from './Product.jsx';
import ProductCard from './ProductCard.jsx';
import AddNewProduct from './AddNewProduct.jsx';
import EditNewProduct from './EditProduct.jsx';
import AddOrEditProduct from './AddOrEditProduct.jsx';

class BunchOfProducts extends React.Component {
    static propTypes = {
        shop: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                barcode: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
                count: PropTypes.number.isRequired,
                image: PropTypes.string.isRequired,
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
            shouldEditRow: false,
            shouldViewModeOn: false,
        };
    }

    cbBeginEditProduct = (code) => {
        this.setState({shouldEditRow: true, selectedProduct: code});
    }

    cbConfirmationAdditionNewProduct = (name, price, count, image, barcode) => {
        var tempArr = this.state.products.slice();
        tempArr.push({name: name, price: price, count: count, image: image, barcode: barcode});
        this.setState({products: tempArr, shouldAddNewRow: false});
    }

    cbConfirmationEditionProduct = (name, price, count, image, barcode) => {
        var newItem = {name: name, price: price, count: count, image: image, barcode: barcode};
        var tempArr = this.state.products.slice();
        var itemIndex = tempArr.findIndex(x => x.barcode == barcode);
        tempArr[itemIndex] = newItem;
        this.setState({products: tempArr, shouldEditRow: false});
    }

    cbCancelAdditionNewProduct = () => {
        this.setState({shouldAddNewRow: false})
    }

    cbCancelEditionProduct = () => {
        this.setState({shouldEditRow: false})
    }

    cbSelectRow = (code) => {
        if(!this.state.shouldAddNewRow)
            this.setState({selectedProduct: code, shouldViewModeOn: true});
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

    createNewProduct = () => {
        var tempArr = this.state.products.slice();
        tempArr.push({name: "", price: "", count: "", image: "", barcode: ""});
        this.setState({products: tempArr});
    }
    
    render() {
        var productsCode = this.state.products.map( product => 
            <Product key={product.barcode}
                    name={product.name} 
                    price={product.price} 
                    count={product.count}
                    image={product.image}
                    barcode={product.barcode}
                    cbSelectRow={this.cbSelectRow}
                    cbDeleteRow={this.cbDeleteRow}
                    cbBeginEditProduct={this.cbBeginEditProduct}
                    selectedProduct={this.state.selectedProduct}
                    productToDelete={this.state.productToDelete} 
                    shouldAddNewRow={this.state.shouldAddNewRow}
                    />
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
                <div className="ProductCard"> {this.state.shouldViewModeOn && !this.state.shouldEditRow &&
                                    <ProductCard key={selectedProductInfo.barcode}
                                        name={selectedProductInfo.name}
                                        price={selectedProductInfo.price}
                                        count={selectedProductInfo.count}
                                        image={selectedProductInfo.image} 
                                        />} 
                </div>
                <div className="ProductCard"> { this.state.shouldAddNewRow && 
                <AddOrEditProduct cbCancelAdditionNewProduct={this.cbCancelAdditionNewProduct} 
                cbConfirmationAdditionNewProduct={this.cbConfirmationAdditionNewProduct} mode="Additon" />}

                { this.state.shouldEditRow && this.state.selectedProduct && 
                <AddOrEditProduct cbCancelEditionNewProduct={this.cbCancelEditionProduct} 
                cbConfirmationEditionProduct={this.cbConfirmationEditionProduct} mode="Edition" product={selectedProductInfo} />}
                
                {/* {this.state.shouldAddNewRow == true && 
                   <AddNewProduct cbCancelAdditionNewProduct={this.cbCancelAdditionNewProduct} 
                   cbConfirmationAdditionNewProduct={this.cbConfirmationAdditionNewProduct} /> }

                   {this.state.shouldEditRow == true && <EditNewProduct product={selectedProductInfo} 
                   cbCancelEditionProduct={this.cbCancelEditionProduct} 
                   cbConfirmationEditionNewProduct = {this.cbConfirmationEditionNewProduct} />} */}
                </div>
            </div>
            <input type="button" value="Добавить новый товар" onClick={this.addNewRow} disabled={this.state.shouldAddNewRow || this.state.shouldEditRow}/>
        </div>
    }
}

export default BunchOfProducts;