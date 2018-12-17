const express = require('express');

// Dotenv
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.API_PORT || 5000;

/**
 * Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
 * This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
 *
 * A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body),
 * or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.
 */
app.use(express.json());

const insRouters = require('./ins/routers/index');
app.use('/api/ins/', insRouters.router);

// define wacai unique request path
const wacaiRouters = require('./wacai/routers/index');
app.use('/api/wacai', wacaiRouters.router);

// Add wacai login middleware
const wacaiMiddleware = require('./wacai/middlewares/index');
app.use('/api/proxy/wacai', [wacaiMiddleware.wacaiLoginMiddleware, ...wacaiRouters.router]);

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