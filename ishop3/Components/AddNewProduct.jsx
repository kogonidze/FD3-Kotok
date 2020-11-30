import React from 'react';
import PropTypes from 'prop-types';
import './BunchOfProducts.css';

class AddNewProduct extends React.Component {

    render()
    {
        return <form className="BunchOfProducts">
            <fieldset>
                <legend>Добавление нового товара</legend>
                <p>
                    <label className="Label">Имя:</label>
                    <input className="Input" id="name_input" type="text" size="10"/>                   
                </p>
                <p>
                    <label className="Label">Цена:</label>
                    <input id="price_input" type="text" size="10"/>
                </p>
                <p>
                    <label className="Label">Остаток:</label>
                    <input id="rest_input" type="text" size="10"/>
                </p>
                <p>
                    <label className="Label">Фото:</label>
                    <input id="photo_input" type="text" size="10"/>
                </p>
                <p>
                    <label className="Label">Штрихкод:</label>
                    <input id="barecode_input" type="text" size="10"/>
                </p>

            </fieldset>
        </form>
        // return <div className="InputGroup"> 
        //     <h2>Добавление нового товара</h2>
        //     <div className="Field">
        //         <label className="Label">Имя: </label>
        //         <input id="name_input" type="text" size="10"/> 
        //         <p>Error!</p> <br />
        //     </div>
        //     <div className="Field">
        //         <label className="Label">Цена: </label>
        //         <input id="price_input" type="text" size="10"/>
        //     </div>
        //     <div className="Field">
        //         <label className="Label">Остаток: </label>
        //         <input id="rest_input" type="text" size="10"/>
        //     </div>
        //     <div className="Field">
        //         <label className="Label">Фото: </label>
        //         <input id="photo_input" type="text" size="10"/>
        //     </div>
        //     <div className="Field">
        //         <label className="Label">Штрихкод: </label>
        //         <input id="barecode_input" type="text" size="10"/>
        //     </div>
        //</div>
    }
}

export default AddNewProduct;