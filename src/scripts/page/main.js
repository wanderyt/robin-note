import React from 'react';
import './main.scss';

const Main = (props) => {
  return (
    <div className={`Main`}>
      {props.children}
    </div>
  );
};

export default Main;