var Menu = Class.extend({
    __construct: function(){
        this.selection = null;
        this.current = null;
        this.buttons = {
            prefix: "menu_slot_",
            allowed: [11, 12, 13, 21, 22, 23, 31, 32, 33]
        }
    },

    setDimensions: function() {
        // Animate the spawning of the minimap
        // TODO Improve the effect of that
        var minimap_height = $("#minimap").height();
        $("#minimap").height(0).css('display', 'block').animate({height: minimap_height + "px"}, 2000);

        // Calculate the space taken by the minimap and the buttons and the control groups, then we set the space left to the dock
        // TODO Improve the effect of that
        var minimapspace = parseInt($("#minimap").width()) + parseInt($("#minimap").css("margin-left").replace("px", "")) + parseInt($("#minimap").css("margin-right").replace("px", ""));
        var ctrlgroupsspace = parseInt($("#ctrlgroups").width()) + parseInt($("#ctrlgroups").css("margin-left").replace("px", "")) + parseInt($("#ctrlgroups").css("margin-right").replace("px", ""));
        var buttonsspace = parseInt($("#buttons").width()) + parseInt($("#buttons").css("margin-left").replace("px", "")) + parseInt($("#buttons").css("margin-right").replace("px", ""));
        var spaceleft = $("#menu").width() - buttonsspace - minimapspace - ctrlgroupsspace - parseInt($("#dock").css("margin-left").replace("px", "")) - parseInt($("#dock").css("margin-right").replace("px", ""))
        $("#dock").animate({width: spaceleft + "px"}, 2000);

    },
    
    setCurrent: function(current){
        if(this.current != null){
            $(this.current.getSprite()).unbind('jSpaceRuler:life-update');
            $(this.current.getSprite()).unbind('jSpaceRuler:production-update');
            $(this.current.getSprite()).unbind('jSpaceRuler:die');
        }
        
        this.current = current;
        
        if(this.current != null){
            var __this = this;
            $(this.current.getSprite()).bind('jSpaceRuler:life-update', function(){__this.updateUnitLife()});
            $(this.current.getSprite()).bind('jSpaceRuler:production-update', function(){__this.updateProductionDisplay()});
            $(this.current.getSprite()).bind('jSpaceRuler:die', function(){__this.clear();});
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
        //this.clear();
        this.selection = selection;
        for(var i=0; i < selection.length; i++){
            var unit = this.selection.eq(i).data('binded-class');

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
                    var ship = $(this).data('binded-class');
                    ship.setOrder({
                        command: command
                    });
                });
            });
        }
    },

    // Once all ships are flagged with the selected class, the function automatically renders the dock and the buttons related
    renderSelected: function() {
        this.clean();

        selected = $(".selected");

        var ship = null;
        var tpl = "";

        // Render in dock
        if(selected.length == 1)
        {
            ship = selected.data('binded-class');
            tpl = ship.draw('dock-single');
            tpl.appendTo($("#dock"));
        }
        else if(selected.length > 1)
        {
            var container = $("<div/>", {
              'class' : "entityInDockContainer"
            });

            selected.each(function() {
                ship = $(this).data('binded-class');
                tpl = ship.draw('dock-multi');
                tpl.appendTo(container);
            });

            container.appendTo($("#dock"));
        }

        // Render order in the buttons section
        // TODO implement that : main_unit must be the most important unit (and the one with more mana for example), for now, just the first of the selection
        var main_unit = selected.first();
        var order = null;
        var menu = main_unit.data('binded-class').menu;
        for(var order_key in menu)
        {
            order = menu[order_key];
            if($.inArray(parseInt(order_key),this.buttons.allowed) < 0) {
                throw "The button you want to assign at place " + order_key + " for the " + order.command + " command is not allowed or does not exist";
                return false;
            }

            // TODO implement other methods than "icon" : for example, an html tag with a css class to create css animations / vectorisation
            var button_container = null;
            if(typeof order.icon != 'undefined')
            {
                button_container = $("<img/>", {
                    'src': order.icon
                });
            }

            button_container.appendTo($("#" + this.buttons.prefix + order_key));
        }

    },

    clean: function() {
        $("#dock").empty();
    },

    execButton: function(pos) {
        alert(pos);
    }
});