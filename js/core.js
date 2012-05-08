var GameGlobals = {
    weaponManager: new WeaponManager(),
    shipManager: new ShipManager('.ship, .building'),
    viewport: '#viewport',
    playerSide: null,
    mouse: new Mouse(),
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
    
    $("#map").scrollbars();
    $('.scrollcontent').disableSelection();
    
    var game = new Game();
    
    game.start();
    game.bindMouse();
    game.loop();
});