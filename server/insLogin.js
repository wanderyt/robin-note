const request = require('request');
const ReactDOMServer = require('react-dom/server');
const React = require('react');

const insLogin = (app) => {
    app.post('/api/ins/login', (req, res) => {
        console.log(req.body);
        let {fbToken} = req.body,
            path = `https://www.instagram.com/accounts/login/ajax/facebook/`;

        let fbUserId = 100006712566989;

        // request({
        //     url: path,
        //     method: 'post',
        //     body: JSON.stringify({
        //         accessToken: fbToken,
        //         fbUserId,
        //         queryParams: {}
        //     }),
        //     headers: {
        //         'Accept': '*/*',
        //         'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3488.0 Safari/537.36',
        //         'Referrer': 'https://www.instagram.com/accounts/signup/',
        //         'Cookie': 'rur=ASH; csrftoken=g5P53IxnDklTsIjTUqJ2Qv8GeEotAEbC; mid=W0xfYAAEAAHA2mHLhsdIsS1mQ6p7; mcd=3',
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // }, (error, response, body) => {
        //     console.log(response);
        //     res.statusCode = response.statusCode;
        //     res.send(body);
        // });
        res.statueCode = 200;
        res.send({test: ReactDOMServer.renderToString(React.createElement('div'))});
    })
}

module.exports = {
    insLogin
};