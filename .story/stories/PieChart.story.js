import React from 'react';
import {storiesOf} from '@storybook/react';
import TwoLevelPieChart, {GooglePieChart} from '../../src/scripts/components/charts/PieChart';

const mockDataForTwoLevelPieChart = {
  firstLevelData: [
    {name: 'Group A', value: 400}, {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}
  ],
  secondLevelData: [
    {name: 'A1', value: 100},
    {name: 'A2', value: 300},
    {name: 'B1', value: 100},
    {name: 'B2', value: 80},
    {name: 'B3', value: 40},
    {name: 'B4', value: 30},
    {name: 'B5', value: 50},
    {name: 'C1', value: 100},
    {name: 'C2', value: 200},
    {name: 'D1', value: 150},
    {name: 'D2', value: 50},
  ],
  firstLevelColor: '#8884d8',
  secondLevelColor: '#82ca9d',
};

const mockDataForGooglePieChart = {
  data: [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ]
};

storiesOf('Pie Chart', module)
  .add('pie chart from recharts', () => (
    <TwoLevelPieChart {...mockDataForTwoLevelPieChart} />
  ))
  .add('pie chart from google chart', () => (
    <GooglePieChart
      data={mockDataForGooglePieChart.data} />
  ));
