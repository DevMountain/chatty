var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8989;

app.use(bodyParser.json());
var messages = [{
		message: 'Hello!',
		time: null
	},
	{
		message: 'Hello to you as well!',
		time: null
	}
];

app.get('/', function( req, res ) {
	res.status(200).set({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'X-XSS-Protection': '1; mode=block',
		'X-Frame-Options': 'SAMEORIGIN',
		'Content-Security-Policy': "default-src 'self' devmountain.github.io"
	}).send(JSON.stringify(messages));
});

app.post('/', function( req, res ) {
	console.log(req.body);
	messages.push(req.body);
	res.status(200).set({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'X-XSS-Protection': '1; mode=block',
		'X-Frame-Options': 'SAMEORIGIN',
		'Content-Security-Policy': "default-src 'self' devmountain.github.io"
	}).send(JSON.stringify(messages));

});

app.options('/', function( req, res ) {

	res.status(200).set({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'X-XSS-Protection': '1; mode=block',
		'X-Frame-Options': 'SAMEORIGIN',
		'Content-Security-Policy': "default-src 'self' devmountain.github.io"
	}).send();

});




app.listen(port, function() {
	console.log('Listening on ' + port)
});