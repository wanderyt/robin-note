// ./src/routes.js
import React  from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Number from './scripts/components/study/number';
import Default from './scripts/components/default';

export default (props) => (
    <div>
        {/* React routers settings */}
        <Route exact={true} path="/" component={Default}></Route>
        <Route path="/number" component={Number}></Route>
    </div>
);