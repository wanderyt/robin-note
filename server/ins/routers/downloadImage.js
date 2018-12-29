const express = require('express');
const router = express.Router();
const {downloadImageByRequest} = require('../helper/image_download');

router.get('/downloadImage', (req, res) => {
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
  res.send('success');

  downloadImageByRequest({
    insName,
    id: name,
    url
  });
});

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
  router
};
