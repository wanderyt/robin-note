const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');

const {INS_QUERY_HASH, SESSIONID} = process.env;
const {ids} = require('../config/config.json');
const INS_IMAGE_TEMPLATE = `https://www.instagram.com/graphql/query/?query_hash=${INS_QUERY_HASH}&variables={"id":{{id}},"first":{{offset}}{{nextTimeHash}}}`

router.get('/images', (req, res) => {
  let {id, offset = 20, nextTimeHash} = req.query,
    objId = (ids.find(el => el.name === id)).id,
    path = INS_IMAGE_TEMPLATE.replace('{{id}}', objId).replace('{{offset}}', offset);

  // set has more url
  path = path.replace('{{nextTimeHash}}', nextTimeHash ? `,"after":"${nextTimeHash}"` : '');

  console.log(`sessionid=${SESSIONID};`);

  request({
    url: encodeURI(path),
    method: 'get',
    headers: {
      'Cookie': `sessionid=${SESSIONID};`
    }
  }, (error, response, body) => {
    console.log(`Fetch Instagram data:`);
    console.log(`Fetch Instagram data status code: ${response.statusCode}`);
    if (response && response.statusCode >= 200 && response.statusCode < 300) {
      res.statusCode = response.statusCode;
      let { output } = formatInsImageData(body, id);

      // download images
      // downloadImages(imageList);

      res.statusCode = response.statusCode;
      res.json(output);
    } else {
      res.statusCode = response.statusCode;
      if (typeof error === 'object') {
        res.json({
          error: error
        });
      } else {
        res.json({
          error: {
            code: 'GENERIC_ERROR'
          }
        });
      }
    }
  });
});

const formatInsImageData = (data, insName) => {
  // log response
  process.env.ENABLE_LOG === 'true' && fs.writeFileSync(`./imagesLoader-${new Date()}.json`, data);

  let responseJSON = JSON.parse(data);
  let insImageData = responseJSON.data.user.edge_owner_to_timeline_media.edges,
    output = {
      nextCursor: responseJSON.data.user.edge_owner_to_timeline_media.page_info.end_cursor,
      hasNext: responseJSON.data.user.edge_owner_to_timeline_media.page_info.has_next_page,
      data: []
    },
    imageList = [];

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
      imageList.push({
        insName,
        id: imageData.id,
        url: imageData.display_url
      });
      output.data.push(d);
    }
  }

  return {
    output,
    imageList
  };
}

/**
* Download image one by one
* Poor performance
* @param {*} imageList
*/
const downloadImages = async (imageList) => {
  for (const idx in imageList) {
    const item = imageList[idx];
    console.log(item);
    console.log(`start download: ${item.url}`);
    await downloadImage(item);
    console.log(`finish download: ${item.url}`);
  }
};

module.exports = {
  router
};
