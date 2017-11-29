import React, {Component} from 'react';

import * as MenuConfig from '../../config/menu-info.json';

class MenuItem extends Component {
    getTextIndentStyle(path) {
        return {
            textIndent: MenuConfig['menu-indent'] * path.length + 'px'
        };
    }

    render() {
        return (
            <div
                className={`MenuItem menu-item ${this.props.classNames || ''} ${this.props.selected ? 'unfoldAnimation' : 'foldAnimation'}`}
                style={this.getTextIndentStyle(this.props.path || [])}>
                <span
                    className={
                        `MenuItemText ${this.props.icon ? ('background-' + this.props.icon) : ''}`}>
                    {this.props.text}
                </span>
            </div>
        )
    }
}

export default MenuItem;