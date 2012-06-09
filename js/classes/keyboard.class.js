var Keyboard = Class.extend({

	ctrlPressed: false,
	altPressed: false,
	shiftPressed: false,

	ctrlGroup0: [],
	ctrlGroup1: [],
	ctrlGroup2: [],
	ctrlGroup3: [],
	ctrlGroup4: [],
	ctrlGroup5: [],
	ctrlGroup6: [],
	ctrlGroup7: [],
	ctrlGroup8: [],
	ctrlGroup9: [],

	down: function(e) {
        switch (e.keyCode) {
            case 65: // a
                GameGlobals.gui.menu.execButton('11');
                break;
            case 90: // z
                GameGlobals.gui.menu.execButton('12');
                break;
            case 69: // e
                GameGlobals.gui.menu.execButton('13');
                break;
            case 81: // q
                GameGlobals.gui.menu.execButton('21');
                break;
            case 83: // s
                GameGlobals.gui.menu.execButton('22');
                break;
            case 68: // d
                GameGlobals.gui.menu.execButton('23');
                break;
            case 87: // w
                GameGlobals.gui.menu.execButton('31');
                break;
            case 88: // x
                GameGlobals.gui.menu.execButton('32');
                break;
            case 67: // c
                GameGlobals.gui.menu.execButton('33');
                break;
            case 16: // shift	
            	GameGlobals.keyboard.shiftPressed = true;
            	break;
            case 18: // alt	
            	GameGlobals.keyboard.altPressed = true;
            	break;	
          	case 49: // 1
          		if(GameGlobals.keyboard.altPressed) {
          			GameGlobals.keyboard.createCtrlGroup(1);
          		}
          		else {
          			GameGlobals.keyboard.retrieveCtrlGroup(1);
          		}
            	break;	
          	case 50: // 2
          		if(GameGlobals.keyboard.altPressed) {
          			GameGlobals.keyboard.createCtrlGroup(2);
          		}
          		else {
          			GameGlobals.keyboard.retrieveCtrlGroup(1);
          		}
            	break;	
          	case 51: // 3
          		if(GameGlobals.keyboard.altPressed) {
          			GameGlobals.keyboard.createCtrlGroup(3);
          		}
          		else {
          			GameGlobals.keyboard.retrieveCtrlGroup(3);
          		}
            	break;	
        }
	},

	up: function(e) {
        switch (e.keyCode) {
            case 65: // a
                GameGlobals.gui.menu.execButton('11');
                break;
            case 90: // z
                GameGlobals.gui.menu.execButton('12');
                break;
            case 69: // e
                GameGlobals.gui.menu.execButton('13');
                break;
            case 81: // q
                GameGlobals.gui.menu.execButton('21');
                break;
            case 83: // s
                GameGlobals.gui.menu.execButton('22');
                break;
            case 68: // d
                GameGlobals.gui.menu.execButton('23');
                break;
            case 87: // w
                GameGlobals.gui.menu.execButton('31');
                break;
            case 88: // x
                GameGlobals.gui.menu.execButton('32');
                break;
            case 67: // c
                GameGlobals.gui.menu.execButton('33');
                break;
            case 16: // shift	
            	GameGlobals.keyboard.shiftPressed = false;
            	break;
            case 18: // alt	
            	GameGlobals.keyboard.altPressed = false;
            	break;
            case 49: // 1
            case 50: // 2
            case 51: // 3
            	GameGlobals.keyboard.altPressed = false;
            	GameGlobals.keyboard.shiftPressed = false;
            	break;
        }
	},

	createCtrlGroup: function(group) {
		str = "ctrlGroup" + group;
		GameGlobals.keyboard[str] = $('.selected');
	},

	retrieveCtrlGroup: function(group) {
		if(str in GameGlobals.keyboard) {
			$(".selected").removeClass('selected');
			str = "ctrlGroup" + group;
			console.log(GameGlobals.keyboard[str]);
			GameGlobals.keyboard[str].each(function() {
				$(this).addClass('selected');
			});
			GameGlobals.gui.menu.renderSelected();
			console.log(GameGlobals.keyboard);
		}
	}
});