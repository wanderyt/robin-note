const chalk = require('chalk');

const logDBError = (operation, error) => {
  console.log(chalk.red(`Database operation: ${operation}`));
  console.log(chalk.red(`Error: ${error}`));
};

const logDBSuccess = (operation) => {
  console.log(chalk.green(`Database operation: ${operation}`));
};

module.exports = {
  logDBSuccess,
  logDBError,
}
