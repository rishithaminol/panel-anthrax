var express = require('express');
var path = require('path');
var db = require('./db');

// create router object
var router = express.Router();

// export our Router
module.exports = router;

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

router.get('/arp_table', function(req, res){
  res.sendFile(path.join(__dirname, '../html/arp_table.html'));
});

router.get('/devices', function(req, res){
  res.sendFile(path.join(__dirname, '../html/device_data.html'));
});

router.get('/device_list', function(req, res){
  res.header('Content-Type', 'application/json');
  db.device_list(function(result){
    if (result != null) {
      res.send(JSON.stringify(result));
    }
  });
});

router.get('/device_info/:mac', function(req, res){
  res.header('Content-Type', 'application/json');
  db.device_data(req.params.mac, function(result){
    if (result != null) {
      res.send(JSON.stringify(result));
    } else {
      res.send(JSON.stringify({status: 404}));
    }
  });
});

router.post('/add_new_device', function(req, form_respon){
  db.db().collection('mac_nick_data').update({mac: req.body.mac_addr}, {
    $set: {nick_name: req.body.nick_name, detail: req.body.detail, role: req.body.role}
  }, {upsert:true}, function(err, res){
    if(err) throw err;
    console.log("database updated");
    form_respon.json({status: 200});
  });
});
