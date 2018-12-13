const login = require('./login');
const searchUser = require('./searchUser');
const searchImageByText = require('./searchImageByText');
const downloadImage = require('./downloadImage');
const imagesLoader = require('./imagesLoader');

module.exports = {
  router: [
    searchUser.router,
    login.router,
    searchImageByText.router,
    downloadImage.router,
    imagesLoader.router
  ]
};
