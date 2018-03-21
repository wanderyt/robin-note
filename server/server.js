const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// Proxy for China
const PROXY = {
    host: 'dub-entbc-001',
    port: 80
};

const {imageDownloader} = require('./imageDownloader');
imageDownloader(app, {PROXY});
const {insImageLoader} = require('./insImageLoader');
insImageLoader(app, {PROXY});
const {insSearchTopic} = require('./insSearchTopic');
insSearchTopic(app, {PROXY});
const {getTextImage} = require('./getTextImage');
getTextImage(app, {PROXY});
// Add wacai login middleware
// const {loginWacai} = require('./wacaiMiddleware');
// app.use('/api/wacai', loginWacai);
const {wacaiLoader} = require('./wacaiLoader');
wacaiLoader(app);

app.listen(port, () => console.log(`Listening on port ${port}`));