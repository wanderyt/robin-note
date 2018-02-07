import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../../styles/components/menubar.scss';

import * as MenuConfig from '../../config/config.json';

class MenuBar extends Component {
    constructor() {
        super();

        this.onDocumentScroll = this.onDocumentScroll.bind(this);
    }

    getMenus() {
        return MenuConfig.menuBar || [];
    }

    onDocumentScroll(evt) {
        let menubar = this.rootNode,
            rect = menubar.getBoundingClientRect(),
            style = menubar.style;
        if (rect.top < 0 && style.position !== 'fixed') {
            style.position = 'fixed';
            style.top = 0;
            document.body.classList.add('fixed');
            // style.opacity = 0.6;
        } else if (window.scrollY < this.top) {
            style.position = 'relative';
            document.body.classList.remove('fixed');
            // style.opacity = 1;
        }
    }

    componentDidMount() {
        // get current offset top
        let menuBar = this.rootNode,
            rect = menuBar.getBoundingClientRect();
        this.top = rect.top + window.scrollY;
        // Fix menuBar list when scroll
        document.addEventListener('scroll', this.onDocumentScroll);
    }

    componentWillUnmount() {
        // Remove scroll event listener
        document.removeEventListener('scroll', this.onDocumentScroll);
    }

    render() {
        let menus = this.getMenus();
        return (
            <div
                className={`MenuBar ${this.props.classNames || ''}`}
                ref={node => this.rootNode = node}>
                {
                    menus.map((item) => (
                        <MenuGroup
                            menuObj={item}
                            key={item.text}/>
                    ))
                }
            </div>
        )
    }
}

class MenuGroup extends Component {
    constructor() {
        super();

        this.clearHighlightItem = this.clearHighlightItem.bind(this);
        this.expandDropdown = this.expandDropdown.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.onSelect = this.onSelect.bind(this);

        this.state = {
            isActive: false,
            highlightItem: ''
        };
    }
    clearHighlightItem() {
        this.setState({
            highlightItem: ''
        });
    }
    highlightItem(key) {
        this.setState({
            hightlightItem: key
        });
    }
    expandDropdown() {
        this.setState({
            isActive: true
        });
    }
    onSelect() {
        this.setState({
            isActive: false
        });
    }
    handleDocumentClick(evt) {
        if (this.state.isActive && !this.rootNode.contains(evt.target)) {
            this.setState({
                isActive: false
            });
        }
    }
    componentDidMount() {
        // Add cancel dropdown listener
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
        // Remove cancel dropdown listener
        document.removeEventListener('click', this.handleDocumentClick);
    }
    render() {
        let dropdownList = this.state.isActive && (
            <ul
                className={`DropdownList`}
                onMouseOut={this.clearHighlightItem}>
                {this.props.menuObj.nodes.map((item) => {
                    let isHighlighted = this.state.highlightItem === item.text,
                        highlightClass = isHighlighted ? 'DropdownListItem__Highlighted' : '';
                    return (
                        <li
                            key={item.text}
                            className={`DropdownListItem ${highlightClass}`}
                            onMouseEnter={() => this.highlightItem(item.text)}>
                            <Link to={`/${item.text}`} onClick={this.onSelect}>
                                <span
                                    className={`DropdownListItem__Content ${this.props.icon ? ('background-' + this.props.icon) : ''}`}>
                                    {item.text}
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        );
        return (
            <div
                className={`MenuGroup`}
                ref={node => this.rootNode = node}>
                {/*
                <div
                    className={`DropdownTitle`}
                    onClick={this.expandDropdown}>
                    {this.props.menuObj.text}
                </div>
                */}
                <a
                    href="javascript:void(0);"
                    className={`DropdownTitle`}
                    onClick={this.expandDropdown}>
                    {this.props.menuObj.text}
                </a>
                {dropdownList}
            </div>
        )
    }
}

export default MenuBar;