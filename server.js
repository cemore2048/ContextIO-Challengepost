var http = require('http');
var ContextIO = require('contextio');
var express = require("express");

var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

var ID = "55c575eafe17e8cd1b8b4575";

//commmit

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname+ '/bower_components'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8887;


var ctxioClient = new ContextIO.Client('2.0', {
    key: "js9ki9z3",
    secret: "O9yn28hmhxzBgTnn"
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

router.param('e', function(req, res, next, e){
  req.email = e;
  next();
});

router.param('email', function(req, res, next, email){
  req.emailAdd = email;
  next();
});
//nconf

router.post('/add', function(req, res){
  var emailAdd = reqest.body.text;

  ctxioClient.accounts(ID).connect_tokens().post({callback_url: "/content.html", email: emailAdd},
    function(err, response){
      console.log("this was the post response: " + response.body);
    });
});

router.get('/messages/:email', function(request, res){
  res.set("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");

  var email = request.params.email;

  var myJSONResponse = [];

  ctxioClient.accounts(ID).messages().get({limit: 100, from: email},
    function(err, response){
      myJSONResponse.push(response.body);
        res.json(response.body);
    });
});

router.get('/contacts/:offset?', function(request, res){

  res.set("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");

  var offset = request.params.offset || 0;
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
    res.json({contacts: myJSONResponse});
  });
});

app.use('/api', router);
app.listen(port);

console.log("Magic happens on port " + port);
