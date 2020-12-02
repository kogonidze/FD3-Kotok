import React from 'react';
import PropTypes from 'prop-types';
import './BunchOfProducts.css';

class EditProduct extends React.Component {
    static propTypes = {
        product: PropTypes.shape({
            name: PropTypes.string.isRequired,
            barcode: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
            photo: PropTypes.string.isRequired,
        }),
        cbCancelEditionProduct: PropTypes.func.isRequired,
        cbConfirmationEditionNewProduct: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            count: "",
            image: "",
            barcode: "",
            isValidName: false,
            isValidPrice: false,
            isValidCount: false,
            isValidImage: false,
            isValidBarcode: false,
            invalidNameMessage: "",
            invalidPriceMessage: "",
            invalidCountMessage: "",
            invalidImageMessage: "",
            invalidBarcodeMessage: ""
        };
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
        }
        else
        {
            this.setState({name: EO.target.value});
            this.setState({isValidName: true});
            this.setState({invalidNameMessage: ""});
        }
    }

    addedPrice = (EO) => {
        if(this.checkingForEmptyString(EO.target.value))
        {
            this.setState({isValidPrice: false});
            this.setState({invalidPriceMessage: "Поле Цена не должно быть пустым!"})
        }
        else if(!this.checkingForNumeric(EO.target.value))
        {
            this.setState({isValidPrice: false});
            this.setState({invalidPriceMessage: "Поле Цена должно быть десятичным числом!"})
        }
        else
        {
            this.setState({price: EO.target.value});
            this.setState({isValidPrice: true});
            this.setState({invalidPriceMessage: ""});
        }
    }

    addedCount = (EO) => {
        if(this.checkingForEmptyString(EO.target.value))
        {
            this.setState({isValidCount: false});
            this.setState({invalidCountMessage: "Поле Остаток не должно быть пустым!"})
        }
        else if(!this.checkingForNumeric(EO.target.value))
        {
            this.setState({isValidCount: false});
            this.setState({invalidCountMessage: "Поле Остаток должно быть десятичным числом!"})
        }
        else
        {
            this.setState({count: EO.target.value});
            this.setState({isValidCount: true});
            this.setState({invalidCountMessage: ""});
        }
    }

    addedImage = (EO) => {
        if(this.checkingForEmptyString(EO.target.value))
        {
            this.setState({isValidImage: false});
            this.setState({invalidImageMessage: "Поле Фото не должно быть пустым!"});
        }
        else
        {
            this.setState({image: EO.target.value});
            this.setState({isValidImage: true});
            this.setState({invalidImageMessage: ""});
        }
    }

    addedBarcode = (EO) => {
        if(this.checkingForEmptyString(EO.target.value))
        {
            this.setState({isValidBarcode: false});
            this.setState({invalidBarcodeMessage: "Поле Штрихкод не должно быть пустым!"})
        }
        else if(!this.checkingForNumeric(EO.target.value))
        {
            this.setState({isValidBarcode: false});
            this.setState({invalidBarcodeMessage: "Поле Штрихкод должно быть десятичным числом!"})
        }
        else
        {
            this.setState({barcode: EO.target.value});
            this.setState({isValidBarcode: true});
            this.setState({invalidBarcodeMessage: ""});
        }
    }

    canceled = () => {
        this.props.cbCancelEditionProduct();
    }

    confirmationOfEdition = () => {
        this.props.cbConfirmationEditionNewProduct(this.state.name, parseInt(this.state.price, 10), parseInt(this.state.count, 10), 
            this.state.image, parseInt(this.state.barcode, 10));
    }

    render()
    {
        return <form className="BunchOfProducts">
            <fieldset>
                <legend>Редактирование существующего товара</legend>
                <p>
                    <label className="Label">Имя:</label>
                    <input id="name_input" type="text" size="15" onChange={this.addedName} defaultValue={this.props.product.name}/>                                     
                </p>
                <span>{this.state.invalidNameMessage}</span>
                <p>
                    <label className="Label">Цена:</label>
                    <input id="price_input" type="text" size="15" onChange={this.addedPrice} defaultValue={this.props.product.price} />
                </p>
                <span>{this.state.invalidPriceMessage}</span>
                <p>
                    <label className="Label">Остаток:</label>
                    <input id="rest_input" type="text" size="15" onChange={this.addedCount} defaultValue={this.props.product.count} />
                </p>
                <span>{this.state.invalidCountMessage}</span>
                <p>
                    <label className="Label">Фото:</label>
                    <input id="photo_input" type="text" size="15" onChange={this.addedImage} defaultValue={this.props.product.photo} />
                </p>
                <span>{this.state.invalidImageMessage}</span>
                <p>
                    <label className="Label">Штрихкод:</label>
                    <input id="barecode_input" type="text" size="15" onChange={this.addedBarcode} defaultValue={this.props.product.barcode} />
                </p>
                <span>{this.state.invalidBarcodeMessage}</span>
                <br/>
                <input type="button" value="Сохранить" onClick={this.confirmationOfEdition} 
            disabled={!(this.state.isValidName && this.state.isValidPrice && this.state.isValidCount 
            && this.state.isValidImage && this.state.isValidBarcode)}/>
                <input type="button" value="Отмена" onClick={this.canceled}/>
            </fieldset>
        </form>
    }
}

export default EditProduct;