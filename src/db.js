/* Connect to the database and database operations */
var MongoClient = require('mongodb').MongoClient;
var database;

/* Find the details about specific mac address */
function device_data(mac_addr, cb) {
  database.collection("mac_nick_data").find({'mac': mac_addr}).toArray(function (err, result){
    if (result.length !== 0) {
      cb(result[0]);
    } else {
      cb(null); /* database does not have an entry */
    }
  });
}

/* return all saved device list */
function device_list(cb) {
  database.collection("mac_nick_data").find({}).toArray(function (err, result){
    if (result.length !== 0) {
      cb(result);
    } else {
      cb(null); /* database does not have an entry */
    }
  });
}

/* Run the callback after the database connection initiation */
/* At the time of this writing this is the initiate function */
var init_db = function(cb) {
  MongoClient.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true},
    function(err, db){
      if (err) {
        console.log("error connecting to database");
        throw err;
      } else {
        database = db.db("mac_radar");
        console.log("Successfully connected to the MongoDB database!");
        cb();
      }
    }
  );
};

module.exports = {
  init_db: init_db,
  device_data: device_data,
  device_list: device_list,
  db: function(){
    return database;
  }
};
