import React from 'react';
import Header from './Header';
import ChatList from './ChatList';
import MessageField from './MessageField';

export default class Chats extends React.Component {
    render() {
        return (
            <>
                <Header
                    chatId={this.props.chatId}
                    userName={this.props.userName}
                />
                <div className="container">
                    <div className="row">
                        <ChatList chats={this.props.chats} />
                        {this.props.chatExist ? (
                            <MessageField
                                chatId={this.props.chatId}
                                userName={this.props.userName}
                                updateChats={this.props.updateChats}
                                sendMessage={this.props.sendMessage}
                            />
                        ) : (
                            <div
                                className={
                                    'd-flex flex-column col-xs-12 col-sm-8 text-center'
                                }
                            >
                                <h1>Вы перешли на пустую страницу</h1>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
