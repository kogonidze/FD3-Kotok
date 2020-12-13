import React, { Fragment } from 'react';
import DoubleButton from './DoubleButton.jsx';
import {withRainbowFrame} from './WithRainbowFrame.jsx';

class MainBlock extends React.Component {
    render() {
        let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
        let FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

        return(<Fragment>
            <DoubleButton caption1="однажды" caption2="пору" cbPressed={ num => alert(num) }> в студеную зимнюю пору </DoubleButton>
            <br/>
            <br/>
            <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={ num => alert(num) }>вышел, был сильный</FramedDoubleButton>
        </Fragment>
        );
    }
}

export default MainBlock;