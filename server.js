//Hi this is our server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validator = require('validator'); 





var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
	console.log("test");
	songs = request.body;
	db.collection('playlists', function (error, coll) {
		var id = coll.insert( {"playlist": songs}, function (err, saved) {
			if (err) {
				response.status(500);
				response.send('Whoops something when wrong')
			} else {
				reponse.status(200);
				reponse.send(id);
			}
		});
	});
});


	app.listen(process.env.PORT || 5000);

