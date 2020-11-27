import React from 'react';
import PropTypes from 'prop-types';
import './Shop.css';

class Shop extends React.Component {
    static propTypes = {
        shop: PropTypes.string.isRequired,
    };

    render() {
        return <h2 className='Shop'> Магазин {this.props.shop} </h2>
    }
}

export default Shop;

