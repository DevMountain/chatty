## Chatty

A simple messaging/chat server and client

#### Objectives
You're going to use Node.js and Express to build a basic REST-based chat server. You'll also plug in the basic front end Angular aspects of the project to make a fully functioning application. Your first **full stack** application!

#### Step 1: Create the Server (GET & Middleware)
Since we aren't worried about persistently storing information in a chat server (for now, anyway), your understanding of Node.js and REST will allow you to create a server that will post and retrieve messages (the C & R verbs of CRUD) for a chatroom.
* First we'll follow the beginning steps from this morning's mini project. First `touch .gitignore` and add `node_modules` to that `.gitignore`. Then, `npm init` and `npm install express --save`. This will download the Express library and save it to your package.json.
* In server.js, import the 'express' module and initialize it by calling `var app = express()`. Now you can use the `app.listen` method on a port of your choice (between 8000 and 12000 is usual).
* Create an array for storing your messages temporarily. You could call it `messages`. Think about where this should be stored so that the data 'persists' between requests.
* Write a new GET endpoint that returns a JSON stringified response of your messages array. It will look something like this:
```javascript
app.get('/', function( req, res ) {
  res.send(JSON.stringify(messages));
});
```
You might remember from this morning's project that your browser won't want to work without you supplying the appropriate headers, so let's go ahead and add those to the endpoint.
```javascript
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
```

* To test your server, run it (`nodemon server.js`) and use Postman to make a GET request to your server. Try putting in some pre-filled messages into your array to make sure it's returning data the way you expect.

#### Step 2: Create the POST part of your server
To begin, we'll need to install a new library to help us manage our request's data. So run an `npm install body-parser --save` and require body-parser in your `server.js`. Now we can initialize body-parser by employing the `app.use()` method, like so:
```javascript
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
```
We will be going more in depth into exactly how `app.use()` works tomorrow, but in short: Any request coming into the server will first be passed through any functions inside your `app.use()` method before being passed on to your endpoints.

Now we can actually create our 'POST' endpoint. This will be structured very similarly to our 'GET' endpoint. Let's start off by simply console logging our `req.body`.
```javascript
app.post('/', function( req, res ) {
  console.log(req.body);
});
```
Let's test this out in Postman.

* First set the request method to 'POST' next to your URL.
* Now select the 'Body' tab and select 'Raw' and ensure the data type is set to 'JSON(application/json)'.
* Inside of the text-area we can now fill out some simple JSON. Let's start with something like this:

```json
{
  "message":"Hello!"
}
```

Try it out! You should now see something along the lines of `{ message: 'Hello!' }` printed to your terminal. If you are getting errors, check the formatting of your JSON. It is important to use double quotes around both the key and the value.

Now we need to save the data!

* In your 'POST' endpoint add the message to your messages array, retrieving it from the request JSON body (see paragraph above). Make sure you end the response with a status, headers, and a body.
* Test your server setup using Postman to add a new message via POST (make sure you use a "raw" request of type JSON).

Once finished your request will look similar to this:
```javascript
app.post('/', function( req, res ) {

    messages.push(req.body.message);

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
```

Note that we `.send()` our updated messages array, this lets us avoid having to make a new 'GET' request on the front end if the view needs to be updated.

#### Step 3: Launch the Angular client
To run your client side-by-side with your server, consider running the a static server such as the npm modules `http-server`, `node-static`, or `live-server` in the same directory. Whatever port it uses is what you'll be putting in your browser to test (e.g. 127.0.0.1:8080). Remember, your API is running on a separate process on a separate port. This means that you'll have two seaprate "domains" from which you'll be hosting content: a domain for your Node app (which responds to GET and POST) and your server, serving just static files (index.html, css, etc).

Take a few minutes to browse through the front-end code provided. It should all be very familiar, the only difference is that you are now directing http requests at your own endpoint instead of an outside API.


* **NOTE**: You will probably find that your POST at first doesn't work. Open your Chrome developer tools to the Network tab, and you'll notice that Chrome is automatically sending an OPTIONS call (REST verb) proactively to your server before it performs the POST. This is called *[preflighting](https://fetch.spec.whatwg.org/#cors-preflight-fetch)*. It's a security precaution browsers take when performing cross-origin requests.

* Update your server.js to also check for an OPTIONS method
* Have the reponse from the OPTIONS method set the following headers:
    * `'Access-Control-Allow-Origin': '*'`
    * `'Access-Control-Allow-Methods': 'OPTIONS, GET, POST'`
    * `'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'`

Now your POST requests should work from Chrome

#### Step 4: Timestamps
Now that we have basic functionality, let's do some server-side data manipulation. We want to display a timestamp next to each message and display that timestamp on our front-end. To do this we'll first need to change our `messages` array of strings to an array of objects, with one property being `time` and the other being `message`. Because of this change, we'll need to make some adjustments to our existing code, both front and back-end.

The front end will be fastest, all we need is to change our HTML to accept objects. Let's change our `ng-repeat` div to look something like this:
```html
<div ng-repeat="message in messages track by $index">{{message.message}} : {{message.time}}</div>
```
This is the only front-end change we need to make! Now we just need to add dates on our back-end, which is as easy as changing what we push to our messages array. Instead of pushing `req.body.message` alone, let's create a new object and push that to the `messages` array. The object should have a `message` property and a `time` property.
```javascript
messages.push({
  message: req.body.message,
  time: new Date()
});
```

As easy as that, we've added new data on our back-end and passed it back to our front-end. You may have noticed that the date is displaying poorly. Look up the Angular documentation for the 'date' filter and try to set it up so that it shows something along the lines of '5:22 PM'.

#### Step 5 (Black Diamond): Adding more data
Try adding some more sophistication to your chat client, such as a username or profile picture. Allow the user to specify their username when posting a message.
