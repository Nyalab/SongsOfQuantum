# Including dependencies
http    	   = require 'http'
fs      	   = require 'fs'
io 			   = require 'socket.io'
ServerAction   = require './server'


# We will serve this file when browsed.
htmlEntryPoint = http.createServer (req, res) ->
					fs.readFile '../test/index.html', 'utf-8', (error, content) ->
						res.writeHead 200, {'Content-Type' : 'text/html'}
						res.end content

# All the other requests are delegated to socket.io
network        = io.listen htmlEntryPoint;

# On connection, we will send some data to the client.
network.sockets.on 'connection', (socket) ->
  socket.on 'initialize', (data) ->
  	action = new ServerAction network.sockets
  	try
  		action.joinRoom socket, data.roomId
  		network.sockets.in(data.roomId).emit('room-joined', {})
  	catch error
  		socket.emit('room-deny', error.toObject())
  		console.log(error)

# Then we start the app.
htmlEntryPoint.listen 80;