import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        photo: PropTypes.string.isRequired,
    };

    render() {
        return <div className="FixedPosition">
            <h2>{this.props.name}</h2>
            <img className="ImageProductCard" src={this.props.photo} alt='Product Sample' />
            <p className="Text">Цена: <b>{this.props.price}</b> BYN</p> 
            <p className="Text">Осталось на складе: <b>{this.props.count}</b> штук</p>
         </div>
    }
}

export default ProductCard;