import React from 'react';
import PropTypes, { number } from 'prop-types';

import MobileClient from './MobileClient.jsx';
import ClientCard from './ClientCard.jsx';

import './MobileCompany.css';
import { clientsEvents } from './events';

class MobileCompany extends React.PureComponent {

  static global_id = 120; 

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
    idClientForEdition: 0,            // 0 - режим редактирования отключен, иначе id выбранного для редактирования клиента
    additionMode: 0,
  };

  componentDidMount = () => {
    clientsEvents.addListener("EditModeBtnClicked", this.editModeOn);
    clientsEvents.addListener("CancelEditionOrAdditionBtnClicked", this.cancelEditionOrAddition);
    clientsEvents.addListener("SaveEditionOrAdditionChangesBtnClicked", this.saveEditionOrAdditionChanges);
    clientsEvents.addListener("DeleteClientBtnClicked", this.deleteClient);
  }

  componentWillUnmount = () => {
    clientsEvents.removeAllListeners();
  }

  editModeOn = (id) => {
    this.setState({idClientForEdition: id});
  }

  cancelEditionOrAddition = () => {
    this.setState({idClientForEdition: 0, additionMode: 0});
  }

  saveEditionOrAdditionChanges = (fam, im, otch, balance, id) => {
    var tempArr = this.state.clients.slice();
    var newItem = {fam: fam, im: im, otch: otch, balance: balance, id: id}

    var selectedClientIndex = this.state.clients.findIndex(client => { if(client.id === id) return client});
    
    if(selectedClientIndex != -1)
    {
      tempArr[selectedClientIndex] = newItem;
    }
    else
    {
      tempArr.push(newItem);
    }
      
    this.setState({clients: tempArr, idClientForEdition: 0, additionMode: 0});
  }

  deleteClient = (id) => {
    // if(confirm("Вы уверены, что хотите удалить клиента?"))
    // {
    //   var tempArr = this.state.clients.slice();

    //   var selectedClientIndex = this.state.clients.findIndex(client => { if(client.id === id) return client});
    //   tempArr.splice(selectedClientIndex,1);
  
    //   this.setState({clients: tempArr});
    // }

    var tempArr = this.state.clients.slice();

    var selectedClientIndex = this.state.clients.findIndex(client => { if(client.id === id) return client});
    tempArr.splice(selectedClientIndex,1);

    this.setState({clients: tempArr});
  }

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

  setAdditionMode = () => {
    this.setState({additionMode: 1});
  }
  
  render() {

    console.log("MobileCompany render");   

    
    var clientsCode=this.state.clients.map( client => {
      if(this.state.viewMode == 0)
        return <MobileClient key={client.id} info={client} />;
      else if(this.state.viewMode == 1 && client.balance >= 0)
        return <MobileClient key={client.id} info={client} />;
      else if(this.state.viewMode == 2 && client.balance < 0)
        return <MobileClient key={client.id} info={client} />;
    });

    var selectedClient;
    if(this.state.idClientForEdition > 0)
    {
      selectedClient = this.state.clients.find(client => {
        if(client.id == this.state.idClientForEdition)
          return client;
      })
    }
    
    return (
      <div className="MobileCompany">
        <input className="Button" type="button" value="=МТС" onClick={this.setName1} />
        <input className="Button" type="button" value="=Velcom" onClick={this.setName2} />
        <div className="MobileCompanyName">Компания &laquo;{this.state.name}&raquo;</div>
        <div>
          <input className="Button" type="button" value="Все" onClick={this.setViewMode0} />
          <input className="Button" type="button" value="Активные" onClick={this.setViewMode1} />
          <input className="Button" type="button" value="Заблокированные" onClick={this.setViewMode2} />
        </div>
        <table className="Table">
          <thead>
            <tr className="HeadingRow">
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Баланс</th>
              <th>Статус</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody className="Row">
            {clientsCode}
          </tbody>
        </table>
        <div>
          <input className="Button" type="button" value="Добавить клиента" onClick={this.setAdditionMode} />
        </div>
        {
          (this.state.idClientForEdition != 0) && <ClientCard id={selectedClient.id} fam={selectedClient.fam} im={selectedClient.im} 
          otch={selectedClient.otch} balance={selectedClient.balance} />
        }
        {
          (this.state.additionMode != 0) && <ClientCard additionMode={true} id={++MobileCompany.global_id}/>
        }
      </div>
    )
  }
}

export default MobileCompany;