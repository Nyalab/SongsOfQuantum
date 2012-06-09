var GameGlobals = {
    weaponManager: new WeaponManager(),
    shipManager: new ShipManager('.ship, .building, .asteroid'),
    viewport: '#viewport',
    playerSide: null,
    mouse: new Mouse(),
    cursor: new Cursor(),
    keyboard: new Keyboard(),
    gui:{
        mineralsDisplay: '#minerals_display',
        
        unitLife: '#unit_life',
        unitTitle: '#unit_title',
        unitProductionQueue: '#queue_production',

        unitMenuSlot: '#menu_slot_{id}',

        menu: new Menu()
    }
};

$(document).ready(function(){
    
    // Remove scrollbars
    //$("#map").scrollbars();
    $('.scrollcontent').disableSelection();

    // Bind keyboards events
    $(window).keydown(GameGlobals.keyboard.down);
    $(window).keyup(GameGlobals.keyboard.up);

    // Initialize game    
    var game = new Game();
    // And start it
    game.start();
    game.bindMouse();
    game.loop();
});

function roundNumber(num, dec) {
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}
