import React from 'react';
import Carousel from '../../src/scripts/components/carousel';
import {storiesOf} from '@storybook/react';
import UIFinTile from '../../src/scripts/uikit/finance-tile';

const mockData = {
  date: '2018-11-10T12:20:00',
  money: 12,
  category: '周中',
  subcategory: '午餐',
  comment: '小辉哥'
};

const mockCarouselData = new Array(10).fill(<UIFinTile {...mockData} />);

storiesOf('Carousel', module)
  .add('Use fin tile as children', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Carousel>
        {mockCarouselData}
      </Carousel>
    </div>
  ));




