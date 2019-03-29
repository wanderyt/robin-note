// ./src/routes.js
import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Spinner from './scripts/uikit/spinner';

const Number = lazy(() => import(/* webpackChunkName: "page-number" */ './scripts/page/number'));
const Paint = lazy(() => import(/* webpackChunkName: "page-paint" */ './scripts/page/paint'));
const Instagram = lazy(() => import(/* webpackChunkName: "page-instagram" */ './scripts/page/instagram'));
const Chinese = lazy(() => import(/* webpackChunkName: "page-chinese" */ './scripts/page/chinese'));
const Default = lazy(() => import(/* webpackChunkName: "page-default" */ './scripts/page/default'));
const Finance = lazy(() => import(/* webpackChunkName: "page-finance" */ './scripts/page/finance'));
const FacebookLogin = lazy(() => import(/* webpackChunkName: "page-facebook-login" */ './scripts/page/facebook-login'));
const TestCounter = lazy(() => import(/* webpackChunkName: "page-facebook-login" */ './scripts/page/test-counter'));
const Colors = lazy(() => import(/* webpackChunkName: "page-facebook-login" */ './scripts/page/colors'));

export default (props) => (
  <div>
    <Suspense
      fallback={<Spinner />}>
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
      <Route path="/loading" component={Spinner}></Route>
    </Suspense>
  </div>
);