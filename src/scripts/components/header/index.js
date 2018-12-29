import React, {Component} from 'react';

import Login from './login';
import ToggleNav from './toggleNav';

import './index.scss';

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