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

        // send success response from performance consideration
        // no need to wait for the image save
        resp.send('success');

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
                                    console.log("Save image ${name} success");
                                });
                            });

                            response.on("error", () => {
                                console.error(`Save image ${name} failed`);
                            })
                        } else {
                            console.log(`image ${name} has been saved before!`);
                        }
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

module.exports = {
    imageDownloader
}