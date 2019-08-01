import React from 'react';
import AutoUpdateNumber from '../../src/scripts/components/count-up-number';
import {storiesOf} from '@storybook/react';

storiesOf('AutoUpdateNumber', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <AutoUpdateNumber />
    </div>
  ));
