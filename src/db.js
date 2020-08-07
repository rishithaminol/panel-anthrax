/* Connect to the database and database operations */
const sqlite3 = require('sqlite3').verbose();

var database;

function device_data(mac_addr, cb) {
  var sql = `SELECT * FROM mac_nick_data WHERE mac_addr = ?`;

  database.all(sql, [mac_addr], (err, rows) => {
    if (rows.length !== 0) {
      cb(rows[0]);
    } else {
      cb(null);
    }
  });

  // db_sqlite.close();
}

/* return all saved device list */
function device_list(cb) {
  var sql = `SELECT * FROM mac_nick_data;`;

  database.all(sql, [], (err, rows) => {
    // if (err) {
    //   console.error(err.message);
    // }

    if (rows.length !== 0) {
      cb(rows);
    } else {
      cb(null);
    }
  });
}

/* Run the callback after the database connection initiation */
/* At the time of this writing this is the initiate function */
var init_db = function(cb) {
  database = new sqlite3.Database('./panel_anthrax.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the [panel_anthrax] database.');
    cb();
  });
};

module.exports = {
  init_db: init_db,
  device_data: device_data,
  device_list: device_list,
  db: function(){
    return database;
  }
};
