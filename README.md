chatty
======

The start of the messaging client for DevMountain

##Objectives
You're going to use Node.js to build a basic, REST-based chat server. You'll also plug in the basic front end Angular aspects of the project to make a fully functioning application. Your first **full stack** application!

###Step 1: Create the Server (GET)
Since we aren't worried about persistently storing information in a chat server (OK, you probably would want to do that in a real application for archival purposes, but anyway), your understanding of Node.js and REST will allow you to create a server that will post and retrieve messages (the C & R verbs of CRUD) for a chatroom.
* In server.js, import the 'http' module and use the `createServer` method to listen on a port of your choosing (probably something between 8000 and 12000).
* Create an array for storing your messages temporarily. You could call it `messages`.
* Write your callback to the createServer method, remembering that it will be passed both a request and response parameter
* Examine the request to see which REST verb was used (check the `method` property of the request param).
* If the method is GET, return the messages array (JSON stringified) in the response. 
  * Dont forget to set the appropriate headers for `Content-type` and `Access-Control-Allow-Origin`
* To test your server, run it (`node server.js`) and use cURL, Postman, or jQuery to make a GET request to your server. Try putting in some pre-filled messages into your array to make sure it's returning data the way you expect.

###Step 2: Create the POST part of your server
You're going to need to do a little bit of work to get the request data. It's easy to think that we could grab the data from a property like request.body or something, but what if we were uploading entire files to this endpoint? The file would need to be sent in pieces or chunks, and so servers have to be built to get data in stages. 

With node, the way you get those chunks of data is to watch for two events on the request object, like so:

```javascript
 http.createServer(function(request, response) {
  if (request.method == 'POST') {
   var postData = '';
   request.on('data', function(chunk) {
    postData += chunk.toString();
   });
   request.on('end', function() {
    console.log("Got POST data:");
    console.log(JSON.parse(postData));
   });
  }
 }
```

In the future with Express, this will be much easier. Here are the next to-dos:
* If the request method is POST, add the message to your messages array, retrieving it from the request JSON body (see paragraph above). Make sure you end the response with a status, headers, and a body.
* Test your server setup using Postman to add a new message via POST (make sure you use a "raw" request of type JSON)

###Step 3: Finish the angular client
* Fill in the required directives for ng-app, ng-controller (MesssageController.js is already provided for you)
* Create an app variable in app.js that represents your Angular app. Call the app `Chatty`.
* Create your controller in MessageController.js that uses $http.get to retrieve the messages from your server and assigns them to a scope variable
* Use the ng-repeat directive to create chat div elements in the div.messages element so that you can display the messages from the server

###Step 4: User input
* Attach an ng-model to the text input on the page. 
* Utilize the ng-enter directive to call a method on the MessageController when the 'enter' key is pressed while focusing on the input. e.g. `ng-enter="addMessage()"`
* Create the corresponding method in your controller's scope (in the example previously, `addMessage`)
* Your method will need to do a $http.post (which is very similar to $http.get except that it also sends data) and send the message data from your ng-model on the input up to your server.
* In the success callback, clear the ng-model and initiate the $http.get again to refresh the message list
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
 
