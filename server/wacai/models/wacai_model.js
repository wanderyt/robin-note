const https = require('https'),
      _ = require('underscore'),
      request = require('request'),
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

    fetchData(props = {}, options) {
        console.log('WacaiModel.fetchData is executing...');

        let postData = {
                'cond.date': props.startDate || '2015-07-01',
                'cond.date_end': props.endDate || this.formatCurrentDate(),
                'cond.withDaySum': true,
                'pageInfo.pageIndex': props.pageIndex || 1,
                'cond.reimbursePrefer': 0
            };

        let self = this;
        let dataPromise = new Promise((resolve, reject) => {
            request({
                url: `https://${DETAILS_HOST}:443${DETAILS_PATH}?timsmp=${new Date().getTime()}`,
                method: 'POST',
                body: self.formatPostFormData(postData),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(self.formatPostFormData(postData)),
                    // 'Cookie': `wctk=${self.sessionId}`
                    'Cookie': options.cookies
                }
            }, (error, response, body) => {
                console.log(response.headers);
                console.log(`WacaiModel.fetchData returns...`);
                if (response) {
                    console.log(`WacaiModel.fetchData returns: ${response.statusCode}`);
                    resolve(typeof body === 'string' ? JSON.parse(body) : body);
                } else {
                    reject({
                        error
                    });
                }
            });
        });

        return dataPromise;
    }

    formatPostFormData (data = {}) {
        return _.map(data, (value, key) => `${key}=${value}`).join('&');
    }

    appendData(data = {}) {
        let fullData = data.ledgers;
        let shortenedData = fullData.map(({comment, typeTitle, money, date, id}) => {
            return {
                comment, typeTitle, money, date, id
            }
        })
        this.finData = this.finData.concat(shortenedData);
    }
}

module.exports = {
    WacaiModel: WacaiModel
};