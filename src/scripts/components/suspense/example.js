import React from 'react';

class TestSuspense extends React.Component {
  state = {
    loading: true,
  }

  mockApi = () => {
    this.setState({
      loading: false
    });
  }

  componentDidMount() {
    setTimeout(function () {
      this.setState({
        loading: false
      });
    }, 10000);
  }

  render() {
    const {loading} = this.state;
    if (loading) {
      throw new Error();
    } else {
      return (
        <div>加载结束</div>
      );
    }
  }
}

export default TestSuspense;
