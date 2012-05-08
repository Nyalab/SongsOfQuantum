var Asteroid = Entity.extend({
    __construct: function(id, x, y){
        this._super(id, 0, x, y, 'images/bodies/asteroid.png', 300);
        this.flag('asteroid');
        this.properties = {
        	name: "Asteroid"
        }
    }
});