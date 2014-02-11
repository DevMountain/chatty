var messages = [];

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
      res.end("{}");
    });
  }
}).listen(12200);
