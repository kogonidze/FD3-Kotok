import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';
import {clientsEvents} from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };

  state = {
    info: this.props.info,
    status: this.props.info.balance >= 0 ? 1 : 0,              // 1 - активен, 0 - заблокирован
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({info:newProps.info});
  };

  editModeBtnClicked = () => {
    clientsEvents.emit('EditModeBtnClicked', this.props.info.id);
  }

  deleteClientBtnClicked = () => {
    clientsEvents.emit('DeleteClientBtnClicked', this.props.info.id);
  }

  render() {

    console.log("MobileClient id="+this.props.info.id+" render");
    
    return (
        <tr className="ClientInfo">
          <td>
            {this.state.info.fam}
          </td>
          <td>
            {this.state.info.im}
          </td>
          <td>
            {this.state.info.otch}
          </td>
          <td>
            {this.state.info.balance}
          </td>
          {this.state.status == 1 && <td className="StatusActive">active</td>}
          {this.state.status == 0 && <td className="StatusBlocked">blocked</td>}
          <td>
            <input type="button" defaultValue="Редактировать" onClick={this.editModeBtnClicked}/>
          </td>
          <td>
            <input type="button" defaultValue="Удалить" onClick={this.deleteClientBtnClicked} />
          </td>
        </tr>
    );
  }
}

export default MobileClient;
