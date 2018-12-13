const express = require('express');
const router = express.Router();
const request = require('request');
const qs = require('querystring');
const {getTokenByRegex} = require('../../helpers/cookies');

router.post('/login', (req, res, next) => {
  return request({
    url: 'https://user.wacai.com/reform/web/pwd_login',
    method: 'post',
    body: qs.stringify({
      username: process.env.WACAI_USERNAME,
      password: process.env.WACAI_PASSWORD,
      autoLogin: true
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }, (error, response, body) => {
    console.log('wacai login executing...');
    if (response && response.statusCode === 200) {
      res.set('set-cookie', getTokenByRegex(response.headers['set-cookie']), /^(wctk=\w*);/);
      res.json({
        status: true
      });
    } else {
      res.json({
        status: false,
        error: error || body || ''
      });
    }

    res.statusCode = response ? response.statusCode : 500;
  });
});

module.exports = {
  router
};