// ./src/routes.js
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Number from './scripts/page/number';
import Paint from './scripts/page/paint';
import Instagram from './scripts/page/instagram';
import Chinese from './scripts/page/chinese';
import Default from './scripts/page/default';
import Finance from './scripts/page/finance';
import FacebookLogin from './scripts/page/facebook-login';
import TestCounter from './scripts/page/test-counter';
import Colors from './scripts/page/colors';

export default (props) => (
  <div>
    {/* React routers settings */}
    <Route exact={true} path="/" component={Default}></Route>
    <Route path="/number" component={Number}></Route>
    <Route path="/paint" component={Paint}></Route>
    <Route path="/instagram" component={Instagram}></Route>
    <Route path="/chinese" component={Chinese}></Route>
    <Route path="/finance" component={Finance}></Route>
    <Route path="/facebookLogin" component={FacebookLogin}></Route>
    <Route path="/testCounter" component={TestCounter}></Route>
    <Route path="/colors" component={Colors}></Route>
  </div>
);