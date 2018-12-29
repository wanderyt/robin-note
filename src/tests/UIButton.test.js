import React from 'react';
// import jest from 'jest';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import UIButton from '../scripts/uikit/button';

describe('UIButton', () => {
  it('should render correctly', () => {
    const output = shallow(
      <UIButton
        text='my button'
        handleClick={() => alert('clicked!')} />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should handle Click event', () => {
    console.log = jest.fn();
    const output = shallow(
      <UIButton
        text='my button'
        handleClick={() => console.log('clicked!')} />
    );
    output.simulate('click');
    expect(console.log).toHaveBeenCalledWith('clicked!');
  });
});