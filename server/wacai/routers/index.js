const loginRouter = require('./login');
const loaderRouter = require('./loader');

module.exports = {
  router: [
    loginRouter.router,
    loaderRouter.router
  ]
};