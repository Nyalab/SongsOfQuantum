// Generated by CoffeeScript 1.3.3
(function() {
  var Game, GameState, NetworkLayer, Server, ServerAction, error;

  error = require('./error');

  NetworkLayer = (function() {

    function NetworkLayer(socket, sockets) {
      this.socket = socket;
      this.sockets = sockets;
    }

    NetworkLayer.prototype.tagMessage = function(message) {
      message['author-id'] = this.socket.handshake.sessionId;
      message['served-at'] = (new Date()).getTime();
      return message;
    };

    NetworkLayer.prototype.getClientRoom = function() {
      var bool, result, roomId, rooms;
      rooms = this.sockets.manager.roomClients[this.socket.id];
      result = "";
      for (roomId in rooms) {
        bool = rooms[roomId];
        if (roomId !== "") {
          result += roomId;
        }
      }
      return result.replace('/', '');
    };

    NetworkLayer.prototype.broadcast = function(name, data, include) {
      var room;
      room = this.getClientRoom();
      this.socket.broadcast.to(room).emit(name, data);
      if (include === true) {
        return this.socket.emit(name, data);
      }
    };

    NetworkLayer.prototype.sendRoomJoined = function() {
      return this.broadcast('room-joined', this.tagMessage({}), false);
    };

    NetworkLayer.prototype.sendRoomLeft = function() {
      return this.broadcast('room-left', this.tagMessage({}), false);
    };

    NetworkLayer.prototype.sendSync = function(data) {
      return this.broadcast('sync', this.tagMessage(data), false);
    };

    NetworkLayer.prototype.sendStartGame = function() {
      return this.broadcast('start-game', this.tagMessage({}), true);
    };

    return NetworkLayer;

  })();

  ServerAction = (function() {

    ServerAction.prototype.maxRoomSize = function() {
      return 2;
    };

    function ServerAction(server, sockets) {
      this.server = server;
      this.sockets = sockets;
    }

    ServerAction.prototype.getClientAmount = function(roomId) {
      return this.sockets.clients(roomId).length;
    };

    ServerAction.prototype.joinRoom = function(socket, roomId) {
      var clients, err, networkLayer;
      clients = this.getClientAmount(roomId);
      if (clients < this.maxRoomSize()) {
        if (clients === 0) {
          this.server.startGame(roomId);
          return socket.join(roomId);
        } else if (this.server.getGame(roomId).getState() === GameState.WAITING) {
          socket.join(roomId);
          networkLayer = new NetworkLayer(socket, this.sockets);
          networkLayer.sendRoomJoined();
          if (clients + 1 === this.maxRoomSize()) {
            this.server.getGame(roomId).setState(GameState.PLAYING);
            return networkLayer.sendStartGame();
          }
        } else {
          err = new error.ServerError("Game not ready", error.code.gameNotReady);
          socket.emit('error', err.toObject());
          return socket.disconnect();
        }
      } else {
        err = new error.ServerError("Room " + roomId + " is full", error.code.roomFull);
        socket.emit('error', err.toObject());
        return socket.disconnect();
      }
    };

    ServerAction.prototype.openGame = function(socket, map) {
      var networkLayer, roomId;
      networkLayer = new NetworkLayer(socket, this.sockets);
      roomId = networkLayer.getClientRoom();
      this.server.getGame(roomId).setState(GameState.WAITING);
      return this.server.getGame(roomId).setMap(map);
    };

    ServerAction.prototype.synchronize = function(socket, data) {
      var networkLayer;
      networkLayer = new NetworkLayer(socket, this.sockets);
      return networkLayer.sendSync(data);
    };

    ServerAction.prototype.disconnect = function(socket) {
      var clients, networkLayer, roomId;
      networkLayer = new NetworkLayer(socket, this.sockets);
      networkLayer.sendRoomLeft();
      networkLayer = new NetworkLayer(socket, this.sockets);
      roomId = networkLayer.getClientRoom();
      clients = this.getClientAmount(roomId);
      if (clients === 0) {
        return this.server.endGame(roomId);
      }
    };

    return ServerAction;

  })();

  Game = (function() {

    function Game() {
      this.state = GameState.PREPARING;
      this.map = null;
    }

    Game.prototype.getState = function() {
      return this.state;
    };

    Game.prototype.setState = function(state) {
      return this.state = state;
    };

    Game.prototype.setMap = function(map) {
      return this.map = map;
    };

    return Game;

  })();

  Server = (function() {

    function Server() {
      this.games = [];
    }

    Server.prototype.startGame = function(roomId) {
      return this.games[roomId] = new Game();
    };

    Server.prototype.endGame = function(roomId) {
      return delete this.games[roomId];
    };

    Server.prototype.getGame = function(roomId) {
      if (typeof this.games[roomId] === 'undefined') {
        this.startGame(roomId);
      }
      return this.games[roomId];
    };

    return Server;

  })();

  GameState = {
    PREPARING: 0,
    WAITING: 1,
    PLAYING: 2
  };

  module.exports.ServerAction = ServerAction;

  module.exports.Server = Server;

}).call(this);
