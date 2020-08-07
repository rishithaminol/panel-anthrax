var spawn = require('child_process').spawn;
var readline = require('readline');
var addrwatch;

function init_addrwatch(net_interface) {
  if (addrwatch != undefined) {
    console.log("Addrwatch already started...!");
    return null;
  }

  console.log("Starting addrwatch main process...");
  addrwatch = spawn("sudo", ['/usr/bin/addrwatch', net_interface, "-4", "-o", "mac_out.log"]);

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

process.on('SIGINT', function() {
  console.log("Killing addrwatch main program...");
  addrwatch.kill();
  process.exit();
});

module.exports = {
  start: init_addrwatch
};
