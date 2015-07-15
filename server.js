var http = require("http");
var ContextIO = require('contextio');
var express = require("express");

var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

var EMAIL = "bajabob.tx@gmail.com";
var ID = "559acaf250eeb4b6208b4569";


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());



var port = process.env.PORT || 8888;

 
 var ctxioClient = new ContextIO.Client('2.0', {
    key: "77dlwft1",
    secret: "C43lwCkZjM12MMiF"
  });

router.get('/messages', function(request, response) {

  var names = [];
  ctxioClient.accounts(ID).contacts().get({limit:250, sort_by: "count", sort_order: "desc"}, 
    function ( err, response) {
      if(err) throw err;
      
      console.log("getting responses...");
      var contacts = response.body;
      var matches = contacts.matches;

      
      for (var i = 0; i < matches.length; i++){
        names.push(matches[i].name);
        matches[i].email;
      }     
  });

  response.json({matches : names});
});


app.use('/api', router);
app.listen(port);
console.log("Magic happens on port " + port);


