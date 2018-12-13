const chalk = require('chalk');

/**
 * Log api request info
 * @param {string} url
 * @param {number} statusCode
 * @param {object|string} error
 */
const logApiRequest = (url, statusCode, {success, error}) => {
  console.log('===================');
  console.log(`Request url: ${chalk.grey(url)}`);
  console.log(`Request status: ${checkApiStatus(statusCode)}`);

  if (error) {
    console.log(`Error log: ${error}`);
  }

  if (success) {
    console.log(`Success Message: ${chalk.green(success)}`);
  }

  console.log();
};

const checkApiStatus = (statusCode) => {
  const checkFlag = statusCode / 100;
  if (checkFlag === 2) {
    return chalk.green(statusCode);
  } else if (checkFlag === 4 || checkFlag === 5) {
    return chalk.red(statusCode);
  } else {
    return chalk.yellow(statusCode);
  }
};

module.exports = {
  logApiRequest
}