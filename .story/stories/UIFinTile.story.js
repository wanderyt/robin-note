import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {UIFinTile} from '../../src/scripts/uikit/UIFinTile';

const mockData = {
  date: '2018-11-10T12:20:00',
  money: 12,
  category: '周中',
  subcategory: '午餐',
  comment: '小辉哥'
};

storiesOf('UI Finance Tile', module)
  .add('default', () => (
    <UIFinTile {...mockData} />
  ));