//Hi this is our server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validator = require('validator'); 
var object_id = require('mongodb').ObjectId;

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/inTune';
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

app.post('/savePlaylist', function (request, response) {
		response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	//console.log(request.body);
	//console.log("test");
	var inserted = false;
	songs = request.body;
	db.collection('playlists', function (error, coll) {
		if (!error) {
			var id = coll.insert( {songs}, function (err, saved) {
				if (err) {
					response.status(500);
					response.send('Whoops something when wrong')
				} else {
					response.status(200);
					coll.find({songs}).toArray( function (err, results) {
						if (!err) {
							response.send(results[0]._id);
						}						
					});				
				}
			});
		}
	});
});

app.get('/getPlaylist', function (request, response) {
	response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var reqId = request.query.id;
	var o_id = new object_id(reqId);
	console.log(reqId);
	db.collection('playlists', function(error, coll){
		if (!error) {
			console.log("no error", reqId);
			coll.find({"_id": o_id}, console.log("finding")).toArray( function(err, results) {
				if (!err) {
					console.log("found", results);
					//console.log(results.s.frame);
					response.send("this probably didn't work");
				} else {
					console.log(err);
				}
			});
		}
	});

});
	app.listen(process.env.PORT || 5000);

