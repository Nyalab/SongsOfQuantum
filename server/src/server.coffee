# Including dependencies
http    		= require('http')
fs      		= require('fs')
io 				= require('socket.io')

# We will serve this file when browsed.
htmlEntryPoint 	= http.createServer (req, res) ->
					fs.readFile '../test/index.html', 'utf-8', (error, content) ->
						res.writeHead 200, {'Content-Type' : 'text/html'}
						res.end content

# All the other requests are delegated to socket.io
server 			= io.listen app;

# On connection, we will send some data to the client.
server.sockets.on 'connection', (socket) -> socket.emit 'news', { hello: 'world' }

# Then we start the app.
htmlEntryPoint.listen 80;