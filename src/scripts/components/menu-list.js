import React, {Component} from 'react';

import MenuItem from './menu-item';
// import '../../styles/components/header.scss';

class MenuList extends Component {
    state = {
        selection: false,
    };

    handleFoldStatus() {
        let currentSelection = this.state.selection;
        this.setState({
            selection: !currentSelection
        });
    }

    render() {
        return (
            <div
                className={`MenuList ${this.props.classNames || ''}`}>
                <div
                    className={`MenuListTitle MenuItem ${this.state.selection || 'arrow-up'}`}
                    onClick={() => this.handleFoldStatus()}>
                    {`${this.props.title || 'this is header'}`}
                </div>
                {
                    this.props.menuItems && this.props.menuItems.map((item) => (
                        <MenuItem
                            key={item.text}
                            text={item.text}
                            icon={item.icon}
                            selection={this.state.selection}>
                        </MenuItem>
                    ))
                }
            </div>
        )
    }
};

export default MenuList;