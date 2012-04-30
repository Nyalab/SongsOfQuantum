var Menu = Class.extend({
    __construct: function(){
        this.selection = null;
        this.current = null;
        
        var __this = this;
        
        $(document).ready(function(){
            $('#menu').bind('jSpaceRuler:life-update', function(){__this.updateUnitLife()});
            $('#menu').bind('jSpaceRuler:production-update', function(){__this.updateProductionDisplay()});
        });
    },
    
    setCurrent: function(current){
        this.current = current;
    },
    
    updateUnitLife: function(){
        if(this.current != null){
            $('#unit_life').html(this.current.getLife() + '/' + this.current.getMaximumLife() + ' hp');
        }
        else{
            $('#unit_life').html('');
        }
    },
    
    updateUnitTitle: function(){
        if(this.current != null){
            $('#unit_title').html(this.current.properties.name);
        }
        else{
            $('#unit_title').html('');
        }
    },
    
    updateProductionDisplay: function(){
        if(this.current == null){
            $('#queue_production').html('');
        }
        else if(this.current.properties.productionType == "queue"){
            $('#queue_production').html('Build list:');
        }
        else{
            $('#queue_production').html('');
        }
    },
    
    clear: function(){
        this.setCurrent(null);
        this.updateUnitTitle();
        this.updateUnitLife();
        this.updateProductionDisplay();
        for(var i=1; i < 13; i++){
            $('#menu_slot_' + (i < 10 ? '0': '') + i).html('');
        }
    },
    
    applySelection: function(selection){
        this.clear();
        this.selection = selection;
        for(var i=0; i < selection.length; i++){
            var unit = this.selection.eq(i).data('drawable');
            
            this.setCurrent(unit);
            this.updateUnitTitle();
            this.updateUnitLife();
            if(unit instanceof Building){
                this.updateProductionDisplay();
            }
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