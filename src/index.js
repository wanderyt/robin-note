import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './application'

// Start: Redux code
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './scripts/reducers';

const store = createStore(reducer);
// End: Redux code

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
