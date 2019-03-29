import React from 'react';
import {Link} from 'react-router-dom';

import './index.scss';

const Default = () => {
  return (
    <div className="Welcome">
      <div className="Welcome__Item Welcome__Title">Welcome!</div>
      <div className="Welcome__Item Welcome__Desc">This is welcome page for Robin noteboard!</div>
      <div className="Welcome__Item Welcome__Details">Here are the valid links:</div>
      <Link
        className="Welcome__Link"
        to={`/instagram`}>
        /Instagram
      </Link>
      <Link
        className="Welcome__Link"
        to={`/chinese`}>
        /Chinese
      </Link>
      <Link
        className="Welcome__Link"
        to={`/finance`}>
        /Wacai Dashboard
      </Link>
      <Link
        className="Welcome__Link"
        to={`/colors`}>
        /Colors
      </Link>
    </div>
  );
};

export default Default;
