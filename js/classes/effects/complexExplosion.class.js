var ComplexExplosion = Drawable.extend({

    __construct: function(x, y, duration, radius, strength, clusters){
        var id = "explosion_" + Guid.generate();
        this._super(id, 0, x, y, "");
        this.radius = radius;

         this.setRenderer('map', function(drawable){
         	var div = $('<div />');

         	var coreRadius = radius/2;

	        for(var i = 0; i < clusters; i++){
	            var x = drawable.x-coreRadius/2 + Math.random()*coreRadius;
	            var y = drawable.y-coreRadius/2 + Math.random()*coreRadius;
	            var expl = new Explosion(x, y, duration/2, radius/4, strength/3);
	            expl.draw('map').appendTo(div);
	        }

	        GameGlobals.sound.play('explosion');

	        setTimeout(function(){
	            var explosion = new Explosion(drawable.x, drawable.y, duration, radius, strength);
	            explosion.draw('map').appendTo(div);
	        }, 0);

            return div;
         });
    }

});