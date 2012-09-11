// Generated by CoffeeScript 1.3.3
(function() {
  var fs, htmlEntryPoint, http, io, network, server;

  http = require('http');

  fs = require('fs');

  io = require('socket.io');

  server = require('./server');

  htmlEntryPoint = http.createServer(function(req, res) {
    return fs.readFile('../test/index.html', 'utf-8', function(error, content) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      return res.end(content);
    });
  });

  network = io.listen(htmlEntryPoint);

  network.sockets.on('connection', function(socket) {
    socket.on('initialize', function(data) {
      var action;
      action = new server.ServerAction(network.sockets);
      return action.joinRoom(socket, data.roomId);
    });
    return socket.on('disconnect', function(data) {
      var action;
      action = new server.ServerAction(network.sockets);
      return action.disconnect(socket);
    });
  });

  htmlEntryPoint.listen(80);

}).call(this);
