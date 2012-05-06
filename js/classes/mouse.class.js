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
		$('body').on('mousedown', '#mouseSelection', this.currentState.viewport);
		$('body').on('mousemove', '#viewport', this.currentState.mouseMove);
		$('body').on('mousemove', '#mouseSelection', this.currentState.mouseMove);
		$('body').on('mouseup', '#viewport', this.currentState.releaseClick);
		$('body').on('mouseup', '#mouseSelection', this.currentState.releaseClick);
	}

});