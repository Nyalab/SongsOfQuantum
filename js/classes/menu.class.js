var Menu = Class.extend({
    __construct: function(){
        this.selection = null;
    },
    
    applySelection: function(selection){
        for(var i=1; i < 13; i++){
            $('#menu_slot_' + (i < 10 ? '0': '') + i).html('');
        }
        
        this.selection = selection;
        for(i=0; i < selection.length; i++){
            if(typeof(this.selection.eq(i).data('drawable').menu) != 'undefined'){
                this.apply(this.selection.eq(i).data('drawable').menu);
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