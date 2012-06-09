var Asteroid = Entity.extend({
    __construct: function(id, x, y){
        this._super(id, 0, x, y, 'images/bodies/asteroid.png', 5);
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
    },

    die: function(){


        var complexExplosion = new ComplexExplosion(this.x, this.y, 2000, 50, 3, 10);
        complexExplosion.draw('map').appendTo(GameGlobals.viewport);

        this._super();
    }
});