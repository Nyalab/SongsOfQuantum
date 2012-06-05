var Menu = Class.extend({

    /* TODO - Clearing menu if selected entity dies. */

    __construct: function(){
        this.selection = null;
        this.current = null;
    },

    setDimensions: function() {
        // Animate the spawning of the minimap
        // TODO Improve the effect of that
        $("#minimap").height(0).css('display', 'block').animate({height: $("#dock").height() + "px"}, 2000);

        // Calculate the space taken by the minimap and the buttons, then we set the space left to the dock
        // TODO Improve the effect of that
        var menuspace = parseInt($("#minimap").width()) + parseInt($("#minimap").css("margin-left").replace("px", "")) + parseInt($("#minimap").css("margin-right").replace("px", ""));
        var buttonsspace = parseInt($("#buttons").width()) + parseInt($("#buttons").css("margin-left").replace("px", "")) + parseInt($("#buttons").css("margin-right").replace("px", ""));
        var spaceleft = $("#menu").width() - buttonsspace - menuspace - parseInt($("#dock").css("margin-left").replace("px", "")) - parseInt($("#dock").css("margin-right").replace("px", ""))
        $("#dock").animate({width: spaceleft + "px"}, 2000);

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
    },

    renderSelected: function() {
        this.clean();

        selected = $(".selected");

        var ship = null;
        var tpl = "";
        if(selected.length == 1)
        {
            ship = GameGlobals.shipManager.pick(selected.attr('id'));
            tpl = ship.renderInDockSingle();
            tpl.appendTo($("#dock"));
        }
        else if(selected.length > 1)
        {
            var container = $("<div/>", {
              'class' : "entityInDockContainer"
            });

            selected.each(function() {
                ship = GameGlobals.shipManager.pick($(this).attr('id'));
                tpl = ship.renderInDockList();
                tpl.appendTo(container);
            });

            container.appendTo($("#dock"));
        }
    },

    clean: function() {
        $("#dock").empty();
    }
});