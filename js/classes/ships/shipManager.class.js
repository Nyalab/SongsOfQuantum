var ShipManager = Class.extend({
    __construct: function(shipClass){
        this.shipClass = shipClass;
        this.ships = [];
    },
    
    generateId: function(){
        var s = [], itoh = '0123456789ABCDEF';

        // Make array of random hex digits. The UUID only has 32 digits in it, but we
        // allocate an extra items to make room for the '-'s we'll be inserting.
        for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);

        // Conform to RFC-4122, section 4.4
        s[14] = 4;  // Set 4 high bits of time_high field to version
        s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

        // Convert to hex chars
        for (var i = 0; i <36; i++) s[i] = itoh[s[i]];

        // Insert '-'s
        s[8] = s[13] = s[18] = s[23] = '-';

        return s.join('');
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

    pick: function(ship){
        this.clearSelection();
        $('#' + ship.id).addClass('selected');
    },

    clearSelection: function(){
        $(this.shipClass).each(function(){
            $(this).attr('class', $(this).attr('class').replace(' selected', ''));
        });
    },

    // An alias of apply for giving order.
    order: function(order){
        this.apply(order);
    },

    
    apply: function(func){
        $('.selected').each(func);
    }
    
});
