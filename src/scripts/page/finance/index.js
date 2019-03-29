import React from 'react';
import axios from 'axios';

import DatePicker from 'material-ui/DatePicker';
// import UIButton from '../../uikit/button';
import Button from '@material-ui/core/Button';
import UIFinTile from '../../uikit/finance-tile';
// import FinanceChart from './finance-charts';
import FinanceSummary from './fiannce-summary';

import './index.scss';

const FinanceChart = React.lazy(() => import(/* webpackChunkName: "module-finance-charts" */ './finance-charts'));

class Finance extends React.Component {
  constructor(props) {
    super(props);
    let minDate = new Date('2015-10-01'),
      fromDate = new Date('2017-10-01');

    this.state = {
      loadStatus: false,
      minDate,
      fromDate,
      toDate: null,
      finData: [],
      pieFilteredData: []
    };

    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.getFinData = this.getFinData.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  getFinData = () => {
    if (this.state.fromDate && this.state.toDate && this.state.toDate >= this.state.fromDate) {
      let fromDate = this.formatDate(this.state.fromDate),
        toDate = this.formatDate(this.state.toDate);

      axios(`/api/proxy/wacai/loadData?fromDate=${fromDate}&toDate=${toDate}`)
        .then(function (res) {
          if (res.status === 200 && res.data && res.data.data && res.data.data.length > 0) {
            this.setState({
              loadStatus: true,
              finData: res.data.data
            });
          }
        }.bind(this))
    }
  }

  componentDidMount() {
    // axios('/api/wacai/loadData')
    //   .then(function (res) {
    //     this.setState({
    //       loadStatus: true
    //     })
    //   }.bind(this))
  }

  handleFromDateChange = (evt, date) => {
    this.setState({
      fromDate: date
    });
  }

  handleToDateChange = (evt, date) => {
    this.setState({
      toDate: date
    });
  }

  handlePieSelected = (category) => {
    const {finData} = this.state;
    let pieFilteredData = [];
    if (category) {
      pieFilteredData = finData.filter((item) => {
        return item.category === category;
      });

      this.setState({
        pieFilteredData
      });
    }
  }

  formatDate = (date) => {
    let month = date.getMonth() > 8 ? String(date.getMonth() + 1) : 0 + String(date.getMonth() + 1),
      day = date.getDate() > 9 ? date.getDate() : 0 + String(date.getDate());
    return `${date.getFullYear()}-${month}-${day}`;
  }

  render() {
    const {pieFilteredData, finData} = this.state;
    return (
      <div
        className='Finance'>
        <div className='Finance__Banner'>Welcome to Finance Place!</div>
        <div>
          <div className='Finance__FromDate'>
            <DatePicker
              hintText="From Date"
              floatingLabelText="From Date"
              autoOk={true}
              minDate={this.state.minDate}
              mode="landscape"
              onChange={this.handleFromDateChange} />
          </div>
          <div className='Finance__ToDate'>
            <DatePicker
              hintText="To Date"
              floatingLabelText="To Date"
              autoOk={true}
              minDate={this.state.fromDate}
              mode="landscape"
              onChange={this.handleToDateChange} />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.getFinData}>
            Search
          </Button>
        </div>
        <React.Suspense
          fallback={<div>loading</div>}>
          <div className="Finance__Charts__Container">
            {
              finData.length > 0 && <FinanceChart data={finData} handlePieSelected={this.handlePieSelected} />
            }
          </div>
        </React.Suspense>
        {/* <div className="Finance__Charts__Container">
          {
            finData.length > 0 && <FinanceChart data={finData} handlePieSelected={this.handlePieSelected} />
          }
        </div> */}
        <div className="Finance__DataSummary">
          <FinanceSummary data={finData} />
        </div>
        {
          pieFilteredData.length > 0
          &&
          <div className="Finance__DataFiltered">
            {
              pieFilteredData.map((item) =>
                <UIFinTile
                  key={item.id}
                  money={item.money}
                  category={item.category}
                  subcategory={item.subcategory}
                  date={item.date}
                  comment={item.comment} />
              )
            }
          </div>
        }
      </div>
    )
  }
};

export default Finance;