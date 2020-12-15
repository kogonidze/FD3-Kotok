import React from 'react';
import PropTypes from 'prop-types';
import {clientsEvents} from './events';

class ClientCard extends React.PureComponent {
    static propTypes = {
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired
    }

    state = {
        fam: this.props.fam,
        im: this.props.im,
        otch: this.props.otch,
        balance: this.props.balance,
    }

    cancelEditionBtnClicked = () => {
        clientsEvents.emit('CancelEditionBtnClicked');
    }

    saveChangesBtnClicked = () => {
        clientsEvents.emit('SaveEditionChangesBtnClicked', this.refs.famField.value, this.refs.imField.value, 
        this.refs.otchField.value, this.refs.balanceField.value, this.props.id);
    }

    render() {
        return(<div>
            <h2>Редактирование существующего клиента </h2>
            <span>Фамилия: </span>
            <input type="text" defaultValue={this.state.fam} ref="famField" />
            <br />

            <span>Имя: </span>
            <input type="text" defaultValue={this.state.im} ref="imField" />
            <br />

            <span>Отчество: </span>
            <input type="text" defaultValue={this.state.otch} ref="otchField" />
            <br />

            <span>Баланс: </span>
            <input type="text" defaultValue={this.state.balance} ref="balanceField" />

            <input type="button" defaultValue="Сохранить" onClick={this.saveChangesBtnClicked} />
            <input type="button" defaultValue="Завершить" onClick={this.cancelEditionBtnClicked} />

        </div>)
    }
}

export default ClientCard;
