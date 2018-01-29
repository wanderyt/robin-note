import React, {Component} from 'react';

import * as MenuConfig from '../../config/config.json';
import '../../styles/components/menu.scss';

import {Link} from 'react-router-dom';

class Menu extends Component {
    constructor() {
        super();

        this.onDocumentScroll = this.onDocumentScroll.bind(this);
    }
    render() {
        return (
            <div
                className={`Menu`}>
                <div
                    ref={(menu) => this.menu = menu}>
                    {
                        MenuConfig.menus.map((item) => (
                            <MenuPanel
                                key={item.text}
                                text={item.text}
                                nodes={item.nodes}
                                level={0}
                                selected={true} />
                        ))
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        // get current offset top
        let menu = this.menu,
            rect = menu.getBoundingClientRect();
        this.top = rect.top + window.scrollY;
        // Fix menu list when scroll
        document.addEventListener('scroll', this.onDocumentScroll);
    }

    onDocumentScroll(evt) {
        let menu = this.menu,
            rect = menu.getBoundingClientRect(),
            style = menu.style;
        if (rect.top < 0 && style.position !== 'fixed') {
            style.position = 'fixed';
            style.top = 0;
        } else if (window.scrollY < this.top) {
            style.position = 'static';
        }
    }

    componentWillUnmount() {
        // Remove scroll event listener
        document.removeEventListener('scroll', this.onDocumentScroll);
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
                className={`MenuPanel ${this.props.classNames || ''}`}>
                <MenuTitle
                    text={this.props.text}
                    selected={this.props.selected}
                    level={this.props.level}
                    foldHandler={() => this.handleFoldStatus()} />
                {
                    this.props.nodes.map((item) => (
                        !item.nodes ?
                        <MenuItem
                            key={item.text}
                            text={item.text}
                            icon={item.icon}
                            level={this.props.level + 1}
                            selected={this.state.childSelected} />
                        :
                        <MenuPanel
                            key={item.text}
                            text={item.text}
                            nodes={item.nodes}
                            level={this.props.level + 1}
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
    getTextIndentStyle(level) {
        return {
            textIndent: MenuConfig['menu-indent'] * level + 'px'
        };
    }
    handleFoldStatus() {
        var foldHandler = this.props.foldHandler;
        foldHandler();

        this.setState({
            selected: !this.state.selected
        });
    }
    render() {
        return (
            <div
                className={`MenuTitle MenuItem ${this.state.selected ? 'arrow-up' : ''} ${this.props.selected ? 'unfoldAnimation' : 'foldAnimation'}`}
                style={this.getTextIndentStyle(this.props.level || [])}
                onClick={() => this.handleFoldStatus()}>
                {this.props.text}
            </div>
        )
    }
}

class MenuItem extends Component {
    getTextIndentStyle(level) {
        return {
            textIndent: MenuConfig['menu-indent'] * level + 'px'
        };
    }

    render() {
        return (
            <div
                className={`MenuItem menu-item ${this.props.classNames || ''} ${this.props.selected ? 'unfoldAnimation' : 'foldAnimation'}`}
                style={this.getTextIndentStyle(this.props.level || [])}>
                <Link to={`/${this.props.text}`}>
                    <span
                        className={`MenuItemText ${this.props.icon ? ('background-' + this.props.icon) : ''}`}>
                        {this.props.text}
                    </span>
                </Link>
            </div>
        )
    }
}

export default Menu;