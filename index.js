const express = require('express');
const bodyParser = require('body-parser');


const port = 3005;




const app = express();


app.use(express.static('assets'))
app.use(bodyParser.json())

const messages = [];



app.get('/messages', (req,res,next) => {
    res.json({messages: messages});

});

app.post('/messages', (req,res,next) => {
    messages.push({name: req.body.name ,message: req.body.message, time: new Date() });
  res.status(200).json({ messages: messages });
} )

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});






