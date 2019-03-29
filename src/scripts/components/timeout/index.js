import React from 'react';
import PropTypes from 'prop-types';

class Timeout extends React.Component {
  static propTypes = {
    ms: PropTypes.number,
    children: PropTypes.func,
  }

  static defaultProps = {
    ms: 1000,
    children: () => void 0
  }

  state = {
    timeout: null,
    didTimeout: true,
  }

  componentDidMount() {
    const {ms} = this.props;
    const timeout = setTimeout(() => {
      this.setState({
        didTimeout: false,
        timeout,
      });
    }, ms);
  }

  render() {
    const {children} = this.props;
    const {didTimeout} = this.state;
    if (children) {
      return children(didTimeout);
    } else {
      return null;
    }
  }

  componentWillUnmount() {
    const {timeout} = this.state;
    if (timeout) {
      clearTimeout(timeout);
    }
  }
};

export default Timeout;
