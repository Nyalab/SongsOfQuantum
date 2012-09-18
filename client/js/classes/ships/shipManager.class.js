var ShipManager = Class.extend({
    __construct: function(shipClass){
        this.shipClass = shipClass;
        this.ships = [];
        this.pickMode = false;
    },

    register: function(ship){

        for(var i=0; i < this.ships.length; i++){
            if(this.ships[i] == null){
                this.ships[i] = ship;
                return;
            }
        }

        this.ships.push(ship);
        processFilters();
    },

    process: function(){
        for(var i=0; i < this.ships.length; i++){
            if(this.ships[i] != null){
                if(this.ships[i].isDead()){
                    this.ships[i] = null;
                }
                else{
                    this.ships[i].process();
                    this.ships[i].refreshSprite();
                }
            }
        }
    },

    /*
     * Picks one unit
     */
    pick: function(ship){
        this.clearSelection();
        $('#' + ship.id).addClass('selected');
        GameGlobals.gui.menu.renderSelected();
        this.pickMode = true;
    },

    doMouseSelect: function() {
        var selected;
        selected = $("#" + GameGlobals.mouse.selectionId).collision(".ship.controllable");
        // If we have no ship selected, try with buildings
        if(selected.length == 0)
        {
            selected = $("#" + GameGlobals.mouse.selectionId).collision(".building.controllable");
            // If we have no ship and no building, try the asteroids
            if(selected.length == 0)
            {
                selected = $("#" + GameGlobals.mouse.selectionId).collision(".asteroid");
            }
        }
        selected.addClass('selected');

        if(selected.length){
            GameGlobals.gui.menu.renderSelected();
        }
        else if(this.pickMode){
            this.pickMode = false;
        }
        else{
            GameGlobals.gui.menu.clean();
        }
    },

    /*
     * Empties the selected units list
     */
    clearSelection: function(){
        $(this.shipClass).removeClass('selected');
    },
    
    /*
     * Iterates trough the selected ships and buildings. In func, $(this) points to the html element of the selected item.
     * You can use $(this).data('binded-class') to access the class of the item itself.
     */
    applyToEach: function(func){
        $('.selected').each(func);
    }
    
});
