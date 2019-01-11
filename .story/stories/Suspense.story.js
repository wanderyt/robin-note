import React from 'react';
import {storiesOf} from '@storybook/react';

import MySuspense from '../../src/scripts/components/suspense';
import TestSuspense from '../../src/scripts/components/suspense/example';

const {GooglePieChart} = React.lazy(() => import('../../src/scripts/components/charts/PieChart'));
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

storiesOf('Suspense', module)
  .add('default', () => (
    // <MySuspense
    //   fallback={<div>Loading components...</div>}>
    //   <TestSuspense />
    // </MySuspense>

    // <React.Suspense>
    //   <GooglePieChart
    //     data={mockDataForGooglePieChart.data} />
    // </React.Suspense>
    <div>test</div>
  ));