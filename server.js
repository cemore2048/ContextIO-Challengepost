var http = require("http");
var ContextIO = require('contextio');

var EMAIL = "bajabob.tx@gmail.com";
var ID = "559acaf250eeb4b6208b4569";

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write();
  response.end();
}).listen(8888);


 
 var ctxioClient = new ContextIO.Client('2.0', {
    key: "77dlwft1",
    secret: "C43lwCkZjM12MMiF"
  });



  var emailArray = {};

  ctxioClient.accounts(ID).contacts().get({limit:250, sort_by: "count", sort_order: "desc"}, function ( err, response) {
    if(err) throw err;
    
    console.log("getting responses...");
    var contacts = response.body;
    var matches = contacts.matches;

    console.log("getting queries");
    console.log(contacts.query);

    console.log("Matches email");
    for (var i = 0; i < matches.length; i++){
      console.log(matches[i].email);
      console.log(matches[i].name)
      console.log("Sent to : " + matches[i].sent_count.toString());
      console.log("Sent received : " + matches[i].received_count.toString());

    }
    




  	
  });

