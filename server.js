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
//helper functions

var timeFormat = function(time){
  var date = new Date(time*1000);
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  return month + "/" + day + "/" + year;

}

router.get('/messages',  function(request, res) {

  var dateArray = [];
  var count = 0;
  //while(count == 250){
    ctxioClient.accounts(ID).messages().get({limit: 100},
    function ( err, response) {
      if(err) throw err;
      
      console.log("getting responses...");
      var date = response.body;
      console.log(date[0].date);

      
      
      for (var i = 0; i < date.length; i++){
        dateArray.push(timeFormat(date[i].date));
        
      }   

      console.log(dateArray);
      res.json({date : dateArray});  
  });
  //}  
});


app.use('/api', router);
app.listen(port);
console.log("Magic happens on port " + port);




