import React, {Component} from 'react';
import Login from './header/login';

import '../../styles/components/header.scss';
// import '../../styles/components/header.css';

class Header extends Component {
    render() {
        return (
            <div
                className={`Header ${this.props.classNames || ''}`}>
                {
                    `${this.props.text || 'this is header'}`
                }
                <Login />
            </div>
        )
    }
};

Header.displayName = 'Header';

export default Header;