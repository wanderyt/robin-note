import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './application'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Start: Redux code
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './scripts/reducers';

const store = createStore(reducer);
// End: Redux code

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
