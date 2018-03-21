const https = require('https');
const _ = require('underscore');

const loginWacai = (request, response, next) => {
    let postData = formatPostFormData({
        username: '13651780739',
        password: 'b1696564beda0a5b7b90d51873159750'
    });

    let req = https.request({
        host: 'user.wacai.com',
        path: '/reform/web/pwd_login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    }, (res) => {
        let result = '';
        console.log(`STATUS: ${res.statusCode}`);

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            result += chunk;
        });
        res.on('end', () => {
            try {
                if (result) {
                    console.log(result);
                    console.log(Buffer.byteLength(postData));
                    let responseJSON = JSON.parse(result);
                    request.query.token = responseJSON.data[0].token;
                    next();
                } else {
                    response.statusCode = 503;
                    response.send('fail');
                    console.log(`User login failed...`);
                }
            } catch(e) {
                response.statusCode = 503;
                response.send('fail');
                console.log(`User login info parsing failed...`);
            }
        });
    });

    req.on('error', (e) => {
        response.statusCode = 503;
        response.send('fail');
        console.log(`User login failed... ${e}`);
    });

    req.write(postData);
};

const formatPostFormData = (data = {}) => {
    return _.map(data, (value, key) => `${key}=${value}`).join('&');
};

module.exports = {
    loginWacai
};