/**
 * https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
 * You can access this (the instance of the WrappedComponent) with a ref,
 * but you will need a full initial normal render process of the WrappedComponent for the ref to be calculated,
 * that means that you need to return the WrappedComponent element from the HOC render method,
 * let React do it’s reconciliation process and just then you will have a ref to the WrappedComponent instance.
 * Example: In the following example we explore how to access instance methods and the instance itself of the WrappedComponent via refs
 * https://facebook.github.io/react/docs/more-about-refs.html
 */
import React from 'react';

export default function refsHoc(WrappedComponent) {
  return class RefsHOC extends React.Component {
    proc(wrappedComponentInstance) {
      wrappedComponentInstance.method();
    }

    render() {
      const props = Object.assign({}, this.props, this.proc.bind(this));
      return <WrappedComponent {...props} />
    }
  }
};
