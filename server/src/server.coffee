error    = require './error'

class ServerAction
  maxRoomSize: () -> 2

  constructor: (@sockets) ->

  getClientAmount: (roomId) -> @sockets.clients(roomId).length

  joinRoom: (socket, roomId) ->
    clients = this.getClientAmount(roomId)
    if clients < this.maxRoomSize()
      socket.join(roomId)
    else 
      throw new error.ServerError("Room " + roomId + " is full", error.code.roomFull);
    

module.exports = ServerAction