const mkdirp = require('mkdirp');
const request = require('request');
const http = require('http');
const fs = require('fs');
const path = require('path');

const {imageSave, imageSaveByRequest} = require('./imageSave');

const {ids} = require('../src/config/ins-config.json');

const imageDownloader = (app) => {
    app.get('/api/downloadPicture', (req, resp) => {
        let {img, id, type, insName} = req.query;

        switch (type) {
            case 'twitter':
                var {url, name = img} = twitterUrl(img);
                break;
            case 'ins':
                var {url, name} = insUrl(img, id);
                break;
            default:
                break;
        }

        // send success response from performance consideration
        // no need to wait for the image save
        resp.send('success');

        try {
            // request({
            //     url: url,
            //     headers: {
            //         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            //     }
            // }, (error, response, body) => {
            //     console.log(`image download:`);
            //     // console.log(error || body);
            //     if (response) {
            //         // console.log(response);
            //         try {
            //             let imgPath = `${process.cwd()}${path.sep}downloadImages${path.sep}${type === 'ins' ? insName : ''}`,
            //                 imgFullPath = `${imgPath}${path.sep}${name}`;

            //                 imageSaveByRequest(response.body, name, imgPath, imgFullPath);
            //         } catch(e) {
            //             console.error(`Save image ${name} failed...`);
            //         }
            //         resp.statusCode = response.statusCode;
            //         resp.json({});
            //     } else {
            //         console.error(`Cannot fetch image ${name}...`);
            //         resp.statusCode = 500;
            //         resp.json({});
            //     }
            // });

            http.get ({
                path: url
            }, function (response) {
                if (response.statusCode === 200) {
                    try {
                        let imgPath = `${process.cwd()}${path.sep}downloadImages${path.sep}${type === 'ins' ? insName : ''}`,
                            imgFullPath = `${imgPath}${path.sep}${name}`;

                        imageSave(response, name, imgPath, imgFullPath);
                    } catch(e) {
                        console.error(`Save image ${name} failed...`);
                    }
                } else {
                    console.error(`Cannot fetch image ${name}...`);
                }
            });
        } catch(e) {
            console.error(e);
            console.error(`Save image ${name} error...`);
        }
    });
}

const twitterUrl = (img) => {
    return {
        url: `https://pbs.twimg.com/media/${img}:large`
    };
};

const insUrl = (imgUrl, id) => {
    const suffixRegex = /.*(.png|.jpg|.jpeg)/,
        suffixMapResult = suffixRegex.exec(imgUrl);

    let suffix = '';

    if (suffixMapResult) {
        suffix = suffixMapResult[1];
    }

    return {
        url: imgUrl,
        name: id + suffix
    };
};

const findNameById = (id) => {
    return ids.find((el) => el.id == id) || {};
};

module.exports = {
    imageDownloader
}