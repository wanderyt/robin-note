import React from 'react';
import {storiesOf} from '@storybook/react';
import {NormalCounter, MemoCounter} from '../../src/scripts/components/counter';

storiesOf('React.memo', module)
  .add('Normal functional component', () => (
    <NormalCounter />
  ))
  .add('Memo functional component', () => (
    <MemoCounter />
  ));
