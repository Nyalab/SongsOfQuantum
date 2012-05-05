var Mouse = Class.extend({
	__construct: function(){
		this.currentState = null;
	},

	clearState: function(){
		$('body').off('mousedown', '.asteroid', this.currentState.asteroid);
		$('body').off('mousedown', '.ship', this.currentState.ship);
		$('body').off('mousedown', '.building', this.currentState.building);
		$('body').off('mousedown', '#viewport');
	},

	setState: function(MouseBehaviorClass, options){

		if(MouseBehaviorClass == null){
			MouseBehaviorClass = MouseBehaviorDefaults;
		}

		if(typeof(options) == 'undefined'){
			options = {};
		}

		if(this.currentState != null){
			this.clearState();
		}

		this.currentState = new MouseBehaviorClass(options);

		$('body').on('mousedown', '.asteroid', this.currentState.asteroid);
		$('body').on('mousedown', '.ship', this.currentState.ship);
		$('body').on('mousedown', '.building', this.currentState.building);
		$('body').on('mousedown', '#viewport', this.currentState.viewport);
	}

});