// =========================================================VARIABLES==============================================================================================
// app express
var express = require('express');
// invoking express
var app = express();
// body parser
var bodyParser = require('body-parser');
// messages
var messages = [];
// =========================================================VARIABLES==============================================================================================
// ==========================================================================FUNCTIONS===============================================================================================
app.use(bodyParser.json());
// get request
app.get('/', function(req, res) {
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
// post method
app.post('/', function(req, res) {
    messages.push({
      message:req.body.message,
      time: new Date()
    });

    res.status(200).set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'X-XSS-Protection': '1; mode=block',
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-Security-Policy': "default-src 'self' devmountain.github.io"
    }).send(JSON.stringify(messages));

    res.end();
});
// app options method
app.options('/', function(req, res, next){
res.status(200).set({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
}).send()
});


// app listen
app.listen(1100, function() {
    console.log("app.listen working")
        // ==========================================================================FUNCTIONS===============================================================================================
})
