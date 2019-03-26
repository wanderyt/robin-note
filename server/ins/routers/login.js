const express = require('express');
const router = express.Router();
const request = require('request');
const qs = require('querystring');
const {getTokenByRegex} = require('../../helpers/cookies');

router.post('/fblogin', (req, res) => {
  console.log(req.body);
  let { fbToken } = req.body,
    path = `https://www.instagram.com/accounts/login/ajax/facebook/`;

  let fbUserId = process.env.FACEBOOK_ID;

  request({
    url: path,
    method: 'post',
    body: JSON.stringify({
      accessToken: `EDvF3EtimeF1543992044EuserFA21B06712566989A2EstateFDutF1543992044740CEchFDp_5f1B06712566989F2CC`,
      fbUserId,
      queryParams: {}
    }),
    headers: {
      'Accept': '*/*',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3488.0 Safari/537.36',
      'Referrer': 'https://www.instagram.com/accounts/signup/',
      // 'Cookie': 'rur=ASH; csrftoken=g5P53IxnDklTsIjTUqJ2Qv8GeEotAEbC; mid=W0xfYAAEAAHA2mHLhsdIsS1mQ6p7; mcd=3',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, (error, response, body) => {
    res.statusCode = response.statusCode;
    res.send(body);
  });

  // const ReactDOMServer = require('react-dom/server');
  // const React = require('react');
  // res.statueCode = 200;
  // res.send({ test: ReactDOMServer.renderToString(React.createElement('div')) });
});

router.post('/login', (req, res) => {
  request({
    url: 'https://www.instagram.com/accounts/login/ajax',
    method: 'post',
    body: qs.stringify({
      username: process.env.INS_USERNAME,
      password: process.env.INS_PASSWORD
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // origin: 'https://www.instagram.com',
      Referer: 'https://www.instagram.com/accounts/login/?hl=en&source=auth_switcher',
      Accept: '*/*',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
    }
  }, (error, response, body) => {
    try {
      res.statusCode = response.statusCode;
      if (response && response.statusCode === 200) {
        res.set('set-cookie', getTokenByRegex(response.headers['set-cookie'], /(sessionid=[^\s;]*)/));
        res.json({
          status: true
        });
      } else {
        res.json({
          status: false,
          error
        });
      }
    } catch (e) {
      res.statusCode = 500;
      res.json({
        status: false,
        error: e
      });
    }
  });
})

module.exports = {
  router
};