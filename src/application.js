import React, {Component} from 'react';

import Header from './scripts/components/header';
import Menu from './scripts/components/menu';

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
            <div
                className='application'>
                <Header
                    classNames=''
                    text=''/>

                <Menu />
            </div>
        )
    }
};

App.displayName = 'App';

export {
    App
};