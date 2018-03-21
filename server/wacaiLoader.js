const http = require('http');
const {getWacaiData} = require('./wacai/tools/finProcessor');

const wacaiLoader = (app) => {
    app.get('/api/wacai/loadData', (req, res) => {
        let {fromDate, toDate} = req.query;

        getWacaiData({fromDate, toDate}, res);
        // getWacaiData({fromDate: '2018-01-01', toDate}, res);
    });
};

module.exports = {
    wacaiLoader
};