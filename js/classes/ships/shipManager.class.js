var ShipManager = Class.extend({
    __construct: function(shipClass){
        this.shipClass = shipClass;
        this.ships = [];
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
     * Selects one unit
     */
    pick: function(ship){
        this.clearSelection();
        $('#' + ship.id).addClass('selected');
    },

    /*
     * Empties the selected units list
     */
    clearSelection: function(){
        $(this.shipClass).each(function(){
            $(this).attr('class', $(this).attr('class').replace(' selected', ''));
        });
    },
    
    /*
     * Iterates trough the selected ships and buildings. In func, $(this) points to the html element of the selected item.
     * You can use $(this).data('drawable') to access the class of the item itself.
     */
    applyToEach: function(func){
        $('.selected').each(func);
    }
    
});
