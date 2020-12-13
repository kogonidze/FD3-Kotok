import React from 'react';

function withRainbowFrame(colors) {
    return function(Component) {
        return props => {
            let Code =  <Component {...props}></Component>;
            colors.forEach(color => {
                Code = <div style={{border:"solid 5px "+color,padding:"10px", textAlign:"center", fontWeight:"bold"}}> {Code} </div>;
            });
            return Code;
        }
    }
}

export {withRainbowFrame};