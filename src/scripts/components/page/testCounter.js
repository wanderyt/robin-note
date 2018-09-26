import React from 'react';

export default class TestCounter extends React.Component {
  state = {
    counter: 0
  }

  componentDidMount() {
    console.log('test counter did mount...');
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    console.log('test counter render...');
    return (
      <div>
        Current counter: {this.state.counter}
      </div>
    )
  }

  componentWillUnmount() {
    // alert('I will be unmounted...');
  }
}