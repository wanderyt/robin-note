const express = require('express');
const router = express.Router();
const { getWacaiData } = require('../tools/finProcessor');

router.get('/loadData', (req, res) => {
  let {fromDate, toDate} = req.query;
  let cookies = req.headers['cookie'];

  getWacaiData({ fromDate, toDate, cookies }, ({ statusCode, data }) => {
    res.setHeader('Content-Type', 'application/json');
    res.status = statusCode;
    res.json(data);
  });
  // getWacaiData({fromDate: '2018-01-01', toDate}, res);
});

router.get('/test', (req, res) => {
  const token = req.__wctoken || '';
  res.send(token);
})

module.exports = {
  router
};