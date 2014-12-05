chatty
======

A simple messaging/chat server and client

##Objectives
You're going to use Node.js to build a basic, REST-based chat server. You'll also plug in the basic front end Angular aspects of the project to make a fully functioning application. Your first **full stack** application!

###Step 1: Create the Server (GET)
Since we aren't worried about persistently storing information in a chat server (for now, anyway), your understanding of Node.js and REST will allow you to create a server that will post and retrieve messages (the C & R verbs of CRUD) for a chatroom.
* In server.js, import the 'http' module and use the `createServer` method to listen on a port of your choosing (probably something between 8000 and 12000).
* Create an array for storing your messages temporarily. You could call it `messages`. Think about where this should be stored so that the data 'persists' between requests.
* Write your callback to the createServer method, remembering that it will be passed both a request and response parameter
* Examine the request parameter to see which REST verb was used (check the `method` property of the request param).
* If the method is GET, end the response with the messages array (JSON stringified) in the response. 
  * Dont forget to set the appropriate headers for `Content-type`
* To test your server, run it (`node server.js`) and use cURL or Postman to make a GET request to your server. Try putting in some pre-filled messages into your array to make sure it's returning data the way you expect.

###Step 2: Create the POST part of your server
You're going to need to do a little bit of work to get the request data. It's easy to think that we could grab the data from a property like request.body or something, but what if we were uploading entire files to this endpoint? The file would need to be sent in pieces or chunks, and so servers have to be built to get data in stages. 

With Node, the way you get those chunks of data is to watch for two events on the request object, like so:

```javascript
var onRequest = function(req, res) {
    if (req.method == 'POST') {
       var postData = '';
       req.on('data', function(chunk) {
           postData += chunk.toString();
        });    
        req.on('end', function() {
            console.log("Got POST data:");
            console.log(JSON.parse(postData));
       });
    }
}
http.createServer(onRequest).listen(12200);
```

In the future with Express, this will be much easier. But for now, here are the next to-dos:
* If the request method is POST, add the message to your messages array, retrieving it from the request JSON body (see paragraph above). Make sure you end the response with a status, headers, and a body.
* Test your server setup using Postman to add a new message via POST (make sure you use a "raw" request of type JSON)

###Step 3: Finish the Angular client
To run your client side-by-side with your server, consider running the npm module `http-server`in the same directory. Whatever port it uses is what you'll be putting in your browser to test (e.g. localhost:8080). Remember, your API is running on a separate process on a separate port. This means that you'll have two seaprate "domains" you'll be hosting content from, a domain for your Node app (which responds to GET and POST) and `http-server` serving just static files (index.html, css, etc).

* The MessageCtrl is already provided, as is the MessageService
* Connect the MessageCtrl to the main.html view as an ng-controller
* Populate the MessageService with a `getMessages` method that returns a promise which retrieves the chat messages for the app (Look at older Angular projects you've worked on for reference)
* Add the service to MessageController.js, and call the `getMessages` method, populating the scope var on the `then` from the promise.

```javascript
MessageService.getMessages().then(function(response) {
  $scope.messages = response.data;
});
```

* Use the ng-repeat directive to create div elements for every message so that you can display the messages from the server

###Step 4: User input
* Create a text input field and attach an ng-model to it.
* Wrap the input with a form tag and utilize the ng-submit directive to call a method on the MessageController when the 'enter' key is pressed. e.g. `ng-submit="addMessage()"`
* Create the corresponding method in your controller's scope (in the example previously, `addMessage`)
* Your method will call the MessageService and pass the new message, which will then be POSTed up to your server.
* You will want to re-populate the messages from the server after you've sent the new message, there are a few ways to do this:
  * You could have the server return the list of messages on the POST call just like it does on the GET call. Then in your service you could return the data and your controller could use the result of the service's call to populate the messages $scope var, just like before.
  * You could simply initiate another getMessages call in your controller once the addMessage promise has been resolve (in the `then` function).
* After the addMessage call is finished, clear the ng-model for the newMessage
* **NOTE**: You will probably find that your POST at first doesn't work. Open your Chrome developer tools to the Network tab, and you'll notice that Chrome is automatically sending an OPTIONS call (REST verb) proactively to your server before it performs the POST. This is a security features of browsers when they perform cross domain requests, called 'preflighting' https://dvcs.w3.org/hg/cors/raw-file/tip/Overview.html#preflight-request.
  * Update your server.js to also check for an OPTIONS method
  * Have the reponse from the OPTIONS method set the following headers:
    * `'Access-Control-Allow-Origin': '*'`
    * `'Access-Control-Allow-Methods': 'OPTIONS, GET, POST'`
    * `'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'`
  * Now your POST requests should work from Chrome

###Step 5 (Black Diamond): Add timestamps
* On the server, automatically add in a timestamp for each new message in your array.
* On the client display the timestamp in the div.timestamp element in your ng-repeat

###Step 6 (Black Diamond): Add in some more data
* Try adding some more sophistication to your chat client, such as username, or profile_picture. Allow the user to specify their username when posting a message.
 

##Day 2: Refactor with Express

###Step 7: Install Express
Let's install Express to get started. 

```
npm install --save express
```

This saves express to your package.json

Now we need to require express and instantiate it. To get familiar with express, get familiar with the [guide](http://expressjs.com/guide.html).

How would setting up a server be different from setting up a server in Node?

There are three steps to setting up an express server:
* Require the express library: `var express = require('express');`
* Instantiate the express app: `var app = express();`
* Have the app listen on a port: `app.listen(8080);`

###Step 8: Create GET endpoint

In express, listening on endpoints is as easy as calling `get` or `post` on the app itself. For example:

```javascript
app.get('/', function(req, res) {
	res.send(JSON.stringify(messages));
});
```

Pretty cool right?

Now create your `get endpoint for your server.js

###Step 9: Create POST endpoint

Remember all of the crappy code we had to write to get POST data? Express and body-parser make this a lot simpler.

* Install `body-parser` as a npm module. See the express install command above for reference
* Require `body-parser` in your server.js, assign it to a variable called `bodyParser`
* Make a POST endpoint that will look very much like your GET, but that reads `req.body` to get the message data.
* In order to get the POST data without using .on('data') and .on('end'), we'll use bodyParser:

```javascript
app.use(bodyParser());
```

bodyParser is *middleware*, meaning it runs before every request. It automatically parses the body of requests and puts it together in a nice `req.body` property.

* finish your POST endpoint by grabbing the req.body and adding the messages to your messages array

Your server.js might look something like this when it's done: https://gist.github.com/cahlan/7027611

###Step 10: Refactor header writing into middlware

Let's create our own middleware to deal with headers.

```javascript
app.use(function(req, res, next) {
 //middleware goes here
});
```

Anything that runs in the above function will happen before every request is processed. It's a great place to put header modification. 

Use your own custom middleware to add the appropriate headers to your server.js. It should look something like this: https://gist.github.com/cahlan/7027693
