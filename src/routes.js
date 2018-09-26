// ./src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Number from './scripts/components/page/number';
import Paint from './scripts/components/page/paint';
import Instagram from './scripts/components/page/instagram';
import Chinese from './scripts/components/page/chinese';
import Default from './scripts/components/default';
import Finance from './scripts/components/page/finance';
import FacebookLogin from './scripts/components/page/facebookLogin';
import TestCounter from './scripts/components/page/testCounter';
import Colors from './scripts/components/page/colors';

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