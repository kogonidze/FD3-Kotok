import React from 'react';
import PropTypes from 'prop-types';
import {clientsEvents} from './events';

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
    }

    cancelEditionOrAdditionBtnClicked = () => {
        clientsEvents.emit('CancelEditionOrAdditionBtnClicked');
    }

    saveChangesBtnClicked = () => {
        clientsEvents.emit('SaveEditionOrAdditionChangesBtnClicked', this.refs.famField.value, this.refs.imField.value, 
        this.refs.otchField.value, this.refs.balanceField.value, this.props.id);
    }

    render() {
        return(<div>
            {
                this.props.additionMode ? <h2> Добавление нового клиента </h2> :
                <h2>Редактирование существующего клиента </h2>
            }

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
            <input type="button" defaultValue="Завершить" onClick={this.cancelEditionOrAdditionBtnClicked} />

        </div>)
    }
}

export default ClientCard;
