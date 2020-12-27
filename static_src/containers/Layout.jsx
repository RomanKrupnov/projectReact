import React from 'react';
import PropTypes from 'prop-types';
import Router from './Router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/messageActions';
import { updateChats } from '../actions/chatActions';
import { changeUserName } from '../actions/profileActions';
import { sendMessageThunk } from '../middlewares/messageMiddleware';

class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
        sendMessage: PropTypes.func.isRequired,
    };

    static defaultProps = {
        chatId: 1,
    };

    state = {
        profileMessage: '',
        newUserName: '',
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClick = () => {
        let userName = this.state.newUserName;

        if (!userName.match(/\S+/) && this.props.userName !== 'User') {
            userName = 'User';
        } else if (!this.state.newUserName.match(/\S+/)) {
            return null;
        }

        if (this.props.changeUserName(userName)) {
            this.setState({
                profileMessage: `Новое имя пользователя "${userName}" сохранено`,
            });
        }
    };

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            //Enter
            this.handleClick();
        }
    };

    sendMessage = (message, chatId, isRobot = false) => {
        const { messages } = this.props;
        const keys = Object.keys(messages);
        const messageId = parseInt(keys[keys.length - 1]) + 1;
        const userName = isRobot ? 'Бот' : this.props.userName;

        this.props.sendMessageThunk(message, messageId, userName, chatId);
        this.props.updateChats(messageId, chatId);
    };

    render() {
        return (
            <div>
                <Router
                    updateChats={this.props.updateChats}
                    sendMessage={this.sendMessage}
                    newUserName={this.state.newUserName}
                    profileMessage={this.state.profileMessage}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick}
                    handleKeyUp={this.handleKeyUp}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ chatReducer }) => ({
    messages: chatReducer.messages,
    userName: chatReducer.userName,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        { sendMessage, sendMessageThunk, updateChats, changeUserName },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
