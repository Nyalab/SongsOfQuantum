var Side = Class.extend({
    __construct: function(name, color){
        this.name = name;
        this.color = color;
        this.ressources = {
            minerals: 0
        }
    },
    
    hasEnoughtMinerals: function(minerals){
        return this.ressources.minerals + minerals >= 0;
    },
    
    changeMinerals: function(minerals){
        this.ressources.minerals += minerals;
        if(GameGlobals.playerSide.name == this.name){
            $(GameGlobals.gui.mineralsDisplay).html(this.ressources.minerals);
        }
    },
    
    colorize: function (ship){
        $('#' + ship.id).attr('data-pb-tint-opacity', 1);
        $('#' + ship.id).attr('data-pb-tint-colour', this.color);
        $('#' + ship.id).addClass('filter-tint');
    },
    
    add: function(ship){
        this.colorize(ship);
        $('#' + ship.id).addClass(this.name);
        $('#' + ship.id).data('side', this);
    }
});
