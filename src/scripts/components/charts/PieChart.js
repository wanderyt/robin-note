import React from 'react';
import PropTypes from 'prop-types';
import EPieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import {Chart as GoogleChart} from 'react-google-charts';

class TwoLevelPieChart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    firstLevelData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      label: PropTypes.string,
    })),
    secondLevelData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      label: PropTypes.string,
    })),
    firstLevelColor: PropTypes.string,
    secondLevelColor: PropTypes.string,
  }
  static defaultProps = {
    width: 800,
    height: 400,
    data: [],
  }
  render() {
    const {firstLevelData, secondLevelData, width, height, firstLevelColor, secondLevelColor} = this.props;
    const centerPosition = Math.min(width, height) / 2;

    return (
      <EPieChart width={width} height={height}>
        <Pie
          data={firstLevelData}
          cx={centerPosition}
          cy={centerPosition}
          outerRadius={centerPosition * 0.5  * 0.6}
          fill={firstLevelColor} />
        <Pie
          data={secondLevelData}
          cx={centerPosition}
          cy={centerPosition}
          innerRadius={centerPosition * 0.5  * 0.7}
          outerRadius={centerPosition * 0.5  * 0.9}
          fill={secondLevelColor}
          label />
      </EPieChart>
    )
  }
}

export default TwoLevelPieChart;

const GooglePieChart = (props) => {
  const {width, height, LoadingComponent, data, options, rootProps, chartEvents = []} = props;
  return data ? (
    <GoogleChart
      width={width}
      height={height}
      chartType="PieChart"
      loader={<LoadingComponent />}
      data={data}
      options={options}
      rootProps={rootProps}
      chartEvents={
        [...chartEvents]
      } />
  )
  :
  null;
};

GooglePieChart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  LoadingComponent: PropTypes.oneOfType(PropTypes.func, PropTypes.element),
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  options: PropTypes.object,
  rootProps: PropTypes.object,
  chartEvents: PropTypes.array,
};

GooglePieChart.defaultProps = {
  width: '500px',
  height: '300px',
  LoadingComponent: () => (<div>Loading Chart</div>),
  options: {
    title: 'Pie Chart'
  },
  rootProps: {
    'data-testid': '1'
  },
  chartEvents: []
};

export {
  GooglePieChart
};
