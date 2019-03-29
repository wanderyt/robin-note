const {syncData} = require('./syncData');
const fs = require('fs');
const {TOKEN_PATH, LOG_PATH} = require('../config');
const {createDBConnection, deleteAllData, closeDB} = require('../db/dao');

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

const getToken = () => {
  let token = fs.readFileSync(TOKEN_PATH, {
    encoding: 'utf-8'
  });
  return token;
}

const syncOneDay = () => {
  const now = new Date();
  const fromDate = formatDate(new Date(now - 24 * 3600 * 1000 - 24 * 3600 * 1000));
  const toDate = formatDate(now);
  const token = getToken();

  syncData({
    token,
    fromDate,
    toDate
  });
}

const syncAll = ({logger}) => {
  const now = new Date();
  const fromDate = '2015-10-01';
  const toDate = formatDate(now);
  const token = getToken();

  syncData({
    token,
    fromDate,
    toDate,
    beforeSync: () => {
      let db = createDBConnection();
      deleteAllData(db);
      closeDB(db);
    }
  }, {
    logger
  });
};

const log4js = require('log4js');
const now = formatDate(new Date());
const logName = LOG_PATH + 'sync-all-data-' + now + '.log';
console.log('logName: ', logName);
const mkdirp = require('mkdirp');

log4js.configure({
  "appenders": {
    "wacai": {
      "type": "file",
      "filename": logName
    }
  },
  "categories": {
    "default": {
      "appenders": ["wacai"],
      "level": "DEBUG"
    }
  }
});

const logger = log4js.getLogger('wacai');
syncAll({logger});
