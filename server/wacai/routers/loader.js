const express = require('express');
const router = express.Router();
const { getWacaiData } = require('../tools/finProcessor');

router.get('/loadData', (req, res) => {
  let {fromDate, toDate} = req.query;
  console.log(`req.__wctoken: ${req.__wctoken}`);
  let cookies = req.__wctoken || req.headers['cookie'];

  try {
    getWacaiData({ fromDate, toDate, cookies }, ({ statusCode, data }) => {
      res.setHeader('Content-Type', 'application/json');
      res.status = statusCode;
      res.json(data);
    });
    // getWacaiData({fromDate: '2018-01-01', toDate}, res);
  } catch (e) {
    res.status = 500;
    res.send({
      status: false,
      error: e
    });
  }
});

router.get('/test', (req, res) => {
  const token = req.__wctoken || '';
  res.send(token);
});

module.exports = {
  router
};