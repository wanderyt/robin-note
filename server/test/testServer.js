const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// Proxy for China
const PROXY = {
    host: 'dub-entbc-001',
    port: 80
};

const {testFileDownloader} = require('./fileDownloaderWithProxy');
testFileDownloader(app, {PROXY});

app.listen(port, () => console.log(`Listening on port ${port}`));