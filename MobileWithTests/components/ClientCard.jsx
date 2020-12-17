import React from 'react';
import PropTypes from 'prop-types';
import {clientsEvents} from './events';
import './ClientCard.css';

class ClientCard extends React.PureComponent {
    static propTypes = {
        id: PropTypes.number,
        fam: PropTypes.string,
        im: PropTypes.string,
        otch: PropTypes.string,
        balance: PropTypes.number,
        additionMode: PropTypes.bool,
    }

    state = {
        fam: this.props.additionMode ? "" : this.props.fam,
        im: this.props.additionMode ? "" : this.props.im,
        otch: this.props.additionMode ? "" : this.props.otch,
        balance: this.props.additionMode ? "" : this.props.balance,
        validationMsg: "",
    }

    cancelEditionOrAdditionBtnClicked = () => {
        clientsEvents.emit('CancelEditionOrAdditionBtnClicked');
    }

    saveChangesBtnClicked = () => {
        if(this.refs.balanceField.value.match(/^(-?)[1-9]\d*(\.\d+)?$/g))
        {
            if(this.state.validationMsg != "")
            {
                this.setState({validationMsg: ""});
            }
            clientsEvents.emit('SaveEditionOrAdditionChangesBtnClicked', this.refs.famField.value, this.refs.imField.value, 
            this.refs.otchField.value, parseInt(this.refs.balanceField.value), this.props.id);
        }
        else
        {
            this.setState({validationMsg: "Баланс должен быть десятичным числом!"});
        }

        if(this.refs.famField.value == "" || this.refs.imField.value == "" || this.refs.otchField.value == "" 
        || this.refs.balanceField.value == "")
        {
            this.setState({validationMsg: "Пустая строка недопустима!"})
        }
            
    }

    render() {
        return(<div>
            {
                this.props.additionMode ? <h2> Добавление нового клиента </h2> :
                <h2>Редактирование существующего клиента </h2>
            }

            <span className="CardLabel">Фамилия: </span>
            <input type="text" defaultValue={this.state.fam} ref="famField" />
            <br />

            <span className="CardLabel">Имя: </span>
            <input type="text" defaultValue={this.state.im} ref="imField" />
            <br />

            <span className="CardLabel">Отчество: </span>
            <input type="text" defaultValue={this.state.otch} ref="otchField" />
            <br />

            <span className="CardLabel">Баланс: </span>
            <input type="text" defaultValue={this.state.balance} ref="balanceField" />

            <div>
                <input className="Button" type="button" defaultValue="Сохранить" onClick={this.saveChangesBtnClicked} />
                <input className="Button" type="button" defaultValue="Завершить" onClick={this.cancelEditionOrAdditionBtnClicked} />
            </div>
            

            <p>{this.state.validationMsg}</p>

        </div>)
    }
}

export default ClientCard;
