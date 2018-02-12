const mkdirp = require('mkdirp');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imageDownloader = (app, {PROXY}) => {
    app.get('/api/downloadPicture', (req, resp) => {
        let {img, id, type} = req.query;

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

        try {
            http.get ({
                host: PROXY.host,
                port: PROXY.port,
                path: url,
                timeout: 1000
            }, function (response) {
                if (response.statusCode === 200) {
                    try {
                        let imgPath = `${process.cwd()}${path.sep}downloadImages`,
                            imgFullPath = `${imgPath}${path.sep}${name}`;

                        if (!fs.existsSync(imgFullPath)) {
                            mkdirp(imgPath, (err) => {
                                var imageFile = fs.createWriteStream(imgFullPath);
                                response.on("data", function(chunk){
                                    imageFile.write(chunk);
                                });
                                response.on("end", function(){
                                    console.log("saved png");
                                    resp.send('success');
                                });
                            });

                            response.on("error", () => {
                                console.error(`Save image ${name} failed`);
                                resp.statusCode = 500;
                                resp.send('response error fail');
                            })
                        } else {
                            console.log("image has been saved before!");
                            resp.send('success');
                        }
                    } catch(e) {
                        console.error(`Save image ${name} error1...`);
                        resp.statusCode = 500;
                        resp.send('exception fail');
                    }
                } else {
                    resp.statusCode = 500;
                    resp.send('status code fail');
                }
            });
        } catch(e) {
            console.error(e);
            console.error(`Save image ${name} error2...`);
            resp.statusCode = 500;
            resp.send('fail');
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

module.exports = {
    imageDownloader
}