var messages = [{message:'hello'}];

http = require('http');
http.createServer(function(req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Connection': 'close',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(messages));
  }
  if (req.method === 'POST') {
    var postData = '';
    req.on('data', function(chunk) {
      postData += chunk.toString();
    });
    req.on('end', function() {
      console.log(JSON.parse(postData));
      var msg = JSON.parse(postData);
      messages.push(msg);
      res.writeHead(200, {
        'Connection': 'close',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(messages));
    });
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
        'Connection': 'close',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      });
    res.end("{}");
  }
}).listen(9000);

// var http = require("http");

// var messages = ["Hello World!"];

// var onRequest = function(req, res) {
//   if (req.method === 'GET') {
//     res.writeHead(200, {
//       'Connection': 'close',
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*'
//     });
//     res.end(JSON.stringify({message: messages}));
//   } 
//   if (req.method == 'POST') {
//     res.writeHead(200, {
//       'Connection': 'close',
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*'
//     });
//     var postData = '';
//     req.on('data', function(chunk) {
//       postData += chunk.toString();
//     });
//     req.on('end', function() {
//       if (!postData) {
//         res.end("no string sent with request")
//       } 
//       else {
//         console.log("Got POST data:");
//         console.log(JSON.parse(postData));
//         messages.push(JSON.parse(postData));
//         res.end(JSON.stringify("POST data recieved " + messages));
//       }
//     });
//   }
//   if (req.method === 'OPTIONS') {
//     res.writeHead(200, {
//       'Connection': 'close',
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
//       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
//     });
//     res.end("{}");
//   }
// };


// //--Server--//
// var server = http.createServer(onRequest);
// server.listen(9000, function() {
//     console.log('Listening on port' + 9000);
// });
