import React from 'react';
import PropTypes from 'prop-types';

import {UIButton} from '../../uikit/UIButton';
import {loginService} from '../../services/user';

class ToggleNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hNav: props.hNav
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.changeCallback(!this.state.hNav);
        this.setState({
            hNav: !this.state.hNav
        });
    }

    render() {
        let text = this.state.hNav ? 'horizontal' : 'vertical';
        return (
            <div
                className={`${this.props.classNames || ''} ToggleNav`}>
                <UIButton
                    text={text}
                    handleClick={this.handleClick} />
            </div>
        );
    }
}

ToggleNav.contextTypes = {
    hNav: PropTypes.bool,
    changeCallback: PropTypes.func
};

export default ToggleNav;