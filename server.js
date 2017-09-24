var express = require('express');
var app = express();
var sharejs = require('share');
var redis = require('redis');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
	res.render('pad');
});

app.get('/(:id)', function(req, res){
	res.render('pad');
});

//sharejs config
var options = {
	db: {type: 'redis'},
};

sharejs.server.attach(app, options);

var port = process.env.PORT || 8000;
app.listen(port);