var GameGlobals = {
    weaponManager: new WeaponManager(),
    shipManager: new ShipManager('.ship, .building, .asteroid'),
    sound: new Sound(),
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
    var game = new Game([
        {
            name: "Player 1",
            id: Guid.generate(),
            type: "human",
            color: "#8B8D28",
            race: "terrestris"
        },
        {
            name: "Player 2",
            id: Guid.generate(),
            type: "AI",
            color: "#550000",
            race: "terrestris"
        }
    ]);
    // And start it
    game.loadMap('js/maps/rohnokdual.map.js');
    game.bindMouse();
    game.loop();
});

function roundNumber(num, dec) {
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}
