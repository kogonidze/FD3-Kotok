import React from 'react';
import PropTypes from 'prop-types';

export default function RainbowFrame({colors, children}) {
    return (<div style={{border:"solid 5px "+colors.pop(),padding:"10px", textAlign:"center", fontWeight:"bold"}}> 
    {colors.length > 0 && <RainbowFrame colors={colors} children={children} /> }
    {colors.length == 0 && children}
    </div>
    )};

RainbowFrame.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.string
}
