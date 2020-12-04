import React from 'react';
import PropTypes from 'prop-types';
import './BunchOfProducts.css';

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
        cbIsChangedProduct: PropTypes.func.isRequired,
    }

    state = {
        invalidNameMessage: "",
        invalidPriceMessage: "",
        invalidCountMessage: "",
        invalidImageMessage: "",
        invalidBarcodeMessage: "",
        name: (this.props.mode == "Edition")?this.props.product.name : "",
        price: (this.props.mode == "Edition")?this.props.product.price : "",
        count: (this.props.mode == "Edition")?this.props.product.count : "",
        image: (this.props.mode == "Edition")?this.props.product.image : "",
        barcode: (this.props.mode == "Edition")?this.props.product.barcode: "",
        isValidName: (this.props.mode == "Edition")?true: false,
        isValidPrice: (this.props.mode == "Edition")?true: false,
        isValidCount: (this.props.mode == "Edition")?true: false,
        isValidImage: (this.props.mode == "Edition")?true: false,
        //isValidBarcode: (this.props.mode == "Edition")?true: false,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.product.name !== this.state.name) {
          this.setState({ name: nextProps.product.name });
        }

        if (nextProps.product.price !== this.state.price) {
            this.setState({ price: nextProps.product.price });
        }

        if (nextProps.product.count !== this.state.count) {
            this.setState({ count: nextProps.product.count });
        }

        if (nextProps.product.image !== this.state.image) {
            this.setState({ image: nextProps.product.image });
        }

        if (nextProps.product.barcode !== this.state.barcode) {
            this.setState({ barcode: nextProps.product.barcode });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.name != nextState.name || this.state.count != nextState.count || this.state.price != nextState.price
        || this.state.image != nextState.image;
    }

    onChangeProduct = () => {
        this.props.cbIsChangedProduct();
    }

    checkingForEmptyString = (str) => {
        if(str == "")
            return true;
        return false;
    }

    checkingForNumeric = (number) => {
        if(!isNaN(parseFloat(number)) && isFinite(number))
            return true;
        return false;
    }

    addedName = (EO) => {       
        if(this.checkingForEmptyString(EO.target.value))
        {
            this.setState({isValidName: false});
            this.setState({invalidNameMessage: "Поле Имя не должно быть пустым!"});
            this.onChangeProduct();
        }
        else
        {
            this.setState({name: EO.target.value});
            this.setState({isValidName: true});
            this.setState({invalidNameMessage: ""});
            this.onChangeProduct();
        }
    }

    addedPrice = (EO) => {
        if(this.checkingForEmptyString(EO.target.value))
        {
            this.setState({isValidPrice: false});
            this.setState({invalidPriceMessage: "Поле Цена не должно быть пустым!"});
            this.onChangeProduct();
        }
        else if(!this.checkingForNumeric(EO.target.value))
        {
            this.setState({isValidPrice: false});
            this.setState({invalidPriceMessage: "Поле Цена должно быть десятичным числом!"});
            this.onChangeProduct();
        }
        else
        {
            this.setState({price: EO.target.value});
            this.setState({isValidPrice: true});
            this.setState({invalidPriceMessage: ""});
            this.onChangeProduct();
        }
    }

    addedCount = (EO) => {
        if(this.checkingForEmptyString(EO.target.value))
        {
            this.setState({isValidCount: false});
            this.setState({invalidCountMessage: "Поле Остаток не должно быть пустым!"});
            this.onChangeProduct();
        }
        else if(!this.checkingForNumeric(EO.target.value))
        {
            this.setState({isValidCount: false});
            this.setState({invalidCountMessage: "Поле Остаток должно быть десятичным числом!"});
            this.onChangeProduct();
        }
        else
        {
            this.setState({count: EO.target.value});
            this.setState({isValidCount: true});
            this.setState({invalidCountMessage: ""});
            this.onChangeProduct();
        }
    }

    addedImage = (EO) => {
        if(this.checkingForEmptyString(EO.target.value))
        {
            this.setState({isValidImage: false});
            this.setState({invalidImageMessage: "Поле Фото не должно быть пустым!"});
            this.onChangeProduct();
        }
        else
        {
            this.setState({image: EO.target.value});
            this.setState({isValidImage: true});
            this.setState({invalidImageMessage: ""});
            this.onChangeProduct();
        }
    }

    // addedBarcode = (EO) => {
    //     if(this.checkingForEmptyString(EO.target.value))
    //     {
    //         this.setState({isValidBarcode: false});
    //         this.setState({invalidBarcodeMessage: "Поле Штрихкод не должно быть пустым!"})
    //     }
    //     else if(!this.checkingForNumeric(EO.target.value))
    //     {
    //         this.setState({isValidBarcode: false});
    //         this.setState({invalidBarcodeMessage: "Поле Штрихкод должно быть десятичным числом!"})
    //     }
    //     else
    //     {
    //         this.setState({barcode: EO.target.value});
    //         this.setState({isValidBarcode: true});
    //         this.setState({invalidBarcodeMessage: ""});
    //     }
    // }

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

    render()
    {
        return <form className="BunchOfProducts">
            <fieldset>
                <legend>{this.props.mode=="Addition" && "Добавление нового товара"}</legend>
                <legend>{this.props.mode=="Edition" && "Изменение существующего товара"}</legend>
                <p>
                    <label className="Label">Имя:</label>
                    <input id="name_input" type="text" size="15" onChange={this.addedName} 
                    value={this.state.name} />                                     
                </p>
                <span>{this.state.invalidNameMessage}</span>
                <p>
                    <label className="Label">Цена:</label>
                    <input id="price_input" type="text" size="15" onChange={this.addedPrice} 
                    value={this.state.price}/>
                </p>
                <span>{this.state.invalidPriceMessage}</span>
                <p>
                    <label className="Label">Остаток:</label>
                    <input id="rest_input" type="text" size="15" onChange={this.addedCount} 
                    value={this.state.count}/>
                </p>
                <span>{this.state.invalidCountMessage}</span>
                <p>
                    <label className="Label">Фото:</label>
                    <input id="image_input" type="text" size="15" onChange={this.addedImage}  
                    value={this.state.image}/>
                </p>
                <span>{this.state.invalidImageMessage}</span>
                {/* <p>
                    <label className="Label">Штрихкод:</label>
                    <input id="barecode_input" type="text" size="15" onChange={this.addedBarcode} 
                    value={this.state.barcode} />
                </p>
                <span>{this.state.invalidBarcodeMessage}</span> */}
                <br/>
                <input type="button" value={this.props.mode=="Edition" ? "Сохранить" : "Добавить"} onClick={this.confirmation} 
            disabled={!(this.state.isValidName && this.state.isValidPrice && this.state.isValidCount 
            && this.state.isValidImage)}/>
                <input type="button" value="Отмена" onClick={this.canceled}/>
            </fieldset>
        </form>
    }
}

export default AddOrEditProduct;