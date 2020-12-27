import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Message extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div
                className="border-top mb-2 message-field"
                style={
                    this.props.userName === 'Бот'
                        ? { alignItems: 'flex-end', marginLeft: '20%' }
                        : { marginRight: '20%' }
                }
            >
                <h4>{this.props.userName || 'User'}</h4>
                <p>{this.props.text}</p>
            </div>
        );
    }
}

export default Message;
