var Explosion = Drawable.extend({

    __construct: function(id, x, y, radius){
        this._super(id, 0, x, y, "");
        this.radius = radius;

         this.setRenderer('map', function(drawable){

         	var div = $('<div />')
         		.addClass('explosion')
         		.css('border', '5px solid white')
         		.css('width', 0 + 'px')
         		.css('height', 0 + 'px')
         		.css('border-radius', 10 + 'px')
                .css('position', 'absolute')
                .css('left', drawable.x - 5 + 'px')
                .css('top', drawable.y - 5 + 'px').animate({
                    opacity: 0,
                    width: '+=50',
                    height: '+=50',
                    left: '-=25',
                    top: '-=25',
                    'border-radius': '+=50'
                  }, 1000, function() {
                    // Animation complete.
                  });



                return div;
         });
    }

});