var MouseBehaviorPlacebuilding = Class.extend({
	__construct: function(options){
		this.options = options;
	},

	asteroid: function(e) {

	},

	ship: function(e) {

	},

	building: function(e) {

	}, 

	viewport: function(e) {
	    switch (e.which) {
	        case 1: // left click, place the build
	        	var options = GameGlobals.mouse.currentState.options;

	            var localX = e.pageX - $(GameGlobals.viewport).offset().left;
	            var localY = e.pageY - $(GameGlobals.viewport).offset().top;
	            
				GameGlobals.shipManager.order(function(){
	                var ship = $(this).data('drawable');
	                ship.setOrder({
	                    command: options.command,
	                    build: options.build,
	                    target: Vector.create([localX, localY])
	                });
	            });

	            GameGlobals.mouse.setState(MouseBehaviorDefaults);
	            break;
	        case 2:
	            // middle
	            break;
	        case 3: // right click, cancels the build
	            GameGlobals.mouse.setState(MouseBehaviorDefaults , null);
	            break;
	        default:
	            alert('You have a strange mouse');
	    }
	}
});