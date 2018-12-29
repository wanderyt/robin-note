import React from 'react';
import PropTypes from 'prop-types';

class Number extends React.Component {
  render() {
    return (
      <div>
        <div>{this.context.username}</div>
        <div>Number</div>
      </div>
    );
  }
}

Number.contextTypes = {
  username: PropTypes.string
};

export default Number;