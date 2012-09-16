error    = require './error'

class NetworkLayer
  constructor:    (socket, sockets)  ->
    this.socket  = socket
    this.sockets = sockets

  tagMessage:     (message)          -> 
    message['author-id'] = this.socket.handshake.sessionId
    message['served-at'] = (new Date()).getTime()
    message

  getClientRoom:  ()                 ->
    rooms  = this.sockets.manager.roomClients[this.socket.id]
    result = ""
    result += roomId for roomId,bool of rooms when roomId isnt ""
    result.replace('/', '')

  broadcast:      (name, data, include)       -> 
    room = this.getClientRoom()
    this.socket.broadcast.to(room).emit(name, data)
    if(include is yes)
      this.socket.emit(name, data)

  sendRoomJoined: ()                 -> 
    this.broadcast('room-joined', this.tagMessage({}), false)

  sendRoomLeft:   ()                 -> 
    this.broadcast('room-left',   this.tagMessage({}), false)

  sendSync:    (data)                ->
    this.broadcast('sync', this.tagMessage(data), false)

  sendStartGame: () ->
    this.broadcast('start-game', this.tagMessage({}), true)

class ServerAction
  maxRoomSize: () -> 2

  constructor: (server, sockets) ->
    this.server  = server
    this.sockets = sockets

  getClientAmount: (roomId) -> 
    this.sockets.clients(roomId).length

  joinRoom: (socket, roomId) ->
    clients = this.getClientAmount(roomId)
    if clients < this.maxRoomSize()
      if clients == 0
        this.server.startGame(roomId)
        socket.join(roomId)
      else if this.server.getGame(roomId).getState() is GameState.WAITING
        socket.join(roomId)
        networkLayer = new NetworkLayer(socket, this.sockets)
        networkLayer.sendRoomJoined()
        if clients + 1 == this.maxRoomSize()
          this.server.getGame(roomId).setState(GameState.PLAYING)
          networkLayer.sendStartGame()
      else
        err = new error.ServerError("Game not ready", error.code.gameNotReady);
        socket.emit('error', err.toObject())
        socket.disconnect();
    else 
      err = new error.ServerError("Room " + roomId + " is full", error.code.roomFull);
      socket.emit('error', err.toObject())
      socket.disconnect();
  
  openGame:    (socket, map) ->
    networkLayer = new NetworkLayer(socket, this.sockets)
    roomId  = networkLayer.getClientRoom()
    this.server.getGame(roomId).setState(GameState.WAITING)
    this.server.getGame(roomId).setMap(map)

  synchronize: (socket, data) ->
    networkLayer = new NetworkLayer(socket, this.sockets)
    networkLayer.sendSync(data)

  disconnect:  (socket) ->
    networkLayer = new NetworkLayer(socket, this.sockets)
    networkLayer.sendRoomLeft()
    networkLayer = new NetworkLayer(socket, this.sockets)
    roomId  = networkLayer.getClientRoom()
    clients = this.getClientAmount(roomId)
    if clients == 0
      this.server.endGame(roomId)

class Game
  constructor: () ->
    this.state   = GameState.PREPARING
    this.map     = null

  getState: () ->
    return this.state

  setState: (state) ->
    this.state = state

  setMap: (map) ->
    this.map = map

class Server
  constructor: () ->
    this.games = []

  startGame: (roomId) ->
    this.games[roomId] = new Game()

  endGame: (roomId) ->
    delete this.games[roomId]

  getGame: (roomId) ->
    if(typeof this.games[roomId] is 'undefined')
      this.startGame(roomId)
    this.games[roomId]


GameState = {
  PREPARING:   0,
  WAITING:     1,
  PLAYING:     2
}


module.exports.ServerAction = ServerAction
module.exports.Server       = Server