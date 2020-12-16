import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';
import {clientsEvents} from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {
    id: PropTypes.number.isRequired,
    FIO:PropTypes.shape({
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
    }),
    balance: PropTypes.number.isRequired,
  };

  state = {
    FIO: this.props.FIO,
    balance: this.props.balance,
    status: this.props.balance >= 0 ? 1 : 0,              // 1 - активен, 0 - заблокирован
  };

  componentWillReceiveProps = (newProps) => {
    //console.log("MobileClient id="+this.props.id+" componentWillReceiveProps");
    this.setState({FIO:newProps.FIO,balance:newProps.balance, status: newProps.balance >= 0 ? 1 : 0});
  };

  editModeBtnClicked = () => {
    clientsEvents.emit('EditModeBtnClicked', this.props.id);
  }

  deleteClientBtnClicked = () => {
    clientsEvents.emit('DeleteClientBtnClicked', this.props.id);
  }

  render() {

    console.log("MobileClient id="+this.props.id+" render");
    
    return (
        <tr className="ClientInfo">
          <td>
            {this.state.FIO.fam}
          </td>
          <td>
            {this.state.FIO.im}
          </td>
          <td>
            {this.state.FIO.otch}
          </td>
          <td>
            {this.state.balance}
          </td>
          {this.state.status == 1 && <td className="StatusActive">active</td>}
          {this.state.status == 0 && <td className="StatusBlocked">blocked</td>}
          {/* <td>
            {this.state.status == 1 && <span className="statusActive">active</span>}
            {this.state.status == 0 && <span className="statusBlocked">blocked</span>}
          </td> */}
          <td>
            <input type="button" defaultValue="Редактировать" onClick={this.editModeBtnClicked}/>
          </td>
          <td>
            <input type="button" defaultValue="Удалить" onClick={this.deleteClientBtnClicked} />
          </td>
          {/* <span className='MobileClientFIO'>{this.state.FIO.fam+" "+this.state.FIO.im+" "+this.state.FIO.otch}</span>
          <span className='MobileClientBalance'>{this.state.balance}</span>
          {this.state.status == 1 && <span>active</span>}
          {this.state.status == 0 && <span>blocked</span>}
          <input type="button" defaultValue="Редактировать" onClick={this.editModeBtnClicked}/>
          <input type="button" defaultValue="Удалить" onClick={this.deleteClientBtnClicked} /> */}
        </tr>
    );

  }

}

export default MobileClient;
