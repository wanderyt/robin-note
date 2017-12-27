import React, {Component} from 'react';

import Header from './scripts/components/header';
import Menu from './scripts/components/menu';
import Main from './scripts/components/main';
import {BrowserRouter} from 'react-router-dom';
import Routers from './routes';

// import Tree from './scripts/components/tree';

import './styles/app.scss';

class App extends Component {
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
                        text=''/>

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

export {
    App
};