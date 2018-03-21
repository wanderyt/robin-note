const https = require('https'),
      _ = require('underscore'),
      DETAILS_HOST = 'www.wacai.com',
      DETAILS_PATH = `/biz/ledger_list.action`;

class WacaiModel {
    constructor(props = {}) {
        console.log('WacaiModel is initializing...');
        this.finData = [];
        this.sessionId = props.sessionId;
    }

    formatCurrentDate() {
        let current = new Date(),
            month = current.getMonth() > 8 ? String(current.getMonth() + 1) : 0 + String(current.getMonth() + 1),
            day = current.getDate() > 9 ? current.getDate() : 0 + String(current.getDate());
        return `${current.getFullYear()}-${month}-${day}`;
    }

    fetchData(props = {}) {
        console.log('WacaiModel.fetchData is executing...');

        let postData = {
                'cond.date': props.startDate || '2015-07-01',
                'cond.date_end': props.endDate || this.formatCurrentDate(),
                'cond.withDaySum': true,
                'pageInfo.pageIndex': props.pageIndex || 1,
                'cond.reimbursePrefer': 0
            },
            options = {
                host: DETAILS_HOST,
                port: 443,
                path: `${DETAILS_PATH}?timsmp=${new Date().getTime()}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(this.formatPostFormData(postData)),
                    'Cookie': `wctk=${this.sessionId}`
                }
            },
            dataDefer = Promise.defer(),
            req = https.request(options, (res) => {
                let result = '';
                res.on('data', (d) => {
                    var data = d.toString('utf8');
                    result = result + data;
                });
                res.on('end', () => {
                    try {
                        dataDefer.resolve(JSON.parse(result));
                    } catch (e) {
                        console.error('result is not a valid object');
                        dataDefer.resolve({});
                    };
                });
                res.on('error', () => {
                    console.log(`problem with data fetch!`);
                    dataDefer.reject({});
                });
            });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
            dataDefer.reject(e);
        });

        // write data to request body
        console.log(this.formatPostFormData(postData));
        req.write(this.formatPostFormData(postData));
        req.end();

        return dataDefer.promise;
    }

    formatPostFormData (data = {}) {
        return _.map(data, (value, key) => `${key}=${value}`).join('&');
    }

    appendData(data = {}) {
        this.finData = this.finData.concat(data.ledgers);
    }
}

module.exports = {
    WacaiModel: WacaiModel
};