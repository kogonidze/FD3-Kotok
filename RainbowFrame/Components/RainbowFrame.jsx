import React from 'react';
import PropTypes from 'prop-types';

const RainbowFrame = props => {
    return (<div style={{border:"solid 5px "+props.colors.pop(),padding:"10px", textAlign:"center", fontWeight:"bold"}}> 
    {props.colors.length > 0 && <RainbowFrame colors={props.colors} children={props.children} /> }
    {props.colors.length == 0 && props.children}
    </div>
    )};

RainbowFrame.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.string
};

export default RainbowFrame;
