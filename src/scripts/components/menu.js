import React, {Component} from 'react';

import * as MenuConfig from '../../config/menu-info.json';
import '../../styles/components/menu.scss';

var FOCUS_ELEMENT = '';

class Menu extends Component {
    render() {
        return (
            MenuConfig.menus.map((item) => (
                <MenuPanel
                    key={item.text}
                    text={item.text}
                    nodes={item.nodes}
                    selected={true} />
            ))
        );
    }
}

class MenuPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childSelected: props.selected
        };
    }

    handleFoldStatus() {
        let currentSelected = this.state.childSelected;
        this.setState({
            childSelected: !currentSelected
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps is invoked: " + nextProps.text);
        this.setState({
            childSelected: nextProps.selected
        });
    }

    render() {
        return (
            <div
                className={`Menu ${this.props.classNames || ''}`}>
                <MenuTitle
                    text={this.props.text}
                    selected={this.props.selected}
                    foldHandler={() => this.handleFoldStatus()} />
                {
                    this.props.nodes.map((item) => (
                        !item.nodes ?
                        <MenuItem
                            key={item.text}
                            text={item.text}
                            icon={item.icon}
                            selected={this.state.childSelected} />
                        :
                        <MenuPanel
                            key={item.text}
                            text={item.text}
                            nodes={item.nodes}
                            selected={this.state.childSelected} />
                    ))
                }
            </div>
        )
    }
}

class MenuTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: true
        };
    }
    handleFoldStatus() {
        var foldHandler = this.props.foldHandler;
        foldHandler();

        // this.setState((prevState) => ({
        //     selected: !prevState.selected
        // }));

        this.setState({
            selected: !this.state.selected
        });
    }
    render() {
        return (
            <div
                className={`MenuTitle MenuItem ${this.state.selected ? 'arrow-up' : ''} ${this.props.selected ? 'unfoldAnimation' : 'foldAnimation'}`}
                onClick={() => this.handleFoldStatus()}>
                {this.props.text}
            </div>
        )
    }
}

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

export default Menu;