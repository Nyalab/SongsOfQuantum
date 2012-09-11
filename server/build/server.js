// Generated by CoffeeScript 1.3.3
(function() {
  var fs, htmlEntryPoint, http, io, server;

  http = require('http');

  fs = require('fs');

  io = require('socket.io');

  htmlEntryPoint = http.createServer(function(req, res) {
    return fs.readFile('../test/index.html', 'utf-8', function(error, content) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      return res.end(content);
    });
  });

  server = io.listen(app);

  server.sockets.on('connection', function(socket) {
    return socket.emit('news', {
      hello: 'world'
    });
  });

  htmlEntryPoint.listen(80);

}).call(this);
