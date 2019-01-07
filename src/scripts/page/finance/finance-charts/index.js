import React from 'react';

import {GooglePieChart as PieChart} from '../../../components/charts/PieChart';

class FinanceCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: this.handleChartData(props.data)
    }
  }

  /**
   * Process chart data to specific format
   * data: [
   *  ['Task', 'Hours per Day'],
   *  ['Work', 11],
   *  ['Eat', 2],
   *  ['Commute', 2],
   *  ['Watch TV', 2],
   *  ['Sleep', 7],
   * ]
   */
  handleChartData = (finData = []) => {
    let dataMapping = {};
    let output = [];
    if (finData && finData.length > 0) {
      output.push(['Category', 'Amount']);
      finData.forEach((item) => {
        if (dataMapping[item.category]) {
          dataMapping[item.category] += parseFloat(item.money);
        } else {
          dataMapping[item.category] = parseFloat(item.money);
        }
      });
      for (const key in dataMapping) {
        if (dataMapping.hasOwnProperty(key)) {
          output.push([key, dataMapping[key]]);
        }
      }
      return output;
    } else {
      return [];
    }
  }
  /**
   * Add pie selected handler
   * @param {object} chartWrapper
   */
  selectPieHandler = ({chartWrapper}) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length === 1) {
      const [selectedItem] = selection;
      const dataTable = chartWrapper.getDataTable();
      const rowData = dataTable.getRowProperties(selectedItem.row);
      const rowNumber = dataTable.getNumberOfRows();
      console.log('selectedItem:');
      console.log(selectedItem);
      console.log('dataTable:');
      console.log(dataTable);
      console.log('rowData:');
      console.log(rowData);
      console.log('rowNumber:');
      console.log(rowNumber);
    }
    return null;
  }

  render() {
    const {chartData} = this.state;
    if (chartData && chartData.length > 0) {
      return (
        <div className="Finance__Charts">
          <div className="Finance__PieChart">
            <PieChart
              data={chartData}
              chartEvents={[{
                eventName: 'select',
                callback: this.selectPieHandler
              }]} />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default FinanceCharts;
