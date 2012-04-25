var Asteroid = Drawable.extend({
    __construct: function(id, x, y){
        this.minerals = 1500;
        this._super(id, 0, x, y, 'images/bodies/asteroid.png');
        this.flag('asteroid');
    }
});