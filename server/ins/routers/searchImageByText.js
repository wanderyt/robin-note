const express = require('express');
const router = express.Router();
const request = require('request');

const fs = require('fs');
const path = require('path');
const INS_SEARCH_TEMPLATE = `https://www.instagram.com/explore/tags/{{searchText}}/?__a=1`;
const paths = require('../../helpers/paths');
const {logApiRequest} = require('../../helpers/logger');

router.get('/searchImage', (req, res) => {
  let {searchText} = req.query,
    url = INS_SEARCH_TEMPLATE.replace('{{searchText}}', encodeURI(searchText)),
    imgPath = path.join(process.cwd(), paths.DOWNLOADED_IMAGES, paths.TEXT_IMAGE_URL_PREFIX),
    imgFullPath = path.join(imgPath, `${searchText}.jpg`);

  if (fs.existsSync(imgFullPath)) {
    logApiRequest(req.url, 200, `Image already saved as ${imgFullPath}`);
    res.statusCode = 200;
    res.json({
      imageUrl: imgFullPath,
      imageUrls: []
    });
  } else {
    request({
      url,
      method: 'get'
    }, (error, response, body) => {
      try {
        if (response && response.statusCode === 200) {
          res.statusCode = response.statusCode;
          let output = formatInsSearchTextData(body);
          res.json(output);
        } else {
          res.statusCode = 500;
          res.json({
            status: false,
            error
          });
        }
      } catch (e) {
        res.statusCode = 500;
        res.json({
          status: false,
          error: e
        });
      } finally {
        logApiRequest(url, res.statusCode, {error});
      }
    });
  }
});

const formatInsSearchTextData = (data) => {
  // log response
  process.env.ENABLE_LOG === 'true' && fs.writeFileSync(`./searchImageByText-${new Date()}.json`, data);

  let responseJSON = JSON.parse(data);
  let insSearchData = responseJSON.graphql.hashtag.edge_hashtag_to_top_posts.edges,
    imgUrl = '',
    output = {
      imageUrl: '',
      imageUrls: []
    };

  if (insSearchData.length > 0) {
    imgUrl = insSearchData[0].node.display_url;
    output.imageUrl = imgUrl;
    let results = [];
    results = insSearchData.reduce((acc, item) => {
      item.node.display_url && acc.push(item.node.display_url);
      return acc;
    }, []);
    output.imageUrls = results;
  }

  return output;
}

module.exports = {
  router
};
