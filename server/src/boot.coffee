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
gameServer     = new server.Server()

network.set 'authorization', (data, accept) ->
  data.sessionId = Math.round(Math.random()*10000)
  accept(null, true);


# On connection, we will send some data to the client.
network.sockets.on 'connection', (socket) ->
  # On initialize, we bind the socket to a room
  socket.on 'initialize', (data) ->
  	action = new server.ServerAction gameServer, network.sockets
  	action.joinRoom socket, data.roomId

  # On disconnect, the room is left
  socket.on 'disconnect', (data) ->
    action = new server.ServerAction gameServer, network.sockets
    action.disconnect socket

  socket.on 'sync', (data) ->
    action = new server.ServerAction gameServer, network.sockets
    action.synchronize socket, data

  socket.on 'open-game', (data) ->
    action = new server.ServerAction gameServer, network.sockets
    action.openGame socket, data.map

# Then we start the app.
htmlEntryPoint.listen 80;