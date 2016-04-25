var router = require('express').Router();
var pg = require('pg');

var connectionString = require ('../db/connection').connectionString;

router.post('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result = [];
      var name = req.body.name;
      var task = req.body.task;
      var complete = false;
      client.query('INSERT INTO tasks(name, task, complete)'+ ' VALUES ($1, $2, $3) ' +
                                'RETURNING id, name, task, complete', [name, task, complete]);
      var query = client.query("SELECT * FROM tasks")
      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        res.send(result);
        done();
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        res.status(500).send(error);
       
      });
    }
  });
});

router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM tasks ORDER BY complete, id DESC');
      var results = [];
      query.on('error', function(err){
        console.log(err);
        
        res.sendStatus(500);
        done();
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});

router.delete("/deleteTask/:id", function(req, res){

  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
    var id = req.params.id;
    var results = [];
    console.log(id);
    client.query('DELETE FROM tasks WHERE id = ($1)', [id]);
    var query = client.query("SELECT * FROM tasks ORDER BY id ASC");
   
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});
router.put('/complete/:id', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result =[];
      var complete = true;
      var id = req.params.id;
      client.query('UPDATE tasks SET complete=($1) WHERE id=($2)',[complete, id]);
      var query = client.query("SELECT * FROM tasks")
      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        res.send(result);
        done();
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        res.status(500).send(error);
       
      });
    }
  });
});
router.put('/notComplete/:id', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result =[];
      var complete = false;
      var id = req.params.id;
      client.query('UPDATE tasks SET complete=($1) WHERE id=($2)',[complete, id]);
      var query = client.query("SELECT * FROM tasks")
      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        res.send(result);
        done();
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        res.status(500).send(error);
       
      });
    }
  });
});
module.exports = router;
