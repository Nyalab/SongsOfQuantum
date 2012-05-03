var Mouse = Class.extend({
	__construct: function(){

	},

	clearState: function(){
		$('.asteroid').unbind('mousedown');
		$('.ship').unbind('mousedown');
		$('.building').unbind('mousedown');
		$('#viewport').unbind('mousedown');
	},

	setState: function(MouseBehaviorClass, options){
		if(MouseBehaviorClass == null){
			MouseBehaviorClass = MouseBehaviorDefaults;
		}

		var mouseBehavior = new MouseBehaviorClass(options);

		this.clearState();

		$('.asteroid').mousedown(mouseBehavior.asteroid);
		$('.ship')    .mousedown(mouseBehavior.ship);
		$('.building').mousedown(mouseBehavior.building);
		$('#viewport').mousedown(mouseBehavior.viewport);
	}

});