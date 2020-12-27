import React from 'react';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import Header from './Header';

export default function Profile(props) {
    return (
        <>
            <Header chatId={props.chatId} userName={props.userName} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="d-flex flex-column col-xs-12 col-sm-8">
                        <div className="d-flex flex-column align-items-center card p-3 input_block">
                            <TextField
                                className="input"
                                hintText="Ваш логин"
                                name="newUserName"
                                value={props.newUserName}
                                onChange={props.handleChange}
                                onKeyUp={(event) => props.handleKeyUp(event)}
                            />
                            <FloatingActionButton
                                style={{ width: 56, margin: 'auto' }}
                                onClick={() =>
                                    props.handleClick(props.newUserName)
                                }
                            >
                                <SendIcon />
                            </FloatingActionButton>
                        </div>
                        <div className="profile__message">
                            {props.profileMessage}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
