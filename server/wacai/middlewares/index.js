const request = require('request');
const qs = require('querystring');

// middleware implementation

const wacaiLoginMiddleware = async (req, res, next) => {
  let token = await getSessionToken();
  req.__wctoken = token;
  next();
};

const getSessionToken = async () => {
  return new Promise((resolve) => {
    request({
      url: 'https://user.wacai.com/reform/web/pwd_login',
      method: 'post',
      body: qs.stringify({
        username: '13651780739',
        password: 'b1696564beda0a5b7b90d51873159750',
        autoLogin: true
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
     }
    }, (error, response, body) => {
      if (response.headers) {
        let token = getToken(response.headers['set-cookie'])
        resolve(token);
      } else {
        resolve('');
      }
    });
  })
};

const getToken = (cookies = []) => {
  const cookieRegex = /^(wctk=\w*);/;
  const matchResult = cookies.join(';').match(cookieRegex);
  if (matchResult && matchResult.length > 1) {
    return matchResult[1];
  } else {
    return '';
  }
};

module.exports = {
  wacaiLoginMiddleware
};