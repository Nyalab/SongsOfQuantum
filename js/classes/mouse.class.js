var Mouse = Class.extend({

	selectionId: "mouseSelection",
	selectionLoop: false, // to know if we are currently doing a selection
	originalSelectionX: 0,
    originalSelectionY: 0,
    lastKnownX: 0,
    lastKnownY: 0,

	__construct: function(){
		this.currentState = null;
	},

	clearState: function(){
		$('body').off('mousedown', '.asteroid', this.currentState.asteroid);
		$('body').off('mousedown', '.ship', this.currentState.ship);
		$('body').off('mousedown', '.building', this.currentState.building);

		$('body').off('mousedown', '#viewport');
        $('body').off('mousemove', '#viewport');
        $('body').off('mouseup', '#viewport');

        $('body').off('mousedown', '#mouseSelection');
        $('body').off('mousemove', '#mouseSelection');
        $('body').off('mouseup', '#mouseSelection');
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
        $('body').on('mousemove', '#viewport', this.currentState.mouseMove);
		$('body').on('mouseup', '#viewport', this.currentState.releaseClick);

        $('body').on('mousedown', '#mouseSelection', this.currentState.viewport);
        $('body').on('mousemove', '#mouseSelection', this.currentState.mouseMove);
		$('body').on('mouseup', '#mouseSelection', this.currentState.releaseClick);

	},

	beginSelection: function(x, y) {

		// Store coordinates
        this.originalSelectionX = this.lastKnownX = x;
        this.originalSelectionY = this.lastKnownY = y;

        GameGlobals.cursor.renderSelection();

        this.selectionLoop = setInterval(this.loopSelection, 50);
    },

    loopSelection: function() {
        if((GameGlobals.mouse.lastKnownX == GameGlobals.cursor.mouseX) && (GameGlobals.mouse.lastKnownY == GameGlobals.cursor.mouseY))
            return false;

        var Xdiff = GameGlobals.cursor.mouseX - GameGlobals.mouse.originalSelectionX;
        var Ydiff = GameGlobals.cursor.mouseY - GameGlobals.mouse.originalSelectionY;
        
        if(Xdiff > 0)
        {
            $("#" + GameGlobals.mouse.selectionId).css('left', GameGlobals.mouse.originalSelectionX);
            $("#" + GameGlobals.mouse.selectionId).css('width', Xdiff + "px");
        }
        else
        {
            $("#" + GameGlobals.mouse.selectionId).css('left', parseInt(GameGlobals.mouse.originalSelectionX) + parseInt(Xdiff));
            $("#" + GameGlobals.mouse.selectionId).css('width', parseInt(Xdiff*-1) + "px");
        }

        if(Ydiff > 0)
        {
            $("#" + GameGlobals.mouse.selectionId).css('top', GameGlobals.mouse.originalSelectionY);
            $("#" + GameGlobals.mouse.selectionId).css('height', Ydiff + "px");
        }
        else
        {
            $("#" + GameGlobals.mouse.selectionId).css('top', parseInt(GameGlobals.mouse.originalSelectionY) + parseInt(Ydiff));
            $("#" + GameGlobals.mouse.selectionId).css('height', parseInt(Ydiff*-1) + "px");
        }

        GameGlobals.mouse.lastKnownX = GameGlobals.cursor.mouseX;
        GameGlobals.mouse.lastKnownY = GameGlobals.cursor.mouseY;

        $('document').disableSelection();
    },

    endSelection: function(){

        clearInterval(this.selectionLoop);

        this.originalSelectionX = 0;
        this.originalSelectionY = 0;
        this.lastKnownX = 0;
        this.lastKnownY = 0;

        GameGlobals.cursor.eraseSelection();
    }

});