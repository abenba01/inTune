//Hi this is our server
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));

// landing page
app.get('/', function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// listen page
app.get('/main.html', function(request, response) {
	response.sendFile(__dirname + "/main.html");
});

	app.listen(process.env.PORT || 5000);