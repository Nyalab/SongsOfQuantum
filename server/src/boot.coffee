# Including dependencies
http    	   = require 'http'
fs      	   = require 'fs'
io 			     = require 'socket.io'
server       = require './server'



# We will serve this file when browsed.
htmlEntryPoint = http.createServer (req, res) ->
					fs.readFile '../test/index.html', 'utf-8', (error, content) ->
						res.writeHead 200, {'Content-Type' : 'text/html'}
						res.end content

# All the other requests are delegated to socket.io
network        = io.listen htmlEntryPoint;

network.set 'authorization', (data, accept) ->
  data.sessionId = Math.round(Math.random()*10000)
  accept(null, true);


# On connection, we will send some data to the client.
network.sockets.on 'connection', (socket) ->
  # On initialize, we bind the socket to a room
  socket.on 'initialize', (data) ->
  	action = new server.ServerAction network.sockets
  	action.joinRoom socket, data.roomId

  # On disconnect, the room is left
  socket.on 'disconnect', (data) ->
    action = new server.ServerAction network.sockets
    action.disconnect socket

# Then we start the app.
htmlEntryPoint.listen 80;