const http = require('http');
const INS_SEARCH_TEMPLATE = `https://www.instagram.com/web/search/topsearch/?context=blended&query={{searchString}}`

const insSearchTopic = (app, {PROXY}) => {
    app.get('/api/ins/search', (req, res) => {
        let {searchString} = req.query,
            path = INS_SEARCH_TEMPLATE.replace('{{searchString}}', searchString);

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
                        let output = formatInsSearchData(JSON.parse(data));
                        res.setHeader('Content-Type', 'application/json');
                        res.json(output);
                    } catch(e) {
                        res.setHeader('Content-Type', 'application/json');
                        res.json({});
                    }
                });

                response.on('error', () => {
                    console.error(`Fetch Instagram user data error...`);
                    res.statusCode = 500;
                    res.send('fail');
                });
            } else {
                console.error(`Fetch Instagram user data error...`);
                res.statusCode = 500;
                res.send('fail');
            }
        });
    });
};

const formatInsSearchData = (data) => {
    let insSearchData = data.users,
        output = {
            users: []
        };

    for (const item in insSearchData) {
        let userData = insSearchData[item].user,
            d = {};

        Object.assign(d, {
            id: userData.pk,
            name: userData.username,
            desc: userData.full_name,
            isPrivate: userData.is_private,
            isVerified: userData.is_verified,
            iconUrl: userData.profile_pic_url
        });
        output.users.push(d);
    }

    return output;
}

module.exports = {
    insSearchTopic
};