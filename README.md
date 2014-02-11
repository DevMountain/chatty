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
* The MessageCtrl is already provided, as is the MessageService
* Connect the MessageCtrl to the main.html view as an ng-controller
* Populate the MessageService with a `getMessages` method that returns a promise which retrieves the chat messages for the app (Look at the "Team TMNT" project for reference)
* Add the service to MessageController.js, and call the `getMessages` method, populating the scope var on the `then` from the promise.

```javascript
$scope.messages = MessageService.getMessages().then(function(data) {
  $scope.messages = data;
});
```

* Use the ng-repeat directive to create div elements for every message so that you can display the messages from the server

###Step 4: User input
* Create a text input field and attach an ng-model to it.
* Utilize the ng-enter directive to call a method on the MessageController when the 'enter' key is pressed while focusing on the input. e.g. `ng-enter="addMessage()"`
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
 
