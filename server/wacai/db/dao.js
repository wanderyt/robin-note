const sqlite3 = require('sqlite3').verbose();
const {DB_FILE_PATH, TABLE_NAME} = require('./config');
const {logDBError, logDBSuccess} = require('./util');

const createDBConnection = () => {
  let db = new sqlite3.Database(DB_FILE_PATH, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

  return db;
};

const insertFinData = (db, {id, category, subcategory, money, comment, date}, callback) => {
  if (id && category && subcategory && money && comment && date) {
    let sql =
      `insert into ${TABLE_NAME}(id, category, subcategory, date, comment, money)
      values ('${id}', '${category}', '${subcategory}', '${date}', '${comment}', '${money}');`;
    db.run(sql, (err) => {
      if (err) {
        logDBError('insert data with id: ' + id, err);
      } else {
        logDBSuccess('insert data with id: ' + id);
      }

      callback && callback(err);
    });
  }
};

const closeDB = (db) => {
  db.close();
};

module.exports = {
  createDBConnection,
  insertFinData,
  closeDB
};

