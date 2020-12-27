import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

class Header extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
        userName: PropTypes.string,
        isProfilePage: PropTypes.bool,
    };

    static defaultProps = {
        chatId: 1,
        userName: 'User',
    };

    handleNavigate = (link) => {
        this.props.push(link);
    };

    render() {
        return (
            <div className="header d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center ">
                        <img
                            src="../img/logo.png"
                            alt=""
                            className="logo"
                            onClick={() => this.handleNavigate(`/chat/1`)}
                        />
                        <h3>
                            Broken Chat
                            {this.props.isProfilePage
                                ? ' Profile'
                                : ' ' + this.props.chatId}
                        </h3>
                    </div>

                    <Link
                        key={'header' + this.props.userName}
                        to={'/profile/'}
                        className="header__profile"
                    >
                        <h3>Профиль: {this.props.userName}</h3>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({ push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
