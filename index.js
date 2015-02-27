var express = require('express')
var Dealabs = require('./Dealabs.js');
var path = require('path');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

Dealabs.loadDeals(function(){
  console.log("Lancement du worker");
  setInterval(Dealabs.updateItems, 30000);
});

app.get('/deals', function(req, res, next){
  console.log('GET sur /deals');
  Dealabs.getDeals(req.query.$top, req.query.$skip, function(data){
    console.log('Renvoi de ' + data.length + ' deals');
    res.send(data);
  });
});

app.get('/deals/:url', function(req, res, next){
  console.log('GET sur /deals/' + req.params.url);
  Dealabs.getDealInfo(req.params.url, function(data){
    res.send(data);
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server listening');

});