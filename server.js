var http = require('http'),
  port = 9001,
  messages = [{message: 'Hey brother', user: 'Jason', timestamp: new Date()}, {message: 'Her?', user: 'Jason', timestamp: new Date()}, {message: 'I made a huge mistake', user: 'Jason', timestamp: new Date()}, {message: 'Chaw chee chaw chee chaw', user: 'Jason', timestamp: new Date()}, {message: 'There is always money in the banana stand', user: 'Jason', timestamp: new Date()}, {message: 'Quit essing around', user: 'Jason', timestamp: new Date()}, {message: 'I\'m a monster!', user: 'Jason', timestamp: new Date()}];

function onRequest(req, res, next) {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  });

  if (req.method === 'GET') {
    return res.end(JSON.stringify(messages));
  }

  if (req.method === 'POST') {
    var str = '';
    req.on('data', function(chunk) {
      str += chunk.toString();
    });

    req.on('end', function() {
      var parsedMessage = JSON.parse(str);
      parsedMessage.timestamp = new Date();
      messages.push(parsedMessage);
    });

    return res.end('message added');
  }

  return res.end();
};

http.createServer(onRequest).listen(port, function() {
  console.log('listening on port:', port);
});
