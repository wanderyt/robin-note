import React from 'react';

import UISearchBox from '../scripts/uikit/search-box';

import './index.scss';
// import "normalize.css";

export default (props) => {
  return (
    <div className="test-app-container">
      <UISearchBox
        ajaxUrl="/api/ins/searchUser" />
    </div>
  );
};
