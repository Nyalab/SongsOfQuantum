var ShipManager = Class.extend({
    __construct: function(shipClass){
        this.shipClass = shipClass;
        this.ships = [];
        this.shipsRegistry = [];
    },
    
    register: function(ship){
    
        for(var i=0; i < this.ships.length; i++){
            if(this.ships[i] == null){
                this.ships[i] = ship;
                return;
            }
        }

        this.shipsRegistry[ship.id] = ship;

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
     
    pick: function(ship){
        this.clearSelection();
        $('#' + ship.id).addClass('selected');
    },
*/
    /*
     * Selects an unit
     */
    pick: function(selector) {
        if(selector in this.shipsRegistry)
            return this.shipsRegistry[selector];
        else
            console.log('Object not found');
    },

    doMouseSelect: function() {
        var selected;
        selected = $("#" + GameGlobals.mouse.selectionId).collision(".ship");
        // If we have no ship selected, try with buildings
        if(selected.length == 0)
        {
            selected = $("#" + GameGlobals.mouse.selectionId).collision(".building");
            // If we have no ship and no building, try the asteroids
            if(selected.length == 0)
            {
                selected = $("#" + GameGlobals.mouse.selectionId).collision(".asteroid");
            }
        }
        selected.addClass('selected');

        if(selected.length)
            GameGlobals.gui.menu.renderSelected();
        else
            GameGlobals.gui.menu.clean();
    },

    /*
     * Empties the selected units list
     */
    clearSelection: function(){
        $(this.shipClass).removeClass('selected');
    },
    
    /*
     * Iterates trough the selected ships and buildings. In func, $(this) points to the html element of the selected item.
     * You can use $(this).data('drawable') to access the class of the item itself.
     */
    applyToEach: function(func){
        $('.selected').each(func);
    }
    
});
