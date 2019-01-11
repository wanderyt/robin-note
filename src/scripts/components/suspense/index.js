import React from 'react';

class MySuspense extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidCatch(e) {
    if (e instanceof Error) {
      this.setState({
        loading: true
      });
    } else {
      e instanceof Promise && e.then(() => {
        this.setState({
          loading: false
        });
      });
    }
  }

  render() {
    const {loading} = this.state;
    if (loading) {
      return this.props.fallback;
    } else {
      return this.props.children;
    }
  }
};

export default MySuspense;
