var MouseBehaviorDefaults = Class.extend({
	__construct: function(){
		document.onselectstart = function() { return false; }
	},


	/*
	 * Mouse default action when clicking an asteroid.
	 * [Right button] Sends all miners to it
	 * [Right button] Sets rally order to it for buildings.
	 */
	asteroid: function(e) {
	    e.stopPropagation();
	    switch (e.which) {
	    	case 1:
	    		GameGlobals.gui.menu.applySelection($(this));
	    	break;
	        case 3:
			    var asteroid = $(this).data('drawable');
			    var order = { command: "GATHER", target: asteroid };
			    GameGlobals.shipManager.applyToEach(function(){
			        var ship = $(this).data('drawable');
			        if(ship instanceof Building){
				        ship.setRallyOrder(order);
			    	}
			    	else{
				        ship.setOrder(order);
			    	}
			    });
			break;
			default:
		}
	},

	/*
	 * Mouse default action when clicking a ship.
	 * 
	 * [Left button] If controllable, selects it.
	 * [Right button] If ennemy, attacks it.
	 */
	ship: function(e) {
	    e.stopPropagation();
	    switch (e.which) {
	        case 1:
	            if($(this).hasClass('controllable')){
	                GameGlobals.shipManager.pick($(this).data('drawable'));     
	                GameGlobals.gui.menu.applySelection($('.selected'));
	            }
	            
	            break;
	        case 3:
	            var target = $(this).data('drawable');
	            if($(this).hasClass('controllable')){
	                GameGlobals.shipManager.applyToEach(function(){
	                    var ship = $(this).data('drawable');
	                    if(ship instanceof Ship){
		                    ship.setOrder({
		                        command: "ATTACK",
		                        target: target
		                    });
	                	}
	                });
	            }
	            break;
	        default:
	    }
	},

	/*
	 * Mouse default action when clicking a building.
	 * 
	 * [Left button] If controllable, selects it.
	 */
	building: function(e) {
	    e.stopPropagation();
	    switch (e.which) {
	        case 1:
	            if($(this).hasClass('controllable')){
	                GameGlobals.shipManager.pick($(this).data('drawable'));   
	                GameGlobals.gui.menu.applySelection($('.selected'));
	            }
	            
	            break;
	        case 3:

	            break;
	        default:
	    }
	}, 

	/*
	 * Mouse default action when clicking the viewport.
	 * 
	 * [Left button] Empty the list of selected units.
	 * [Right button] Orders the selected units to move here.
	 * [Right button] Orders the selected building to send their production here.
	 */
	viewport: function(e) {
	    switch (e.which) {
	        case 1:
	            Cursor.setNoCursor();
	            GameGlobals.shipManager.clearSelection();
	            GameGlobals.gui.menu.applySelection([]);
	            // We pass the coordinates of the cursor
				Cursor.beginSelection(e.pageX,e.pageY)
	            break;
	        case 3:
	            Cursor.clickEffect(e);
	            
	            var localX = e.pageX - $(GameGlobals.viewport).offset().left;
	            var localY = e.pageY - $(GameGlobals.viewport).offset().top;
	            
	            
	            GameGlobals.shipManager.applyToEach(function(){
	                var ship = $(this).data('drawable');

			        if(ship instanceof Building){
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
        }
    }
});