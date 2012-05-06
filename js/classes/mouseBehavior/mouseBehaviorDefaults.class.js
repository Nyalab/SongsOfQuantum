var MouseBehaviorDefaults = Class.extend({
	__construct: function(){
		document.onselectstart = function() { return false; }
	},

	asteroid: function(e) {
	    e.stopPropagation();
	    var asteroid = $(this).data('drawable');
	    
	    GameGlobals.shipManager.order(function(){
	        var ship = $(this).data('drawable');
	        if($(this).hasClass('building')){
		        ship.setRallyOrder({
		            command: "GATHER", 
		            target: asteroid
		        });
	    	}
	    	else{
		        ship.setOrder({
		            command: "GATHER", 
		            target: asteroid
		        });
	    	}
	    });
	},

	ship: function(e) {
	    e.stopPropagation();
	    switch (e.which) {
	        case 1:
	            if($(this).hasClass('controllable')){
	                GameGlobals.shipManager.pick($(this).data('drawable'));     
	                GameGlobals.gui.menu.applySelection($('.selected'));
	            }
	            
	            break;
	        case 2:
	            // middle
	            break;
	        case 3:
	            var target = $(this).data('drawable');
	            if($(this).hasClass('controllable')){
	                GameGlobals.shipManager.order(function(){
	                    var ship = $(this).data('drawable');
	                    ship.setOrder({
	                        command: "ATTACK",
	                        target: target
	                    });
	                });
	            }
	            break;
	        default:
	            alert('You have a strange mouse');
	    }
	},

	building: function(e) {
	    e.stopPropagation();
	    switch (e.which) {
	        case 1:
	            if($(this).hasClass('controllable')){
	                GameGlobals.shipManager.pick($(this).data('drawable'));   
	                GameGlobals.gui.menu.applySelection($('.selected'));
	            }
	            
	            break;
	        case 2:
	            // middle
	            break;
	        case 3:

	            break;
	        default:
	            alert('You have a strange mouse');
	    }
	}, 

	viewport: function(e) {
	    switch (e.which) {
	        case 1:
	            Cursor.setNoCursor();
	            GameGlobals.shipManager.clearSelection();
	            GameGlobals.gui.menu.applySelection([]);
	            // We pass the coordinates of the cursor
				Cursor.beginSelection(e.pageX,e.pageY)
	            break;
	        case 2:
	            // middle
	            break;
	        case 3:
	            Cursor.clickEffect(e);
	            
	            var localX = e.pageX - $(GameGlobals.viewport).offset().left;
	            var localY = e.pageY - $(GameGlobals.viewport).offset().top;
	            
	            
	            GameGlobals.shipManager.order(function(){
	                var ship = $(this).data('drawable');

			        if($(this).hasClass('building')){
				        ship.setRallyOrder({
		                    command: "MOVE", 
		                    target: Vector.create([localX, localY])
				        });
			    	}
			    	else{
		                ship.setOrder({
		                    command: "MOVE", 
		                    target: Vector.create([localX, localY])
		                });
			    	}

	            });
	            break;
	        default:
	            alert('You have a strange mouse');
	    }
	},

	mouseMove: function(e) {
        Cursor.mouseX = e.pageX;
        Cursor.mouseY = e.pageY;
    },

	releaseClick:  function(e) {
        switch (e.which) {
            case 1:
                Cursor.endSelection();
                break;
            case 2:
                // middle
                break;
            case 3:
                break;
            default:
                alert('You have a strange mouse');
        }
    }
});