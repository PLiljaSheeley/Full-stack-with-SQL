var router = require('express').Router();
var path = require('path');
var tasks = require('./tasks');

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/tasks', tasks);

module.exports = router;