error    = require './error'

class ServerAction
  maxRoomSize: () -> 2

  constructor: (@sockets) ->

  getClientAmount: (roomId) -> @sockets.clients(roomId).length

  joinRoom: (socket, roomId) ->
    clients = this.getClientAmount(roomId)
    if clients < this.maxRoomSize()
      socket.join(roomId)
      this.sockets.in(roomId).emit('room-joined', {'id': socket.sessid})
    else 
      err = new error.ServerError("Room " + roomId + " is full", error.code.roomFull);
      socket.emit('error', err.toObject())
      socket.disconnect();

  disconnect: (socket) ->
    rooms = @sockets.manager.roomClients[socket.id]
    this.sockets.in(room).emit('room-left', {'id': socket.sessid}) for room in rooms

class Room 

module.exports.ServerAction = ServerAction
module.exports.Room = Room