import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './entry.css';

// Redux related
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import mainReducer from './scripts/reducers';

var store = createStore(mainReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// import a, {b, c} from './c';


// console.log('a: ' + a);
// console.log('b: ' + b);
// console.log('c: ' + c);