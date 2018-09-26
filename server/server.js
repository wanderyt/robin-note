const express = require('express');

// Dotenv
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.API_PORT || 5000;

app.use(express.json());

const {imageDownloader} = require('./imageDownloader');
imageDownloader(app);
const {insImageLoader} = require('./insImageLoader');
insImageLoader(app);
const {insSearchTopic} = require('./insSearchTopic');
insSearchTopic(app);
const {getTextImage} = require('./getTextImage');
getTextImage(app);
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