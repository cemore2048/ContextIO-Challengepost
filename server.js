var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);

var ContextIO = require('contextio');
  var ctxioClient = new ContextIO.Client({
    key: "77dlwft1",
    secret: "C43lwCkZjM12MMiF"
  });

