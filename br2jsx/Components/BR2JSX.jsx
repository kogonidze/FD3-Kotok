import React from 'react'
import PropTypes from 'prop-types'
import './BR2JSX.css'

const RegTempForBr = /<br\s*\/*>/g;

const BR2JSX = props => {
    let onlyWords = props.text.split(RegTempForBr);
    let wordsWithBrs = [];

    onlyWords.forEach((word, index) => {
        if(index === onlyWords.length-1)
            wordsWithBrs.push(word);
        else
        {
            wordsWithBrs.push(word);
            wordsWithBrs.push(<br key={index}/>);
        }
            
    });

    return <div className='br2jsx'>
       {wordsWithBrs}
       </div>
}

BR2JSX.propTypes = {
    text: PropTypes.string,
};

export default BR2JSX;