import React, {Component} from 'react';

import Login from './header/login';
import ToggleNav from './header/toggleNav';

import '../../styles/components/header.scss';
// import '../../styles/components/header.css';

class Header extends Component {
    render() {
        return (
            <div
                className={`Header ${this.props.classNames || ''}`}>
                <Login
                    loginCallback={this.props.loginCallback} />
                <ToggleNav
                    hNav={this.props.hNav}
                    changeCallback={this.props.changeNavStyle} />
            </div>
        )
    }
};

Header.displayName = 'Header';

export default Header;