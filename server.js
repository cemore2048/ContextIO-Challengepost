var http = require('http');
var ContextIO = require('contextio');
var express = require("express");

var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

var ID = "559acaf250eeb4b6208b4569";

//commmit

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8888;


var ctxioClient = new ContextIO.Client('2.0', {
    key: "77dlwft1",
    secret: "C43lwCkZjM12MMiF"
});
//helper functions

//returns an array containing date, and time
var timeFormat = function(time){
  var fullDate;
  var time;
  var date = new Date(time*1000);
  var stateArray = [];

  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  fullDate = month + "/" + day + "/" + year;
  stateArray.push(fullDate);

  var hour = date.getHours();
  var minute = date.getMinutes();

  time = hour + ":" + minute;
  stateArray.push(time);

  return stateArray;
}



router.get('/', function(request, res) {
  res.sendfile('./public/index.html');
});

router.param('off', function(req, res, next, off){
  req.offset = off;
  next();
});

router.get('/messages/:offset?',  function(request, res) {

  res.set("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");

  var offset = request.param.offset || 0;
  var myJSONResponse = [];
  var count = 0;

  ctxioClient.accounts(ID).messages().get({limit: 100, offset: offset},
    function ( err, response) {

      var formattedTime;
      var jsonResponseArray = response.body;
      var gmailId;
      var date;
      if(err) throw err;

      for (var i = 0; i < jsonResponseArray.length; i++){
        formattedTime = timeFormat(jsonResponseArray[i].date)
         jsonResponseArray[i].addresses.from.email;


          var myMessagesObject = {
              from : jsonResponseArray[i].addresses.from.email,
              date : formattedTime[0],
              time : formattedTime[1],
              gmailId : jsonResponseArray[i].gmail_message_id
          }

          myJSONResponse.push(myMessagesObject);
      }
      res.json({messages : myJSONResponse});
  });

});

router.get('/contacts/:offset?', function(request, res){

  res.set("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");

  var offset = request.param.offset || 0;
  var myJSONResponse = [];
  var contacts;
  ctxioClient.accounts(ID).contacts().get({limit: 250, offset:offset,
    sort_by: "count", order:"asc"}, function(err, response){
    contacts = response.body;

    for(var i = 0; i < contacts.matches.length; i++){
      var myContactsObject = {
        name : contacts.matches[i].name,
        email : contacts.matches[i].email,
        count : contacts.matches[i].count,
        received: contacts.matches[i].received_count,
        sent: contacts.matches[i].sent_count,
        pic: contacts.matches[i].thumbnail

      }

      myJSONResponse.push(myContactsObject);

    }
    res.json([myJSONResponse]);
  });
});

app.use('/api', router);
app.listen(port);
console.log("Magic happens on port " + port);
