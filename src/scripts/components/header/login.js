import React from 'react';
import PropTypes from 'prop-types';

import {UIButton} from '../../uikit/UIButton';
import {loginService} from '../../services/user';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            loginStatus: false
        }

        this.login = this.login.bind(this);
    }

    login() {
        loginService({
            username: 'David',
            password: 'try'
        }).then(function (data) {
            var loginStatus = data.status === 'success';
            this.setState({
                username: data.username,
                loginStatus: loginStatus
            });

            this.props.loginCallback({
                username: data.username,
                loginStatus: loginStatus
            })
        }.bind(this));
    }

    render() {
        return (
            <div
                className={`${this.props.classNames || ''} Login`}>
                {/* {
                    this.context.loginStatus ?
                    this.context.username
                    :
                    <UIButton
                        text="Log In"
                        handleClick={this.login} />
                } */}
                {
                    this.state.loginStatus ?
                    this.state.username
                    :
                    <UIButton
                        text="Log In"
                        handleClick={this.login} />
                }
            </div>
        )
    }
}

Login.contextTypes = {
    username: PropTypes.string,
    loginStatus: PropTypes.bool
};

export default Login;