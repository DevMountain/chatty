var messages = [{message:'hello'}];

var express = require('express');

var app = express();

app.configure(function (){
	app.use(express.bodyParser());
	app.use(function(req, res, next) {
		res.setHeader ('Access-Control-Allow-Origin', '*');
		res.setHeader ('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
		res.setHeader ('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
	next();
	})
});

app.get('/', function (req, res){
	res.type('application/json');
	res.send(JSON.stringify(messages));
});

app.post('/', function (req, res) {
	console.log(req.body);
	messages.push(req.body);
	res.send(req.body);
});


app.listen(11900);









// var messages = new Array ();
// messages[0] = "Saab";
// messages[1] = "Volvo";
// messages[2] = "BMW";


// onRequest = function(req, res){
// if (req.method === 'GET') {	
// 	console.log(req.method);
// 	res.writeHead(200, {
// 		'Connection': 'close',
// 		'Content-type': 'application/json',
// 		'Access-Control-Allow-Origin': '*'
// 	});
// 	res.end(JSON.stringify(messages));
// }
// if (req.method == 'POST') {
//    var postData = '';
//    req.on('data', function(chunk) {
//     postData += chunk.toString();
//    });
//    req.on('end', function() {
//     console.log("Got POST data:");
//     console.log(JSON.parse(postData));
//     res.end(JSON.stringify(messages));
//    });
//   }
// };

// http = require('http');
// http.createServer(onRequest).listen(11900);

