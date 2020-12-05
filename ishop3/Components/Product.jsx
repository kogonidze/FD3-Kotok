import React from 'react';
import PropTypes from 'prop-types';
import './BunchOfProducts.css';
import { ConfitmToDeleteProductQuestion, DeleteProductButtonName, EditProductButtonName, GreyColor, WhiteColor } from './Constants.jsx';

class Product extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        cbSelectRow: PropTypes.func.isRequired,
        cbDeleteRow: PropTypes.func.isRequired,
        cbBeginEditProduct: PropTypes.func.isRequired,
        selectedProduct: PropTypes.number,
        shouldAddNewRow: PropTypes.bool,
        shouldEditRow: PropTypes.bool,
    };

    selectRow = () => {
        if(this.props.selectedProduct == this.props.barcode)
        {
            this.props.cbSelectRow(null);
        }
        else
        {
            this.props.cbSelectRow(this.props.barcode);
        }
    }

    deleteRow = () => {
        let isDelete = confirm(ConfitmToDeleteProductQuestion);
        if(isDelete)
            this.props.cbDeleteRow(this.props.barcode);
    }

    editRow = () => {
        this.props.cbBeginEditProduct(this.props.barcode);
    }

    render() {
        return <tr style={{background: this.props.selectedProduct == this.props.barcode ? GreyColor : WhiteColor}} >
            <td onClick={this.selectRow} className='Cell Text'> {this.props.name} </td>
            <td onClick={this.selectRow} className='Cell Text ToCenter'> {this.props.price} </td>
            <td onClick={this.selectRow} className='Cell Text ToCenter'> {this.props.count} </td>
            <td onClick={this.selectRow} className='Cell'> 
                <img src={this.props.image} alt='Product Sample' className='Image' /> 
            </td>
            <td className='Cell ToCenter'> 
                <div className="Wrapper">
                    <input type='button' className="Buttons LittleMargin" value={DeleteProductButtonName} onClick={this.deleteRow} disabled={this.props.shouldAddNewRow || this.props.shouldEditRow} />
                    <input type='button' className="Buttons LittleMargin" value={EditProductButtonName} onClick={this.editRow} disabled={this.props.shouldAddNewRow}/>
                </div>
            </td>
        </tr>
        
    }
}

export default Product;