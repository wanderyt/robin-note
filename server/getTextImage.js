const http = require('http');
const fs = require('fs');
const path = require('path');
const INS_SEARCH_TEMPLATE = `https://www.instagram.com/explore/tags/{{searchText}}/?__a=1`;

const TEXT_IMAGE_URL_PREFIX = 'textImage';
const {imageSave} = require('./imageSave');

const getTextImage = (app, {PROXY}) => {
    app.get('/api/ins/searchText', (req, res) => {
        let {searchText} = req.query,
            path = INS_SEARCH_TEMPLATE.replace('{{searchText}}', encodeURI(searchText)),
            imgPath = `${process.cwd()}${path.sep}downloadImages${path.sep}${TEXT_IMAGE_URL_PREFIX}`,
            imgFullPath = `${imgPath}${path.sep}${searchText}.jpg`;

        if (fs.existsSync(imgFullPath)) {
            console.error(`Image already saved!`);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                imageUrl: imgFullPath
            });
        } else {
            http.get({
                host: PROXY.host,
                port: PROXY.port,
                path: path
            }, (response) => {
                if (response.statusCode === 200) {
                    let data = '';
                    response.on('data', (chunk) => data+=chunk);

                    response.on('end', () => {
                        try {
                            let output = formatInsSearchTextData(JSON.parse(data));
                            res.setHeader('Content-Type', 'application/json');
                            res.json(output);
                        } catch(e) {
                            res.setHeader('Content-Type', 'application/json');
                            res.json({imageUrl: ''});
                        }
                    });

                    response.on('error', () => {
                        console.error(`Fetch Instagram user data error...`);
                        res.statusCode = 500;
                        res.send('fail');
                    });
                } else {
                    console.error(`Fetch Instagram search image error...`);
                    res.statusCode = 500;
                    res.send('fail');
                }
            });
        }
    })
}

const formatInsSearchTextData = (data) => {
    let insSearchData = data.graphql.hashtag.edge_hashtag_to_top_posts.edges,
        imgUrl = '',
        output = {
            imageUrl: ''
        };

    if (insSearchData.length > 0) {
        imgUrl = insSearchData[0].node.display_url;
        output.imageUrl = imgUrl;
    }

    return output;
}

const saveImage = (url, PROXY, imgPath, imgFullPath) => {
    http.get({
        host: PROXY.host,
        port: PROXY.port,
        path: path
    }, (response) => {
        imageSave(response, imgPath, imgFullPath);
    });
}

module.exports = {
    getTextImage
};