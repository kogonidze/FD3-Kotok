import React from 'react'
import PropTypes from 'prop-types'
import './BR2JSX.css'

const RegTempForBr = /<br\s*\/*>/g;

const BR2JSX = props => {
    let arr = props.text.split(RegTempForBr);

    return <div className='br2jsx'>
       {arr.map(elem => {return <span>{elem}<br /></span>})}</div>
}

BR2JSX.propTypes = {
    text: PropTypes.string,
};

export default BR2JSX;