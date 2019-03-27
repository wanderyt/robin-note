const {getWacaiData} = require('../tools/finProcessor');
const {getSessionToken} = require('../middlewares/index');
const {createDBConnection, insertFinData, closeDB} = require('../db/dao');
const chalk = require('chalk');
const fs = require('fs');
const {TOKEN_PATH} = require('../config');

const padZero = (day) => {
  if (day < 10) {
    return `0${day}`;
  } else {
    return `${day}`;
  }
};

const formatDate = (date = new Date()) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  return `${year}-${padZero(month + 1)}-${padZero(day)}`;
};

const writeToken = (token) => {
  fs.writeFileSync(TOKEN_PATH, token);
};

const writeData = (data = []) => {
  const db = createDBConnection();
  data.forEach((item) => {
    insertFinData(db, item);
  });
  closeDB(db);
};

const syncOneDayJob = async (existingToken) => {
  let token = '';
  if (!existingToken) {
    token = await getSessionToken();
    if (!token) {
      return null;
    }
  }

  console.log('token', existingToken || token);
  const currentToken = existingToken || token
  writeToken(currentToken);

  const now = new Date();
  const fromDate = formatDate(new Date(now - 24 * 3600 * 1000 - 24 * 3600 * 1000));
  const toDate = formatDate(now);

  console.log(chalk.green('Start to sync data'));
  console.log(chalk.green('From date: ', fromDate));
  console.log(chalk.green('To date: ', toDate));

  getWacaiData({
    fromDate,
    toDate,
    cookies: currentToken,
    writeToFile: false
  }, async ({statusCode, data}) => {
    if (statusCode >= 300) {
      console.log(chalk.red('Token might expired, ask for new token'));
      token = await getSessionToken();
      writeToken(token);

      getWacaiData({
        fromDate,
        toDate,
        cookies: token,
        writeToFile: false
      }, ({statusCode, data}) => {
        if (statusCode === 200) {
          const finData = data.data;
          console.log(chalk.green('Data retrieved with ', finData.length, ' records.'));
          writeData(finData);
        }
      });
    } else {
      const finData = data.data;
      console.log(chalk.green('Data retrieved with ', finData.length, ' records.'));
      writeData(finData);
    }
  });
};

syncOneDayJob('wctk=eO2k48oOZvtVpPYLKsjDF6QIbwt4acc7_cA');