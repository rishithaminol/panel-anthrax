var express = require('express');
var app = express();
var express_body_parser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var routes = require('./src/routes');
var arp_table = require('./src/arp_table');
var db = require('./src/db');

/* Global variables */
var net_interface = null; // Network interface to listen

/* Process arguments before everything */
process.argv.every(function(arg, index){
  switch (arg) {
    case '-i':
          console.log("Network interface:" + process.argv[index + 1]);
          net_interface = process.argv[index + 1];
          break;

    default:

  }
  return true;
});

app.use(express_body_parser.urlencoded({extended: true}));
app.use(express_body_parser.json());
app.use(express.static(__dirname + '/html/static'));

app.use('/', routes);

/* Main function */
main = function(){
  var port = 3000;
  http.listen(port, function(){
    console.log('server on http://localhost:' + port)
  });

  var addrwatch = require('./src/addrwatch').start(net_interface);

  addrwatch.on('line', function(line){
    addrwatch.pause();

    var x = line.split(' ');

    var time_stamp = x[0];
    var eth_interface = x[1];
    var mac_addr = x[3];
    var ip_addr = x[4];
    var arp_msg_type = x[5];

    db.device_data(mac_addr, function(result){
      var nick_name;
      if (result != null) {
        nick_name = result['nick_name'];
      } else {
        nick_name = null;
      }

      arp_table.update(mac_addr, nick_name, ip_addr, eth_interface, time_stamp);
      //arp_table.print_arp_table();
      io.emit('arp table', arp_table.arp_table());
      io.emit('arp changes', arp_table.arp_changes());

      addrwatch.resume();
    });
  });
};

//start server `See inside 'db' module`
db.init_db(main);
