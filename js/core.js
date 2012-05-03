/*
 * TODO:
 * 
 * - Menu # (manque tab, shortcuts)
 * - Production ### (manque affichage progression)
 * - Construction
 * - Barres de vie
 * - Maps #
 * - Selection souris encadrée
 * - Comportement de tir à vue
 * - Rally points
 * 
 * - Groupes de controle
 * - IA ?
 * - Réseau?
 * - Animation?
 * - Son?
 */


var GameGlobals = {
    weaponManager: new WeaponManager(),
    shipManager: new ShipManager('.ship, .building'),
    viewport: '#viewport',
    playerSide: null,
    mouse: new Mouse(),
    gui:{
        mineralsDisplay: '#minerals_display',
        menu: new Menu()
    }
}

$(document).ready(function(){
    
    $("#map").scrollbars();
    $('.scrollcontent').disableSelection();
    
    var game = new Game();
    
    game.start();
    game.bindMouse();
    game.loop();
});