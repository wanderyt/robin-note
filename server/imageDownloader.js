const {downloadImage} = require('./helpers/image-download');
const {ids} = require('../src/config/ins-config.json');

const imageDownloader = (app) => {
    app.get('/api/downloadPicture', (req, resp) => {
        console.log(req.url);
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

        downloadImage({
            insName,
            id: name,
            url
        });
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