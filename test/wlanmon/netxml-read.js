/*
You need to pass a callback to myfun function as below in order to get back data from the function when file reading is over:

var fs = require('fs');
function myfun(filePath, cb){
  var str = '';
  fs.readFile(filePath, 'utf8', function(err, data){
    if(err) throw err;
    cb(data);
  });
}

// call it like this
myfun('some_path', function(data) { // use returned data here } );
*/

fs = require('fs');
var xml2json = require('xml2json');
var colors = require('colors/safe');

var netxml_file_reader = function(err, data) {
  var data_str = data.toString().replace(/\&.*;/g, '0');

  try {
    var json = xml2json.toJson(data_str, {
      object: true
    });
  } catch(error) {
    return;
  }

	var x = json['detection-run']['wireless-network'];
  //console.log(x);
  //process.exit(0);

  var i;
  for (i = 0; i < x.length; i++) {
    if (x[i].type == "infrastructure") {
      console.log(colors.red(x[i].number + ":" + x[i].SSID.essid["$t"] + " --> " + x[i].BSSID));
      if (x[i]['wireless-client'] != undefined) {
        var clients = x[i]['wireless-client'];

        if (clients.length === undefined) { // object
          console.log(colors.magenta(clients['client-mac'].toLowerCase()));
          console.log("    first-seen:" + colors.green(clients['first-time']));
          console.log("    last-seen:" + colors.green(clients['last-time']));
          console.log("    device-vendor:" + colors.cyan(clients['client-manuf']));
        } else { // Array
          var j;
          for (j = 0; j < clients.length; j++) {
            console.log(colors.magenta(clients[j]['client-mac'].toLowerCase()));
            console.log("    first-seen:" + colors.green(clients[j]['first-time']));
            console.log("    last-seen:" + colors.green(clients[j]['last-time']));
            console.log("    device-vendor:" + colors.cyan(clients[j]['client-manuf']));
            console.log("");
          }
        }
      } else {
        console.log("No clients");
      }

      console.log("");
    }
  }
}

fs.watch('./', function (event, filename) {
  if (filename.indexOf("kismet.netxml") >= 0) {
    console.log("===================================================================================");
    fs.readFile(filename, netxml_file_reader);
    console.log("===================================================================================");
  }
});
