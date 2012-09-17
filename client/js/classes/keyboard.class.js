var Keyboard = Class.extend({

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

  init: function() {
    Mousetrap.bind('a', function() {
      GameGlobals.gui.menu.execButton('11');
      return false;
    });
    Mousetrap.bind('z', function() {
      GameGlobals.gui.menu.execButton('12');
      return false;
    });
    Mousetrap.bind('e', function() {
      GameGlobals.gui.menu.execButton('13');
      return false;
    });
    Mousetrap.bind('q', function() {
      GameGlobals.gui.menu.execButton('21');
      return false;
    });
    Mousetrap.bind('s', function() {
      GameGlobals.gui.menu.execButton('22');
      return false;
    });
    Mousetrap.bind('d', function() {
      GameGlobals.gui.menu.execButton('23');
      return false;
    });
    Mousetrap.bind('w', function() {
      GameGlobals.gui.menu.execButton('31');
      return false;
    });
    Mousetrap.bind('x', function() {
      GameGlobals.gui.menu.execButton('32');
      return false;
    });
    Mousetrap.bind('c', function() {
      GameGlobals.gui.menu.execButton('33');
      return false;
    });

    Mousetrap.bind('ctrl+1', function() {
      GameGlobals.keyboard.createCtrlGroup(1);
      return false;
    });
    Mousetrap.bind('ctrl+2', function() {
      GameGlobals.keyboard.createCtrlGroup(2);
      return false;
    });
    Mousetrap.bind('ctrl+3', function() {
      GameGlobals.keyboard.createCtrlGroup(3);
      return false;
    });
    Mousetrap.bind('ctrl+4', function() {
      GameGlobals.keyboard.createCtrlGroup(4);
      return false;
    });
    Mousetrap.bind('ctrl+5', function() {
      GameGlobals.keyboard.createCtrlGroup(5);
      return false;
    });
    Mousetrap.bind('ctrl+6', function() {
      GameGlobals.keyboard.createCtrlGroup(6);
      return false;
    });
    Mousetrap.bind('ctrl+7', function() {
      GameGlobals.keyboard.createCtrlGroup(7);
      return false;
    });
    Mousetrap.bind('ctrl+8', function() {
      GameGlobals.keyboard.createCtrlGroup(8);
      return false;
    });
    Mousetrap.bind('ctrl+9', function() {
      GameGlobals.keyboard.createCtrlGroup(9);
      return false;
    });
    Mousetrap.bind('ctrl+0', function() {
      GameGlobals.keyboard.createCtrlGroup(0);
      return false;
    });

    Mousetrap.bind(['&', '1'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(1);
      return false;
    });
    Mousetrap.bind(['é', '2'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(2);
      return false;
    });
    Mousetrap.bind(['"', '3'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(3);
      return false;
    });
    Mousetrap.bind(["'", '4'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(4);
      return false;
    });
    Mousetrap.bind(['(', '5'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(5);
      return false;
    });
    Mousetrap.bind(['-', '6'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(6);
      return false;
    });
    Mousetrap.bind(['è', '7'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(7);
      return false;
    });
    Mousetrap.bind(['_', '8'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(8);
      return false;
    });
    Mousetrap.bind(['ç', '9'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(9);
      return false;
    });
    Mousetrap.bind(['à', '0'], function() {
      GameGlobals.keyboard.retrieveCtrlGroup(0);
      return false;
    });
  },

	createCtrlGroup: function(group) {
		str = "ctrlGroup" + group;
		GameGlobals.keyboard[str] = $('.selected');
	},

	retrieveCtrlGroup: function(group) {
    console.log(GameGlobals.keyboard)
		str = "ctrlGroup" + group;
		if(GameGlobals.keyboard[str].length) {
			$(".selected").removeClass('selected');
			GameGlobals.keyboard[str].each(function() {
				$(this).addClass('selected');
			});
			GameGlobals.gui.menu.renderSelected();
		}
	}
});