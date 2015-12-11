//Hi this is our server
var express = require('express');
var app = express();
app.use(express.static(__dirname));


var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

// landing page
app.get('/', function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// listen page
app.get('/main.html', function (request, response) {
	response.sendFile(__dirname + "/main.html");
});

app.post('/savePlaylist', function (request, reponse) {
	console.log(request.body);
	/*db.collection('playlists', function (error, coll) {
		var id = coll.insert()
	});*/
});



	app.listen(process.env.PORT || 5000);