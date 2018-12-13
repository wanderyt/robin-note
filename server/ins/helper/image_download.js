const path = require('path');
const paths = require('../helpers/paths');
const https = require('https');
const request = require('request');
const {imageSave, imageSaveByRequest} = require('./image_save');

const downloadImageByHttps = (image) => {
  return new Promise((res, rej) => {
    try {
      let {id, url, insName} = image;
      const req = https.get(url, (response) => {
        console.log(`download terminated...`);
        res();
        if (response.statusCode === 200) {
          try {
            let imgPath = path.join(process.cwd(), paths.DOWNLOADED_IMAGES, insName),
              imgFullPath = path.join(imgPath, id);

            imageSave(response, id, imgPath, imgFullPath);
          } catch (e) {
            console.error(`Save image ${id} failed...`);
          }
        } else {
          console.error(`Cannot fetch image ${id}...`);
        }
      });

      req.on('error', function (e) {
        // General error, i.e.
        //  - ECONNRESET - server closed the socket unexpectedly
        //  - ECONNREFUSED - server did not listen
        //  - HPE_INVALID_VERSION
        //  - HPE_INVALID_STATUS
        //  - ... (other HPE_* codes) - server returned garbage
        console.log(e);
      });

      req.on('timeout', function () {
        // Timeout happend. Server received request, but not handled it
        // (i.e. doesn't send any response or it took to long).
        // You don't know what happend.
        // It will emit 'error' message as well (with ECONNRESET code).

        console.log('timeout');
        req.abort();
      });
    } catch (e) {
      rej(e);
    }
  })
};

const downloadImageByRequest = (image) => {
  return new Promise((res, rej) => {
    try {
      let { id, url, insName } = image;
      request.get(url, {encoding: 'binary'}, (error, response, body) => {
        console.log(`download terminated...`);
        res();
        if (response && response.statusCode === 200) {
          try {
            let imgPath = `${process.cwd()}${path.sep}downloadImages${path.sep}${insName}`,
              imgFullPath = `${imgPath}${path.sep}${id}`;

            imageSaveByRequest(body, id, imgPath, imgFullPath);
          } catch (e) {
            console.error(`Save image ${id} failed...`);
          }
        } else {
          console.error(`Cannot fetch image ${id}...`);
        }
      });
    } catch (e) {
      rej(e);
    }
  })
};

module.exports = {
  downloadImageByRequest,
  downloadImageByHttps
}