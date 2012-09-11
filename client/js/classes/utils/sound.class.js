var Sound = Class.extend({
	__construct: function(){
		this.sounds = [];
		this.channels = [];

		this.load('explosion', 'sound/effects/explosion01');
	},

	load: function(name, path){
		this.sounds[name] = [];

		for(var i=0; i< 7; i++){
	        this.sounds[name][i] = new buzz.sound( path, {
			    formats: [ "mp3", "ogg"]
			});
			this.sounds[name][i].load();
		}
		this.channels[name] = 0;
	},

	play: function(name){
		var channel = this.channels[name];
		this.sounds[name][(channel++)%7].play();
		this.channels[name] = channel;
	}
});