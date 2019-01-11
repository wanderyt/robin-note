import React from 'react';

import './index.scss';

const getSummary = (data = []) => {
  let total = 0, details = {};
  data.forEach((item) => {
    let money = + parseFloat(item.money).toFixed(2);
    total += money;
    if (details[item.category]) {
      details[item.category] += money;
    } else {
      details[item.category] = money;
    }
  });

  return {
    total,
    details
  }
};

export default (props) => {
  const {data} = props;
  console.log(data);
  const {total, details} = getSummary(data);
  if (total) {
    return (
      <div className='Finance__Summary'>
        {
          details && Object.keys(details).map((item) => (
            <div className='Finance__Summary__Item'>
              <div className='Finance__Summary__Item__Name'>{item}</div>
              <div className='Finance__Summary__Item__Value'>￥{details[item]}</div>
            </div>
          ))
        }
        {
          total && (
            <div className='Finance__Summary__Item Finance__Summary__Total'>
              <div className='Finance__Summary__Item__Name'>总计</div>
              <div className='Finance__Summary__Item__Value'>￥{total}</div>
            </div>
          )
        }
      </div>
    )
  } else {
    return null;
  }
};
