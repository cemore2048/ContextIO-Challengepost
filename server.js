var http = require("http");
var ContextIO = require('contextio');

var EMAIL = "bajabob.tx@gmail.com";
var ID = "559acaf250eeb4b6208b4569";

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);


 
 var ctxioClient = new ContextIO.Client('2.0', {
    key: "77dlwft1",
    secret: "C43lwCkZjM12MMiF"
  });



  var emailArray = {};
  ctxioClient.accounts(ID).messages().get({limit:10}, function ( err, response) {
  	if(err) throw err;
		
    console.log("getting responses...");
    var messages = response.body;
    console.log(messages.date);

    console.log("message id is " );
    console.log(messages[0].date);






    // for(var i = 0; i < messages.length; i++){
    //   emailArray[i] = messages.message_id;
    //   console.log("body message is ");

        
    // }

    

    for(var j = 0; j < emailArray.length; i++){
        console.log("emails are " + emailArray[i]);
    }
  	


  });

