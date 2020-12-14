import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient.jsx';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name,
    clients: this.props.clients,
    viewMode: 0,            // 0 - просмотр всех, 1 - просмотр активных, 2 - просмотр заблокированных 
  };

  setName1 = () => {
    this.setState({name:'МТС'});
  };

  setName2 = () => {
    this.setState({name:'Velcom'});
  };
  
  setViewMode0 = () => {
    this.setState({viewMode: 0});
  }

  setViewMode1 = () => {
    this.setState({viewMode: 1});
  }

  setViewMode2 = () => {
    this.setState({viewMode: 2});
  }

  // setBalance = (clientId,newBalance) => {
  //   let changed=false;
  //   let newClients=[...this.state.clients]; // копия самого массива клиентов
  //   newClients.forEach( (c,i) => {
  //     if ( c.id==clientId && c.balance!=newBalance ) {
  //       let newClient={...c}; // копия хэша изменившегося клиента
  //       newClient.balance=newBalance;
  //       newClients[i]=newClient;
  //       changed=true;
  //     }
  //   } );
  //   if ( changed )
  //     this.setState({clients:newClients});
  // };
  
  render() {

    console.log("MobileCompany render");

    var clientsCode=this.state.clients.map( client => {
        let FIO={fam:client.fam,im:client.im,otch:client.otch};
        return <MobileClient key={client.id} id={client.id} FIO={FIO} balance={client.balance} />;
      }
    );

    return (
      <div className='MobileCompany'>
        <input type="button" value="=МТС" onClick={this.setName1} />
        <input type="button" value="=Velcom" onClick={this.setName2} />
        <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
        <div>
          <input type="button" value="Все" onClick={this.setViewMode0} />
          <input type="button" value="Активные" onClick={this.setViewMode1} />
          <input type="button" value="Заблокированные" onClick={this.setViewMode2} />
        </div>
        <div className='MobileCompanyClients'>
          {clientsCode}
        </div>
      </div>
    )
    ;

  }

}

export default MobileCompany;