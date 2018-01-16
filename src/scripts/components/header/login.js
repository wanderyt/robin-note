import React from 'react';
import {connect} from 'react-redux';
import {login, logout} from '../../actions';
import { UIButton } from '../../uikit/UIButton';

class Login extends React.Component {
    constructor() {
        super();

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        login({
            username: 'username',
            password: 'password'
        });
    }

    render() {
        return (
            <div>
                {
                    this.props.loginStatus ?
                    this.props.username
                    :
                    <UIButton
                        text="Log In"
                        handleClick={this.handleLogin} />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginStatus: state.user && state.user.loginStatus,
        username: state.user && state.user.username
    }
}

export default connect(
    mapStateToProps,
    {}
)(Login)