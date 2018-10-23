var addrwatch = require('./addrwatch');

addrwatch.on('line', function(line){
  console.log(line);
});
