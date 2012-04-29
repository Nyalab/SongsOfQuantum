var Menu = Class.extend({
    __construct: function(){
        this.selection = null;
    },
    
    setUnitLife: function(life, maximum){
        if(life){
            $('#unit_life').html(life + '/' + maximum + ' hp');
        }
        else{
            $('#unit_life').html('');
        }
    },
    
    setUnitTitle: function(title){
        $('#unit_title').html(title);
    },
    
    clear: function(){
        this.setUnitTitle('');
        this.setUnitLife(false);
        for(var i=1; i < 13; i++){
            $('#menu_slot_' + (i < 10 ? '0': '') + i).html('');
        }
    },
    
    applySelection: function(selection){
        this.clear();
        this.selection = selection;
        for(var i=0; i < selection.length; i++){
            var unit = this.selection.eq(i).data('drawable');
            this.setUnitTitle(unit.properties.name);
            this.setUnitLife(unit.getLife(), unit.getMaximumLife());
            if(typeof(unit.menu) != 'undefined'){
                this.apply(unit.menu);
                return;
            }
        }
    },
    
    switchMenu: function(){
        
    },
    
    apply: function(items){
        for(var i=0; i < items.length; i++){
            $(items[i].slot).html('<img src="'+items[i].icon+'" />');
            $(items[i].slot).data('command', items[i].command);

            $(items[i].slot).click(function(){
                var command = $(this).data('command');
                GameGlobals.shipManager.order(function(){
                    var ship = $(this).data('drawable');
                    ship.setOrder({
                        command: command
                    });
                });
            });
        }
    }
});