error    = require './error'

class NetworkLayer
  constructor:    (socket, sockets)  ->
    this.socket  = socket
    this.sockets = sockets
  tagMessage:     (message)          -> 
    message['author-id'] = this.socket.handshake.sessionId
    message['served-at'] = (new Date()).getTime() / 1000
    message
  sendRoomJoined: (roomId)           -> this.sockets.in(roomId).emit('room-joined', this.tagMessage({}))
  sendRoomLeft:   (roomId)           -> this.sockets.in(roomId).emit('room-left',   this.tagMessage({}))

class ServerAction
  maxRoomSize: () -> 2

  constructor: (@sockets) ->

  getClientAmount: (roomId) -> @sockets.clients(roomId).length

  joinRoom: (socket, roomId) ->
    clients = this.getClientAmount(roomId)
    if clients < this.maxRoomSize()
      socket.join(roomId)
      networkLayer = new NetworkLayer(socket, this.sockets)
      networkLayer.sendRoomJoined(roomId)
    else 
      err = new error.ServerError("Room " + roomId + " is full", error.code.roomFull);
      socket.emit('error', err.toObject())
      socket.disconnect();

  disconnect: (socket) ->
    rooms = @sockets.manager.roomClients[socket.id]
    networkLayer = new NetworkLayer(socket, this.sockets)
    networkLayer.sendRoomLeft(roomId.replace('/', '')) for roomId,bool of rooms when roomId isnt ""

class Room 

module.exports.ServerAction = ServerAction
module.exports.Room = Room