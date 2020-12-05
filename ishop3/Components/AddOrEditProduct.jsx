import React from 'react';
import PropTypes from 'prop-types';
import './BunchOfProducts.css';

import {AddMode, EditMode, EmptyString, HeadingForAddNewProduct, HeadingForEditNewProduct, InvalidCountEmptyMessage, 
    InvalidCountNotNumberMessage, InvalidImageEmptyMessage, InvalidNameEmptyMessage, InvalidPriceEmptyMessage, 
    InvalidPriceNotNumberMessage, RegularExpressionPatternForCheckingOnNumeric, ConfirmSavingEditionProductButtonName, 
    ConfirmAdditionNewProductButtonName, CancelButtonName, GreenColor, RedColor} from './Constants.jsx';

class AddOrEditProduct extends React.Component {
    static propTypes = {
        product: PropTypes.shape({
            name: PropTypes.string.isRequired,
            barcode: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        }),
        cbCancelAdditionNewProduct: PropTypes.func,
        cbConfirmationAdditionNewProduct: PropTypes.func,
        mode: PropTypes.string.isRequired,
        cbCancelEditionNewProduct: PropTypes.func,
        cbConfirmationEditionProduct: PropTypes.func,
        cbIsChangedProduct: PropTypes.func,
    }

    state = {
        invalidNameMessage: EmptyString,
        invalidPriceMessage: EmptyString,
        invalidCountMessage: EmptyString,
        invalidImageMessage: EmptyString,
        invalidBarcodeMessage: EmptyString,
        name: (this.props.mode == EditMode)?this.props.product.name : EmptyString,
        price: (this.props.mode == EditMode)?this.props.product.price : EmptyString,
        count: (this.props.mode == EditMode)?this.props.product.count : EmptyString,
        image: (this.props.mode == EditMode)?this.props.product.image : EmptyString,
        barcode: (this.props.mode == EditMode)?this.props.product.barcode: EmptyString,
        isValidName: (this.props.mode == EditMode)?true: false,
        isValidPrice: (this.props.mode == EditMode)?true: false,
        isValidCount: (this.props.mode == EditMode)?true: false,
        isValidImage: (this.props.mode == EditMode)?true: false,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.product.barcode !== this.state.barcode)
            this.setState({ name: nextProps.product.name, price: nextProps.product.price,
            count: nextProps.product.count, image: nextProps.product.image, barcode: nextProps.product.barcode});
    }

    onChangeProduct = () => {
        this.props.cbIsChangedProduct();
    }

    checkingForEmptyString = (str) => {
        if(str == EmptyString)
            return true;
        return false;
    }

    checkingForNumeric = (number) => {
        if(number.match(RegularExpressionPatternForCheckingOnNumeric))
        
            return true;
        return false;
    }

    canceled = () => {
        if(typeof this.props.cbCancelAdditionNewProduct === "function")
        {
            this.props.cbCancelAdditionNewProduct();
        }
        else if(typeof this.props.cbCancelEditionNewProduct === "function")
        {
            this.props.cbCancelEditionNewProduct();
        }
    }

    confirmation = () => {
        if(typeof this.props.cbConfirmationAdditionNewProduct === "function")
        {
            this.props.cbConfirmationAdditionNewProduct(this.state.name, parseFloat(this.state.price, 10), parseFloat(this.state.count, 10), 
            this.state.image, parseFloat(this.state.barcode, 10));
        }
        else if(typeof this.props.cbConfirmationEditionProduct === "function")
        {
            this.props.cbConfirmationEditionProduct(this.state.name, parseFloat(this.state.price, 10), parseFloat(this.state.count, 10), 
            this.state.image, parseFloat(this.state.barcode, 10));
        }
    }

    changedValueOnInput = (EO) => {
        (this.props.mode == EditMode)? this.props.cbIsChangedProduct() : null;
        this.checkValid(EO);
    }

    checkValid = (EO) => {
        if(this.checkingForEmptyString(EO.target.value))
        {
            this.failedValidWithEmptyString(EO);
            return;
        }
        
        if((EO.target.name == 'price_input' || EO.target.name == 'rest_input') && 
        !this.checkingForNumeric(EO.target.value))
        {
            this.failedValidWithNotNumericString(EO);
            return;
        }

        this.successfulValidation(EO);
    }

    failedValidWithEmptyString = (EO) => {
        switch (EO.target.name) {
            case 'name_input': 
                this.setState({isValidName: false, invalidNameMessage: InvalidNameEmptyMessage, name: EO.target.value});
                break;
            case 'price_input':
                this.setState({isValidPrice: false, invalidPriceMessage: InvalidPriceEmptyMessage, price: EO.target.value});
                break;
            case 'rest_input':
                this.setState({isValidCount: false, invalidCountMessage: InvalidCountEmptyMessage, count: EO.target.value});
                break;
            case 'image_input':
                this.setState({isValidImage: false, invalidImageMessage: InvalidImageEmptyMessage, image: EO.target.value});
                break;
        }
    }

    failedValidWithNotNumericString = (EO) => {
        switch (EO.target.name) {
            case 'price_input':
                this.setState({isValidPrice: false, invalidPriceMessage: InvalidPriceNotNumberMessage, price: EO.target.value});
                break;
            case 'rest_input':
                this.setState({isValidCount: false, invalidCountMessage: InvalidCountNotNumberMessage, count: EO.target.value});
                break;
        }
    }

    successfulValidation = (EO) => {
        switch (EO.target.name) {
            case 'name_input': 
                this.setState({isValidName: true, invalidNameMessage: EmptyString, name: EO.target.value});
                break;
            case 'price_input':
                this.setState({isValidPrice: true, invalidPriceMessage: EmptyString, price: EO.target.value});
                break;
            case 'rest_input':
                this.setState({isValidCount: true, invalidCountMessage: EmptyString, count: EO.target.value});
                break;
            case 'image_input':
                this.setState({isValidImage: true, invalidImageMessage: EmptyString, image: EO.target.value});
                break;
        }
    }

    render()
    {
        return <form className="Form">
            <fieldset className="Fieldset">
                <legend className="Headings">{(this.props.mode==AddMode && HeadingForAddNewProduct) ||
                 (this.props.mode== EditMode && HeadingForEditNewProduct)}</legend>
                {/* <legend>{this.props.mode== EditMode && HeadingForEditNewProduct}</legend> */}
                <p>
                    <label className="Label">Имя:</label>
                    <input name="name_input" type="text" onChange={this.changedValueOnInput} 
                    value={this.state.name} style={{borderColor: this.state.isValidName ? GreenColor: RedColor}}/>                                     
                </p>
                <span className="FailedValidationMessage">{this.state.invalidNameMessage}</span>
                <p>
                    <label className="Label">Цена:</label>
                    <input name="price_input" type="text" onChange={this.changedValueOnInput} 
                    value={this.state.price} style={{borderColor: this.state.isValidPrice ? GreenColor : RedColor}}/>
                </p>
                <span className="FailedValidationMessage">{this.state.invalidPriceMessage}</span>
                <p>
                    <label className="Label">Остаток:</label>
                    <input name="rest_input" type="text" onChange={this.changedValueOnInput} 
                    value={this.state.count} style={{borderColor: this.state.isValidCount ? GreenColor : RedColor}}/>
                </p>
                <span className="FailedValidationMessage">{this.state.invalidCountMessage}</span>
                <p>
                    <label className="Label">Фото:</label>
                    <input name="image_input" type="text" onChange={this.changedValueOnInput}  
                    value={this.state.image} style={{borderColor: this.state.isValidImage ? GreenColor : RedColor}}/>
                </p>
                <span className="FailedValidationMessage">{this.state.invalidImageMessage}</span>
                <br/>
                <input type="button" className="Buttons" style={{float: "left"}} value={this.props.mode==EditMode ? ConfirmSavingEditionProductButtonName : ConfirmAdditionNewProductButtonName} onClick={this.confirmation} 
            disabled={!(this.state.isValidName && this.state.isValidPrice && this.state.isValidCount 
            && this.state.isValidImage)}/>
                <input type="button" className="Buttons" style={{float: "right"}} value={CancelButtonName} onClick={this.canceled}/>
            </fieldset>
        </form>
    }
}

export default AddOrEditProduct;