#!/usr/bin/env node

fs = require('fs');
var xml2json = require('xml2json');
var colors = require('colors/safe');

var data_file = ""; // netxml data file

/* Process arguments before everything */
process.argv.every(function(arg, index){
  switch (arg) {
    case '--file':
          console.log("Data file:" + process.argv[index + 1]);
          data_file = process.argv[index + 1];
          break;

    default:

  }
  return true;
});

fs.readFile(data_file, function(err, data) {
  var toJson_options = {
    object: true
  };
  var data_str = data.toString().replace(/\&.*;/g, '0');
  
  var json = xml2json.toJson(data_str, toJson_options);

	var x = json['detection-run']['wireless-network'];
  //console.log(x);
  //process.exit(0);

  var i;
  for (i = 0; i < x.length; i++) {
    if (x[i].type == "infrastructure") {
      console.log(colors.red(x[i].number + ":" + x[i].SSID.essid["$t"] + " --> " + (x[i].BSSID).toLowerCase()));
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
});
