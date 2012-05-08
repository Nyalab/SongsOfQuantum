var Menu = Class.extend({

    /* TODO - Clearing menu if selected entity dies. */

    __construct: function(){
        this.selection = null;
        this.current = null;
    },
    
    setCurrent: function(current){
        if(this.current != null){
            $(this.current.getSprite()).unbind('jSpaceRuler:life-update');
            $(this.current.getSprite()).unbind('jSpaceRuler:production-update');
        }
        
        this.current = current;
        
        if(this.current != null){
            var __this = this;
            $(this.current.getSprite()).bind('jSpaceRuler:life-update', function(){__this.updateUnitLife()});
            $(this.current.getSprite()).bind('jSpaceRuler:production-update', function(){__this.updateProductionDisplay()});
        }
    },
    
    updateUnitLife: function(){
        if(this.current != null){
            $(GameGlobals.gui.unitLife).html(this.current.getLife() + '/' + this.current.getMaximumLife() + ' hp');
        }
        else{
            $(GameGlobals.gui.unitLife).html('');
        }
    },
    
    updateUnitTitle: function(){
        if(this.current != null){
            $(GameGlobals.gui.unitTitle).html(this.current.properties.name);
        }
        else{
            $(GameGlobals.gui.unitTitle).html('');
        }
    },
    
    updateProductionDisplay: function(){
        if(this.current == null){
            $(GameGlobals.gui.unitProductionQueue).html('');
        }
        else if(this.current.properties.productionType == "queue"){
            
            var list = "";
            for(var i in this.current.productionQueue){
                
                var progress = "";
                if(i == 0){
                    var progress = ((new Date()).getTime() - this.current.productionQueue[i].startTime);
                    progress = Math.round(100 * progress / this.current.productionQueue[i].duration);
                    progress = progress + "%";
                }
                
                list += "<div class=\"queue_production_item\">";
                list += "<div>";
                list += "<img src=\"" + this.current.productionQueue[i].unit.properties.icon + "\" />";
                list += "</div>";
                list += progress;
                list += "</div>"; 
            }
            
            $(GameGlobals.gui.unitProductionQueue).html(list);
            
        }
        else{
            $(GameGlobals.gui.unitProductionQueue).html('');
        }
    },
    
    clear: function(){
        this.setCurrent(null);
        this.updateUnitTitle();
        this.updateUnitLife();
        this.updateProductionDisplay();
        for(var i=1; i < 13; i++){
            $(GameGlobals.gui.unitMenuSlot.replace('{id}', (i < 10 ? '0': '') + i)).html('');
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
                GameGlobals.shipManager.applyToEach(function(){
                    var ship = $(this).data('drawable');
                    ship.setOrder({
                        command: command
                    });
                });
            });
        }
    }
});