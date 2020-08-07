var express = require('express');
var fs = require('fs');

var db = require('./db');

// create router object
var router = express.Router();

// export our Router
module.exports = router;

router.get('/template', function(req, res){
  fs.readFile('./html/views/template.json', 'utf8', function(err, data){
    if (err) throw err;
    res.render('template', JSON.parse(data));
  });
});

router.get('/', function(req, res){
  fs.readFile('./html/views/index.json', 'utf8', function(err, data){
    if (err) throw err;
    res.render('index', JSON.parse(data));
  });
});

router.get('/devices', function(req, res){
  fs.readFile('./html/views/devices.json', 'utf8', function(err, data){
    if (err) throw err;
    res.render('index', JSON.parse(data));
  });
});

router.get('/api/device_list', function(req, res){
  db.device_list(function(result){
    if (result != null) {
      res.send(JSON.stringify(result));
    }
  });
});

router.get('/api/device_info/:mac', function(req, res){
  db.device_data(req.params.mac, function(result){
    if (result != null) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404).send(JSON.stringify({status: 404}));
    }
  });
});

router.post('/api/add_new_device', function(req, form_respon){
  form_respon.status(200).send(JSON.stringify({status: 200}));
});
