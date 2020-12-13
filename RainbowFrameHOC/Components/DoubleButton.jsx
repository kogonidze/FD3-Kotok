import React from 'react';
import PropTypes from 'prop-types';

class DoubleButton extends React.Component {
    static propTypes = {
        caption1: PropTypes.string.isRequired,
        caption2: PropTypes.string.isRequired,
        cbPressed: PropTypes.func.isRequired,
        children: PropTypes.string.isRequired
    };

    clickFirstBtn = () => this.props.cbPressed(1);
    clickSecondBtn = () => this.props.cbPressed(2);

    render(){
        return (<div>
            <input type="button" value={this.props.caption1} onClick={this.clickFirstBtn}></input>
            {this.props.children}
            <input type="button" value={this.props.caption2} onClick={this.clickSecondBtn}></input>
        </div>)
    }
   
}

export default DoubleButton;