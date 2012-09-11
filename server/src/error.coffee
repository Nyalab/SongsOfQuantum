# Error codes:
# 101 - Room is full

class ServerError extends Error 
	constructor: (@message, @code) ->

	getCode:     () -> this.code
	getMessage:  () -> this.message 
	toObject:    () -> {'code': this.code, 'message': this.message}

module.exports.ServerError = ServerError
module.exports.code = {
	roomFull: 101
}