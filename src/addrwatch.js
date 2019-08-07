var sys = require('util');
var spawn = require('child_process').spawn;
var readline = require('readline');
var addrwatch;

var __start = function(net_interface){
  if (addrwatch == undefined) {
    console.log("Starting addrwatch main process...");
    addrwatch = spawn("sudo", ["/usr/bin/addrwatch", net_interface, "-4", "-o", "mac_out.log"]);

    // On error
    readline.createInterface({
      input: addrwatch.stderr,
      terminal: false
    }).on('line', function(line){
      console.log("addrwatch error: " + line);
    });

    addrwatch.on('close', function(code){
      console.log('addrwatch exited with code ' + code);
    });

    addrwatch.on('error', function(data){
      console.log('unable to start addrwatch server');
    });

    return readline.createInterface({
                      input: addrwatch.stdout,
                      terminal: false
                    });//.on('line', function(line){
                    //   console.log(line);
                    // });
  }

  console.log("Addrwatch already started...!");
  return null;
};

process.on('SIGINT', function() {
  console.log("Killing addrwatch main program...");
  addrwatch.kill();
  process.exit();
});

module.exports = {
  start: __start
};
