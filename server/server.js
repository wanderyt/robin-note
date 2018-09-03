const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
// Proxy for China
const PROXY = {
    host: 'dub-entbc-001',
    port: 80
};

app.use(express.json());

const {imageDownloader} = require('./imageDownloader');
imageDownloader(app, {PROXY});
const {insImageLoader} = require('./insImageLoader');
insImageLoader(app, {PROXY});
const {insSearchTopic} = require('./insSearchTopic');
insSearchTopic(app, {PROXY});
const {getTextImage} = require('./getTextImage');
getTextImage(app, {PROXY});
const {insLogin} = require('./insLogin');
insLogin(app);
// Add wacai login middleware
// const {loginWacai} = require('./wacaiMiddleware');
// app.use('/api/wacai', loginWacai);
const {wacaiLoader} = require('./wacaiLoader');
wacaiLoader(app);

app.listen(port, () => console.log(`Listening on port ${port}`));

// https server
// const https = require('https');
// const fs = require('fs');
// let key = fs.readFileSync('encryption/private.key');
// let cert = fs.readFileSync('encryption/mydomain.crt');
// var options = {
//     key: key,
//     cert: cert
// };
// https.createServer(options, app).listen(8009);