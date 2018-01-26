import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './scripts/components/header';
import Menu from './scripts/components/menu';
import Main from './scripts/components/main';
import {BrowserRouter} from 'react-router-dom';
import Routers from './routes';

// import Tree from './scripts/components/tree';

import './styles/app.scss';

class App extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            loginStatus: false
        }

        this.loginCallback = this.loginCallback.bind(this);
    }

    getChildContext() {
        return {
            username: this.state.username,
            loginStatus: this.state.loginStatus
        };
    }

    loginCallback({username, loginStatus}) {
        this.setState({
            username, loginStatus
        })
    }

    render() {
        var treeNodes = {
            text: 'root',
            nodes: [{
                text: 'leaf1'
            }, {
                isLeaf: false,
                text: 'root1',
                nodes: [{
                    text: 'leaf2'
                }, {
                    text: 'leaf3'
                }]
            }]
        };
        return (
            <BrowserRouter>
                <div
                    className='application'>
                    <Header
                        classNames=''
                        text=''
                        loginCallback={this.loginCallback}/>

                    <Menu />
                    <Main>
                        <Routers />
                    </Main>
                </div>
            </BrowserRouter>
        )
    }
};

App.displayName = 'App';

App.childContextTypes = {
    username: PropTypes.string,
    loginStatus: PropTypes.bool
};

export {
    App
};