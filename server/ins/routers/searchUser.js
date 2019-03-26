const INS_SEARCH_TEMPLATE = `https://www.instagram.com/web/search/topsearch/?context=blended&query={{searchString}}`
const express = require('express');
const router = express.Router();
const request = require('request');
const {logApiRequest} = require('../../helpers/logger');

router.get('/searchUser', (req, res) => {
  let {searchString} = req.query,
    path = INS_SEARCH_TEMPLATE.replace('{{searchString}}', searchString);

  request({
    url: encodeURI(path),
    method: 'get'
  }, (error, response, body) => {
    try {
      if (response && response.statusCode === 200) {
        res.statusCode = response.statusCode;
        // Format data
        let output = formatInsSearchData(JSON.parse(body));
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
      logApiRequest(path, res.statusCode, {error});
    }
  });
});

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
  router
};