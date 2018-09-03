const {INS_QUERY_HASH, SESSIONID} = require('./constants');
const {ids} = require('../src/config/ins-config.json');
const request = require('request');
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

        request({
            url: encodeURI(path),
            method: 'get',
            headers: {
                'Cookie': `sessionid=${SESSIONID};`
            }
        }, (error, response, body) => {
            console.log(`Fetch Instagram data:`);
            console.log(error || body);
            if (response) {
                console.log(`Fetch Instagram data: ${response.statusCode}`);
                res.statusCode = response.statusCode;
                let output = formatInsImageData(JSON.parse(body));
                res.json(output);
            } else {
                res.json({});
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