var Asteroid = Entity.extend({
    __construct: function(id, x, y){
        this._super(id, 0, x, y, 'images/bodies/asteroid.png', 50);
        this.flag('asteroid');
        this.properties = {
        	name: "Asteroid"
        }
        this.currentMiner = null;
        this.free();
    },

    isFree: function(){
    	return this.currentMiner == null;
    },

    getMiner: function(){
    	return this.currentMiner;
    },

    occupy: function(miner){
    	this.unflag('free');
    	this.currentMiner = miner;
    },

    free: function(){
    	this.flag('free');
    	this.currentMiner = null;
    }
});