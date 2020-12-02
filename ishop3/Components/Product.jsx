import React from 'react';
import PropTypes from 'prop-types';
import './BunchOfProducts.css';

class Product extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        photo: PropTypes.string.isRequired,
        cbSelectRow: PropTypes.func.isRequired,
        cbDeleteRow: PropTypes.func.isRequired,
        cbBeginEditProduct: PropTypes.func.isRequired,
        productToDelete: PropTypes.arrayOf(PropTypes.number),
        selectedProduct: PropTypes.number,
        shouldAddNewRow: PropTypes.bool,
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
        let isDelete = confirm("Вы действительно хотите удалить элемент?");
        if(isDelete)
            this.props.cbDeleteRow(this.props.barcode);
    }

    editRow = () => {
        this.props.cbBeginEditProduct();
    }

    render() {
        return <tr onClick={this.selectRow} style={{background: this.props.selectedProduct == this.props.barcode ? 'grey' : 'white'}} >
            <td className='Cell Text'> {this.props.name} </td>
            <td className='Cell Text ToCenter'> {this.props.price} </td>
            <td className='Cell Text ToCenter'> {this.props.count} </td>
            <td className='Cell'> 
                <img src={this.props.photo} alt='Product Sample' className='Image' /> 
            </td>
            <td className='Cell ToCenter'> 
                <input type='button' value="Удалить" onClick={this.deleteRow} disabled={this.props.shouldAddNewRow} />
                <input type='button' value="Редактировать" onClick={this.editRow} disabled={this.props.shouldAddNewRow}/>
            </td>
        </tr>
        
    }
}

export default Product;