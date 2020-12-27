import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Message from '../components/Message';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import PropTypes from 'prop-types';
import { sendMessageThunk } from '../middlewares/messageMiddleware';
import { updateChats } from '../actions/chatActions';
import '../styles/style.css';

class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
    }

    state = {
        newMessage: '',
    }

    textInput = React.createRef()

    robotTimer = null;

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleClick = (message) => {
        this.props.sendMessage(message, this.props.chatId);
        this.setState({
            newMessage: '',
        });
    };

    handleKeyUp = (event, message) => {
        if (event.keyCode === 13) {
            this.props.sendMessage(message, this.props.chatId);
            this.setState({
                newMessage: '',
            });
        }
    };

    componentDidMount() {
        const { chats, chatId } = this.props;

        if (!chats[chatId].messageList.length) {
            fetch('/api/messages.json')
                .then((data) => data.json())
                .then((messages) => {
                    const arr = Object.values(messages);
                    arr.map((message) => {
                        this.props.sendMessageThunk(
                            message.text,
                            message.id,
                            message.userName,
                            message.chatId
                        );
                        this.props.updateChats(message.id, message.chatId);
                    });
                });
        }

        if (!this.props.isProfilePage && this.textInput.current)
            this.textInput.current.focus();
    }

    componentWillUnmount() {
        console.log('unmounted');
        clearTimeout(this.robotTimer);
    }

    renderMessage = (message) => (
        <Message
            text={message.text}
            userName={message.userName}
            key={message.id}
        />
    );

    render() {
        const { messages } = this.props;
        const { chatId, chats } = this.props;

        let messageElements;

        if (Object.keys(messages).length > 0) {
            messageElements = chats[chatId].messageList.map((messageId) =>
                messageId ? this.renderMessage(messages[messageId]) : null
            );
        }

        return (
            <div className={'d-flex flex-column col-xs-12 col-sm-8 '}>
                {messageElements}

                <div className="d-flex flex-column card p-3 input_block">
                    <TextField
                        className="input"
                        hintText="Ваше сообщение"
                        name="newMessage"
                        value={this.state.newMessage}
                        onChange={this.handleChange}
                        onKeyUp={(event) =>
                            this.handleKeyUp(event, this.state.newMessage)
                        }
                        ref={this.textInput}
                    />

                    <FloatingActionButton
                        style={{ width: 56, margin: 'auto' }}
                        onClick={() => this.handleClick(this.state.newMessage)}
                    >
                        <SendIcon />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
    messages: chatReducer.messages,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ updateChats, sendMessageThunk }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
