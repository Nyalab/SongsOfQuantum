var Explosion = Drawable.extend({

    __construct: function(x, y, duration, radius, strength){
        var id = "explosion_" + Guid.generate();
        this._super(id, 0, x, y, "");
        this.radius = radius;

         this.setRenderer('map', function(drawable){

         	var div = $('<div />')
         		.addClass('explosion')
         		.css('border', strength +'px solid white')
         		.css('width', 0 + 'px')
         		.css('height', 0 + 'px')
         		.css('border-radius', strength*2 + 'px')
                .css('position', 'absolute')
                .css('left', drawable.x - strength + 'px')
                .css('top', drawable.y - strength + 'px').animate({
                    opacity: 0,
                    width: '+=' + radius,
                    height: '+=' + radius,
                    left: '-=' + radius/2,
                    top: '-=' + radius/2,
                    'border-radius': '+=' + radius
                  }, duration, 'easeOutQuart');

                return div;
         });
    }

});