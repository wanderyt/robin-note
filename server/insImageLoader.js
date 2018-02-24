const {INS_QUERY_HASH} = require('./constants');
const {ids} = require('../src/config/ins-config.json');
const http = require('http');
const INS_IMAGE_TEMPLATE = `https://www.instagram.com/graphql/query/?query_hash=${INS_QUERY_HASH}&variables={"id":{{id}},"first":{{offset}}{{nextTimeHash}}}`

const insImageLoader = (app, {PROXY}) => {
    app.get('/api/ins/images', (req, res) => {
        let {id, offset = 20, nextTimeHash} = req.query,
            objId = (ids.find(el => el.name == id)).id,
            path = INS_IMAGE_TEMPLATE.replace('{{id}}', objId).replace('{{offset}}', offset);

        console.log(id);

        // set has more url
        path = path.replace('{{nextTimeHash}}', nextTimeHash ? `,"after":"${nextTimeHash}"` : '');

        console.log(path);

        http.get({
            host: PROXY.host,
            port: PROXY.port,
            path: encodeURI(path)
        }, (response) => {
            if (response.statusCode === 200) {
                let data = '';
                response.on('data', (chunk) => data+=chunk);
                response.on('end', () => {
                    try {
                        let output = formatInsImageData(JSON.parse(data));
                        res.setHeader('Content-Type', 'application/json');
                        console.log(`Fetch Instagram data success...`);
                        res.json(output);
                    } catch(e) {
                        console.log(e);
                        res.setHeader('Content-Type', 'application/json');
                        res.json({});
                    }
                });

                response.on('error', () => {
                    console.error(`Fetch Instagram data error...`);
                    res.statusCode = 500;
                    res.send('fail');
                });
            } else {
                console.error(`Fetch Instagram data error...`);
                res.statusCode = 500;
                res.send('fail');
            }
        });
    });
};

const formatInsImageData = (data) => {
    let insImageData = data.data.user.edge_owner_to_timeline_media.edges,
        output = {
            nextCursor: data.data.user.edge_owner_to_timeline_media.page_info.end_cursor,
            hasNext: data.data.user.edge_owner_to_timeline_media.page_info.has_next_page,
            data: []
        };

    for (const item in insImageData) {
        let d = {},
            imageData = insImageData[item].node;

        if (imageData.__typename === 'GraphImage') {
            // Get middle size image
            for (let index = 0; index < imageData.thumbnail_resources.length; index++) {
                const element = imageData.thumbnail_resources[index];
                if (element.config_width > 200 && element.config_width < 300) {
                    d.imgThumbnailUrl = element.src;
                    break;
                }
            }
            Object.assign(d, {
                id: imageData.id,
                desc: imageData.edge_media_to_caption.edges.length > 0 ? imageData.edge_media_to_caption.edges[0].node.text : '',
                imgFullUrl: imageData.display_url
            });
            output.data.push(d);
        }
    }

    return output;
}

module.exports = {
    insImageLoader
};